---
title: New CSS3 Units
subtitle: Easier responsive layouts with CSS3 units
date: 2015-07-31 13:10:44
tags:
- sass
- css3
categories:
- Development
---

CSS3 introduced a lot of functionality that was previously only achievable with Flash or JavaScript. Transitions, transforms, and key framed animations are the big ones here. They can provide some eye candy to your site and only require a regular ol' front end developer.

Yet CSS3 gave us other new properties that are (arguably) more useful but less flashy. I'm referring to "relative units" here, officially called [viewport units][1]. Viewport units are a badass feature in CSS that let you specify the sizing of things based upon the viewport size[1].

Not every browser supports viewport units (of course) but there are polyfills available[2]. Like any development, you'll want to test this out in every relevant browser. Overall browser support seems mostly stable.

With the disclaimers out of the way, the four main viewport units are:

1. vw - 1% of the viewport width or containing block width
2. vh - 1% of the viewport height or containing block height
3. vmin - the smaller value of 1vh or 1vw
4. vmax - the larger value of 1vh or 1vw

These units are crazy powerful. Let's say, for example, you're creating a layout that needs a section to span the entire height of the page. This is one of those age-old problems where we assign the section 100% height, throw up our hands when it doesn't work, and instead opt for a hacky-feeling CSS solution or (shudder) JavaScript.

With the viewport unit, you just set the section to 100vh height. Like magic, the section is the full viewable height: no more, no less. What's more, you can resize your window and the section resizes with it. The container can be sized in any units, from mm to in, or em to %. As the developer, you don't care about the absolute value because the vh / vw unit simply refers to 1/100 of its container in an abstract way.

The possibilities with using viewport units in layouts are pretty endless. For example, you can create a "scroll jacking" layout that sets each slide to 100vh. Rather than hijack the scroll event, you let it behave the way it always does and create a simple navigation scheme that moves to the selected slide. This is similar in concept as "scroll jacking" without repurposing scrolling at all. Or, say you need a banner image that spans 1/3 the height of the page regardless of the user's device. Take that one a step further with flexbox, and bottom-align a title on top of the banner image.

Viewport units can be used for any kind of element. The examples written here so far were about containers like divs or sections. However, you can create responsive typography too. Size your fonts with the vh or vmax unit to allow big fonts on large devices and more appropriate sizes for smaller devices. It will feel like magic when your headers resize as the page does. Just like when sizing fonts with rem units, give a fallback size for older browsers in pixels.

Notes:  
\------------------------

1. More specifically, viewport units are relative to a [containing block][2]. In most cases the containing block is the viewable area of the page without scrolling. However an absolutely positioned element becomes a containing block in itself, meaning that viewport units are relative to it and not the overall page.
2. Polyfill for older browsers using [vminpoly][3]

[1]: http://caniuse.com/#feat=viewport-units
[2]: http://www.w3.org/TR/CSS21/visudet.html#containing-block-details
[3]: https://github.com/saabi/vminpoly

[Cross-posted](https://zivtech.com/blog/fun-css3-units "Permalink to Fun with CSS3 Units | Zivtech")
