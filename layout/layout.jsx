const { Component } = require('inferno');
const classname = require('hexo-component-inferno/lib/util/classname');
const Head = require('./common/head');
const Header = require('./common/header');
const Sidebar = require('./common/sidebar');
const Footer = require('./common/footer');
const Scripts = require('./common/scripts');
const Search = require('./common/search');

module.exports = class extends Component {
  render() {
    const { site, config, page, helper, body } = this.props;
    const { sidebar = {} } = config;
    const { position = 'left' } = sidebar;

    const language = page.lang || page.language || config.language;

    return (
      <html lang={language ? language.substr(0, 2) : ''}>
        <Head site={site} config={config} helper={helper} page={page} />
        <body>
          <Header config={config} helper={helper} page={page} />
          <section class="section">
            <div class="container">
              <div class="columns is-gapless">
                <div
                  class={classname({
                    'column column-main is-8-tablet is-8-desktop is-8-widescreen': true,
                    'order-2': position === 'left',
                    'order-1': position === 'right',
                  })}
                  dangerouslySetInnerHTML={{ __html: body }}></div>
                <Sidebar site={site} config={config} page={page} helper={helper} />
              </div>
            </div>
          </section>
          <Footer config={config} helper={helper} />
          <Scripts site={site} config={config} helper={helper} page={page} />
          <Search config={config} helper={helper} />
        </body>
      </html>
    );
  }
};
