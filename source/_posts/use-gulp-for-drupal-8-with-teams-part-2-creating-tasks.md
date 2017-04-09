---
title: Creating Gulp Tasks
subtitle: Use Gulp for Drupal 8 with Teams, Part 2
date: 2016-11-15 12:53:04
tags:
- gulp
- javascript
categories:
- Development
---

This post is the second in a series covering Zivtech's usage of Gulp for front-end development in Drupal 8.

In the last post, I covered [how to setup Gulp for teamwork on Drupal 8 projects][1]. In this post, I'll go over how to get started with writing Gulp tasks. I'll also break down a specific task for Sass linting to ensure good code quality.

## Maintainable and Readable Gulp tasks

With any mid-to-large sized Drupal 8 theme, it's really easy for the main Gulp file (**gulpfile.js**) become unwieldy and complex. With dozens of tasks doing all kinds of automated work, before too long, **gulpfile.js** becomes a soup of illegible code.

Additionally, members of your team might have different ways of naming Gulp tasks. One person might write a Sass building task called "buildSass" and another might create an identical task called "css."

It'd be nice to strip down **gulpfile.js**, make it readable, and somehow compartmentalize each task separately. Also, we want to cut down on task naming variations and create a unified system for structuring our tasks.

My current favorite way to handle these wishes is [gulp-require-tasks][2]. Basically, each task is written as an individual, CommonJS style module. Then, the tasks are arranged in directories, and that directory structure defines the task name. It is a very simple and predictable way to setup Gulp tasks.

### Structuring Gulp tasks

Start off by creating the file tree structure below:

```
├── project/
│   ├── .gitignore (ignore node_modules, gulpfile.yml)
│   ├── package.json
│   ├── gulpfile.js
│   ├── default.gulpfile.yml
│   ├── sass
│   │   ├── styles.scss
│   ├── js
│   │   ├── scripts.js
│   ├── gulp-tasks
│   │   ├── styles
│   │   │   ├── lint.js
│   │   │   ├── build.js
│   │   ├── scripts
│   │   │   ├── lint.js
│   │   │   ├── build.js
```

[The YAML settings file][1], **default.gulpfile.yml**, was discussed in the last post of this series, if you need a refresher.

gulp-require-tasks lets these tasks be accessible according to their structure. For example, to build the styles, you'll run "gulp styles:build" and to lint the JavaScript, you'll run "gulp scripts:lint." If you don't like the colon delimiter, you can change that too.

### Update Gulp settings

In the last post we started the **default.gulpfile.yml**, and now we'll edit that same file to add in settings for the Gulp tasks we'll create in this project.

Open the file: it should look like this:

``` yaml
themeName: "myTheme"
themeDescription: "myTheme description"
```

Expand on that by adding settings for source and destination paths of Sass and JS:

``` yaml
themeName: "myTheme"
themeDescription: "myTheme description"
styles:
  src: "sass/**/*.scss",
  dest: "css"
  lint:
    enabled: true
    failOnError: false
scripts:
  src: "js/**/*.js",
  lint:
    enabled: true
    failOnError: false
```

Under the "styles" and "scripts" sections of the YAML, you can see I added some linting options too. From within the YAML settings, people can enable or disable linting, and also decide if they want the Gulp process to stop when linting errors are detected.

Pulling these settings out of the Gulp tasks themselves and into this YAML file means that developers don't have to search through the tasks looking for settings to change. Instead, they have every setting exposed to them in this one, concise file.

## Importing tasks for Gulp

We haven't written any Gulp tasks yet, but we can go ahead and setup importing them so they can be used.

Open up the **gulpfile.js** we started in the last post. It should look like this:

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

If you recall, we loaded the **default.gulpfile.yml** and overrode that with any settings from **gulpfile.yml** if it exists. The **gulpfile.yml** file has the exact same structure has **default.gulpfile.yml**, but settings can have different values. This lets other developers on the team override some settings if needed.

At this point in **gulpfile.js**, the config is loaded and ready to be used. Next, we integrate [gulp-require-tasks][2].

