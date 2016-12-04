---
title: 'Use Gulp for Drupal 8 with Teams, Part 1: Gulp Setup'
date: 2016-10-26 12:41:31
tags:
- gulp
- javascript
categories:
- Development
---

Gulp is a mainstay of front-end development nowadays. Of course, like all front-end development tools, there is a massive proliferation of build systems, from Webpack to SystemJS and Grunt to Gulp. Yet, we at Zivtech find ourselves using mostly Gulp, particularly when dealing with Drupal 8 projects.

This article is the first of a series of posts where I outline how Zivtech uses Gulp. In this first part, I'll talk about our reasoning and setup process.

## Why does Zivtech use Gulp for Drupal 8?

The choice of Gulp over other front end tools is due to how Drupal utilizes front-end assets. It's perfectly fine to use something like Webpack or Browserify with Drupal, but those all-encompassing, "build and combine all the things!" systems are best used for projects that don't have a built-in asset pipeline. For example, Drupal concatenates and minifies CSS and JS for us, and it's really just over-compiling (is that a word?) to use something that Drupal obviates.

Also, we use Gulp over Grunt or even Broccoli (because yes, that's a thing too) strictly because Zivtech does a lot of node.js development as well. The concept of streams and buffers in Gulp are used throughout node.js, and it makes sense that we'd align with our other development.

## Many projects and distributed teams

As a client services company, Zivtech has many projects and several teams working on projects. Thus, our building tasks have to be somewhat abstract so as to apply to most situations. So the first step to conquering the Gulp pipeline is figuring out a way to make the tasks themselves static, but let the configuration remain changeable.

Some examples of these changeable settings include: the website address that [Browsersync][1] should proxy when watching your development. It's possible that this website address could change on a per-user basis too. Also, the website name would change on a per-site basis too.

Within each project, we could just alter the Gulp tasks directly to account for these differences. Yet some people on the team may not be too familiar with Gulp and you might be sending them into the weeds trying to suss out "that one weird setting" they should change.

At this point you might be thinking we should make a settings file for each project's Gulp tasks, and you'd be correct if so! The Gulp tasks remain the same, but the settings always change.

As it turns out, Drupal 8 has a preferred method for settings files: the YAML format. Being a flexible guy, I vote for just sticking with what the system wants. Thus, our new settings files will be written in YAML.

## Using YAML for Gulp settings

First, let's think about how we're going to implement settings from a big picture perspective. We've already determined that we'll work in YAML and we'll have a default group of configuration settings available. We also want each member of the team to be able to override some settings to fit their situations.

It makes sense that we'll have a file called **default.gulpfile.yml** for the default settings. Gulp should merge another file, we'll call it **gulpfile.yml**, on top of the default. The default settings get tracked in Git or your chosen version control system, but the other one should not. This allows for complete flexibility of any setting you or one of your teammates might want.

In **default.gulpfile.yml**, start off by creating some basic settings:

``` yaml
themeName: "myTheme"
themeDescription: "myTheme description"
```

Next, create a **gulpfile.yml** to contain your customized settings:

``` yaml
themeName: "myRenamedTheme"
```

When Gulp runs, the **themeDescription** setting should match default, but the **themeName** setting should be overridden.

Finally, in your **gulpfile.js**:

``` javascript
(function () { 'use strict'; 
  var gulp = require('gulp'); 
  var yaml = require('js-yaml'); 
  var fs = require('fs'); 
  var assign = require('lodash.assign'); 
  
  // read default config settings
  var config = yaml.safeLoad(fs.readFileSync('default.gulpfile.yml', 'utf8'), {json: true}); 
  try { 
    // override default config settings
    var customConfig = yaml.safeLoad(fs.readFileSync('gulpfile.yml', 'utf8'), {json: true});
    config = assign(config, customConfig); 
  }
  catch (e) { 
    console.log('No custom config found! Proceeding with default config only.');
  } 
})();
```

Now, when you run any Gulp task, your config files will get merged by lodash. One day, [Object.assign][2] will be more widely available, and lodash won't be needed any longer. For now, things work fine this way.

You'll notice that loading the custom config is in a try ... catch block. We do that so there are no show-stopping errors if the custom config is not found. Additionally, if it's not found we can let the user know that only default settings are in use.

## Wrapping up

Well, this has been a high-level explanation of how and why we use Gulp at Zivtech for D8 projects.

In the coming articles in this series, I'll expand on the simple **gulpfile.js** and **default.gulpfile.yml** files started. I plan to outline our process for linting and compiling CSS, linting and compiling JavaScript, and a couple extra tasks too, like integrating Bower and favicon generation. Until then!

**Posts in this series**

1. [Use Gulp for Drupal 8 with Teams, Part 1: Gulp Setup][3]
2. [Use Gulp for Drupal 8 with Teams, Part 2: Creating tasks][4]

[1]: https://www.browsersync.io
[2]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
[3]: https://ofjamescole.com/post/use-gulp-drupal-8-teams-part-1-gulp-setup
[4]: https://ofjamescole.com/post/use-gulp-drupal-8-teams-part-2-creating-tasks

[Cross-posted](https://www.zivtech.com/blog/use-gulp-drupal-8-teams-part-1-gulp-setup "Permalink to Use Gulp for Drupal 8 with Teams, Part 1: Gulp Setup")
  
