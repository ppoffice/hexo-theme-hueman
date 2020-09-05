const { Component } = require('inferno');
const { cacheComponent } = require('hexo-component-inferno/lib/util/cache');
const Navbar = require('./navbar');

function isSameLink(a, b) {
  function santize(url) {
    let paths = url
      .replace(/(^\w+:|^)\/\//, '')
      .split('#')[0]
      .split('/')
      .filter((p) => p.trim() !== '');
    if (paths.length > 0 && paths[paths.length - 1].trim() === 'index.html') {
      paths = paths.slice(0, paths.length - 1);
    }
    return paths.join('/');
  }
  return santize(a) === santize(b);
}

class Header extends Component {
  render() {
    const {
      logo,
      logoUrl,
      siteUrl,
      siteTitle,
      siteSubtitle,
      menu,
      links,
      showToc,
      tocTitle,
      showSearch,
      searchTitle,
    } = this.props;

    return (
      <section class="hero">
        <div class="hero-body">
          <div class="container">
            <h1 class="title">
              <a class="logo" href={siteUrl}>
                {logo && logo.text ? logo.text : <img src={logoUrl} alt={siteTitle} />}
              </a>
            </h1>
            {siteSubtitle && <h2 class="subtitle">{siteSubtitle}</h2>}
          </div>
        </div>
        <Navbar
          logo={logo}
          logoUrl={logoUrl}
          siteUrl={siteUrl}
          siteTitle={siteTitle}
          menu={menu}
          links={links}
          showToc={showToc}
          tocTitle={tocTitle}
          showSearch={showSearch}
          searchTitle={searchTitle}
        />
      </section>
    );
  }
}

module.exports = cacheComponent(Header, 'common.header', (props) => {
  const { config, helper, page } = props;
  const { url_for, _p, __ } = helper;
  const { logo, title, subtitle, navbar, widgets, search } = config;

  const hasTocWidget = Array.isArray(widgets) && widgets.find((widget) => widget.type === 'toc');
  const showToc =
    (config.toc === true || page.toc) && hasTocWidget && ['page', 'post'].includes(page.layout);

  const menu = {};
  if (navbar && navbar.menu) {
    const pageUrl = typeof page.path !== 'undefined' ? url_for(page.path) : '';
    Object.keys(navbar.menu).forEach((name) => {
      const url = url_for(navbar.menu[name]);
      const active = isSameLink(url, pageUrl);
      menu[name] = { url, active };
    });
  }

  const links = {};
  if (navbar && navbar.links) {
    Object.keys(navbar.links).forEach((name) => {
      const link = navbar.links[name];
      links[name] = {
        url: url_for(typeof link === 'string' ? link : link.url),
        icon: link.icon,
      };
    });
  }

  return {
    logo,
    logoUrl: url_for(logo),
    siteUrl: url_for('/'),
    siteTitle: title,
    siteSubtitle: subtitle,
    menu,
    links,
    showToc,
    tocTitle: _p('widget.catalogue', Infinity),
    showSearch: search && search.type,
    searchTitle: __('search.search'),
  };
});
