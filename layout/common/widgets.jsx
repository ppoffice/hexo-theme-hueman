const logger = require('hexo-log')();
const { Component } = require('inferno');
const view = require('hexo-component-inferno/lib/core/view');

class Widgets extends Component {
  render() {
    const { site, config, page, helper } = this.props;
    const { widgets } = config;

    if (!Array.isArray(widgets) || !widgets.length) {
      return null;
    }

    return (
      <div class="widgets">
        {widgets.map((widget) => {
          // widget type is not defined
          if (!widget.type) {
            return null;
          }
          try {
            let Widget = view.require('widget/' + widget.type);
            Widget = Widget.Cacheable ? Widget.Cacheable : Widget;
            return (
              <Widget site={site} helper={helper} config={config} page={page} widget={widget} />
            );
          } catch (e) {
            logger.w(`Hueman cannot load widget "${widget.type}"`);
          }
          return null;
        })}
      </div>
    );
  }
}

module.exports = Widgets;
