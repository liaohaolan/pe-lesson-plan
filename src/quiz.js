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
