/* 由 build.mjs 生成，请修改 src/*.js 后重新构建。 */
window.__ModuleLoader__.load({
  id: "@local/pe-lesson-plan",
  factory(require) {
    const React = require('react');

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

    /* 随堂测试：按教案内容随机出一套 10 道体育选择题（同一 seed 结果稳定）。 */

    var PE_QUIZ_SIZE = 10;

    var PE_QUIZ_BANK = [
      {
        id: 'gather',
        q: '上体育课集合时，下列要求正确的是（　）。',
        correct: '快、静、齐',
        wrong: ['慢、乱、散', '边跑边说话', '随意站位'],
        explain: '体育课集合要做到快、静、齐，便于教师清点人数和安排练习。',
      },
      {
        id: 'warmup',
        q: '运动前进行准备活动的主要作用是（　）。',
        correct: '活动关节，预防运动损伤',
        wrong: ['消耗体力', '让人感到疲劳', '代替正式练习'],
        explain: '准备活动能活动关节、提高体温，降低运动损伤的风险。',
      },
      {
        id: 'cooldown',
        q: '运动结束后，正确的做法是（　）。',
        correct: '做放松拉伸活动',
        wrong: ['立刻坐下不动', '马上大量喝冷饮', '立即进行剧烈比赛'],
        explain: '运动后做放松拉伸，有助于身体恢复，减少肌肉酸痛。',
      },
      {
        id: 'dizzy',
        q: '运动中感到头晕、恶心，应该（　）。',
        correct: '立即停止运动并报告老师',
        wrong: ['坚持完成练习', '自己悄悄离开', '继续加快速度'],
        explain: '身体不适时要立即停止运动并报告老师，避免发生危险。',
      },
      {
        id: 'partner',
        q: '同伴练习时，应该（　）。',
        correct: '互相提示、互相保护',
        wrong: ['互相推挤打闹', '嘲笑动作不熟练的同伴', '争抢器材'],
        explain: '同伴之间要互相提示、互相保护，共同完成练习。',
      },
      {
        id: 'aerobic',
        q: '下列属于有氧运动的是（　）。',
        correct: '慢跑',
        wrong: ['举重', '短跑冲刺', '跳远'],
        explain: '慢跑强度适中、持续时间较长，属于有氧运动。',
      },
      {
        id: 'shoes',
        q: '上体育课最合适的穿着是（　）。',
        correct: '运动服和运动鞋',
        wrong: ['皮鞋和牛仔裤', '拖鞋和裙子', '凉鞋和紧身裤'],
        explain: '运动服和运动鞋便于活动，能减少运动损伤。',
      },
      {
        id: 'water',
        q: '运动后大量出汗，补水应该（　）。',
        correct: '少量多次喝温水',
        wrong: ['一次喝一大瓶冰水', '忍着不喝水', '只喝含糖饮料'],
        explain: '运动后应少量多次补水，避免一次大量饮水加重身体负担。',
      },
      {
        id: 'landing',
        q: '立定跳远落地时，正确的动作是（　）。',
        correct: '屈膝缓冲，站稳',
        wrong: ['直腿落地', '单脚落地', '落地后立即转身'],
        explain: '落地时屈膝缓冲，可以减轻冲击，避免摔倒。',
      },
      {
        id: 'arms',
        q: '立定跳远起跳时，手臂应该（　）。',
        correct: '向前上方摆动',
        wrong: ['向后下方摆动', '保持不动', '抱住头'],
        explain: '起跳时手臂向前上方摆动，可以带动身体向前跳出。',
      },
      {
        id: 'rhythm',
        q: '立定跳远的动作口诀是（　）。',
        correct: '一蹬二摆三起跳，屈膝落地要站稳',
        wrong: ['一跑二跳三落地，直腿站稳最重要', '先摆臂后蹬地，落地单脚站', '起跳低头看地面，落地不用缓冲'],
        explain: '口诀“一蹬二摆三起跳，屈膝落地要站稳”概括了完整动作。',
      },
      {
        id: 'signal',
        q: '练习跳跃动作时，应该（　）。',
        correct: '听信号起跳，不抢跳',
        wrong: ['看谁先跳出去', '从侧面插队', '边跳边推同伴'],
        explain: '听信号练习、不抢跳，能保持秩序和安全距离。',
      },
      {
        id: 'morality',
        q: '体育课上，下列行为正确的是（　）。',
        correct: '遵守规则，尊重同伴',
        wrong: ['赢了就嘲笑对方', '输了就发脾气', '随意更改比赛规则'],
        explain: '遵守规则、尊重同伴是体育品德的重要表现。',
      },
      {
        id: 'injury',
        q: '运动中不小心摔倒受伤，应该（　）。',
        correct: '停止运动，报告老师',
        wrong: ['忍着疼继续练', '自己揉一揉就没事', '隐瞒不说'],
        explain: '受伤后要停止运动并报告老师，及时处理，避免加重伤情。',
      },
      {
        id: 'line',
        q: '队列练习中“向右看齐”的作用是（　）。',
        correct: '让队伍排列整齐',
        wrong: ['让队伍向前走', '让大家坐下休息', '让队伍散开'],
        explain: '向右看齐是为了调整队形，使队伍整齐。',
      },
      {
        id: 'jumpSport',
        q: '下列属于跳跃类运动的是（　）。',
        correct: '立定跳远',
        wrong: ['篮球运球', '足球传球', '投掷沙包'],
        explain: '立定跳远以跳跃动作为主，属于跳跃类运动。',
      },
      {
        id: 'coldDrink',
        q: '运动后立刻大量喝冷饮，下列说法正确的是（　）。',
        correct: '不利于身体健康',
        wrong: ['能快速恢复体力', '对身体没有影响', '是最好的补水方式'],
        explain: '运动后立刻大量喝冷饮会刺激肠胃，不利于健康。',
      },
      {
        id: 'equipmentBack',
        q: '体育课结束后，器材应该（　）。',
        correct: '归还原位，摆放整齐',
        wrong: ['随手丢在操场上', '带回家', '藏在草丛里'],
        explain: '课后要清点并归还器材，养成爱护器材的好习惯。',
      },
    ];

    function peQuizRng(seed) {
      var state = (Number(seed) || 1) >>> 0;
      return function () {
        state = (state + 0x6d2b79f5) >>> 0;
        var t = state;
        t = Math.imul(t ^ (t >>> 15), t | 1);
        t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
      };
    }

    function peQuizShuffle(list, rng) {
      for (var i = list.length - 1; i > 0; i -= 1) {
        var j = Math.floor(rng() * (i + 1));
        var tmp = list[i];
        list[i] = list[j];
        list[j] = tmp;
      }
      return list;
    }

    function peQuizPick(list, count, rng) {
      var copy = list.slice();
      peQuizShuffle(copy, rng);
      return copy.slice(0, count);
    }

    /* 跟本课直接相关的题目：课题、器材、热身、安全。 */
    function peQuizLessonQuestions(plan, rng) {
      var topic = peStr(plan.topic) || '本节课内容';
      var topics = ['篮球运球', '跳绳', '广播体操', '足球传球', '投掷沙包', '前滚翻', '仰卧起坐'];
      var wrongTopics = peQuizPick(
        topics.filter(function (item) {
          return item !== topic;
        }),
        3,
        rng
      );
      var questions = [
        {
          id: 'topic',
          q: '本节课学习的课题是（　）。',
          correct: topic,
          wrong: wrongTopics,
          explain: '本节课的课题是“' + topic + '”。',
        },
        {
          id: 'topicWarmup',
          q: '进行“' + topic + '”练习前，最重要的是（　）。',
          correct: '充分热身，活动各关节',
          wrong: ['直接进行比赛', '先测试成绩', '坐着休息'],
          explain: '练习前充分热身，可以活动关节、预防运动损伤。',
        },
        {
          id: 'topicSafe',
          q: '练习“' + topic + '”时，下列做法正确的是（　）。',
          correct: '听信号练习，保持安全距离',
          wrong: ['抢跳、插队', '推挤同伴', '擅自离开场地'],
          explain: '练习时要听信号、保持安全距离，避免碰撞和受伤。',
        },
      ];
      var equipment = peStr(plan.equipment).replace(/[。；;]+$/, '');
      if (equipment) {
        questions.push({
          id: 'lessonEquipment',
          q: '本节课需要准备的器材是（　）。',
          correct: equipment,
          wrong: ['篮球、球门', '跳绳、秒表', '羽毛球拍、羽毛球'],
          explain: '本节课用到的器材是：' + equipment,
        });
      }
      return questions;
    }

    function peBuildQuiz(plan, seed) {
      var rng = peQuizRng(seed);
      var lesson = peQuizLessonQuestions(plan, rng);
      var picked = lesson.slice();
      var general = peQuizPick(PE_QUIZ_BANK, PE_QUIZ_SIZE, rng);
      for (var i = 0; i < general.length && picked.length < PE_QUIZ_SIZE; i += 1) {
        picked.push(general[i]);
      }
      var questions = picked.map(function (item) {
        var options = [item.correct].concat(item.wrong);
        peQuizShuffle(options, rng);
        return {
          q: item.q,
          options: options,
          answer: options.indexOf(item.correct),
          explain: item.explain,
        };
      });
      peQuizShuffle(questions, rng);
      return { questions: questions };
    }

    /* 教案 DOCX 生成器：不依赖任何库，直接输出 OOXML 打包为 .docx（STORE 方式 ZIP）。 */

    var PE_FONT_SONG = '宋体';
    var PE_FONT_HEI = '黑体';
    var PE_FONT_KAI = '楷体';
    var PE_PAGE_W = 11906;
    var PE_PAGE_H = 16838;
    var PE_MARGIN_X = 1247;
    var PE_MARGIN_Y = 1134;
    var PE_CONTENT_W = PE_PAGE_W - PE_MARGIN_X * 2;
    var PE_CN_NUM = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二', '十三', '十四', '十五'];
    var PE_PPT_LINK_ID = 'rIdPpt';

    function peXmlText(value) {
      return String(value == null ? '' : value)
        .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
    }

    function peRun(text, opts) {
      var o = opts || {};
      var font = o.font || PE_FONT_SONG;
      var rPr = '<w:rFonts w:ascii="Times New Roman" w:hAnsi="Times New Roman" w:eastAsia="' + font + '"/>';
      if (o.bold) rPr += '<w:b/><w:bCs/>';
      if (o.color) rPr += '<w:color w:val="' + o.color + '"/>';
      var size = o.size || 21;
      rPr += '<w:sz w:val="' + size + '"/><w:szCs w:val="' + size + '"/>';
      var parts = String(text == null ? '' : text).split('\n');
      var body = '';
      for (var i = 0; i < parts.length; i += 1) {
        if (i > 0) body += '<w:br/>';
        body += '<w:t xml:space="preserve">' + peXmlText(parts[i]) + '</w:t>';
      }
      return '<w:r><w:rPr>' + rPr + '</w:rPr>' + body + '</w:r>';
    }

    /* 指向同一文件夹里 PPT 文件的外部链接（相对路径）。 */
    function peHyperlinkRun(text) {
      return (
        '<w:hyperlink r:id="' + PE_PPT_LINK_ID + '" w:history="1"><w:r><w:rPr>' +
        '<w:rFonts w:ascii="Times New Roman" w:hAnsi="Times New Roman" w:eastAsia="宋体"/>' +
        '<w:color w:val="0563C1"/><w:u w:val="single"/><w:sz w:val="21"/><w:szCs w:val="21"/>' +
        '</w:rPr><w:t xml:space="preserve">' + peXmlText(text) + '</w:t></w:r></w:hyperlink>'
      );
    }

    function pePara(runs, opts) {
      var o = opts || {};
      var pPr = '';
      if (o.pageBreakBefore) pPr += '<w:pageBreakBefore/>';
      if (o.keepNext) pPr += '<w:keepNext/><w:keepLines/>';
      if (o.borderBottom) {
        pPr +=
          '<w:pBdr><w:bottom w:val="single" w:sz="6" w:space="3" w:color="BFBFBF"/></w:pBdr>';
      }
      if (o.fill) pPr += '<w:shd w:val="clear" w:color="auto" w:fill="' + o.fill + '"/>';
      var spacing = '<w:spacing w:before="' + (o.before || 0) + '" w:after="' + (o.after || 0) + '"';
      spacing += ' w:line="' + (o.line || 360) + '" w:lineRule="auto"/>';
      pPr += spacing;
      if (o.firstLine) pPr += '<w:ind w:firstLineChars="' + o.firstLine * 100 + '" w:firstLine="' + o.firstLine * 210 + '"/>';
      else if (o.indentLeft) pPr += '<w:ind w:left="' + o.indentLeft + '"/>';
      if (o.align) pPr += '<w:jc w:val="' + o.align + '"/>';
      var list = Array.isArray(runs) ? runs : [runs];
      return '<w:p><w:pPr>' + pPr + '</w:pPr>' + list.join('') + '</w:p>';
    }

    function peTextPara(text, opts) {
      var o = opts || {};
      return pePara(peRun(text, o), o);
    }

    function peSectionHeading(title, opts) {
      var o = opts || {};
      return pePara(peRun(title, { bold: true, font: PE_FONT_HEI, size: 24 }), {
        before: o.before == null ? 260 : o.before,
        after: 130,
        line: 300,
        keepNext: true,
        borderBottom: true,
        pageBreakBefore: !!o.pageBreakBefore,
      });
    }

    function peTableCell(opts) {
      var o = opts || {};
      var tcPr = '<w:tcW w:w="' + o.width + '" w:type="dxa"/>';
      if (o.span && o.span > 1) tcPr += '<w:gridSpan w:val="' + o.span + '"/>';
      if (o.fill) tcPr += '<w:shd w:val="clear" w:color="auto" w:fill="' + o.fill + '"/>';
      tcPr += '<w:vAlign w:val="' + (o.valign || 'top') + '"/>';
      var paragraphs = [];
      var lines = String(o.text == null ? '' : o.text).split('\n');
      var size = o.size || 18;
      for (var i = 0; i < lines.length; i += 1) {
        paragraphs.push(
          pePara(peRun(lines[i], { bold: o.bold, font: o.font || PE_FONT_SONG, size: size }), {
            line: o.line || 264,
            after: i === lines.length - 1 ? 0 : 40,
            align: o.align,
          })
        );
      }
      if (!paragraphs.length) {
        paragraphs.push(pePara(peRun('', { size: size }), { line: o.line || 264 }));
      }
      return '<w:tc><w:tcPr>' + tcPr + '</w:tcPr>' + paragraphs.join('') + '</w:tc>';
    }

    function peTable(spec) {
      var widths = spec.widths;
      var tblW = widths.reduce(function (a, b) {
        return a + b;
      }, 0);
      var borderColor = spec.borderColor || '404040';
      var borders =
        '<w:tblBorders>' +
        ['top', 'left', 'bottom', 'right', 'insideH', 'insideV']
          .map(function (side) {
            return '<w:' + side + ' w:val="single" w:sz="6" w:space="0" w:color="' + borderColor + '"/>';
          })
          .join('') +
        '</w:tblBorders>';
      var grid = widths
        .map(function (w) {
          return '<w:gridCol w:w="' + w + '"/>';
        })
        .join('');
      var rows = spec.rows
        .map(function (row) {
          var column = 0;
          var cells = row.cells
            .map(function (cell, index) {
              var opts = {};
              for (var key in cell) opts[key] = cell[key];
              var span = cell.span && cell.span > 1 ? cell.span : 1;
              opts.span = span;
              var width = 0;
              for (var col = column; col < column + span; col += 1) width += widths[col] || 0;
              opts.width = width || 1000;
              column += span;
              if (row.header) {
                opts.bold = cell.bold !== undefined ? cell.bold : true;
                opts.font = cell.font || PE_FONT_HEI;
                opts.align = cell.align || 'center';
                opts.valign = cell.valign || 'center';
                opts.fill = cell.fill || 'EDEDED';
                opts.size = cell.size || 19;
              } else {
                opts.valign = cell.valign || (index === 0 ? 'center' : 'top');
                opts.align = cell.align || (index <= 1 ? 'center' : 'left');
                opts.size = cell.size || 18;
              }
              return peTableCell(opts);
            })
            .join('');
          var trPr = '';
          if (row.header) trPr += '<w:tblHeader/>';
          if (row.height) trPr += '<w:trHeight w:val="' + row.height + '" w:hRule="atLeast"/>';
          return '<w:tr>' + (trPr ? '<w:trPr>' + trPr + '</w:trPr>' : '') + cells + '</w:tr>';
        })
        .join('');
      return (
        '<w:tbl><w:tblPr><w:tblW w:w="' + tblW + '" w:type="dxa"/><w:jc w:val="center"/>' + borders +
        '<w:tblLayout w:type="fixed"/><w:tblCellMar><w:top w:w="57" w:type="dxa"/><w:left w:w="113" w:type="dxa"/>' +
        '<w:bottom w:w="57" w:type="dxa"/><w:right w:w="113" w:type="dxa"/></w:tblCellMar>' +
        '<w:tblLook w:val="04A0" w:firstRow="1" w:lastRow="0" w:firstColumn="0" w:lastColumn="0" w:noHBand="0" w:noVBand="1"/>' +
        '</w:tblPr><w:tblGrid>' + grid + '</w:tblGrid>' + rows + '</w:tbl>'
      );
    }

    function peGap(after) {
      return pePara(peRun('', { size: 8 }), { line: 120, after: after || 0 });
    }

    function peBuildDocument(plan) {
      var out = [];
      var sectionIndex = 0;
      var total = pePhaseTotal(plan);

      out.push(
        pePara(peRun('体育与健康课教案', { bold: true, font: PE_FONT_HEI, size: 44 }), {
          align: 'center',
          after: 90,
          line: 300,
        })
      );
      var subtitleParts = [plan.grade, plan.topic, plan.lessonType];
      if (plan.duration) subtitleParts.push(plan.duration + '分钟');
      out.push(
        pePara(peRun(subtitleParts.join(' · '), { font: PE_FONT_KAI, size: 24, color: '404040' }), {
          align: 'center',
          after: 200,
          line: 300,
        })
      );

      out.push(
        peTable({
          widths: [1474, 3232, 1474, 3232],
          rows: [
            {
              cells: [
                { text: '学科', bold: true, font: PE_FONT_HEI, size: 21, fill: 'F2F2F2', valign: 'center' },
                { text: plan.subject, size: 21, valign: 'center' },
                { text: '年级', bold: true, font: PE_FONT_HEI, size: 21, fill: 'F2F2F2', valign: 'center' },
                { text: plan.grade, size: 21, valign: 'center' },
              ],
            },
            {
              cells: [
                { text: '课题', bold: true, font: PE_FONT_HEI, size: 21, fill: 'F2F2F2', valign: 'center' },
                { text: plan.topic, size: 21, valign: 'center' },
                { text: '课时', bold: true, font: PE_FONT_HEI, size: 21, fill: 'F2F2F2', valign: 'center' },
                { text: plan.duration ? '一课时（' + plan.duration + '分钟）' : '一课时', size: 21, valign: 'center' },
              ],
            },
            {
              cells: [
                { text: '课型', bold: true, font: PE_FONT_HEI, size: 21, fill: 'F2F2F2', valign: 'center' },
                { text: plan.lessonType, size: 21, valign: 'center' },
                { text: '教材', bold: true, font: PE_FONT_HEI, size: 21, fill: 'F2F2F2', valign: 'center' },
                { text: plan.textbook, size: 21, valign: 'center' },
              ],
            },
            {
              cells: [
                { text: '授课教师', bold: true, font: PE_FONT_HEI, size: 21, fill: 'F2F2F2', valign: 'center' },
                { text: plan.teacher, size: 21, valign: 'center' },
                { text: '班级人数', bold: true, font: PE_FONT_HEI, size: 21, fill: 'F2F2F2', valign: 'center' },
                { text: plan.classSize, size: 21, valign: 'center' },
              ],
            },
            {
              cells: [
                { text: '教学风格', bold: true, font: PE_FONT_HEI, size: 21, fill: 'F2F2F2', valign: 'center' },
                { text: peStylePreset(plan.style).label, size: 21, valign: 'center', span: 3 },
              ],
            },
          ],
        })
      );

      function heading(title, opts) {
        sectionIndex += 1;
        out.push(peSectionHeading(PE_CN_NUM[sectionIndex - 1] + '、' + title, opts));
      }

      if (plan.analysis) {
        heading('教材分析');
        out.push(peTextPara(plan.analysis, { firstLine: 2, align: 'both' }));
      }

      if (plan.studentAnalysis) {
        heading('学情分析');
        out.push(peTextPara(plan.studentAnalysis, { firstLine: 2, align: 'both' }));
      }

      if (plan.style) {
        heading('教学风格');
        out.push(
          pePara(
            [
              peRun(peStylePreset(plan.style).label + '：', { bold: true, font: PE_FONT_HEI, size: 21 }),
              peRun(plan.styleNote, { size: 21 }),
            ],
            { firstLine: 2, align: 'both', line: 340, after: 30 }
          )
        );
      }

      if (plan.objectives.some(function (o) { return o.text; })) {
        heading('教学目标');
        var n = 0;
        plan.objectives.forEach(function (o) {
          if (!o.text) return;
          n += 1;
          out.push(
            pePara(
              [
                peRun(n + '. ', { bold: true, font: PE_FONT_HEI, size: 21 }),
                peRun(o.label + '：', { bold: true, font: PE_FONT_HEI, size: 21 }),
                peRun(o.text, { size: 21 }),
              ],
              { firstLine: 2, align: 'both', line: 340, after: 30 }
            )
          );
        });
      }

      if (plan.keyPoint || plan.hardPoint) {
        heading('教学重难点');
        if (plan.keyPoint) {
          out.push(
            pePara([peRun('重点：', { bold: true, font: PE_FONT_HEI, size: 21 }), peRun(plan.keyPoint, { size: 21 })], {
              firstLine: 2,
              align: 'both',
              line: 340,
              after: 30,
            })
          );
        }
        if (plan.hardPoint) {
          out.push(
            pePara([peRun('难点：', { bold: true, font: PE_FONT_HEI, size: 21 }), peRun(plan.hardPoint, { size: 21 })], {
              firstLine: 2,
              align: 'both',
              line: 340,
              after: 30,
            })
          );
        }
        var strategies = peLines(plan.strategies);
        if (strategies.length) {
          out.push(
            pePara(peRun('突破策略：', { bold: true, font: PE_FONT_HEI, size: 21 }), {
              firstLine: 2,
              line: 340,
              after: 20,
            })
          );
          strategies.forEach(function (line, index) {
            out.push(peTextPara(peNumbered(line, index), { firstLine: 2, align: 'both', line: 340, after: 20 }));
          });
        }
      }

      var prep = [];
      if (plan.equipment) prep.push('器材：' + plan.equipment);
      if (plan.venue) prep.push('场地：' + plan.venue);
      if (plan.safety) prep.push('安全：' + plan.safety);
      if (prep.length) {
        heading('教学准备');
        prep.forEach(function (line, index) {
          var colon = line.indexOf('：');
          out.push(
            pePara(
              [
                peRun(index + 1 + '. ', { size: 21 }),
                peRun(line.slice(0, colon + 1), { bold: true, font: PE_FONT_HEI, size: 21 }),
                peRun(line.slice(colon + 1), { size: 21 }),
              ],
              { firstLine: 2, align: 'both', line: 340, after: 30 }
            )
          );
        });
      }

      if (plan.phases.length) {
        heading('教学过程' + (plan.duration ? '（' + plan.duration + '分钟）' : ''));
        out.push(
          peTable({
            widths: [1247, 850, 3459, 1928, 1928],
            rows: [{ header: true, cells: [{ text: '教学环节' }, { text: '时间' }, { text: '教学内容与教师活动' }, { text: '学生活动' }, { text: '组织与要求' }] }].concat(
              plan.phases.map(function (phase) {
                return {
                  cells: [
                    { text: phase.name, bold: true, size: 18 },
                    { text: phase.minutes ? phase.minutes + '分钟' : '', size: 18 },
                    { text: phase.content, size: 18 },
                    { text: phase.student, size: 18 },
                    { text: phase.organization, size: 18 },
                  ],
                };
              })
            ),
          })
        );
        out.push(peGap(0));
        if (total) {
          out.push(
            pePara(peRun('合计：' + total + '分钟', { size: 18, color: '595959' }), {
              align: 'right',
              line: 240,
              after: 0,
            })
          );
        }
      }

      var design = peLines(plan.design);
      if (design.length) {
        heading('设计意图');
        design.forEach(function (line, index) {
          out.push(peTextPara(peNumbered(line, index), { firstLine: 2, align: 'both', line: 340, after: 20 }));
        });
      }

      if (plan.load) {
        heading('运动负荷');
        peLines(plan.load).forEach(function (line) {
          out.push(peTextPara(line, { firstLine: 2, align: 'both', line: 340, after: 20 }));
        });
      }

      if (plan.reflection) {
        heading('教学反思');
        peLines(plan.reflection).forEach(function (line) {
          out.push(peTextPara(line, { firstLine: 2, align: 'both', line: 340, after: 20 }));
        });
      }

      var attachments = peAttachmentLabels(plan);
      if (attachments.length) {
        out.push(peSectionHeading('附件'));
        var pptSelected = plan.attachments.indexOf('ppt') >= 0;
        var quizSelected = plan.attachments.indexOf('quiz') >= 0;
        var pptName = pePptFileName(plan);
        var quiz = quizSelected ? peBuildQuiz(plan, plan.quizSeed) : null;
        attachments.forEach(function (label, index) {
          if (pptSelected && label === 'PPT 课件') {
            out.push(
              pePara(
                [
                  peRun(index + 1 + '. ', { size: 21 }),
                  peRun('PPT 课件：', { bold: true, font: PE_FONT_HEI, size: 21 }),
                  peHyperlinkRun(pptName),
                ],
                { line: 320, after: 20 }
              )
            );
            out.push(
              peTextPara('（PPT 与教案保存在同一文件夹时，点击文件名即可打开。）', {
                size: 17,
                color: '808080',
                line: 300,
                after: 40,
              })
            );
          } else if (quizSelected && label === '随堂测试') {
            out.push(
              peTextPara(index + 1 + '. 随堂测试：' + quiz.questions.length + ' 道选择题（题目与答案见教案末尾）', {
                line: 320,
                after: 20,
              })
            );
          } else {
            out.push(peTextPara(index + 1 + '. ' + label, { line: 320, after: 20 }));
          }
        });
      }

      if (plan.attachments.indexOf('quiz') >= 0) {
        var paper = peBuildQuiz(plan, plan.quizSeed);
        out.push(peSectionHeading('随堂测试', { pageBreakBefore: true }));
        out.push(
          peTextPara(plan.grade + ' · ' + plan.topic + ' · 体育随堂测试', {
            font: PE_FONT_KAI,
            size: 21,
            color: '404040',
            after: 60,
          })
        );
        out.push(
          peTextPara('班级：________　姓名：________　得分：________', {
            size: 18,
            color: '404040',
            after: 120,
          })
        );
        out.push(
          peTextPara('一、选择题（共 ' + paper.questions.length + ' 题，每题只有一个正确答案）', {
            bold: true,
            font: PE_FONT_HEI,
            size: 21,
            after: 80,
          })
        );
        paper.questions.forEach(function (item, index) {
          out.push(
            pePara([peRun(index + 1 + '. ', { bold: true }), peRun(item.q)], {
              firstLine: 2,
              align: 'both',
              line: 320,
              after: 30,
              keepNext: true,
            })
          );
          for (var oi = 0; oi < item.options.length; oi += 1) {
            out.push(
              peTextPara('ABCD'[oi] + '. ' + item.options[oi], {
                indentLeft: 420,
                line: 300,
                after: 0,
                keepNext: oi < item.options.length - 1,
              })
            );
          }
          out.push(peGap(0));
        });
        out.push(peSectionHeading('参考答案', { pageBreakBefore: true }));
        out.push(
          peTextPara(
            paper.questions
              .map(function (item, index) {
                return index + 1 + '.' + 'ABCD'[item.answer];
              })
              .join('　'),
            { line: 340, after: 120 }
          )
        );
        paper.questions.forEach(function (item, index) {
          out.push(peTextPara(index + 1 + '. ' + item.explain, { line: 300, after: 20, align: 'both' }));
        });
      }

      return (
        '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n' +
        '<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main" ' +
        'xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">' +
        '<w:body>' +
        out.join('') +
        '<w:sectPr><w:pgSz w:w="' + PE_PAGE_W + '" w:h="' + PE_PAGE_H + '"/>' +
        '<w:pgMar w:top="' + PE_MARGIN_Y + '" w:right="' + PE_MARGIN_X + '" w:bottom="' + PE_MARGIN_Y +
        '" w:left="' + PE_MARGIN_X + '" w:header="851" w:footer="992" w:gutter="0"/>' +
        '<w:cols w:space="425"/><w:docGrid w:type="lines" w:linePitch="312"/></w:sectPr>' +
        '</w:body></w:document>'
      );
    }

    function peBuildStyles() {
      return (
        '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n' +
        '<w:styles xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">' +
        '<w:docDefaults><w:rPrDefault><w:rPr>' +
        '<w:rFonts w:ascii="Times New Roman" w:hAnsi="Times New Roman" w:eastAsia="宋体" w:cs="Times New Roman"/>' +
        '<w:sz w:val="21"/><w:szCs w:val="21"/><w:lang w:val="en-US" w:eastAsia="zh-CN" w:bidi="ar-SA"/>' +
        '</w:rPr></w:rPrDefault><w:pPrDefault><w:pPr><w:spacing w:line="360" w:lineRule="auto"/></w:pPr></w:pPrDefault></w:docDefaults>' +
        '<w:style w:type="paragraph" w:default="1" w:styleId="Normal"><w:name w:val="Normal"/><w:qFormat/>' +
        '<w:pPr><w:spacing w:line="360" w:lineRule="auto"/></w:pPr>' +
        '<w:rPr><w:rFonts w:ascii="Times New Roman" w:hAnsi="Times New Roman" w:eastAsia="宋体"/><w:sz w:val="21"/></w:rPr></w:style>' +
        '</w:styles>'
      );
    }

    function peBuildSettings() {
      return (
        '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n' +
        '<w:settings xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">' +
        '<w:zoom w:percent="100"/><w:defaultTabStop w:val="420"/><w:characterSpacingControl w:val="compressPunctuation"/>' +
        '<w:compat><w:compatSetting w:name="compatibilityMode" w:uri="http://schemas.microsoft.com/office/word" w:val="15"/></w:compat>' +
        '</w:settings>'
      );
    }

    function peBuildContentTypes() {
      return (
        '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n' +
        '<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">' +
        '<Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>' +
        '<Default Extension="xml" ContentType="application/xml"/>' +
        '<Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>' +
        '<Override PartName="/word/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml"/>' +
        '<Override PartName="/word/settings.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.settings+xml"/>' +
        '<Override PartName="/docProps/core.xml" ContentType="application/vnd.openxmlformats-package.core-properties+xml"/>' +
        '<Override PartName="/docProps/app.xml" ContentType="application/vnd.openxmlformats-officedocument.extended-properties+xml"/>' +
        '</Types>'
      );
    }

    function peBuildRels() {
      return (
        '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n' +
        '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">' +
        '<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/>' +
        '<Relationship Id="rId2" Type="http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties" Target="docProps/core.xml"/>' +
        '<Relationship Id="rId3" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/extended-properties" Target="docProps/app.xml"/>' +
        '</Relationships>'
      );
    }

    function peBuildDocumentRels(plan) {
      var rels =
        '<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/>' +
        '<Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/settings" Target="settings.xml"/>';
      if (plan.attachments.indexOf('ppt') >= 0) {
        rels +=
          '<Relationship Id="' + PE_PPT_LINK_ID + '" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/hyperlink" Target="' +
          peXmlText(pePptFileName(plan)) + '" TargetMode="External"/>';
      }
      return (
        '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n' +
        '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">' + rels + '</Relationships>'
      );
    }

    function peBuildCore(title) {
      var now = new Date().toISOString().replace(/\.\d{3}Z$/, 'Z');
      return (
        '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n' +
        '<cp:coreProperties xmlns:cp="http://schemas.openxmlformats.org/package/2006/metadata/core-properties" ' +
        'xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:dcterms="http://purl.org/dc/terms/" ' +
        'xmlns:dcmitype="http://purl.org/dc/dcmitype/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">' +
        '<dc:title>' + peXmlText(title) + '</dc:title><dc:creator>体育教案</dc:creator>' +
        '<cp:lastModifiedBy>体育教案</cp:lastModifiedBy>' +
        '<dcterms:created xsi:type="dcterms:W3CDTF">' + now + '</dcterms:created>' +
        '<dcterms:modified xsi:type="dcterms:W3CDTF">' + now + '</dcterms:modified>' +
        '</cp:coreProperties>'
      );
    }

    function peBuildApp() {
      return (
        '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n' +
        '<Properties xmlns="http://schemas.openxmlformats.org/officeDocument/2006/extended-properties" ' +
        'xmlns:vt="http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes">' +
        '<Application>体育教案</Application><DocSecurity>0</DocSecurity><ScaleCrop>false</ScaleCrop>' +
        '</Properties>'
      );
    }

    /* ---- 极简 ZIP 写入（STORE，无压缩），Word 可直接打开 ---- */

    var PE_CRC_TABLE = null;

    function peCrcTable() {
      if (PE_CRC_TABLE) return PE_CRC_TABLE;
      var table = new Uint32Array(256);
      for (var n = 0; n < 256; n += 1) {
        var c = n;
        for (var k = 0; k < 8; k += 1) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
        table[n] = c >>> 0;
      }
      PE_CRC_TABLE = table;
      return table;
    }

    function peCrc32(bytes) {
      var table = peCrcTable();
      var crc = 0xffffffff;
      for (var i = 0; i < bytes.length; i += 1) crc = table[(crc ^ bytes[i]) & 0xff] ^ (crc >>> 8);
      return (crc ^ 0xffffffff) >>> 0;
    }

    function peUtf8(text) {
      if (typeof TextEncoder !== 'undefined') return new TextEncoder().encode(text);
      var out = [];
      for (var i = 0; i < text.length; i += 1) {
        var code = text.charCodeAt(i);
        if (code < 0x80) out.push(code);
        else if (code < 0x800) out.push(0xc0 | (code >> 6), 0x80 | (code & 0x3f));
        else out.push(0xe0 | (code >> 12), 0x80 | ((code >> 6) & 0x3f), 0x80 | (code & 0x3f));
      }
      return new Uint8Array(out);
    }

    function peZip(files) {
      var now = new Date();
      var dosTime = ((now.getHours() & 31) << 11) | ((now.getMinutes() & 63) << 5) | ((Math.floor(now.getSeconds() / 2)) & 31);
      var dosDate = (((now.getFullYear() - 1980) & 127) << 9) | (((now.getMonth() + 1) & 15) << 5) | (now.getDate() & 31);

      var locals = [];
      var centrals = [];
      var offset = 0;

      files.forEach(function (file) {
        var name = peUtf8(file.name);
        var data = file.data;
        var crc = peCrc32(data);
        var local = new Uint8Array(30 + name.length);
        var lv = new DataView(local.buffer);
        lv.setUint32(0, 0x04034b50, true);
        lv.setUint16(4, 20, true);
        lv.setUint16(6, 0x0800, true);
        lv.setUint16(8, 0, true);
        lv.setUint16(10, dosTime, true);
        lv.setUint16(12, dosDate, true);
        lv.setUint32(14, crc, true);
        lv.setUint32(18, data.length, true);
        lv.setUint32(22, data.length, true);
        lv.setUint16(26, name.length, true);
        lv.setUint16(28, 0, true);
        local.set(name, 30);
        locals.push(local, data);

        var central = new Uint8Array(46 + name.length);
        var cv = new DataView(central.buffer);
        cv.setUint32(0, 0x02014b50, true);
        cv.setUint16(4, 20, true);
        cv.setUint16(6, 20, true);
        cv.setUint16(8, 0x0800, true);
        cv.setUint16(10, 0, true);
        cv.setUint16(12, dosTime, true);
        cv.setUint16(14, dosDate, true);
        cv.setUint32(16, crc, true);
        cv.setUint32(20, data.length, true);
        cv.setUint32(24, data.length, true);
        cv.setUint16(28, name.length, true);
        cv.setUint16(30, 0, true);
        cv.setUint16(32, 0, true);
        cv.setUint16(34, 0, true);
        cv.setUint16(36, 0, true);
        cv.setUint32(38, 0, true);
        cv.setUint32(42, offset, true);
        central.set(name, 46);
        centrals.push(central);

        offset += local.length + data.length;
      });

      var centralSize = centrals.reduce(function (sum, item) {
        return sum + item.length;
      }, 0);
      var end = new Uint8Array(22);
      var ev = new DataView(end.buffer);
      ev.setUint32(0, 0x06054b50, true);
      ev.setUint16(4, 0, true);
      ev.setUint16(6, 0, true);
      ev.setUint16(8, files.length, true);
      ev.setUint16(10, files.length, true);
      ev.setUint32(12, centralSize, true);
      ev.setUint32(16, offset, true);
      ev.setUint16(20, 0, true);

      var chunks = locals.concat(centrals, [end]);
      var size = chunks.reduce(function (sum, item) {
        return sum + item.length;
      }, 0);
      var result = new Uint8Array(size);
      var pos = 0;
      chunks.forEach(function (chunk) {
        result.set(chunk, pos);
        pos += chunk.length;
      });
      return result;
    }

    function peDocFileName(plan) {
      var date = new Date();
      var stamp = date.getFullYear() + String(date.getMonth() + 1).padStart(2, '0') + String(date.getDate()).padStart(2, '0');
      var parts = ['教案', plan.grade, plan.topic].filter(function (part) {
        return part;
      });
      var name = parts.join('_').replace(/[\\/:*?"<>|]/g, '');
      return name + '_' + stamp + '.docx';
    }

    function peBuildDocx(inputPlan) {
      var plan = peNormalizePlan(inputPlan);
      var files = [
        { name: '[Content_Types].xml', data: peUtf8(peBuildContentTypes()) },
        { name: '_rels/.rels', data: peUtf8(peBuildRels()) },
        { name: 'docProps/core.xml', data: peUtf8(peBuildCore(plan.grade + plan.topic + '教案')) },
        { name: 'docProps/app.xml', data: peUtf8(peBuildApp()) },
        { name: 'word/document.xml', data: peUtf8(peBuildDocument(plan)) },
        { name: 'word/styles.xml', data: peUtf8(peBuildStyles()) },
        { name: 'word/settings.xml', data: peUtf8(peBuildSettings()) },
        { name: 'word/_rels/document.xml.rels', data: peUtf8(peBuildDocumentRels(plan)) },
      ];
      return { bytes: peZip(files), fileName: peDocFileName(plan), plan: plan };
    }

    /* 课件生成器：按教案内容生成 16:9 的 PPTX（OOXML + STORE ZIP，无第三方依赖）。 */

    var PE_PPT_CX = 12192000;
    var PE_PPT_CY = 6858000;
    var PE_PPT_FONT = '微软雅黑';
    var PE_PPT_GREEN = '1F6F54';
    var PE_PPT_DARK = '143C2F';
    var PE_PPT_SOFT = 'F3F8F5';
    var PE_PPT_ACCENT = 'E8A33D';
    var PE_PPT_TEXT = '26332D';
    var PE_PPT_MUTED = '6B7B73';
    var PE_PPT_WHITE = 'FFFFFF';
    var PE_PPT_LINE = 'DCE8E2';
    var PE_PPT_ID = 1;

    var PE_PPT_NS = 'xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" ' +
      'xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" ' +
      'xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main"';

    var PE_PPT_GROUP = '<p:nvGrpSpPr><p:cNvPr id="1" name=""/><p:cNvGrpSpPr/><p:nvPr/></p:nvGrpSpPr>' +
      '<p:grpSpPr><a:xfrm><a:off x="0" y="0"/><a:ext cx="0" cy="0"/><a:chOff x="0" y="0"/><a:chExt cx="0" cy="0"/></a:xfrm></p:grpSpPr>';

    var PE_PPT_PRES_PROPS =
      '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n' +
      '<p:presentationPr ' + PE_PPT_NS + '/>';

    var PE_PPT_VIEW_PROPS =
      '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n' +
      '<p:viewPr ' + PE_PPT_NS + ' lastView="sldThumbnailView">' +
      '<p:normalViewPr><p:restoredLeft sz="15620"/><p:restoredTop sz="94660"/></p:normalViewPr>' +
      '<p:slideViewPr><p:cSldViewPr snapToGrid="0" snapToObjects="1"><p:cViewPr varScale="1">' +
      '<p:scale><a:sx n="100" d="100"/><a:sy n="100" d="100"/></p:scale><p:origin x="0" y="0"/>' +
      '</p:cViewPr></p:cSldViewPr></p:slideViewPr>' +
      '<p:notesTextViewPr><p:cViewPr><p:scale><a:sx n="100" d="100"/><a:sy n="100" d="100"/></p:scale>' +
      '<p:origin x="0" y="0"/></p:cViewPr></p:notesTextViewPr>' +
      '<p:gridSpacing cx="76200" cy="76200"/></p:viewPr>';

    var PE_PPT_TABLE_STYLES =
      '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n' +
      '<a:tblStyleLst xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" def="{5C22544A-7EE6-4342-B048-85BDC9FD1C3A}"/>';

    function pePptId() {
      PE_PPT_ID += 1;
      return PE_PPT_ID;
    }

    function pePptEmu(inches) {
      return Math.round(inches * 914400);
    }

    function pePptFit(text, levels) {
      var length = String(text || '').replace(/\s+/g, '').length;
      for (var i = 0; i < levels.length; i += 1) {
        if (length <= levels[i][0]) return levels[i][1];
      }
      return levels[levels.length - 1][1];
    }

    function pePptRun(text, opts) {
      var o = opts || {};
      var size = Math.round((o.size || 18) * 100);
      var attrs = 'lang="zh-CN" altLang="en-US" sz="' + size + '" b="' + (o.bold ? '1' : '0') + '" dirty="0"';
      if (o.italic) attrs += ' i="1"';
      var font = o.font || PE_PPT_FONT;
      return (
        '<a:r><a:rPr ' + attrs + '><a:solidFill><a:srgbClr val="' + (o.color || PE_PPT_TEXT) + '"/></a:solidFill>' +
        '<a:latin typeface="' + font + '"/><a:ea typeface="' + font + '"/><a:cs typeface="' + font + '"/>' +
        '</a:rPr><a:t>' + peXmlText(text) + '</a:t></a:r>'
      );
    }

    function pePptPara(runs, opts) {
      var o = opts || {};
      var pPr = '<a:pPr algn="' + (o.align || 'l') + '" marL="0" indent="0">';
      if (o.lineSpacing) pPr += '<a:lnSpc><a:spcPct val="' + o.lineSpacing + '"/></a:lnSpc>';
      pPr += '<a:spcBef><a:spcPts val="' + Math.round((o.before == null ? 4 : o.before) * 100) + '"/></a:spcBef>';
      pPr += '</a:pPr>';
      return '<a:p>' + pPr + runs.join('') + '</a:p>';
    }

    /* 一段带换行的文字拆成多个段落，段间留 4pt。 */
    function pePptLinesPara(text, opts) {
      var o = opts || {};
      var lines = peLines(text);
      if (!lines.length) lines = [''];
      var out = [];
      for (var i = 0; i < lines.length; i += 1) {
        var paraOpts = {};
        for (var key in o) paraOpts[key] = o[key];
        paraOpts.before = i === 0 ? 0 : o.before == null ? 4 : o.before;
        out.push(pePptPara([pePptRun(lines[i], o)], paraOpts));
      }
      return out.join('');
    }

    function pePptBox(x, y, w, h, paragraphs, opts) {
      var o = opts || {};
      var id = pePptId();
      return (
        '<p:sp><p:nvSpPr><p:cNvPr id="' + id + '" name="TextBox ' + id + '"/><p:cNvSpPr txBox="1"/><p:nvPr/></p:nvSpPr>' +
        '<p:spPr><a:xfrm><a:off x="' + pePptEmu(x) + '" y="' + pePptEmu(y) + '"/><a:ext cx="' + pePptEmu(w) + '" cy="' + pePptEmu(h) + '"/></a:xfrm>' +
        '<a:prstGeom prst="rect"><a:avLst/></a:prstGeom><a:noFill/><a:ln><a:noFill/></a:ln></p:spPr>' +
        '<p:txBody><a:bodyPr wrap="square" lIns="0" tIns="0" rIns="0" bIns="0" anchor="' + (o.anchor || 't') + '"/><a:lstStyle/>' +
        paragraphs + '</p:txBody></p:sp>'
      );
    }

    function pePptText(x, y, w, h, text, opts) {
      return pePptBox(x, y, w, h, pePptLinesPara(text, opts), opts);
    }

    function pePptShape(x, y, w, h, fill, opts) {
      var o = opts || {};
      var id = pePptId();
      var geom = o.ellipse ? 'ellipse' : o.round ? 'roundRect' : 'rect';
      var av = o.round ? '<a:avLst><a:gd name="adj" fmla="val 8000"/></a:avLst>' : '<a:avLst/>';
      var fillXml = fill
        ? '<a:solidFill><a:srgbClr val="' + fill + '">' + (o.alpha ? '<a:alpha val="' + o.alpha + '"/>' : '') + '</a:srgbClr></a:solidFill>'
        : '<a:noFill/>';
      var lineXml = o.line
        ? '<a:ln w="' + Math.round((o.lineWidth || 1) * 12700) + '"><a:solidFill><a:srgbClr val="' + o.line + '"/></a:solidFill></a:ln>'
        : '<a:ln><a:noFill/></a:ln>';
      return (
        '<p:sp><p:nvSpPr><p:cNvPr id="' + id + '" name="Shape ' + id + '"/><p:cNvSpPr/><p:nvPr/></p:nvSpPr>' +
        '<p:spPr><a:xfrm><a:off x="' + pePptEmu(x) + '" y="' + pePptEmu(y) + '"/><a:ext cx="' + pePptEmu(w) + '" cy="' + pePptEmu(h) + '"/></a:xfrm>' +
        '<a:prstGeom prst="' + geom + '">' + av + '</a:prstGeom>' + fillXml + lineXml + '</p:spPr></p:sp>'
      );
    }

    /* 内容页统一版式：顶部色条、标题、分隔线、页脚。 */
    function pePptChrome(plan, title, bodyShapes) {
      var shapes = [];
      shapes.push(pePptShape(0, 0, 13.333, 0.11, PE_PPT_GREEN));
      shapes.push(pePptShape(0.72, 0.5, 0.07, 0.62, PE_PPT_ACCENT));
      shapes.push(pePptText(0.95, 0.4, 11.6, 0.8, title, { size: 28, bold: true, color: PE_PPT_DARK, anchor: 'ctr', lineSpacing: 100000 }));
      shapes.push(pePptShape(0.75, 1.3, 11.83, 0.015, PE_PPT_LINE));
      shapes.push(pePptText(0.75, 6.98, 9.6, 0.3, plan.grade + ' · ' + plan.topic + ' · 体育与健康课教案', { size: 10, color: PE_PPT_MUTED }));
      return shapes.concat(bodyShapes);
    }

    function pePptCover(plan) {
      var shapes = [];
      var date = new Date();
      shapes.push(pePptShape(0, 0, 13.333, 7.5, PE_PPT_GREEN));
      shapes.push(pePptShape(9.4, -1.5, 6.2, 6.2, PE_PPT_WHITE, { ellipse: true, alpha: 9000 }));
      shapes.push(pePptShape(-1.7, 4.8, 4.8, 4.8, PE_PPT_WHITE, { ellipse: true, alpha: 7000 }));
      shapes.push(pePptText(0.92, 0.72, 8, 0.4, '体育与健康课 · 教学课件', { size: 13, color: 'CFE3D9' }));
      shapes.push(pePptText(0.9, 1.9, 11.5, 1.5, plan.topic, { size: 60, bold: true, color: PE_PPT_WHITE, lineSpacing: 100000 }));
      shapes.push(pePptShape(0.96, 3.58, 1.2, 0.07, PE_PPT_ACCENT));
      shapes.push(
        pePptText(0.96, 3.78, 10.6, 0.55, plan.grade + ' · ' + plan.lessonType + ' · ' + plan.duration + ' 分钟', {
          size: 23,
          color: 'E9F4EF',
        })
      );
      shapes.push(pePptText(0.96, 4.55, 8, 0.4, '教学风格：' + peStylePreset(plan.style).label, { size: 15, color: 'CFE3D9' }));
      var meta = [];
      if (plan.teacher) meta.push('授课教师：' + plan.teacher);
      if (plan.classSize) meta.push('班级人数：' + plan.classSize);
      shapes.push(
        pePptText(0.96, 5.15, 10.6, 0.4, meta.join('　') || '共 ' + plan.phases.length + ' 个教学环节', {
          size: 14,
          color: 'E9F4EF',
        })
      );
      shapes.push(
        pePptText(0.96, 6.55, 8, 0.3, '体育教案 · ' + date.getFullYear() + ' 年 ' + (date.getMonth() + 1) + ' 月', {
          size: 10.5,
          color: 'AFCFC2',
        })
      );
      return shapes;
    }

    function pePptAnalysis(plan) {
      var body = [];
      var hasLeft = !!plan.analysis;
      var hasRight = !!plan.studentAnalysis;
      var gap = 0.28;
      var panelW = hasLeft && hasRight ? (11.83 - gap) / 2 : 11.83;
      var y = 1.55;
      var h = 5.15;

      function panel(x, label, text, width) {
        body.push(pePptShape(x, y, width, h, PE_PPT_SOFT));
        body.push(pePptShape(x, y, 0.06, h, PE_PPT_ACCENT));
        body.push(pePptText(x + 0.28, y + 0.2, width - 0.5, 0.35, label, { size: 15, bold: true, color: PE_PPT_GREEN }));
        body.push(
          pePptText(x + 0.28, y + 0.68, width - 0.52, h - 0.85, text, {
            size: pePptFit(text, [[90, 19], [150, 17], [220, 15.5], [999, 14]]),
            color: PE_PPT_TEXT,
            lineSpacing: 125000,
          })
        );
      }

      if (hasLeft) panel(0.75, '教材分析', plan.analysis, panelW);
      if (hasRight) panel(0.75 + (hasLeft ? panelW + gap : 0), '学情分析', plan.studentAnalysis, panelW);
      return pePptChrome(plan, '教材与学情', body);
    }

    function pePptObjectives(plan) {
      var body = [];
      var objs = plan.objectives.filter(function (item) {
        return item.text;
      });
      var rowH = Math.min(1.5, (5.05 - (objs.length - 1) * 0.12) / Math.max(objs.length, 1));
      var y = 1.55;
      objs.forEach(function (item, index) {
        body.push(pePptShape(0.75, y, 11.83, rowH, PE_PPT_SOFT));
        body.push(pePptShape(0.98, y + 0.3, 0.6, 0.6, PE_PPT_GREEN, { ellipse: true }));
        body.push(
          pePptBox(
            0.98,
            y + 0.3,
            0.6,
            0.6,
            pePptPara([pePptRun(String(index + 1), { size: 16, bold: true, color: PE_PPT_WHITE })], {
              align: 'ctr',
              before: 0,
              lineSpacing: 100000,
            }),
            { anchor: 'ctr' }
          )
        );
        body.push(pePptText(1.8, y + 0.16, 10.4, 0.3, item.label, { size: 14, bold: true, color: PE_PPT_GREEN }));
        body.push(pePptText(1.8, y + 0.5, 10.5, rowH - 0.55, item.text, { size: 16, color: PE_PPT_TEXT }));
        y += rowH + 0.12;
      });
      return pePptChrome(plan, '教学目标', body);
    }

    function pePptKeyPoints(plan) {
      var body = [];
      var strategies = peLines(plan.strategies);
      var hasStrat = strategies.length > 0;
      var cardH = hasStrat ? 2.15 : 4.9;

      function card(x, label, text) {
        body.push(pePptShape(x, 1.55, 5.85, cardH, PE_PPT_SOFT));
        body.push(pePptShape(x, 1.55, 0.06, cardH, PE_PPT_GREEN));
        body.push(pePptText(x + 0.28, 1.75, 5.2, 0.35, label, { size: 15, bold: true, color: PE_PPT_GREEN }));
        body.push(
          pePptText(x + 0.28, 2.22, 5.3, cardH - 0.8, text, {
            size: pePptFit(text, [[70, 20], [120, 18], [999, 16]]),
            color: PE_PPT_TEXT,
            lineSpacing: 122000,
          })
        );
      }

      if (plan.keyPoint) card(0.75, '重点', plan.keyPoint);
      if (plan.hardPoint) card(6.72, '难点', plan.hardPoint);
      if (hasStrat) {
        body.push(pePptShape(0.75, 3.9, 11.83, 2.75, PE_PPT_WHITE, { line: PE_PPT_LINE }));
        body.push(pePptText(1.0, 4.05, 3, 0.3, '突破策略', { size: 14, bold: true, color: PE_PPT_GREEN }));
        var lines = strategies.map(function (line, index) {
          return peNumbered(line, index);
        });
        body.push(
          pePptText(1.0, 4.45, 11.3, 2.0, lines.join('\n'), {
            size: pePptFit(lines.join(''), [[80, 16], [140, 14], [999, 12.5]]),
            color: PE_PPT_TEXT,
          })
        );
      }
      return pePptChrome(plan, '教学重难点', body);
    }

    function pePptPreparation(plan) {
      var items = [];
      if (plan.equipment) items.push({ label: '器材', text: plan.equipment });
      if (plan.venue) items.push({ label: '场地', text: plan.venue });
      if (plan.safety) items.push({ label: '安全提示', text: plan.safety });
      var body = [];
      var y = 1.6;
      var rowH = Math.min(1.55, (4.95 - (items.length - 1) * 0.16) / Math.max(items.length, 1));
      items.forEach(function (item) {
        body.push(pePptShape(0.75, y, 11.83, rowH, PE_PPT_SOFT));
        body.push(pePptText(1.0, y + 0.2, 1.7, 0.35, item.label, { size: 15, bold: true, color: PE_PPT_GREEN }));
        body.push(
          pePptText(2.65, y + 0.18, 9.6, rowH - 0.32, item.text, {
            size: pePptFit(item.text, [[90, 18], [160, 16], [999, 14]]),
            color: PE_PPT_TEXT,
          })
        );
        y += rowH + 0.16;
      });
      return pePptChrome(plan, '教学准备', body);
    }

    function pePptStyle(plan) {
      var preset = peStylePreset(plan.style);
      var body = [];
      body.push(pePptText(0.85, 1.55, 5, 0.35, '教学风格', { size: 14, color: PE_PPT_MUTED }));
      body.push(pePptText(0.8, 2.0, 5.2, 1.2, preset.label, { size: 54, bold: true, color: PE_PPT_GREEN }));
      body.push(pePptText(0.9, 3.35, 5.1, 0.6, preset.hint, { size: 14, color: PE_PPT_MUTED }));
      body.push(pePptShape(6.35, 1.55, 6.23, 4.95, PE_PPT_SOFT));
      body.push(pePptShape(6.35, 1.55, 0.06, 4.95, PE_PPT_ACCENT));
      body.push(pePptText(6.62, 1.75, 5.6, 0.3, '风格落地', { size: 14, bold: true, color: PE_PPT_GREEN }));
      body.push(
        pePptText(6.62, 2.2, 5.65, 4.0, plan.styleNote, {
          size: pePptFit(plan.styleNote, [[90, 18], [150, 16.5], [999, 15]]),
          color: PE_PPT_TEXT,
        })
      );
      return pePptChrome(plan, '教学风格', body);
    }

    function pePptPhase(plan, phase) {
      var body = [];
      body.push(pePptShape(0.75, 1.55, 7.15, 5.15, PE_PPT_SOFT));
      body.push(pePptShape(0.75, 1.55, 0.06, 5.15, PE_PPT_GREEN));
      body.push(pePptText(1.0, 1.72, 6.6, 0.3, '教学内容与教师活动', { size: 14, bold: true, color: PE_PPT_GREEN }));
      body.push(
        pePptText(1.0, 2.12, 6.65, 4.4, phase.content, {
          size: pePptFit(phase.content, [[130, 18], [220, 16], [320, 14.5], [999, 13]]),
          color: PE_PPT_TEXT,
        })
      );
      var rx = 8.1;
      var rw = 4.5;
      if (phase.student) {
        body.push(pePptShape(rx, 1.55, rw, 2.45, PE_PPT_WHITE, { line: PE_PPT_LINE }));
        body.push(pePptText(rx + 0.22, 1.7, rw - 0.4, 0.3, '学生活动', { size: 13, bold: true, color: PE_PPT_GREEN }));
        body.push(
          pePptText(rx + 0.22, 2.05, rw - 0.44, 1.8, phase.student, {
            size: pePptFit(phase.student, [[70, 16], [120, 14.5], [999, 13]]),
            color: PE_PPT_TEXT,
          })
        );
      }
      if (phase.organization) {
        var oy = phase.student ? 4.2 : 1.55;
        var oh = phase.student ? 2.5 : 5.15;
        body.push(pePptShape(rx, oy, rw, oh, PE_PPT_WHITE, { line: PE_PPT_LINE }));
        body.push(pePptText(rx + 0.22, oy + 0.15, rw - 0.4, 0.3, '组织与要求', { size: 13, bold: true, color: PE_PPT_GREEN }));
        body.push(
          pePptText(rx + 0.22, oy + 0.5, rw - 0.44, oh - 0.65, phase.organization, {
            size: pePptFit(phase.organization, [[70, 16], [120, 14.5], [999, 13]]),
            color: PE_PPT_TEXT,
          })
        );
      }
      var title = phase.name + (phase.minutes ? ' · ' + phase.minutes + ' 分钟' : '');
      return pePptChrome(plan, title, body);
    }

    function pePptEnd(plan) {
      return [
        pePptShape(0, 0, 13.333, 7.5, PE_PPT_DARK),
        pePptShape(10.2, 4.4, 4.6, 4.6, PE_PPT_WHITE, { ellipse: true, alpha: 6000 }),
        pePptText(0.9, 2.35, 11.5, 0.9, '谢谢观看', { size: 44, bold: true, color: PE_PPT_WHITE, align: 'ctr' }),
        pePptText(0.9, 3.45, 11.5, 0.5, '快乐运动 · 健康成长', { size: 20, color: 'BFD8CD', align: 'ctr' }),
        pePptText(0.9, 5.6, 11.5, 0.4, plan.grade + ' · ' + plan.topic + ' · 体育与健康课', {
          size: 12,
          color: '8FB3A4',
          align: 'ctr',
        }),
      ];
    }

    function pePptSlideXml(shapes) {
      return (
        '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n' +
        '<p:sld ' + PE_PPT_NS + '><p:cSld><p:spTree>' +
        PE_PPT_GROUP +
        shapes.join('') +
        '</p:spTree></p:cSld><p:clrMapOvr><a:masterClrMapping/></p:clrMapOvr></p:sld>'
      );
    }

    function pePptSlides(plan) {
      PE_PPT_ID = 1;
      var list = [];
      list.push({ kind: 'cover', shapes: pePptCover(plan) });
      if (plan.analysis || plan.studentAnalysis) list.push({ kind: 'content', shapes: pePptAnalysis(plan) });
      if (plan.objectives.some(function (item) { return item.text; })) {
        list.push({ kind: 'content', shapes: pePptObjectives(plan) });
      }
      if (plan.keyPoint || plan.hardPoint) list.push({ kind: 'content', shapes: pePptKeyPoints(plan) });
      if (plan.equipment || plan.venue || plan.safety) list.push({ kind: 'content', shapes: pePptPreparation(plan) });
      if (plan.styleNote) list.push({ kind: 'content', shapes: pePptStyle(plan) });
      plan.phases.forEach(function (phase) {
        list.push({ kind: 'content', shapes: pePptPhase(plan, phase) });
      });
      list.push({ kind: 'end', shapes: pePptEnd(plan) });

      var total = list.length;
      list.forEach(function (slide, index) {
        if (slide.kind !== 'content') return;
        slide.shapes.push(
          pePptText(11.55, 6.98, 1.0, 0.3, String(index + 1) + ' / ' + String(total), {
            size: 10,
            color: PE_PPT_MUTED,
            align: 'r',
          })
        );
      });

      return list.map(function (slide) {
        return pePptSlideXml(slide.shapes);
      });
    }

    function pePptTheme() {
      var fill3 =
        '<a:fillStyleLst>' +
        '<a:solidFill><a:schemeClr val="phClr"/></a:solidFill>' +
        '<a:solidFill><a:schemeClr val="phClr"><a:tint val="50000"/></a:schemeClr></a:solidFill>' +
        '<a:solidFill><a:schemeClr val="phClr"><a:shade val="80000"/></a:schemeClr></a:solidFill>' +
        '</a:fillStyleLst>';
      var line3 =
        '<a:lnStyleLst>' +
        '<a:ln w="6350" cap="flat" cmpd="sng" algn="ctr"><a:solidFill><a:schemeClr val="phClr"/></a:solidFill><a:prstDash val="solid"/></a:ln>' +
        '<a:ln w="12700" cap="flat" cmpd="sng" algn="ctr"><a:solidFill><a:schemeClr val="phClr"/></a:solidFill><a:prstDash val="solid"/></a:ln>' +
        '<a:ln w="19050" cap="flat" cmpd="sng" algn="ctr"><a:solidFill><a:schemeClr val="phClr"/></a:solidFill><a:prstDash val="solid"/></a:ln>' +
        '</a:lnStyleLst>';
      var effect3 =
        '<a:effectStyleLst><a:effectStyle><a:effectLst/></a:effectStyle><a:effectStyle><a:effectLst/></a:effectStyle>' +
        '<a:effectStyle><a:effectLst/></a:effectStyle></a:effectStyleLst>';
      var bg3 =
        '<a:bgFillStyleLst>' +
        '<a:solidFill><a:schemeClr val="phClr"/></a:solidFill>' +
        '<a:solidFill><a:schemeClr val="phClr"><a:tint val="95000"/></a:schemeClr></a:solidFill>' +
        '<a:solidFill><a:schemeClr val="phClr"><a:shade val="90000"/></a:schemeClr></a:solidFill>' +
        '</a:bgFillStyleLst>';
      return (
        '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n' +
        '<a:theme xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" name="Office">' +
        '<a:themeElements>' +
        '<a:clrScheme name="Office">' +
        '<a:dk1><a:srgbClr val="1F2933"/></a:dk1><a:lt1><a:srgbClr val="FFFFFF"/></a:lt1>' +
        '<a:dk2><a:srgbClr val="1F6F54"/></a:dk2><a:lt2><a:srgbClr val="EEF5F1"/></a:lt2>' +
        '<a:accent1><a:srgbClr val="1F6F54"/></a:accent1><a:accent2><a:srgbClr val="E8A33D"/></a:accent2>' +
        '<a:accent3><a:srgbClr val="5B9BD5"/></a:accent3><a:accent4><a:srgbClr val="70AD47"/></a:accent4>' +
        '<a:accent5><a:srgbClr val="A5A5A5"/></a:accent5><a:accent6><a:srgbClr val="ED7D31"/></a:accent6>' +
        '<a:hlink><a:srgbClr val="0563C1"/></a:hlink><a:folHlink><a:srgbClr val="954F72"/></a:folHlink>' +
        '</a:clrScheme>' +
        '<a:fontScheme name="Office"><a:majorFont><a:latin typeface="微软雅黑"/><a:ea typeface="微软雅黑"/><a:cs typeface=""/></a:majorFont>' +
        '<a:minorFont><a:latin typeface="微软雅黑"/><a:ea typeface="微软雅黑"/><a:cs typeface=""/></a:minorFont></a:fontScheme>' +
        '<a:fmtScheme name="Office">' + fill3 + line3 + effect3 + bg3 + '</a:fmtScheme>' +
        '</a:themeElements><a:objectDefaults/><a:extraClrSchemeLst/></a:theme>'
      );
    }

    function pePptMaster() {
      var titleStyle =
        '<p:titleStyle><a:lvl1pPr algn="l" defTabSz="914400" rtl="0" eaLnBrk="1" latinLnBrk="0" hangingPunct="1">' +
        '<a:defRPr sz="4400" kern="1200"><a:solidFill><a:schemeClr val="tx1"/></a:solidFill>' +
        '<a:latin typeface="+mj-lt"/><a:ea typeface="+mj-ea"/><a:cs typeface="+mj-cs"/></a:defRPr></a:lvl1pPr></p:titleStyle>';
      var bodyStyle =
        '<p:bodyStyle><a:lvl1pPr marL="342900" indent="-342900" algn="l" defTabSz="914400" rtl="0" eaLnBrk="1" latinLnBrk="0" hangingPunct="1">' +
        '<a:defRPr sz="2800" kern="1200"><a:solidFill><a:schemeClr val="tx1"/></a:solidFill>' +
        '<a:latin typeface="+mn-lt"/><a:ea typeface="+mn-ea"/><a:cs typeface="+mn-cs"/></a:defRPr></a:lvl1pPr></p:bodyStyle>';
      var otherStyle =
        '<p:otherStyle><a:defPPr><a:defRPr lang="en-US"/></a:defPPr><a:lvl1pPr marL="0" algn="l" defTabSz="914400" rtl="0" eaLnBrk="1" latinLnBrk="0" hangingPunct="1">' +
        '<a:defRPr sz="1800" kern="1200"><a:solidFill><a:schemeClr val="tx1"/></a:solidFill>' +
        '<a:latin typeface="+mn-lt"/><a:ea typeface="+mn-ea"/><a:cs typeface="+mn-cs"/></a:defRPr></a:lvl1pPr></p:otherStyle>';
      return (
        '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n' +
        '<p:sldMaster ' + PE_PPT_NS + '>' +
        '<p:cSld><p:bg><p:bgRef idx="1001"><a:schemeClr val="bg1"/></p:bgRef></p:bg><p:spTree>' +
        PE_PPT_GROUP +
        '</p:spTree></p:cSld>' +
        '<p:clrMap bg1="lt1" tx1="dk1" bg2="lt2" tx2="dk2" accent1="accent1" accent2="accent2" accent3="accent3" ' +
        'accent4="accent4" accent5="accent5" accent6="accent6" hlink="hlink" folHlink="folHlink"/>' +
        '<p:sldLayoutIdLst><p:sldLayoutId id="2147483649" r:id="rId1"/></p:sldLayoutIdLst>' +
        '<p:txStyles>' + titleStyle + bodyStyle + otherStyle + '</p:txStyles>' +
        '</p:sldMaster>'
      );
    }

    function pePptLayout() {
      return (
        '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n' +
        '<p:sldLayout ' + PE_PPT_NS + ' type="blank" preserve="1">' +
        '<p:cSld name="Blank"><p:spTree>' + PE_PPT_GROUP + '</p:spTree></p:cSld>' +
        '<p:clrMapOvr><a:masterClrMapping/></p:clrMapOvr></p:sldLayout>'
      );
    }

    function pePptContentTypes(count) {
      var overrides = '';
      for (var i = 1; i <= count; i += 1) {
        overrides +=
          '<Override PartName="/ppt/slides/slide' + i + '.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.slide+xml"/>';
      }
      return (
        '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n' +
        '<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">' +
        '<Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>' +
        '<Default Extension="xml" ContentType="application/xml"/>' +
        '<Override PartName="/ppt/presentation.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.presentation.main+xml"/>' +
        '<Override PartName="/ppt/slideMasters/slideMaster1.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.slideMaster+xml"/>' +
        '<Override PartName="/ppt/slideLayouts/slideLayout1.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.slideLayout+xml"/>' +
        '<Override PartName="/ppt/theme/theme1.xml" ContentType="application/vnd.openxmlformats-officedocument.theme+xml"/>' +
        '<Override PartName="/ppt/presProps.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.presProps+xml"/>' +
        '<Override PartName="/ppt/viewProps.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.viewProps+xml"/>' +
        '<Override PartName="/ppt/tableStyles.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.tableStyles+xml"/>' +
        '<Override PartName="/docProps/core.xml" ContentType="application/vnd.openxmlformats-package.core-properties+xml"/>' +
        '<Override PartName="/docProps/app.xml" ContentType="application/vnd.openxmlformats-officedocument.extended-properties+xml"/>' +
        overrides +
        '</Types>'
      );
    }

    function pePptPresentation(count) {
      var slides = '';
      for (var i = 1; i <= count; i += 1) {
        slides += '<p:sldId id="' + (255 + i) + '" r:id="rId' + (5 + i) + '"/>';
      }
      return (
        '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n' +
        '<p:presentation ' + PE_PPT_NS + ' saveSubsetFonts="1" autoCompressPictures="0">' +
        '<p:sldMasterIdLst><p:sldMasterId id="2147483648" r:id="rId1"/></p:sldMasterIdLst>' +
        '<p:sldIdLst>' + slides + '</p:sldIdLst>' +
        '<p:sldSz cx="' + PE_PPT_CX + '" cy="' + PE_PPT_CY + '"/>' +
        '<p:notesSz cx="6858000" cy="9144000"/>' +
        '</p:presentation>'
      );
    }

    function pePptPresentationRels(count) {
      var rels =
        '<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/slideMaster" Target="slideMasters/slideMaster1.xml"/>' +
        '<Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/presProps" Target="presProps.xml"/>' +
        '<Relationship Id="rId3" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/viewProps" Target="viewProps.xml"/>' +
        '<Relationship Id="rId4" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/theme" Target="theme/theme1.xml"/>' +
        '<Relationship Id="rId5" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/tableStyles" Target="tableStyles.xml"/>';
      for (var i = 1; i <= count; i += 1) {
        rels +=
          '<Relationship Id="rId' + (5 + i) + '" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/slide" Target="slides/slide' + i + '.xml"/>';
      }
      return (
        '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n' +
        '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">' + rels + '</Relationships>'
      );
    }

    function pePptRootRels() {
      return (
        '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n' +
        '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">' +
        '<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="ppt/presentation.xml"/>' +
        '<Relationship Id="rId2" Type="http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties" Target="docProps/core.xml"/>' +
        '<Relationship Id="rId3" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/extended-properties" Target="docProps/app.xml"/>' +
        '</Relationships>'
      );
    }

    function pePptMasterRels() {
      return (
        '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n' +
        '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">' +
        '<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/slideLayout" Target="../slideLayouts/slideLayout1.xml"/>' +
        '<Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/theme" Target="../theme/theme1.xml"/>' +
        '</Relationships>'
      );
    }

    function pePptLayoutRels() {
      return (
        '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n' +
        '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">' +
        '<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/slideMaster" Target="../slideMasters/slideMaster1.xml"/>' +
        '</Relationships>'
      );
    }

    function pePptSlideRels() {
      return (
        '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n' +
        '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">' +
        '<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/slideLayout" Target="../slideLayouts/slideLayout1.xml"/>' +
        '</Relationships>'
      );
    }

    function pePptCore(title) {
      var now = new Date().toISOString().replace(/\.\d{3}Z$/, 'Z');
      return (
        '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n' +
        '<cp:coreProperties xmlns:cp="http://schemas.openxmlformats.org/package/2006/metadata/core-properties" ' +
        'xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:dcterms="http://purl.org/dc/terms/" ' +
        'xmlns:dcmitype="http://purl.org/dc/dcmitype/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">' +
        '<dc:title>' + peXmlText(title) + '</dc:title><dc:creator>体育教案</dc:creator>' +
        '<cp:lastModifiedBy>体育教案</cp:lastModifiedBy>' +
        '<dcterms:created xsi:type="dcterms:W3CDTF">' + now + '</dcterms:created>' +
        '<dcterms:modified xsi:type="dcterms:W3CDTF">' + now + '</dcterms:modified>' +
        '</cp:coreProperties>'
      );
    }

    function pePptApp(count) {
      return (
        '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n' +
        '<Properties xmlns="http://schemas.openxmlformats.org/officeDocument/2006/extended-properties" ' +
        'xmlns:vt="http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes">' +
        '<Application>体育教案</Application><PresentationFormat>宽屏</PresentationFormat>' +
        '<Slides>' + count + '</Slides><DocSecurity>0</DocSecurity><ScaleCrop>false</ScaleCrop>' +
        '</Properties>'
      );
    }

    function pePptFileName(plan) {
      var date = new Date();
      var stamp =
        date.getFullYear() + String(date.getMonth() + 1).padStart(2, '0') + String(date.getDate()).padStart(2, '0');
      var parts = ['课件', plan.grade, plan.topic].filter(function (part) {
        return part;
      });
      return parts.join('_').replace(/[\\/:*?"<>|]/g, '') + '_' + stamp + '.pptx';
    }

    function peBuildPptx(inputPlan) {
      var plan = peNormalizePlan(inputPlan);
      var slideXml = pePptSlides(plan);
      var count = slideXml.length;
      var files = [
        { name: '[Content_Types].xml', data: peUtf8(pePptContentTypes(count)) },
        { name: '_rels/.rels', data: peUtf8(pePptRootRels()) },
        { name: 'docProps/core.xml', data: peUtf8(pePptCore(plan.grade + plan.topic + '课件')) },
        { name: 'docProps/app.xml', data: peUtf8(pePptApp(count)) },
        { name: 'ppt/presentation.xml', data: peUtf8(pePptPresentation(count)) },
        { name: 'ppt/_rels/presentation.xml.rels', data: peUtf8(pePptPresentationRels(count)) },
        { name: 'ppt/presProps.xml', data: peUtf8(PE_PPT_PRES_PROPS) },
        { name: 'ppt/viewProps.xml', data: peUtf8(PE_PPT_VIEW_PROPS) },
        { name: 'ppt/tableStyles.xml', data: peUtf8(PE_PPT_TABLE_STYLES) },
        { name: 'ppt/theme/theme1.xml', data: peUtf8(pePptTheme()) },
        { name: 'ppt/slideMasters/slideMaster1.xml', data: peUtf8(pePptMaster()) },
        { name: 'ppt/slideMasters/_rels/slideMaster1.xml.rels', data: peUtf8(pePptMasterRels()) },
        { name: 'ppt/slideLayouts/slideLayout1.xml', data: peUtf8(pePptLayout()) },
        { name: 'ppt/slideLayouts/_rels/slideLayout1.xml.rels', data: peUtf8(pePptLayoutRels()) },
      ];
      slideXml.forEach(function (xml, index) {
        files.push({ name: 'ppt/slides/slide' + (index + 1) + '.xml', data: peUtf8(xml) });
        files.push({ name: 'ppt/slides/_rels/slide' + (index + 1) + '.xml.rels', data: peUtf8(pePptSlideRels()) });
      });
      return { bytes: peZip(files), fileName: pePptFileName(plan), slideCount: count };
    }

    /* 侧边栏图标与教案编辑面板（React，无 JSX）。 */

    var PE_CSS = `
    .pe-root { height: 100%; overflow-y: auto; box-sizing: border-box; padding: 26px 24px 8px; background: var(--dsw-alias-bg-base); color: var(--dsw-alias-label-primary); }
    .pe-inner { max-width: 880px; margin: 0 auto; }
    .pe-head { display: flex; align-items: flex-end; justify-content: space-between; gap: 16px; padding-bottom: 14px; border-bottom: 1px solid var(--dsw-alias-border-l1); margin-bottom: 18px; }
    .pe-title { margin: 0; font-size: 20px; font-weight: 600; letter-spacing: 0.2px; }
    .pe-sub { margin: 6px 0 0; font-size: 12.5px; color: var(--dsw-alias-label-secondary); line-height: 1.6; }
    .pe-summary { display: flex; gap: 6px; flex-wrap: wrap; justify-content: flex-end; }
    .pe-chip { font-size: 11.5px; line-height: 1; padding: 6px 9px; border-radius: 999px; border: 1px solid var(--dsw-alias-border-l1); color: var(--dsw-alias-label-secondary); background: var(--dsw-alias-bg-layer-1); white-space: nowrap; }
    .pe-chip.is-warn { color: var(--dsw-alias-state-warn-primary); border-color: var(--dsw-alias-state-warn-primary); }
    .pe-card { background: var(--dsw-alias-bg-layer-1); border: 1px solid var(--dsw-alias-border-l1); border-radius: 12px; padding: 15px 16px 16px; margin-bottom: 13px; }
    .pe-card-head { display: flex; align-items: center; gap: 9px; margin-bottom: 13px; }
    .pe-step { flex: none; width: 21px; height: 21px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; font-size: 11.5px; font-weight: 600; color: var(--dsw-alias-label-secondary); background: var(--dsw-alias-bg-layer-2); border: 1px solid var(--dsw-alias-border-l1); }
    .pe-card-title { margin: 0; font-size: 13.5px; font-weight: 600; }
    .pe-card-note { margin: 0 0 0 auto; font-size: 11.5px; color: var(--dsw-alias-label-secondary); }
    .pe-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(168px, 1fr)); gap: 12px; }
    .pe-field { display: flex; flex-direction: column; gap: 5px; min-width: 0; }
    .pe-field + .pe-field { margin-top: 0; }
    .pe-stack { display: flex; flex-direction: column; gap: 12px; }
    .pe-label { display: flex; align-items: center; gap: 6px; font-size: 12px; color: var(--dsw-alias-label-secondary); }
    .pe-input, .pe-textarea { width: 100%; box-sizing: border-box; font-family: inherit; font-size: 13px; line-height: 1.55; color: var(--dsw-alias-label-primary); background: var(--dsw-alias-bg-base); border: 1px solid var(--dsw-alias-border-l1); border-radius: 8px; padding: 7px 10px; outline: none; transition: border-color 0.15s ease, box-shadow 0.15s ease; }
    .pe-input { height: 34px; }
    .pe-textarea { min-height: 62px; resize: vertical; }
    .pe-input:hover, .pe-textarea:hover { border-color: var(--dsw-alias-border-l2); }
    .pe-input:focus, .pe-textarea:focus { border-color: var(--dsw-alias-brand-primary); box-shadow: 0 0 0 3px color-mix(in srgb, var(--dsw-alias-brand-primary) 18%, transparent); }
    .pe-input-suffix { position: relative; display: flex; align-items: center; }
    .pe-input-suffix .pe-input { padding-right: 40px; }
    .pe-suffix { position: absolute; right: 10px; font-size: 11.5px; color: var(--dsw-alias-label-secondary); pointer-events: none; }
    .pe-obj { display: grid; grid-template-columns: 76px 1fr; gap: 10px; align-items: start; }
    .pe-obj-label { font-size: 12px; font-weight: 600; color: var(--dsw-alias-label-primary); padding-top: 9px; }
    .pe-styles { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 8px; }
    .pe-style { display: flex; flex-direction: column; gap: 4px; padding: 9px 10px; text-align: left; font-family: inherit; color: var(--dsw-alias-label-primary); background: var(--dsw-alias-bg-base); border: 1px solid var(--dsw-alias-border-l1); border-radius: 9px; cursor: pointer; transition: border-color 0.15s ease, background 0.15s ease; }
    .pe-style:hover { border-color: var(--dsw-alias-border-l2); }
    .pe-style.is-active { border-color: var(--dsw-alias-brand-primary); background: color-mix(in srgb, var(--dsw-alias-brand-primary) 9%, var(--dsw-alias-bg-base)); box-shadow: inset 0 0 0 1px var(--dsw-alias-brand-primary); }
    .pe-style-name { font-size: 13px; font-weight: 600; line-height: 1.3; }
    .pe-style-hint { font-size: 11px; line-height: 1.5; color: var(--dsw-alias-label-secondary); }
    .pe-attach-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 8px; }
    .pe-attach { display: flex; align-items: flex-start; gap: 9px; padding: 9px 10px; background: var(--dsw-alias-bg-base); border: 1px solid var(--dsw-alias-border-l1); border-radius: 9px; cursor: pointer; transition: border-color 0.15s ease, background 0.15s ease; }
    .pe-attach:hover { border-color: var(--dsw-alias-border-l2); }
    .pe-attach.is-on { border-color: var(--dsw-alias-brand-primary); background: color-mix(in srgb, var(--dsw-alias-brand-primary) 9%, var(--dsw-alias-bg-base)); box-shadow: inset 0 0 0 1px var(--dsw-alias-brand-primary); }
    .pe-attach input { flex: none; margin: 2px 0 0; accent-color: var(--dsw-alias-brand-primary); }
    .pe-attach-text { display: flex; flex-direction: column; gap: 2px; }
    .pe-attach-name { font-size: 12.5px; font-weight: 600; line-height: 1.35; }
    .pe-attach-hint { font-size: 11px; line-height: 1.5; color: var(--dsw-alias-label-secondary); }
    .pe-ppt { display: flex; flex-direction: column; gap: 8px; padding: 11px 12px; background: var(--dsw-alias-bg-layer-2); border: 1px solid var(--dsw-alias-border-l1); border-radius: 9px; }
    .pe-ppt-head { display: flex; align-items: center; justify-content: space-between; gap: 10px; flex-wrap: wrap; }
    .pe-ppt-title { font-size: 12.5px; font-weight: 600; }
    .pe-ppt-state { font-size: 11.5px; color: var(--dsw-alias-label-secondary); }
    .pe-link { align-self: flex-start; font-size: 12.5px; color: var(--dsw-alias-brand-primary); text-decoration: underline; text-underline-offset: 2px; word-break: break-all; }
    .pe-link:hover { filter: brightness(1.12); }
    .pe-btn-sm { height: 28px; padding: 0 11px; font-size: 12px; align-self: flex-start; }
    .pe-quiz { display: flex; flex-direction: column; gap: 8px; padding: 11px 12px; background: var(--dsw-alias-bg-layer-2); border: 1px solid var(--dsw-alias-border-l1); border-radius: 9px; }
    .pe-quiz-head { display: flex; align-items: center; justify-content: space-between; gap: 10px; flex-wrap: wrap; }
    .pe-quiz-title { font-size: 12.5px; font-weight: 600; }
    .pe-quiz-details summary { cursor: pointer; font-size: 12px; color: var(--dsw-alias-brand-primary); }
    .pe-quiz-list { display: flex; flex-direction: column; gap: 11px; margin-top: 10px; }
    .pe-quiz-q { font-size: 12.5px; line-height: 1.6; color: var(--dsw-alias-label-primary); }
    .pe-quiz-options { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 2px 14px; margin-top: 4px; font-size: 11.5px; line-height: 1.55; color: var(--dsw-alias-label-secondary); }
    .pe-quiz-answers { margin-top: 10px; }
    .pe-quiz-answer { margin: 6px 0 0; font-size: 11.5px; line-height: 1.6; color: var(--dsw-alias-label-secondary); }
    .pe-phase { background: var(--dsw-alias-bg-layer-2); border: 1px solid var(--dsw-alias-border-l1); border-radius: 10px; padding: 12px; }
    .pe-phase-head { display: grid; grid-template-columns: 1fr 96px auto; gap: 10px; align-items: end; margin-bottom: 10px; }
    .pe-phase-body { display: grid; gap: 10px; }
    .pe-icon-btn { flex: none; width: 30px; height: 30px; border-radius: 8px; border: 1px solid var(--dsw-alias-border-l1); background: var(--dsw-alias-bg-base); color: var(--dsw-alias-label-secondary); font-size: 15px; line-height: 1; cursor: pointer; }
    .pe-icon-btn:hover { color: var(--dsw-alias-state-error-primary); border-color: var(--dsw-alias-state-error-primary); }
    .pe-add { margin-top: 10px; width: 100%; height: 34px; border-radius: 8px; border: 1px dashed var(--dsw-alias-border-l2); background: transparent; color: var(--dsw-alias-label-secondary); font-size: 12.5px; cursor: pointer; font-family: inherit; }
    .pe-add:hover { color: var(--dsw-alias-label-primary); border-color: var(--dsw-alias-brand-primary); }
    .pe-foot { position: sticky; bottom: 0; display: flex; align-items: center; justify-content: space-between; gap: 14px; margin-top: 16px; padding: 12px 0 14px; background: var(--dsw-alias-bg-base); border-top: 1px solid var(--dsw-alias-border-l1); }
    .pe-status { font-size: 12px; line-height: 1.5; color: var(--dsw-alias-label-secondary); min-width: 0; }
    .pe-status.is-ok { color: var(--dsw-alias-state-success-primary); }
    .pe-status.is-err { color: var(--dsw-alias-state-error-primary); }
    .pe-actions { display: flex; gap: 8px; flex: none; }
    .pe-btn { font-family: inherit; font-size: 13px; height: 34px; padding: 0 15px; border-radius: 8px; cursor: pointer; border: 1px solid var(--dsw-alias-border-l1); background: var(--dsw-alias-bg-layer-1); color: var(--dsw-alias-label-primary); white-space: nowrap; }
    .pe-btn:hover { border-color: var(--dsw-alias-border-l2); }
    .pe-btn.is-primary { background: var(--dsw-alias-brand-primary); border-color: var(--dsw-alias-brand-primary); color: #ffffff; font-weight: 600; }
    .pe-btn.is-primary:hover { filter: brightness(1.06); }
    .pe-btn:disabled { opacity: 0.55; cursor: default; filter: none; }
    .pe-hint { font-size: 11.5px; color: var(--dsw-alias-label-secondary); line-height: 1.6; margin: 8px 0 0; }
    @media (max-width: 640px) {
      .pe-root { padding: 18px 14px 6px; }
      .pe-head { flex-direction: column; align-items: flex-start; }
      .pe-summary { justify-content: flex-start; }
      .pe-phase-head { grid-template-columns: 1fr 84px auto; }
      .pe-styles { grid-template-columns: 1fr; }
      .pe-attach-grid { grid-template-columns: 1fr; }
      .pe-quiz-options { grid-template-columns: 1fr; }
      .pe-foot { flex-direction: column; align-items: stretch; }
      .pe-actions { justify-content: flex-end; }
    }
    `;

    function pePanelIcon(size, active) {
      var h = React.createElement;
      return h(
        'svg',
        {
          width: size,
          height: size,
          viewBox: '0 0 24 24',
          fill: 'none',
          stroke: 'currentColor',
          strokeWidth: active ? 1.9 : 1.6,
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
          'aria-hidden': true,
          style: { display: 'block' },
        },
        h('path', { d: 'M6.2 3.4h7.6L18.6 8v12.4H6.2z' }),
        h('path', { d: 'M13.6 3.6V8.2h4.8' }),
        h('path', { d: 'M9 12.2h6.2M9 15.4h4' }),
        h('path', { d: 'M9 18.2c.9-.9 2.6-1.3 3.9-.2' })
      );
    }

    function peCreatePanel(React, t) {
      var h = React.createElement;
      var useState = React.useState;

      function Field(props) {
        var multiline = props.multiline;
        var control = multiline
          ? h('textarea', {
              className: 'pe-textarea',
              value: props.value,
              rows: props.rows || 2,
              placeholder: props.placeholder || '',
              onChange: function (event) {
                props.onChange(event.target.value);
              },
            })
          : h('input', {
              className: 'pe-input',
              value: props.value,
              placeholder: props.placeholder || '',
              onChange: function (event) {
                props.onChange(event.target.value);
              },
            });
        return h(
          'label',
          { className: 'pe-field' },
          h('span', { className: 'pe-label' }, props.label, props.optional ? h('span', { className: 'pe-card-note' }, t('optional')) : null),
          control
        );
      }

      function Section(props) {
        return h(
          'section',
          { className: 'pe-card' },
          h(
            'header',
            { className: 'pe-card-head' },
            h('span', { className: 'pe-step' }, String(props.index)),
            h('h2', { className: 'pe-card-title' }, props.title),
            props.note ? h('p', { className: 'pe-card-note' }, props.note) : null
          ),
          props.children
        );
      }

      return function PeLessonPlanPanel() {
        var planState = useState(peDefaultPlan);
        var plan = planState[0];
        var setPlan = planState[1];
        var statusState = useState(null);
        var status = statusState[0];
        var setStatus = statusState[1];
        var pptState = useState(null);
        var pptLink = pptState[0];
        var setPptLink = pptState[1];

        /* 教案内容一改，之前生成的 PPT 链接就失效了，顺手清掉。 */
        function markDirty() {
          setStatus(null);
          if (pptLink) URL.revokeObjectURL(pptLink.url);
          setPptLink(null);
        }

        function patch(key, value) {
          setPlan(function (prev) {
            var next = {};
            for (var k in prev) next[k] = prev[k];
            next[key] = value;
            return next;
          });
          markDirty();
        }

        /* 切换风格时，把风格说明一起换成该风格的预设写法。 */
        function selectStyle(preset) {
          setPlan(function (prev) {
            var next = {};
            for (var k in prev) next[k] = prev[k];
            next.style = preset.id;
            next.styleNote = preset.note;
            return next;
          });
          markDirty();
        }

        function toggleAttachment(id) {
          setPlan(function (prev) {
            var next = {};
            for (var k in prev) next[k] = prev[k];
            var picked = prev.attachments || [];
            next.attachments = picked.indexOf(id) >= 0
              ? picked.filter(function (item) {
                  return item !== id;
                })
              : picked.concat([id]);
            return next;
          });
          markDirty();
        }

        /* 换一个随机种子，整张测试卷重新出题。 */
        function reshuffleQuiz() {
          setPlan(function (prev) {
            var next = {};
            for (var k in prev) next[k] = prev[k];
            next.quizSeed = Math.floor(Math.random() * 1000000000);
            return next;
          });
          markDirty();
        }

        function patchObjective(index, text) {
          setPlan(function (prev) {
            var next = {};
            for (var k in prev) next[k] = prev[k];
            next.objectives = prev.objectives.map(function (item, i) {
              return i === index ? { label: item.label, text: text } : item;
            });
            return next;
          });
          markDirty();
        }

        function patchPhase(index, key, value) {
          setPlan(function (prev) {
            var next = {};
            for (var k in prev) next[k] = prev[k];
            next.phases = prev.phases.map(function (item, i) {
              if (i !== index) return item;
              var copy = { name: item.name, minutes: item.minutes, content: item.content, student: item.student, organization: item.organization };
              copy[key] = value;
              return copy;
            });
            return next;
          });
          markDirty();
        }

        function addPhase() {
          setPlan(function (prev) {
            var next = {};
            for (var k in prev) next[k] = prev[k];
            next.phases = prev.phases.concat([{ name: '新环节', minutes: 5, content: '', student: '', organization: '' }]);
            return next;
          });
          markDirty();
        }

        function removePhase(index) {
          setPlan(function (prev) {
            if (prev.phases.length <= 1) return prev;
            var next = {};
            for (var k in prev) next[k] = prev[k];
            next.phases = prev.phases.filter(function (_item, i) {
              return i !== index;
            });
            return next;
          });
          markDirty();
        }

        function reset() {
          setPlan(peDefaultPlan());
          markDirty();
          setStatus({ kind: 'ok', text: t('resetDone') });
        }

        function generate() {
          try {
            var result = peBuildDocx(plan);
            var blob = new Blob([result.bytes], {
              type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            });
            var url = URL.createObjectURL(blob);
            var link = document.createElement('a');
            link.href = url;
            link.download = result.fileName;
            link.rel = 'noopener';
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.setTimeout(function () {
              URL.revokeObjectURL(url);
            }, 5000);

            var note = '';
            var kind = 'ok';
            if (plan.attachments.indexOf('ppt') >= 0) {
              try {
                var deck = peBuildPptx(plan);
                var deckBlob = new Blob([deck.bytes], {
                  type: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
                });
                var deckUrl = URL.createObjectURL(deckBlob);
                if (pptLink) URL.revokeObjectURL(pptLink.url);
                setPptLink({ url: deckUrl, fileName: deck.fileName });
                note = ' ' + t('pptReadyInline');
              } catch (pptError) {
                kind = 'err';
                note = ' ' + t('pptFailed') + (pptError && pptError.message ? pptError.message : String(pptError));
              }
            } else if (pptLink) {
              URL.revokeObjectURL(pptLink.url);
              setPptLink(null);
            }
            setStatus({ kind: kind, text: t('savedAs').replace('{name}', result.fileName) + note });
          } catch (error) {
            setStatus({ kind: 'err', text: t('failed') + (error && error.message ? error.message : String(error)) });
          }
        }

        /* 单独生成课件：直接下载，同时保留可再次点击的链接。 */
        function makePpt() {
          try {
            var deck = peBuildPptx(plan);
            var blob = new Blob([deck.bytes], {
              type: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
            });
            var url = URL.createObjectURL(blob);
            if (pptLink) URL.revokeObjectURL(pptLink.url);
            setPptLink({ url: url, fileName: deck.fileName });
            var link = document.createElement('a');
            link.href = url;
            link.download = deck.fileName;
            link.rel = 'noopener';
            document.body.appendChild(link);
            link.click();
            link.remove();
            setStatus({ kind: 'ok', text: t('pptReady').replace('{name}', deck.fileName) });
          } catch (error) {
            setStatus({ kind: 'err', text: t('pptFailed') + (error && error.message ? error.message : String(error)) });
          }
        }

        var total = pePhaseTotal(plan);
        var mismatch = plan.duration && total !== plan.duration;
        var objectiveCount = plan.objectives.filter(function (item) {
          return item.text;
        }).length;
        var styleLabel = peStylePreset(plan.style).label;
        var attachmentCount = peAttachmentLabels(plan).length;
        var quizSelected = plan.attachments.indexOf('quiz') >= 0;
        var quiz = quizSelected ? peBuildQuiz(plan, plan.quizSeed) : null;

        return h(
          'div',
          { className: 'pe-root' },
          h('style', null, PE_CSS),
          h(
            'div',
            { className: 'pe-inner' },
            h(
              'header',
              { className: 'pe-head' },
              h(
                'div',
                null,
                h('h1', { className: 'pe-title' }, t('title')),
                h('p', { className: 'pe-sub' }, t('subtitle'))
              ),
              h(
                'div',
                { className: 'pe-summary' },
                h('span', { className: 'pe-chip' }, plan.grade + ' · ' + plan.topic),
                h('span', { className: 'pe-chip' }, t('styleChip').replace('{name}', styleLabel)),
                h('span', { className: 'pe-chip' }, t('objectiveCount').replace('{n}', String(objectiveCount))),
                h(
                  'span',
                  { className: 'pe-chip' + (mismatch ? ' is-warn' : '') },
                  t('phaseCount').replace('{n}', String(plan.phases.length)) + ' · ' + total + t('minuteUnit')
                ),
                h('span', { className: 'pe-chip' }, t('attachmentCount').replace('{n}', String(attachmentCount)))
              )
            ),

            h(
              Section,
              { index: 1, title: t('basic') },
              h(
                'div',
                { className: 'pe-grid' },
                h(Field, { label: t('subject'), value: plan.subject, onChange: function (v) { patch('subject', v); } }),
                h(Field, { label: t('grade'), value: plan.grade, onChange: function (v) { patch('grade', v); } }),
                h(Field, { label: t('topic'), value: plan.topic, onChange: function (v) { patch('topic', v); } }),
                h(Field, { label: t('lessonType'), value: plan.lessonType, onChange: function (v) { patch('lessonType', v); } }),
                h(Field, { label: t('textbook'), value: plan.textbook, onChange: function (v) { patch('textbook', v); } }),
                h(Field, { label: t('teacher'), value: plan.teacher, onChange: function (v) { patch('teacher', v); }, placeholder: t('teacherPh') }),
                h(Field, { label: t('classSize'), value: plan.classSize, onChange: function (v) { patch('classSize', v); }, placeholder: '40' }),
                h(
                  'div',
                  { className: 'pe-field' },
                  h('span', { className: 'pe-label' }, t('duration')),
                  h(
                    'div',
                    { className: 'pe-input-suffix' },
                    h('input', {
                      className: 'pe-input',
                      value: String(plan.duration),
                      inputMode: 'numeric',
                      onChange: function (event) {
                        patch('duration', Number(event.target.value.replace(/[^0-9]/g, '')) || 0);
                      },
                    }),
                    h('span', { className: 'pe-suffix' }, t('minuteUnit'))
                  )
                )
              )
            ),

            h(
              Section,
              { index: 2, title: t('style'), note: t('styleSectionNote') },
              h(
                'div',
                { className: 'pe-stack' },
                h(
                  'div',
                  { className: 'pe-styles', role: 'group', 'aria-label': t('style') },
                  PE_STYLE_PRESETS.map(function (preset) {
                    var active = plan.style === preset.id;
                    return h(
                      'button',
                      {
                        key: 'style-' + preset.id,
                        type: 'button',
                        className: 'pe-style' + (active ? ' is-active' : ''),
                        'aria-pressed': active,
                        onClick: function () {
                          selectStyle(preset);
                        },
                      },
                      h('span', { className: 'pe-style-name' }, preset.label),
                      h('span', { className: 'pe-style-hint' }, preset.hint)
                    );
                  })
                ),
                h(Field, {
                  label: t('styleNote'),
                  multiline: true,
                  rows: 3,
                  value: plan.styleNote,
                  onChange: function (v) { patch('styleNote', v); },
                  placeholder: t('styleNotePh'),
                }),
                h('p', { className: 'pe-hint' }, t('styleTip'))
              )
            ),

            h(
              Section,
              { index: 3, title: t('analysis') },
              h(Field, {
                label: t('analysisLabel'),
                multiline: true,
                rows: 3,
                value: plan.analysis,
                onChange: function (v) { patch('analysis', v); },
              })
            ),

            h(
              Section,
              { index: 4, title: t('studentAnalysis'), note: t('optional') },
              h(Field, {
                label: t('studentAnalysisLabel'),
                multiline: true,
                rows: 3,
                value: plan.studentAnalysis,
                onChange: function (v) { patch('studentAnalysis', v); },
                placeholder: t('studentAnalysisPh'),
              })
            ),

            h(
              Section,
              { index: 5, title: t('objectives') },
              h(
                'div',
                { className: 'pe-stack' },
                plan.objectives.map(function (item, index) {
                  return h(
                    'div',
                    { className: 'pe-obj', key: 'obj-' + index },
                    h('span', { className: 'pe-obj-label' }, item.label + '：'),
                    h('textarea', {
                      className: 'pe-textarea',
                      rows: 2,
                      value: item.text,
                      placeholder: t('objectivePh'),
                      onChange: function (event) { patchObjective(index, event.target.value); },
                    })
                  );
                })
              )
            ),

            h(
              Section,
              { index: 6, title: t('keyPoints') },
              h(
                'div',
                { className: 'pe-stack' },
                h(Field, { label: t('keyPoint'), value: plan.keyPoint, onChange: function (v) { patch('keyPoint', v); } }),
                h(Field, { label: t('hardPoint'), value: plan.hardPoint, onChange: function (v) { patch('hardPoint', v); } }),
                h(Field, {
                  label: t('strategies'),
                  multiline: true,
                  rows: 3,
                  value: plan.strategies,
                  onChange: function (v) { patch('strategies', v); },
                  placeholder: t('strategiesPh'),
                  optional: true,
                })
              )
            ),

            h(
              Section,
              { index: 7, title: t('preparation') },
              h(
                'div',
                { className: 'pe-stack' },
                h(Field, { label: t('equipment'), multiline: true, rows: 2, value: plan.equipment, onChange: function (v) { patch('equipment', v); } }),
                h(Field, { label: t('venue'), multiline: true, rows: 2, value: plan.venue, onChange: function (v) { patch('venue', v); } }),
                h(Field, { label: t('safety'), multiline: true, rows: 2, value: plan.safety, onChange: function (v) { patch('safety', v); }, optional: true })
              )
            ),

            h(
              Section,
              { index: 8, title: t('process'), note: t('processNote') },
              h(
                'div',
                { className: 'pe-stack' },
                plan.phases.map(function (phase, index) {
                  return h(
                    'div',
                    { className: 'pe-phase', key: 'phase-' + index },
                    h(
                      'div',
                      { className: 'pe-phase-head' },
                      h('label', { className: 'pe-field' }, h('span', { className: 'pe-label' }, t('phaseName')), h('input', {
                        className: 'pe-input',
                        value: phase.name,
                        onChange: function (event) { patchPhase(index, 'name', event.target.value); },
                      })),
                      h(
                        'label',
                        { className: 'pe-field' },
                        h('span', { className: 'pe-label' }, t('phaseMinutes')),
                        h(
                          'div',
                          { className: 'pe-input-suffix' },
                          h('input', {
                            className: 'pe-input',
                            value: String(phase.minutes),
                            inputMode: 'numeric',
                            onChange: function (event) {
                              patchPhase(index, 'minutes', Number(event.target.value.replace(/[^0-9]/g, '')) || 0);
                            },
                          }),
                          h('span', { className: 'pe-suffix' }, t('minuteUnit'))
                        )
                      ),
                      h(
                        'button',
                        {
                          type: 'button',
                          className: 'pe-icon-btn',
                          title: t('removePhase'),
                          disabled: plan.phases.length <= 1,
                          onClick: function () { removePhase(index); },
                        },
                        '×'
                      )
                    ),
                    h(
                      'div',
                      { className: 'pe-phase-body' },
                      h(Field, { label: t('phaseContent'), multiline: true, rows: 4, value: phase.content, onChange: function (v) { patchPhase(index, 'content', v); } }),
                      h(Field, { label: t('phaseStudent'), multiline: true, rows: 2, value: phase.student, onChange: function (v) { patchPhase(index, 'student', v); } }),
                      h(Field, { label: t('phaseOrganization'), multiline: true, rows: 2, value: phase.organization, onChange: function (v) { patchPhase(index, 'organization', v); } })
                    )
                  );
                }),
                h('button', { type: 'button', className: 'pe-add', onClick: addPhase }, t('addPhase'))
              )
            ),

            h(
              Section,
              { index: 9, title: t('extras'), note: t('optional') },
              h(
                'div',
                { className: 'pe-stack' },
                h(Field, {
                  label: t('design'),
                  multiline: true,
                  rows: 3,
                  value: plan.design,
                  onChange: function (v) { patch('design', v); },
                  placeholder: t('designPh'),
                }),
                h(Field, {
                  label: t('load'),
                  multiline: true,
                  rows: 2,
                  value: plan.load,
                  onChange: function (v) { patch('load', v); },
                  placeholder: t('loadPh'),
                }),
                h(Field, {
                  label: t('reflection'),
                  multiline: true,
                  rows: 2,
                  value: plan.reflection,
                  onChange: function (v) { patch('reflection', v); },
                  placeholder: t('reflectionPh'),
                })
              )
            ),

            h(
              Section,
              { index: 10, title: t('attachments'), note: t('attachmentsNote') },
              h(
                'div',
                { className: 'pe-stack' },
                h(
                  'div',
                  { className: 'pe-attach-grid' },
                  PE_ATTACHMENT_PRESETS.map(function (preset) {
                    var on = plan.attachments.indexOf(preset.id) >= 0;
                    return h(
                      'label',
                      { key: 'attach-' + preset.id, className: 'pe-attach' + (on ? ' is-on' : '') },
                      h('input', {
                        type: 'checkbox',
                        checked: on,
                        onChange: function () { toggleAttachment(preset.id); },
                      }),
                      h(
                        'span',
                        { className: 'pe-attach-text' },
                        h('span', { className: 'pe-attach-name' }, preset.label),
                        h('span', { className: 'pe-attach-hint' }, preset.hint)
                      )
                    );
                  })
                ),
                plan.attachments.indexOf('ppt') >= 0
                  ? h(
                      'div',
                      { className: 'pe-ppt' },
                      h(
                        'div',
                        { className: 'pe-ppt-head' },
                        h('span', { className: 'pe-ppt-title' }, t('pptTitle')),
                        h('span', { className: 'pe-ppt-state' }, pptLink ? t('pptLinkReady') : t('pptLinkNone'))
                      ),
                      pptLink
                        ? h(
                            'a',
                            { className: 'pe-link', href: pptLink.url, download: pptLink.fileName },
                            t('pptDownload').replace('{name}', pptLink.fileName)
                          )
                        : h('button', { type: 'button', className: 'pe-btn pe-btn-sm', onClick: makePpt }, t('pptMake')),
                      h('p', { className: 'pe-hint' }, t('pptTip'))
                    )
                  : null,
                quizSelected && quiz
                  ? h(
                      'div',
                      { className: 'pe-quiz' },
                      h(
                        'div',
                        { className: 'pe-quiz-head' },
                        h('span', { className: 'pe-quiz-title' }, t('quizTitle').replace('{n}', String(quiz.questions.length))),
                        h('button', { type: 'button', className: 'pe-btn pe-btn-sm', onClick: reshuffleQuiz }, t('quizReshuffle'))
                      ),
                      h('p', { className: 'pe-hint' }, t('quizTip')),
                      h(
                        'details',
                        { className: 'pe-quiz-details' },
                        h('summary', null, t('quizShow')),
                        h(
                          'div',
                          { className: 'pe-quiz-list' },
                          quiz.questions.map(function (item, index) {
                            return h(
                              'div',
                              { className: 'pe-quiz-item', key: 'quiz-' + index },
                              h('div', { className: 'pe-quiz-q' }, index + 1 + '. ' + item.q),
                              h(
                                'div',
                                { className: 'pe-quiz-options' },
                                item.options.map(function (option, oi) {
                                  return h(
                                    'span',
                                    { className: 'pe-quiz-option', key: 'quiz-opt-' + index + '-' + oi },
                                    'ABCD'[oi] + '. ' + option
                                  );
                                })
                              )
                            );
                          })
                        ),
                        h(
                          'details',
                          { className: 'pe-quiz-answers' },
                          h('summary', null, t('quizAnswers')),
                          h(
                            'p',
                            { className: 'pe-quiz-answer' },
                            quiz.questions
                              .map(function (item, index) {
                                return index + 1 + '.' + 'ABCD'[item.answer];
                              })
                              .join('　')
                          )
                        )
                      )
                    )
                  : null,
                h(Field, {
                  label: t('attachmentOther'),
                  multiline: true,
                  rows: 2,
                  value: plan.attachmentOther,
                  onChange: function (v) { patch('attachmentOther', v); },
                  placeholder: t('attachmentOtherPh'),
                  optional: true,
                }),
                h('p', { className: 'pe-hint' }, t('attachmentsTip'))
              )
            ),

            h(
              'div',
              { className: 'pe-foot' },
              h(
                'p',
                { className: 'pe-status' + (status ? ' is-' + status.kind : '') },
                status ? status.text : t('footHint')
              ),
              h(
                'div',
                { className: 'pe-actions' },
                h('button', { type: 'button', className: 'pe-btn', onClick: reset }, t('reset')),
                h('button', { type: 'button', className: 'pe-btn is-primary', onClick: generate }, t('generate'))
              )
            )
          )
        );
      };
    }

    function peTexts() {
      var zh = {
        title: '体育教案',
        subtitle: '按原稿整理课程，填写后生成可直接打印或提交的 Word 教案。',
        panelTitle: '体育教案',
        basic: '基本信息',
        subject: '学科',
        grade: '年级',
        topic: '课题',
        lessonType: '课型',
        textbook: '教材',
        teacher: '授课教师',
        teacherPh: '可不填',
        classSize: '班级人数',
        classSizePh: '如 40',
        duration: '课时时长',
        minuteUnit: '分钟',
        style: '教学风格',
        styleSectionNote: '写入教案',
        styleNote: '风格说明',
        styleNotePh: '说明这种风格在本节课怎样落实，这段文字会写进生成的教案',
        styleTip: '生成的 Word 教案会写明教学风格与具体做法，可按班级情况继续修改。',
        styleChip: '风格：{name}',
        attachments: '附件',
        attachmentsNote: '随教案提交',
        attachmentOther: '其他附件',
        attachmentOtherPh: '每行一个，如：安全预案、场地布置图',
        attachmentsTip: '勾选的附件会按顺序列在 Word 教案末尾，方便打包提交。',
        attachmentCount: '附件 {n} 项',
        pptTitle: 'PPT 课件',
        pptLinkNone: '生成教案时同步生成，可先单独生成',
        pptLinkReady: '课件已生成，可下载',
        pptMake: '生成 PPT 课件',
        pptDownload: '下载 {name}',
        pptReady: '已生成 {name}，请到下载列表打开。',
        pptReadyInline: 'PPT 课件已生成，可在附件栏下载，教案末尾已附文件名链接。',
        pptFailed: 'PPT 生成失败：',
        pptTip: '选择 PPT 后，生成教案会同时生成一份与当前内容一致的课件；教案末尾会附文件名链接，两个文件放在同一文件夹即可点击打开。',
        quizTitle: '随堂测试（{n} 题）',
        quizReshuffle: '换一套',
        quizShow: '查看题目',
        quizAnswers: '参考答案',
        quizTip: '生成教案时会把这一套选择题附在教案末尾，并给出参考答案；点「换一套」可重新随机出题。',
        analysis: '教材分析',
        analysisLabel: '教材分析',
        studentAnalysis: '学情分析',
        studentAnalysisLabel: '学生情况与已有基础',
        studentAnalysisPh: '例如：二年级学生模仿能力强、喜欢游戏，但注意力集中时间短，力量较弱……',
        objectives: '教学目标',
        objectivePh: '写清“能做什么、做到什么程度”',
        keyPoints: '教学重难点',
        keyPoint: '重点',
        hardPoint: '难点',
        strategies: '突破策略',
        strategiesPh: '每行一条，生成时自动编号（1）（2）……',
        preparation: '教学准备',
        equipment: '器材',
        venue: '场地',
        safety: '安全提示',
        process: '教学过程',
        processNote: '自动统计时长',
        phaseName: '环节',
        phaseMinutes: '时长',
        phaseContent: '教学内容与教师活动',
        phaseStudent: '学生活动',
        phaseOrganization: '组织与要求',
        addPhase: '+ 添加教学环节',
        removePhase: '删除该环节',
        extras: '其他（可选）',
        design: '设计意图',
        designPh: '为什么这样设计，每行一条',
        load: '运动负荷',
        loadPh: '如：练习密度50%—60%；平均心率130—150次/分',
        reflection: '教学反思',
        reflectionPh: '课后填写',
        reset: '恢复原稿',
        generate: '生成 Word 教案',
        resetDone: '已恢复为原稿内容。',
        savedAs: '已生成 {name}，请到下载列表打开。',
        failed: '生成失败：',
        footHint: '生成的 .docx 含基本信息、教学风格、教材分析、目标、重难点、教学过程表格与附件清单，A4 排版可直接打印。',
        objectiveCount: '目标 {n} 条',
        phaseCount: '环节 {n} 个',
        optional: '可选',
      };
      var en = {
        title: 'PE Lesson Plan',
        subtitle: 'Edit the plan and export a print-ready Word document.',
        panelTitle: 'PE Lesson Plan',
        basic: 'Basics',
        subject: 'Subject',
        grade: 'Grade',
        topic: 'Topic',
        lessonType: 'Lesson type',
        textbook: 'Textbook',
        teacher: 'Teacher',
        teacherPh: 'Optional',
        classSize: 'Class size',
        classSizePh: 'e.g. 40',
        duration: 'Duration',
        minuteUnit: 'min',
        style: 'Teaching style',
        styleSectionNote: 'Included in the export',
        styleNote: 'Style notes',
        styleNotePh: 'How this style shows up in this lesson; the text goes into the exported plan',
        styleTip: 'The Word export states the teaching style and how it is carried out; edit it to suit the class.',
        styleChip: 'Style: {name}',
        attachments: 'Attachments',
        attachmentsNote: 'Submitted with the plan',
        attachmentOther: 'Other attachments',
        attachmentOtherPh: 'One per line, e.g. safety plan, venue layout',
        attachmentsTip: 'Selected attachments are listed at the end of the Word plan.',
        attachmentCount: '{n} attachments',
        pptTitle: 'Slide deck',
        pptLinkNone: 'Built together with the plan, or generate it now',
        pptLinkReady: 'Deck ready to download',
        pptMake: 'Generate slides',
        pptDownload: 'Download {name}',
        pptReady: 'Generated {name}; check your downloads.',
        pptReadyInline: 'The slide deck is ready in the attachments box; the plan ends with its file name link.',
        pptFailed: 'Slide generation failed: ',
        pptTip: 'With PPT selected, exporting the plan also builds a matching deck. The plan ends with the file name link; keep both files in the same folder so the link opens.',
        quizTitle: 'Quick quiz ({n} questions)',
        quizReshuffle: 'Shuffle',
        quizShow: 'Show questions',
        quizAnswers: 'Answer key',
        quizTip: 'Exporting the plan appends this quiz and its answer key; use Shuffle for a new set of questions.',
        analysis: 'Textbook analysis',
        analysisLabel: 'Textbook analysis',
        studentAnalysis: 'Learner analysis',
        studentAnalysisLabel: 'Learners and prior experience',
        studentAnalysisPh: 'e.g. Grade 2 learners imitate well and enjoy games, but their attention span is short…',
        objectives: 'Objectives',
        objectivePh: 'What they can do, and how well',
        keyPoints: 'Key points and difficulties',
        keyPoint: 'Key point',
        hardPoint: 'Difficulty',
        strategies: 'Strategies',
        strategiesPh: 'One per line; numbered automatically',
        preparation: 'Preparation',
        equipment: 'Equipment',
        venue: 'Venue',
        safety: 'Safety',
        process: 'Teaching process',
        processNote: 'Total time is summed',
        phaseName: 'Phase',
        phaseMinutes: 'Time',
        phaseContent: 'Content and teacher activity',
        phaseStudent: 'Student activity',
        phaseOrganization: 'Organization and requirements',
        addPhase: '+ Add phase',
        removePhase: 'Remove this phase',
        extras: 'Optional sections',
        design: 'Design rationale',
        designPh: 'Why the lesson is designed this way, one per line',
        load: 'Training load',
        loadPh: 'e.g. density 50–60%; average heart rate 130–150 bpm',
        reflection: 'Reflection',
        reflectionPh: 'Fill in after the lesson',
        reset: 'Reset to draft',
        generate: 'Export Word',
        resetDone: 'Restored the original draft content.',
        savedAs: 'Generated {name}; check your downloads.',
        failed: 'Export failed: ',
        footHint: 'The .docx includes basics, teaching style, analysis, objectives, key points, a teaching-process table and the attachment list, A4 print-ready.',
        objectiveCount: '{n} objectives',
        phaseCount: '{n} phases',
        optional: 'optional',
      };
      return { zh: zh, en: en };
    }

    /* 注册侧边栏入口与主面板，并把界面文案交给客户端 locale 服务。 */

    function peApply(ctx) {
      var texts = peTexts();
      var fallback = texts.zh;
      var translate = null;
      try {
        ctx.locale.register('peLessonPlan', 'zh', texts.zh);
        ctx.locale.register('peLessonPlan', 'en', texts.en);
        translate = ctx.locale.bind('peLessonPlan');
      } catch (error) {
        translate = null;
      }

      function t(key) {
        if (translate) {
          try {
            var value = translate(key);
            if (typeof value === 'string' && value) return value;
          } catch (error) {
            /* 回落到内置中文文案 */
          }
        }
        return fallback[key] || key;
      }

      var Panel = peCreatePanel(React, t);

      function PeIcon(props) {
        var size = props && typeof props.size === 'number' ? props.size : 18;
        return pePanelIcon(size, !!(props && props.active));
      }

      ctx.effect(function () {
        return ctx.slots.inject('sidebar.panellist', function () {
          return ctx.slots.register(
            {
              name: 'sidebar.panellist',
              id: 'pe-lesson-plan',
              order: 20,
              label: function () {
                return t('panelTitle');
              },
            },
            PeIcon
          );
        });
      });

      ctx.effect(function () {
        return ctx.slots.inject('main', function () {
          return ctx.slots.register({ name: 'main', key: 'pe-lesson-plan' }, Panel);
        });
      });
    }

    return { inject: ['slots', 'locale'], apply: peApply };
  },
});
