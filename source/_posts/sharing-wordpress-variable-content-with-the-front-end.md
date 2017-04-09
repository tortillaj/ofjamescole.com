---
date: 2013-10-14T18:16:24-04:00
title: Using JavaScript with WordPress
subtitle: Sharing WordPress Variable Content with the Front End
comments: true
share: true
tags:
    - wordpress
    - php
    - javascript
categories:
    - Development
---

Many times when working on WordPress sites, you’ll find yourself wanting to pass variables entered into the WordPress admin system to the front end for use in Javascript.

## Common Use Cases

There are many reasons you might want to accomplish this task. For example, you may have a plugin where a user enters parameters like speed, duration, and transition effects for a slider through the WordPress admin. On the front end, when creating this slider in Javascript, you’ll want to collect those parameters to control the slider. A second example might be a case where a user can select options for an accordion or tabbed interface, and on the front end you use Javascript to enable or disable those settings.

The most common example I’ve seen where a developer wants to pass variables from PHP into Javascript in a WordPress theme is the AJAX URL made available by WordPress core. After version 2.8, WordPress automatically includes the AJAX URL as a global Javascript variable called ajaxurl. However, before 2.8, I frequently saw template files with a PHP call to generate the AJAX URL on the front end. It was not a very clean solution!

## A Simple, Clean Solution

Moving on, let’s say you want to access the site name in Javascript. In WordPress, you enter the site name in the Settings section of the admin panel. In PHP, you can access the site name using the get_bloginfo() function. To get the site name into Javascript, we’re going to use the wp_localize_script() function, which is a function originally intended to help translating scripts.

In PHP, you register a javascript file for inclusion in a theme, then pass the site name through the script localization function:

``` php
// retrieve the site name
$site_name = get_bloginfo( 'name' );

// register & enqueue a javascript file called globals.js
wp_register_script( 'globals', get_stylesheet_directory_uri() . '/path/to/javascript/globals.js', array(), 1.0.0, false );
wp_enqueue_script( 'globals' );

// use wp_localize_script to pass PHP variables into javascript
wp_localize_script( 'globals', 'ourPhpVariables', array( siteName => $site_name ) );
```

Once you’ve done this, you can access a global variable in Javascript:

``` javascript
// view the entire object of PHP variables
console.dir(ourPhpVariables);

// retrieve the site name from the object
var siteName = ourPhpVariables.siteName;
```

## Advanced Usage

Now that we know the method of passing PHP variables to Javascript, let’s take things a step further. When working on large CMS themes, like those for WordPress, I like to create a global Javascript object specific to the theme. That way, if I have 20 different Javascript variables to pass from PHP to the front end, I won’t pollute the global space with so many variables. Instead, I can sequester all 20 of them inside a single object.

Just like before, we register and enqueue a Javascript file. Yet this time we split off the PHP variable collection into its own function. This new function returns a JSON string that gets pushed out into the front end:

``` php
// retrieve the site name
$site_name = get_bloginfo( 'name' );

// register & enqueue a javascript file called globals.js
wp_register_script( 'globals', get_stylesheet_directory_uri() . '/path/to/javascript/globals.js', array(), 1.0.0, false );
wp_enqueue_script( 'globals' );

// use wp_localize_script to pass PHP variables into javascript
wp_localize_script( 'globals', 'ourPhpVariables', collect_javascript_variables() );

// a function to collect PHP variables and return them as JSON
function collect_javascript_variables() {

  $settings = new stdClass();
  $settings->siteName = get_bloginfo( 'name' );

  // tell javascript who is currently logged in
  $currentUser = wp_get_current_user();
  $settings->currentUser = $currentUser->data;

  return json_encode($settings);

}
```

Now, in the Javascript file we have called globals.js:

``` javascript
// retrieve ourPhpVariables from the global space
// and create a new object if it does not exist
var ThemeName = jQuery.parseJSON(ourPhpVariables) || {};
```

Once you’ve done this, you can get any information you stored using the collect_javascript_variables() function. For example, to get the currently logged in user:

``` javascript
var userName = ThemeName.currentUser.user_login;
```

## The Final Word

As you can see, this is a very simple way to send PHP data to the front end for use in Javascript. Whether you’re looking for a simple solution to pass admin settings to Javascript, or something more advanced like parsing a JSON array of posts with Javascript, you should find this post helpful!
