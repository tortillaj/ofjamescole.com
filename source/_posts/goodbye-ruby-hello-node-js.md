---
title: Goodbye Ruby, Hello Node.js
subtitle: Updated front-end dev workflow
date: 2015-08-12 13:06:32
tags:
- javascript
- sass
- ruby
categories:
- Development
---

Recently at Zivtech we started migrating our base theme for Drupal called [Bearskin][1] over to a gulp-based CSS compiling system. Up until now we had been using [the original Sass][2], written in Ruby, but lately it's been feeling a bit slow.

The sluggishness of Ruby's Sass really started showing with very large projects, and became a nuissance when coupled with LiveReload. Let's face it, when you make a single CSS change, waiting for even a couple seconds can feel like an eternity.

The first step to speed things up was to get rid of some mixins that we no longer needed. The low-hanging fruit was Compass. Compass is an amazing framework that we had come to rely on, but now that browsers have largely caught up with each other, there isn't been much need for Compass's vendor prefixing mixins. Instead, when we do need it we can use an [Autoprefixer][3] or write our own mixin. Easy enough!

After getting Compass and some other Ruby gems out of the way we saw some improvement, but not enough to make us happy! So the search continued...

We decided as a group to move over to [Gulp][4] and try to get rid of Ruby altogether.

Why Gulp? Gulp is all node-based, so we were able to use [gulp-sass][5] for compiling our CSS. That gulp plugin is just a thin-wrapper around [libsass][6], a C/C++ implementation that is wicked fast, even for large projects.

Some quick Google searches lead me to benchmarks performed by [The Opinionated Programmer][7] that compare several CSS preprocessors. Long story short, libsass is about 25 times faster than Ruby on a first run, and after Ruby has a sass-cache available libsass is still about 12 times faster. That's a massive improvement!

[1]: https://www.drupal.org/project/bear_skin
[2]: https://github.com/nex3/sass
[3]: https://github.com/postcss/autoprefixer
[4]: http://gulpjs.com/
[5]: https://www.npmjs.com/package/gulp-sass
[6]: https://github.com/hcatlin/libsass
[7]: http://www.solitr.com/blog/2014/01/css-preprocessor-benchmark/


[Cross-posted](https://zivtech.com/blog/goodbye-ruby-hello-nodejs-speeding-sass "Permalink to Goodbye Ruby, Hello Node.js: Speeding up Sass")