``` javascript
(function () {
  'use strict';
  var gulp = require('gulp');
  var yaml = require('js-yaml');
  var fs = require('fs');
  var assign = require('lodash.assign');
  var gulpRequireTasks = require('gulp-require-tasks');

  // read default config settings
  var config = yaml.safeLoad(fs.readFileSync('default.gulpfile.yml', 'utf8'), {json: true});
  try {
    // override default config settings
    var customConfig = yaml.safeLoad(fs.readFileSync('gulpfile.yml', 'utf8'), {json: true});
    config = assign(config, customConfig);
  } catch (e) {
    console.log('No custom config found! Proceeding with default config only.');
  }

  gulpRequireTasks({
    path: process.cwd() + '/gulp-tasks',
    arguments: [config]
  });
})();
```

Setting up gulp-require-tasks is super easy. We tell it where our gulp tasks are located, in the "gulp-tasks" directory.

Then, to each module (i.e. 1 module will be 1 Gulp task) in the directory, gulp-require-tasks passes arguments to each task. The first argument is always gulp itself. The "arguments" setting for gulp-require-tasks is an array of other things you want to pass to each module. I've opted to pass in "config," which is the object representing the settings merge in the YAML files.

This is essentially all you need in gulpfile.yml. However, I also like to add shortcut tasks too, that combine other tasks for quicker use. For example, general "build" and "lint" tasks might be like this:

``` javascript
gulp.task('build', ['styles:build', 'scripts:build']);
gulp.task('lint', ['styles:lint', 'scripts:lint']);
```

### Modular Gulp tasks

Let's start off creating the Sass linting task. To help with this, I recommend using [gulp-sass-lint][3]. You'll want to [read over how to setup sass-lint][4], which I won't cover in detail here. Essentially, you create a **.sass-lint.yml** file in the root of the project. That file contains all the rules you want to validate; for example, should developers avoid styling with IDs or should they use RGB rather than HEX values for colors.

After sass-lint rules are in place, open up the styles linting file. Here you'll see the guts of the linting task:

``` javascript
'use strict';

var cached = require('gulp-cached');
var sassLint = require('gulp-sass-lint');
var gulpif = require('gulp-if');

module.exports = function (gulp, options) {
  if (options.styles.lint.enabled) {
    return gulp.src(options.styles.src)
      .pipe(cached('styles:lint'))
      .pipe(sassLint())
      .pipe(sassLint.format())
      .pipe(gulpif(options.styles.lint.failOnError, sassLint.failOnError()));
  }
  else {
    return console.log('css linting not enabled');
  }
};
```

For the three required packages, you'll want to "npm install" them of course. Don't forget the "--save-dev" flag to get those packages stored in package.json!

The bulk of the code exists within the standard, CommonJS "module.exports" directive. A Gulp process is passed into the task as well as the set of options from **default.gulpfile.yml**.

We start off by running a quick if/else check so that we short-circuit out of this task if the user disabled Sass linting. Then, we pipe in the files that we selected in the Gulp settings' "styles.src" section. Files are then piped through [gulp-cached][5], which keeps a list of the source files (and contents!) in memory. This makes the task faster.

Next, the styles are linted and the results are formatted and reported out to the console. Finally, we use [gulp-if][6] to determine if the Gulp process gets terminated now should there be linting errors.

### The sky's the limit

I leave it as an exercise for the reader to go about developing the other Gulp tasks. In the next post, I'll go over some other, more complicated Gulp tasks to show more advanced usage. Until then, you're more than welcome to [look over and reference][7] our own Gulp tasks we publish for [Bear Skin][8].

**Posts in this series**

1. [Use Gulp for Drupal 8 with Teams, Part 1: Gulp Setup][1]
2. [Use Gulp for Drupal 8 with Teams, Part 2: Creating tasks][9]

[1]: https://ofjamescole/post/use-gulp-drupal-8-teams-part-1-gulp-setup
[2]: https://www.npmjs.com/package/gulp-require-tasks
[3]: https://www.npmjs.com/package/gulp-sass-lint
[4]: https://github.com/sasstools/sass-lint/tree/master#configuration-documentation
[5]: https://www.npmjs.com/package/gulp-cache
[6]: https://www.npmjs.com/package/gulp-if
[7]: https://github.com/zivtech/bear_skin/tree/8.x-2.x/gulp-tasks
[8]: https://www.drupal.org/project/bear_skin
[9]: https://ofjamescole.com/post/use-gulp-drupal-8-teams-part-2-creating-tasks

[Cross-posted](https://zivtech.com/blog/use-gulp-drupal-8-teams-part-2-creating-tasks "Permalink to Use Gulp for Drupal 8 with Teams, Part 2: Creating tasks")
