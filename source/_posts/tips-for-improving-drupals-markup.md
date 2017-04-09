---
date: 2012-06-12T18:39:29-04:00
title: Tips for Improving Drupal's Markup
subtitle: Getting a handle on the divs
comments: true
share: true
tags:
    - drupal
    - php
categories:
    - Development
---

Drupal is an incredibly powerful, sophisticated platform and CMS. But like all software, it’s not without its weaknesses. And due to design decisions that place the needs of site maintainers over front-end developers and themers, it can be quite labor-intensive to make Drupal spit out beautiful, semantic HTML5 (POSH) that facilitates fast page loads, search engine processing, DOM manipulation, and the like.

The Drupal developer community is aware of this shortcoming, and work is already under way to improve the theme layer in Drupal 8 so that those who care about good markup can craft it without having to learn the intricacies of template files, hooks, and so on. But until Drupal 8 comes out, what’s a front-end developer to do?

## Start with a good base theme

There’s no reason to start from scratch: countless other themers have tried to corral Drupal’s div-itis, building clean base themes that address many of Drupal’s deeper markup issues, and these make excellent starting points. Themes you shoud consider starting from include Tao, Fusion, Boron, Zen and Omega. Which one is right for you depends on your goals, familiarity with Drupal, desire for HTML5, responsive layout, and so forth. Zen and Omega are particularly popular. You can also check out Mothership, which goes far beyond traditional themes in that if offers options for stripping out lots of superfluous classes Drupal typically adds in (Mothership’s author is quite entertaining, to boot).

### Educate Drupal core about HTML5

Even if you use one of the above HTML5 themes, the core Drupal system still won’t really be “HTML5 aware,” which means that various other modules that might be generating output on your pages will still use older elements. To help these modules out, install Elements and HTML5 Tools, which will give you more options for your form field types, eliminate unnecessary attributes in some elements, and so on.

### Use the Block Class module

Block class is a simple Drupal module that adds a field to block configuration pages for assigning CSS classes to particular blocks, much like how the Views module lets you specify CSS classes for a given view. It’s quite helpful for making blocks easier to target in CSS, and is particularly handy if you take an object-oriented approach to your CSS.

### Try Semantic Views

Speaking of Views: Though it hasn’t been updated in some time, and the Drupal 7 version is still classified as a development release, Semantic Views is an incredibly useful module if your site makes extensive use of them (and what site doesn’t?) — particularly views that pull fields rather than whole nodes. Semantic Views lets you tailor exactly which HTML elements to wrap around each field, so you can fine tune whether titles are in an H1 or an H5, put summaries inside P tags but not DIVs, and so forth. The field-level control is handy to have from within the Drupal UI and saves you from having to develop extra tpl’s or hooks to get these elements right.

### Reduce time spent in tpl files

Several modules exist that provide functionality for rearranging, grouping and otherwise managing fields and others chunks of content on the site. While strictly speaking these modules might not help you write better markup, they can take the place of having to hand-craft dozens of different template files. Highly recommended are Display Suite and Field group, though there are plenty of others to consider (e.g. Renderable elements) depending on your needs. Among other things, Display Suite lets you specify different “view modes” for your nodes and terms, so you can configure fields in different ways in different contexts (particularly handy if you use a lot of views or reference fields). Field group simply lets you collect fields into groups, which can take several forms (a big div, horizontal tabs, etc).

## Roll up your sleeves!

While all of the above will help, to ultimately get super-granular control over every bit of markup your site generates, you will have to spend time overriding lots of tpl files, from Drupal Core as well as modules like Views, Panels and so forth. The above tools are shortcuts to make life easier, but there’s no substitute for putting time and energy into hard-writing markup where necessary (note: navigating the forest of tpl files is beyond the scope of this post — one could easily write an entire book on just that!).

The Drupal community is huge, and the above just scratches the surface of tips and tools to facilitate getting Drupal to output the markup you want. But utilizing these tips will put you well on your way to more efficiently developing Drupal themes with decent markup. Enjoy!
