> #### This theme is ported from [AlxMedia](https://github.com/AlxMedia)'s the WordPress theme [Hueman](https://github.com/AlxMedia/hueman).
> #### If you like Hueman, don't forget to 'Star' the project and share it with your friends! :）

# Hueman
### Probably the most beautiful theme for Hexo. [Preview](http://ppoffice.github.io/hexo-theme-hueman/)
![](http://ppoffice.github.io/hexo-theme-hueman/gallery/preview.jpg "")

##### Special thanks to [AlxMedia](https://github.com/AlxMedia), who designed the original theme [Hueman](https://github.com/AlxMedia/hueman) for wordpress.

## Installation

### Install

``` bash
$ git clone https://github.com/ppoffice/hexo-theme-hueman.git themes/hueman
```

**Hueman requires Hexo 3.0.0-rc.4 and above.**
**Old version of Hueman can be found in branch-2.x.**

### Enable

Modify `theme` setting in `_config.yml` to `hueman`.

### Update

``` bash
cd themes/hueman
git pull
```

## Configuration

``` yml
# Header
menu:
  Home: /
  Categories:
  About: /about/index.html

# Content
fancybox: true

# Thumbnail
thumbnail: true

# Scroll Loading
scrollLoading: true

# Sidebar
social_links:
  twitter:
  facebook:
  google_plus:
  weibo:
  rss:
widgets:
- recent_posts
- category
- archive
- tag
- tagcloud
- links

# Links
links:
  Hexo: http://hexo.io

# Miscellaneous
google_analytics:
favicon: /favicon.png
```

- **menu** - Navigation menu. Add '**Categories**' to display categories on the menu, the maximum depth of categories menus is 2 (You don't have to set the value of 'Categories').
- **fancybox** - Enable [Fancybox].
- **thumbnail** - Enable thumbnail images in index pages (Home, Category, Archive, Tag).
- **social_links** - Your social network links, RSS link, etc.
- **widgets** - Widgets displayed in sidebar.
- **links** - Links displayed in the link widget.
- **google_analytics** - Google Analytics ID.
- **favicon** - Favicon path.

## Languages

English and Simplified Chinese are the default languages of the theme. You can add translations in the `languages` folder and change the default language in blog's `_config.yml`.

``` yml
language: zh-CN
```

## Features

### Responsive Layout

Hueman knows on what screen size you are browsering the website, and reorganize the layout to fit your device.

![](http://ppoffice.github.io/hexo-theme-hueman/gallery/responsive.jpg "")

### Categories inside Main Menu

Hueman inserts your blog categories into main menu in the header section. You can enable/disable this feature in `menu` setting.

![](http://ppoffice.github.io/hexo-theme-hueman/gallery/main-menu.jpg "")

### Thumbnail

Hueman finds the first image in every post as the thumbnail for the post. If the post does not contain a image link, Hueman uses the default thumbnail image. You can enable/disable this feature in `thumbnail` setting.

![](http://ppoffice.github.io/hexo-theme-hueman/gallery/thumbnail.jpg "")

### Scroll Loading

Scroll loading means you don't have to load all the images the second you opened the blog. When you scroll down, the plugin make images inside your vision loaded automatically. You can enable/disable this feature in `scrollLoading` setting.

### Fancybox

Hueman uses [Fancybox] to showcase your photos. You can use Markdown syntax or fancybox tag plugin to add your photos.

```
![img caption](img url)
```

### Sidebar

Hueman provides 6 built-in widgets:

- recent_posts
- category
- archives
- tag
- tagcloud
- links

All of them are enabled by default. You can edit them in `widget` setting.

## Development

### Requirements

- [Grunt] 0.4+
- Hexo 3.0+

### Grunt tasks

- **default** - Download [Fancybox] and [Font Awesome].
- **fontawesome** - Only download [Font Awesome].
- **fancybox** - Only download [Fancybox].
- **clean** - Clean temporarily files and downloaded files.

[Hexo]: http://zespia.tw/hexo/
[Fancybox]: http://fancyapps.com/fancybox/
[Font Awesome]: http://fontawesome.io/
[Grunt]: http://gruntjs.com/
