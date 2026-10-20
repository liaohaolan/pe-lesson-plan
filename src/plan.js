/* 教案数据结构与默认值：内容取自老师的《教案_原稿备份.docx》。 */

/* 教学风格：选一种课堂气质，生成教案时写明这种风格在本节课怎样落实。 */
var PE_STYLE_PRESETS = [
  {
    id: 'lively',
    label: '活泼',
    labelEn: 'Lively',
    hint: '游戏与竞赛贯穿，口令有节奏，语言有感染力',
    note:
      '以游戏、竞赛和音乐节奏贯穿课堂，用夸张的示范和激励性语言调动情绪，多使用“比一比”“挑战一下”等方式，让学生在玩中学、学中练。',
  },
  {
    id: 'serious',
    label: '严肃',
    labelEn: 'Serious',
    hint: '队列整齐，口令干脆，要求明确，纪律优先',
    note:
      '课堂组织严密，队列整齐，口令清晰干脆；讲解示范规范准确，练习要求明确，强调纪律与安全，以紧凑的节奏保证练习密度和动作质量。',
  },
  {
    id: 'pleasant',
    label: '愉悦',
    labelEn: 'Cheerful',
    hint: '语气亲切，多鼓励肯定，注重合作与体验',
    note:
      '语言温和亲切，多表扬、多鼓励；以合作练习和小组互助为主，关注每名学生的体验与进步，让学生在轻松愉快的氛围中达成学习目标。',
  },
];

function peStylePreset(value) {
  var key = peStr(value);
  for (var i = 0; i < PE_STYLE_PRESETS.length; i += 1) {
    if (PE_STYLE_PRESETS[i].id === key || PE_STYLE_PRESETS[i].label === key) return PE_STYLE_PRESETS[i];
  }
  return PE_STYLE_PRESETS[0];
}

/* 附件：勾选需要随教案一起提交的材料，生成时列在文档末尾。 */
var PE_ATTACHMENT_PRESETS = [
  { id: 'ppt', label: 'PPT 课件', hint: '配合教学过程的演示文稿' },
  { id: 'quiz', label: '随堂测试', hint: '检测动作要领与安全常识' },
  { id: 'worksheet', label: '学习任务单', hint: '学生边学边记的练习单' },
  { id: 'rubric', label: '评价量表', hint: '动作质量与课堂表现评分' },
];

function peAttachmentPreset(value) {
  var key = peStr(value);
  for (var i = 0; i < PE_ATTACHMENT_PRESETS.length; i += 1) {
    if (PE_ATTACHMENT_PRESETS[i].id === key || PE_ATTACHMENT_PRESETS[i].label === key) return PE_ATTACHMENT_PRESETS[i];
  }
  return null;
}

/* 附件清单：预设项按固定顺序，加上老师自己写的其他附件（每行一项）。 */
function peAttachmentLabels(plan) {
  var labels = [];
  var picked = plan && Array.isArray(plan.attachments) ? plan.attachments : [];
  for (var i = 0; i < PE_ATTACHMENT_PRESETS.length; i += 1) {
    if (picked.indexOf(PE_ATTACHMENT_PRESETS[i].id) >= 0) labels.push(PE_ATTACHMENT_PRESETS[i].label);
  }
  return labels.concat(peLines(plan && plan.attachmentOther));
}

function peDefaultPlan() {
  return {
    subject: '体育',
    grade: '二年级',
    topic: '立定跳远',
    lessonType: '新授课',
    style: PE_STYLE_PRESETS[0].id,
    styleNote: PE_STYLE_PRESETS[0].note,
    duration: 40,
    textbook: '小学体育',
    teacher: '',
    classSize: '',
    analysis:
      '立定跳远是低年级体育运动，是锻炼下肢力量、身体协调性的基础练习。本节课重点学习预摆、起跳、落地的连贯动作，发展学生的跳跃能力、下肢力量与身体协调性。',
    studentAnalysis: '',
    objectives: [
      { label: '运动能力', text: '百分之90学生能够说出立定跳远的动作口诀，初步掌握预摆、起跳、落地的动作。' },
      { label: '健康行为', text: '练习前进行热身，练习中保持安全距离，学会落地缓冲，避免摔倒。' },
      { label: '体育品德', text: '积极参与游戏，遵守规则，不怕困难。' },
    ],
    keyPoint: '落地时一定要屈膝，缓解落地冲击，避免摔倒。',
    hardPoint: '起跳发力位置以及摆臂弧度。',
    strategies: '',
    equipment: '口哨、垫子、测量尺。',
    venue: '操场。',
    safety: '',
    phases: [
      {
        name: '开始部分',
        minutes: 2,
        content: '1. 整队清点人数，师生问好。\n2. 强调课堂规矩与安全要求。\n3. 宣布本节课学习内容：立定跳远。',
        student: '快速集合，注意力集中，听清本课任务。',
        organization: '四列横队。\n要求：快、静、齐。',
      },
      {
        name: '准备部分',
        minutes: 8,
        content: '1. 慢跑：围绕操场慢跑3圈。\n2. 徒手操：头部运动、肩部运动、腰部运动、弓步压腿、膝关节运动、手腕脚踝。',
        student: '跟随口令慢跑，认真完成徒手操，充分活动各关节。',
        organization: '成体操队形散开。\n要求：动作到位，保持间距。',
      },
      {
        name: '基本部分',
        minutes: 24,
        content:
          '1. 动作示范与讲解：教师正面、侧面示范，教口诀“一蹬二摆三起跳，屈膝落地要站稳”。\n2. 动作讲解：双脚分开与肩同宽，手臂前后摆动，身体跟着起伏；手臂向前上摆，双脚用力蹬地向前跳出；落地双脚同时落地，屈膝缓冲，稳住身体。\n3. 分层练习纠错：集体拆分动作练习，教师巡回指导、逐个纠错。',
        student: '观察示范，边念口诀边模仿；按口诀顺序完成预摆、起跳、落地，同伴之间互相提示。',
        organization: '四列横队讲解，之后分组练习，组间距2米以上。\n要求：听信号练习，保持安全距离，不抢跳。',
      },
      {
        name: '结束部分',
        minutes: 6,
        content: '1. 放松活动：下肢拉伸，同学之间互相拍腿放松，深呼吸放松。\n2. 课堂小结：复习口诀及动作，表扬优秀个人，布置课后练习。',
        student: '跟随教师放松，回顾口诀与动作要点。',
        organization: '成圆形队形。\n要求：放松充分，小结认真。',
      },
    ],
    design: '',
    load: '',
    reflection: '',
    attachments: ['ppt', 'quiz'],
    attachmentOther: '',
    quizSeed: Math.floor(Math.random() * 1000000000),
  };
}

