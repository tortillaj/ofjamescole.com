---
title: Accessibility in Drupal Themes
date: 2015-04-07 13:14:17
tags:
- drupal
- accessibility
categories:
- Development
---

Zivtech cares about accessible websites and strive to make our projects usable by the widest range of people possible. We aim to produce websites that adhere to Section 508 standards and WAI-ARIA guidelines.

Sometimes a client has specific needs for compliance, like a government or university website. In general though, accessibility should be a goal for any website, so that users of any ability can meaningfully interact with the Internet.

With that in mind, you may find yourself focussing on ensuring old browser support, like IE (Internet Explorer) 10 or earlier. You want the widest audience using your website. Yet [worldwide browser statistics][1] show IE 8 at around 3-4% usage over the last year. Since IE 9 and 10 auto update to IE 11, their usage is nearly non-existent at this point. (note: Some clients _need_ old browser compliance, but that is less often the case.) At the same time, it's possible that more of your website visitors have [low vision][2]. Thus it's arguable you'll get a higher return on your development dollars if you prioritize accessibility rather than IE 8 support.

To provide accessible websites, Zivtech produces a contributed starter theme for Drupal called [Bear Skin][3]. It was recently updated to include more accessible markup, and is free for use.

## Accessibility in the Bear Skin theme

We made our Drupal theme more accessible by focussing on three major sets of updates: semantic markup, 508 compliance, and ARIA. The first two sets, markup and 508 compliance, are really the "low hanging fruits." They provide great enhancements, but require the least effort. Letting Drupal render accessible markup with ARIA is more time intensive, but ultimately provides the best experience for screen readers.

### Semantic Markup

Semantic markup comprises the intent and purposes of HTML5 standards. These standards introduced several new HTML elements and deprecated some others. Ensuring your theme markup uses semantic HTML is the easiest way to provide a minimal amount of accessibility for people with screen readers or other assistive technology.

My favorite resource for keeping up with HTML5 standards is the [HTML5 Doctor][4] website. They provide contextual documentation for standards, including sample markup. It's easy to compare your Drupal theme markup with compliant HTML5 markup, and suss out where you need improvements.

While it may seem like a big task, we found it pretty straightforward to update Bear Skin's markup. For example, the main content area of the page uses the `main` HTML element. Also, the previous Bear Skin revision used the `hgroup` element to group titles and subtitles on pages. Yet that element has been removed from the HTML5 spec, and was plucked out of Bear Skin as well.

### 508 Compliance

Many of the requirements for 508 compliance are thought of as best practices for HTML, so it's likely your Drupal theme is nearly compliant already! For example, [Section 508][5] stipulates that images need meaningful `alt` tags and each form element needs a meaningful `label`. These two examples are things you hopefully have in your theme already.

While updating Bear Skin, we also went over this [508 compliance checklist provided by WebAIM][6]. Some additional features added to make Drupal 508 compliant were skip links to direct a user straight to the main page content, and ensuring the page is still usable without CSS.

### WAI-ARIA Integration

The Web Accessibility Initiative section of W3C created ARIA standards as a way to provide screen readers the ability to meaningfully interact with a web page. ARIA standards are very in depth and wide-reaching, and can be somewhat confusing at first glance.

If you're going to review your own Drupal theme for ARIA compatibility, take a look at this spec produced by the W3C, [Using WAI-ARIA in HTML][7]. It includes all the basics of ARIA, as well as a short table of commonly used elements.

Landmark roles and aria-* properties are sprinkled throughout Bear Skin, and can provide your own website with a great base-level of support for screen readers.

## Testing Tools

Before beginning your adventure in making your website more accessible, or after you've made updates for 508 & ARIA compliance, there are some tools available to help validate your work.

While it's not yet perfect, the regular [XHTML validator][8] is good about spotting errors in ARIA. Since a lot of Section 508 is also considered best practice for HTML, the validator is even better about spotting a lot of 508 compliance pitfalls.

WebAIM produces a tool for accessibility checking called [WAVE][9]. It can review your site for many things, like 508 compliance and ARIA. It also checks more general things like ensuring high enough contrast between text color and its background color.

If your website is in development or behind a firewall, you might not be able to provide a public link for the WAVE website. If that's the case, you can use a [toolbar for Firefox][10] or a [plugin for Chrome][11].

## Accessible Development and Design at Zivtech

Zivtech is experienced with adhering to government standards for accessibility, and it's important to us that people of all abilities can use your website. If you need help making your current website more accessible, or if you want to start a fresh site with a focus on accessibility, contact us for help.

[1]: http://gs.statcounter.com/#desktop-browser_version_partially_combined-ww-monthly-201403-201503
[2]: https://nfb.org/blindness-statistics
[3]: https://www.drupal.org/project/bear_skin
[4]: http://html5doctor.com/
[5]: http://www.section508.gov/
[6]: http://webaim.org/standards/508/checklist
[7]: http://www.w3.org/TR/aria-in-html/
[8]: http://validator.w3.org
[9]: http://wave.webaim.org/
[10]: http://wave.webaim.org/toolbar
[11]: https://chrome.google.com/webstore/detail/wave-evaluation-tool/jbbplnpkjmmeebjpijfedlgcdilocofh

[Cross-posted: Originally written for my employer](https://zivtech.com/blog/accessibility-drupal-themes "Permalink to Accessibility in Drupal Themes | Zivtech")
  
