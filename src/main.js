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
