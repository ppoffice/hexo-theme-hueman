const { Component, Fragment } = require('inferno');
const classname = require('hexo-component-inferno/lib/util/classname');

class Navbar extends Component {
  render() {
    const {
      menu,
      links,
      showToc,
      tocTitle,
      showSearch,
      searchTitle,
    } = this.props;

    return (
      <nav class="navbar navbar-main">
        <div class="container">
          <div class="navbar-menu">
            {Object.keys(menu).length ? (
              <div class="navbar-start">
                {Object.keys(menu).map((name) => {
                  const item = menu[name];
                  return (
                    <a
                      class={classname({ 'navbar-item': true, 'is-active': item.active })}
                      href={item.url}>
                      {name}
                    </a>
                  );
                })}
              </div>
            ) : null}
            <div class="navbar-end">
              {Object.keys(links).length ? (
                <Fragment>
                  {Object.keys(links).map((name) => {
                    const link = links[name];
                    return (
                      <a
                        class="navbar-item"
                        target="_blank"
                        rel="noopener"
                        title={name}
                        href={link.url}>
                        {link.icon ? <i class={link.icon}></i> : name}
                      </a>
                    );
                  })}
                </Fragment>
              ) : null}
              {showToc ? (
                <a
                  class="navbar-item is-hidden-tablet catalogue"
                  title={tocTitle}
                  href="javascript:;">
                  <i class="fas fa-list-ul"></i>
                </a>
              ) : null}
              {showSearch ? (
                <a class="navbar-item search" title={searchTitle} href="javascript:;">
                  <i class="fas fa-search"></i>
                </a>
              ) : null}
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

module.exports = Navbar;
