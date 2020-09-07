const { Component } = require('inferno');
const { cacheComponent } = require('hexo-component-inferno/lib/util/cache');
const classname = require('hexo-component-inferno/lib/util/classname');
const Widgets = require('./widgets');

class SocialLinks extends Component {
  render() {
    const { title, links = {} } = this.props;

    return (
      <div class="social-links card">
        <div class="card-content">
          <div class="level is-mobile">
            <div class="level-start">{title}</div>
            <div class="level-end">
              {Object.keys(links).length ? (
                <div class="field has-addons">
                  {Object.keys(links).map((name) => {
                    const link = links[name];
                    return (
                      <p class="control">
                        <a
                          class="button is-transparent"
                          target="_blank"
                          rel="noopener"
                          title={name}
                          href={link.url}>
                          {link.icon ? (
                            <span class="icon">
                              <i class={link.icon}></i>
                            </span>
                          ) : (
                            name
                          )}
                        </a>
                      </p>
                    );
                  })}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

SocialLinks.Cacheable = cacheComponent(SocialLinks, 'sidebar.sociallinks', (props) => {
  const { config, helper } = props;
  const { url_for, __ } = helper;
  const { sidebar } = config;

  const links = {};
  if (sidebar && sidebar.social_links) {
    Object.keys(sidebar.social_links).forEach((name) => {
      const link = sidebar.social_links[name];
      links[name] = {
        url: url_for(typeof link === 'string' ? link : link.url),
        icon: link.icon,
      };
    });
  }
  return { links, title: __('widget.follow') };
});

class Sidebar extends Component {
  render() {
    const { site, config, page, helper } = this.props;
    const { sidebar = {} } = config;
    const { position = 'left', sticky = false } = sidebar;

    return (
      <div
        class={classname({
          'sidebar column is-4-tablet is-4-desktop is-4-widescreen': true,
          'order-1': position === 'left',
          'order-2': position === 'right',
        })}>
        <div class={classname({ 'sidebar-inner': true, 'is-sticky': sticky })}>
          <SocialLinks.Cacheable config={config} helper={helper} />
          <Widgets site={site} config={config} page={page} helper={helper} />
        </div>
      </div>
    );
  }
}

module.exports = Sidebar;
