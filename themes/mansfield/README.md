# Mansfield

A brand new default theme for [Hexo].

- [Preview](http://hexo.io/hexo-theme-mansfield/)

## Installation

### Install

``` bash
$ git clone https://github.com/hexojs/hexo-theme-mansfield.git themes/mansfield
```

**mansfield requires Hexo 2.4 and above.**

### Enable

Modify `theme` setting in `_config.yml` to `mansfield`.

### Update

``` bash
cd themes/mansfield
git pull
```

## Configuration

``` yml
# Header
menu:
  Home: /
  Archives: /archives
rss: /atom.xml

# Content
excerpt_link: Read More

# Sidebar
sidebar: right
widgets:
- category
- tag
- tagcloud
- archives
- recent_posts

# Miscellaneous
google_analytics:
favicon: /favicon.png
twitter:
google_plus:
```

- **menu** - Navigation menu
- **rss** - RSS link
- **excerpt_link** - "Read More" link at the bottom of excerpted articles. `false` to hide the link.
- **sidebar** - Sidebar style. You can choose `left`, `right`, `bottom` or `false`.
- **widgets** - Widgets displaying in sidebar
- **google_analytics** - Google Analytics ID
- **favicon** - Favicon path
- **twitter** - Twiiter ID
- **google_plus** - Google+ ID

## Features

### Sidebar

You can put your sidebar in left side, right side or bottom of your site by editing `sidebar` setting.

mansfield provides 5 built-in widgets:

- category
- tag
- tagcloud
- archives
- recent_posts

All of them are enabled by default. You can edit them in `widget` setting.

## Development

### Requirements

- [Grunt] 0.4+
- Hexo 2.4+