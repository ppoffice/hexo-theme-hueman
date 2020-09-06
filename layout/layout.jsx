const { Component } = require('inferno');
const Head = require('./common/head');
const Header = require('./common/header');
const Footer = require('./common/footer');
const Scripts = require('./common/scripts');
const Search = require('./common/search');

module.exports = class extends Component {
  render() {
    const { site, config, page, helper, body } = this.props;

    const language = page.lang || page.language || config.language;

    return (
      <html lang={language ? language.substr(0, 2) : ''}>
        <Head site={site} config={config} helper={helper} page={page} />
        <body>
          <Header config={config} helper={helper} page={page} />
          <section class="section">
            <div class="container">
              <div class="columns">
                <div dangerouslySetInnerHTML={{ __html: body }}></div>
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