var PE_OBJECTIVE_LABELS = ['运动能力', '健康行为', '体育品德'];

function peStr(value) {
  return typeof value === 'string' ? value.trim() : value == null ? '' : String(value).trim();
}

function peNum(value, fallback) {
  var n = Number(value);
  return Number.isFinite(n) && n >= 0 ? Math.round(n) : fallback;
}

/* 把面板/工具传入的部分教案补全成完整结构，缺项回落到原稿。 */
function peNormalizePlan(input) {
  var base = peDefaultPlan();
  var src = input && typeof input === 'object' ? input : {};
  var stylePreset = peStylePreset(peStr(src.style) || base.style);
  var plan = {
    subject: peStr(src.subject) || base.subject,
    grade: peStr(src.grade) || base.grade,
    topic: peStr(src.topic) || base.topic,
    lessonType: peStr(src.lessonType) || base.lessonType,
    style: stylePreset.id,
    styleNote: peStr(src.styleNote) || stylePreset.note,
    duration: peNum(src.duration, base.duration) || base.duration,
    textbook: peStr(src.textbook),
    teacher: peStr(src.teacher),
    classSize: peStr(src.classSize),
    analysis: peStr(src.analysis),
    studentAnalysis: peStr(src.studentAnalysis),
    objectives: [],
    keyPoint: peStr(src.keyPoint),
    hardPoint: peStr(src.hardPoint),
    strategies: peStr(src.strategies),
    equipment: peStr(src.equipment),
    venue: peStr(src.venue),
    safety: peStr(src.safety),
    phases: [],
    design: peStr(src.design),
    load: peStr(src.load),
    reflection: peStr(src.reflection),
    attachments: [],
    attachmentOther: peStr(src.attachmentOther),
    quizSeed: peNum(src.quizSeed, base.quizSeed),
  };

  var objs = Array.isArray(src.objectives) ? src.objectives : [];
  for (var i = 0; i < PE_OBJECTIVE_LABELS.length; i += 1) {
    var entry = objs[i];
    var text = '';
    var label = PE_OBJECTIVE_LABELS[i];
    if (typeof entry === 'string') text = peStr(entry);
    else if (entry && typeof entry === 'object') {
      text = peStr(entry.text);
      if (peStr(entry.label)) label = peStr(entry.label);
    }
    plan.objectives.push({ label: label, text: text });
  }

  var phases = Array.isArray(src.phases) ? src.phases : [];
  for (var j = 0; j < phases.length; j += 1) {
    var p = phases[j];
    if (!p || typeof p !== 'object') continue;
    var phase = {
      name: peStr(p.name),
      minutes: peNum(p.minutes, 0),
      content: peStr(p.content),
      student: peStr(p.student),
      organization: peStr(p.organization),
    };
    if (!phase.name && !phase.content) continue;
    plan.phases.push(phase);
  }
  if (!plan.phases.length) plan.phases = base.phases;

  var picked = Array.isArray(src.attachments) ? src.attachments : base.attachments;
  for (var k = 0; k < picked.length; k += 1) {
    var attachment = peAttachmentPreset(picked[k]);
    if (attachment && plan.attachments.indexOf(attachment.id) < 0) plan.attachments.push(attachment.id);
  }

  return plan;
}

function pePhaseTotal(plan) {
  return plan.phases.reduce(function (sum, p) {
    return sum + (Number(p.minutes) || 0);
  }, 0);
}

/* 老师可能自己写了序号；没写的按（1）（2）补上。 */
function peNumbered(line, index) {
  if (/^[（(]?\s*[0-9０-９一二三四五六七八九十]+\s*[）)、.．]/.test(line)) return line;
  if (/^[·•\-*●○]/.test(line)) return line;
  return '（' + (index + 1) + '）' + line;
}

function peLines(text) {
  return String(text || '')
    .split(/\r?\n/)
    .map(function (line) {
      return line.trim();
    })
    .filter(function (line) {
      return line.length > 0;
    });
}
