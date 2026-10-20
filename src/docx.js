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
