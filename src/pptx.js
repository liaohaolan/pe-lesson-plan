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
