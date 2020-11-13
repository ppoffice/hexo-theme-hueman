const moment = require('moment');
const { Component, Fragment } = require('inferno');
const ArticleLicensing = require('hexo-component-inferno/lib/view/misc/article_licensing');
const Share = require('./share');
const Donates = require('./donates');
const Comment = require('./comment');

/**
 * Get the word count of text.
 */
function getWordCount(content) {
  if (typeof content === 'undefined') {
    return 0;
  }
  content = content.replace(/<\/?[a-z][^>]*>/gi, '');
  content = content.trim();
  return content ? (content.match(/[\u00ff-\uffff]|[a-zA-Z]+/g) || []).length : 0;
}

module.exports = class extends Component {
  render() {
    const { config, helper, page } = this.props;
    const { article, plugins } = config;
    const { url_for, date, date_xml, __, _p } = helper;

    const language = page.lang || page.language || config.language || 'en';

    return (
      <Fragment>
        {/* Main content */}
        <div class="card">
          {/* Metadata */}
          <article
            class={`card-content article${'direction' in page ? ' ' + page.direction : ''}`}
            role="article">
            {/* Title */}
            <h1 class="title is-3 is-size-4-mobile">{page.title}</h1>
            {page.layout !== 'page' ? (
              <div class="article-meta is-size-7 is-uppercase">
                {/* Creation Date */}
                {page.date ? (
                  <span class="article-meta-item">
                    <i class="far fa-calendar-plus mr-2"></i>
                    <time
                      dateTime={date_xml(page.date)}
                      title={_p('article.created_at', date_xml(page.date))}>
                      {date(page.date)}
                    </time>
                  </span>
                ) : null}
                {/* Last Update Date */}
                {page.updated ? (
                  <span class="article-meta-item">
                    <i class="far fa-calendar-check mr-2"></i>
                    <time
                      dateTime={date_xml(page.updated)}
                      title={_p('article.updated_at', date_xml(page.updated))}>
                      {date(page.updated)}
                    </time>
                  </span>
                ) : null}
                {/* author */}
                {page.author ? (
                  <span class="article-meta-item">
                    <i class="fas fa-feather-alt mr-2"></i>
                    {page.author}
                  </span>
                ) : null}
                {/* Read time */}
                {article && article.readtime && article.readtime === true ? (
                  <span class="article-meta-item">
                    <i class="far fa-hourglass mr-2"></i>
                    {(() => {
                      const words = getWordCount(page._content);
                      const time = moment.duration((words / 150.0) * 60, 'seconds');
                      return (
                        `${_p('article.read_time', time.locale(language).humanize())} ` +
                        `(${_p('article.word_count', words)})`
                      );
                    })()}
                  </span>
                ) : null}
                {/* Visitor counter */}
                {plugins && plugins.busuanzi === true ? (
                  <span class="article-meta-item" id="busuanzi_container_page_pv">
                    <i class="far fa-eye mr-2"></i>
                    <span
                      dangerouslySetInnerHTML={{
                        __html: _p(
                          'plugin.visit_count',
                          '<span id="busuanzi_value_page_pv">0</span>',
                        ),
                      }}></span>
                  </span>
                ) : null}
              </div>
            ) : null}
            {/* Content/Excerpt */}
            <div class="content" dangerouslySetInnerHTML={{ __html: page.content }}></div>
            {/* Licensing block */}
            {article && article.licenses && Object.keys(article.licenses) ? (
              <ArticleLicensing.Cacheable page={page} config={config} helper={helper} />
            ) : null}
            {/* Tags */}
            {page.tags && page.tags.length ? (
              <div class="article-tags is-size-7 mb-4">
                <i class="fas fa-tags mr-2"></i>
                {page.tags.map((tag) => (
                  <a class="mr-2" rel="tag" href={url_for(tag.path)}>
                    {tag.name}
                  </a>
                ))}
              </div>
            ) : null}
            {/* Share button */}
            <Share config={config} page={page} helper={helper} />
          </article>
        </div>
        {/* Donate button */}
        <Donates config={config} helper={helper} />
        {/* Post navigation */}
        {page.prev || page.next ? (
          <nav class="post-navigation mt-4">
            {page.prev ? (
              <a
                class={'article-nav-prev' + (!page.prev ? ' is-hidden-mobile' : '')}
                href={url_for(page.prev.path)}>
                <span>{__('article.newer')}</span>
                <span>{page.prev.title}</span>
              </a>
            ) : null}
            {page.next ? (
              <a
                class={'article-nav-next' + (!page.next ? ' is-hidden-mobile' : '')}
                href={url_for(page.next.path)}>
                <span>{__('article.older')}</span>
                <span>{page.next.title}</span>
              </a>
            ) : null}
          </nav>
        ) : null}
        {/* Comment */}
        <Comment config={config} page={page} helper={helper} />
      </Fragment>
    );
  }
};
