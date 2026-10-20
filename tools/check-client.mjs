/* 用最小 React 垫片把真实 client.js 跑一遍：检查渲染路径与「生成」按钮。 */
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '..');
const source = readFileSync(path.join(root, 'client.js'), 'utf8');

const fakeReact = {
  createElement(type, props, ...children) {
    return { type, props: { ...(props || {}), children: children.length === 1 ? children[0] : children } };
  },
  useState(initial) {
    const value = typeof initial === 'function' ? initial() : initial;
    return [value, () => {}];
  },
};

const downloads = [];
let appended = 0;
const fakeDocument = {
  createElement() {
    return {
      set href(v) { this._href = v; },
      get href() { return this._href; },
      download: '',
      rel: '',
      click() { downloads.push({ href: this._href, download: this.download }); },
      remove() {},
    };
  },
  body: { appendChild() { appended += 1; } },
};

class FakeBlob {
  constructor(parts, options) { this.parts = parts; this.options = options; this.size = parts[0].length; }
}

const urls = [];
const fakeURL = {
  createObjectURL(blob) { urls.push(blob); return 'blob:fake/' + urls.length; },
  revokeObjectURL() {},
};

let loaded = null;
const windowStub = {
  __ModuleLoader__: { load(module) { loaded = module; } },
  setTimeout(fn) { fn(); },
};

new Function('window', 'document', 'Blob', 'URL', 'TextEncoder', 'console', 'setTimeout', source)(
  windowStub,
  fakeDocument,
  FakeBlob,
  fakeURL,
  TextEncoder,
  console,
  windowStub.setTimeout
);

if (!loaded) throw new Error('client module did not register');
const mod = loaded.factory((name) => {
  if (name === 'react') return fakeReact;
  throw new Error('unexpected require: ' + name);
});

const registered = [];
const ctx = {
  effect(fn) { const dispose = fn(); return typeof dispose === 'function' ? dispose : () => {}; },
  slots: {
    inject(slot, callback) {
      const dispose = callback();
      registered.push({ slot, dispose });
      return dispose;
    },
    register(definition, component) {
      const id = definition.id || definition.key;
      console.log('register', definition.name, id, '->', component.name || 'component');
      return () => {};
    },
  },
  locale: {
    register() {},
    bind() { return () => undefined; },
  },
};

mod.apply(ctx);

function render(node) {
  if (node === null || node === undefined || typeof node === 'boolean') return '';
  if (typeof node === 'string' || typeof node === 'number') return String(node);
  if (Array.isArray(node)) return node.map(render).join('');
  if (typeof node.type === 'function') {
    const props = { ...node.props };
    return render(node.type(props));
  }
  return render(node.props && node.props.children);
}

const Panel = findPanel();
function findPanel() {
  // 重新走一遍注册，抓取 main 面板组件
  let panel = null;
  const probe = {
    ...ctx,
    slots: {
      ...ctx.slots,
      register(definition, component) {
        if (definition.name === 'main') panel = component;
        return () => {};
      },
    },
  };
  mod.apply(probe);
  return panel;
}

const tree = Panel({});
const text = render(tree).replace(/\s+/g, ' ').trim();
console.log('rendered chars:', text.length);
console.log('contains title:', text.includes('体育教案'));
console.log('contains phase:', text.includes('基本部分'));
console.log('contains footer:', text.includes('生成 Word 教案') || text.includes('generate'));
console.log(
  'contains attachments:',
  text.includes('附件') && text.includes('PPT 课件') && text.includes('随堂测试')
);
console.log(
  'contains quiz:',
  text.includes('换一套') && text.includes('查看题目') && text.includes('本节课学习的课题是')
);

function findButton(node, label) {
  if (!node || typeof node !== 'object') return null;
  if (Array.isArray(node)) {
    for (const child of node) {
      const hit = findButton(child, label);
      if (hit) return hit;
    }
    return null;
  }
  if (node.props && node.props.onClick && render(node.props.children).includes(label)) return node;
  if (node.props && node.props.children) return findButton(node.props.children, label);
  return null;
}

const primary = findButton(tree, '生成 Word 教案');
if (!primary) throw new Error('generate button not found');
primary.props.onClick();
console.log('downloads:', downloads.length, downloads[0] && downloads[0].download);
console.log('blob bytes:', urls[0] && urls[0].size, 'type:', urls[0] && urls[0].options.type);
if (!downloads.length || !urls[0].size) throw new Error('generate did not produce a download');

const pptButton = findButton(tree, '生成 PPT 课件');
if (!pptButton) throw new Error('ppt button not found');
pptButton.props.onClick();
console.log('ppt download:', downloads[1] && downloads[1].download);
if (!downloads[1] || !/\.pptx$/.test(downloads[1].download || '')) throw new Error('ppt download missing');
if (!findButton(tree, '换一套')) throw new Error('quiz shuffle button not found');
console.log('client bundle OK');
