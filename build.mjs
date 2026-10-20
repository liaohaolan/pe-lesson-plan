/* 把 src/*.js 拼成一个客户端模块（window.__ModuleLoader__ 格式），并做语法检查。 */
import { readFileSync, writeFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = here;
const pkg = JSON.parse(readFileSync(path.join(root, 'package.json'), 'utf8'));

const order = ['src/plan.js', 'src/quiz.js', 'src/docx.js', 'src/pptx.js', 'src/panel.js', 'src/main.js'];
const body = order
  .map((file) => readFileSync(path.join(root, file), 'utf8').trimEnd())
  .join('\n\n');

const indent = (text) =>
  text
    .split('\n')
    .map((line) => (line ? '    ' + line : line))
    .join('\n');

const banner = `/* 由 build.mjs 生成，请修改 src/*.js 后重新构建。 */\n`;

const output =
  banner +
  `window.__ModuleLoader__.load({\n  id: ${JSON.stringify(pkg.name)},\n  factory(require) {\n    const React = require('react');\n\n` +
  indent(body) +
  `\n\n    return { inject: ['slots', 'locale'], apply: peApply };\n  },\n});\n`;

writeFileSync(path.join(root, 'client.js'), output);
execFileSync(process.execPath, ['--check', path.join(root, 'client.js')], { stdio: 'inherit' });
console.log(`client.js ${output.length} bytes, syntax ok`);
