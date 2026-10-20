/* 本地验证：用插件自己的生成器产出样例 docx（不经过浏览器）。 */
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '..');

const planSrc = readFileSync(path.join(root, 'src/plan.js'), 'utf8');
const quizSrc = readFileSync(path.join(root, 'src/quiz.js'), 'utf8');
const docxSrc = readFileSync(path.join(root, 'src/docx.js'), 'utf8');
const pptxSrc = readFileSync(path.join(root, 'src/pptx.js'), 'utf8');
const build = new Function(`${planSrc}\n${quizSrc}\n${docxSrc}\n${pptxSrc}\nreturn { peBuildDocx, peDefaultPlan, peNormalizePlan };`)();

const mode = process.argv[2] || 'default';
const out = process.argv[3] || path.join(root, '..', '教案_样例.docx');
const plan = build.peDefaultPlan();

if (mode === 'full') {
  plan.teacher = '张老师';
  plan.classSize = '42';
  plan.studentAnalysis =
    '二年级学生年龄在7—8岁之间，正处于灵敏性和协调性发展的敏感期，模仿能力强，喜欢游戏与竞赛，但注意力集中时间较短，力量与身体控制能力较弱。学生此前已学过原地双脚跳、模仿小动物跳等内容，具备一定的跳跃经验，立定跳远的完整动作尚未系统学习。';
  plan.strategies =
    '口诀辅助：把动作简化为“一蹬二摆三起跳，屈膝落地要站稳”，学生边念口诀边做动作。\n分解练习：先练原地摆臂、原地纵跳，再练摆臂与蹬地的配合，最后完成完整动作。';
  plan.safety = '课前检查场地，清除石块杂物；练习时保持2米以上间距，落地后从两侧返回。';
  plan.design =
    '1. 情境导入：以“小青蛙学本领”贯穿全课，符合低年级学生形象思维的特点，迅速集中注意力。\n2. 示范与口诀：直观示范配合口诀，把复杂动作简化为“蹬、摆、跳、稳”四个提示。';
  plan.load = '练习密度：50%—60%；平均心率：130—150次/分；最高心率170次/分左右。';
  plan.reflection = '重点达成较好，落地屈膝仍有部分学生不到位，下节课需加强落地缓冲的专项练习。';
}

const result = build.peBuildDocx(plan);
writeFileSync(out, result.bytes);
console.log(JSON.stringify({ out, fileName: result.fileName, bytes: result.bytes.length }));
