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
