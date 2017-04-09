---
date: 2014-05-09T18:12:12-04:00
title: Using Icons in Web Development
subtitle: The Move to SVG
tags:
    - responsive
    - design
    - icons
comments: true
share: true
categories:
    - Development
---

SVG, Scalable Vector Graphics, is an XML format for 2D graphics. As the name implies, a document in SVG format can scale to any size, effectively filling up any size container. Also, being a vector based format means that each portion of the graphical image is actually comprised of primitive parts, called “paths.” These paths are the most primitive parts of an image, like points, straight lines, and curved lines.

## Background

Most regular image formats we use on the web, like JPEG and PNG, are made up of a dot matrix structure. We usually think of those as pixels when working with the web. A complex image like a mountainous landscape can be made up of thousands of pixels or a few hundred, and that simply depends on the resolution at which the image was processed. These types of images are raster graphics.

So when you compare the vector format to the raster format, you can kind of think of the former as a collection of shapes that make an image and the latter as a pre-compiled block image. If you get a PNG or JPEG file saved at a dimension of 100 pixels X 100 pixels, and force it to fill up a background size of 500px X 500px, the image will look very blurry because it’s been “pre-compiled” to fit 100 by 100. On the other hand, the SVG image can fill any size space since the image itself is simply a grouping of parts.

You might wonder why we don’t use SVG images everywhere on the web. Surely you’ve been to a website and seen blurry imagery, and if we have the SVG format that won’t look blurry, why don’t we use it? Well like everything on the web, we have to worry about browser compatibility too. SVG is incompatible with IE 8 and below, so to use SVG on sites we’d need to provide sensible fall back options in the standard PNG or JPEG formats. With the end of Windows XP’s life, IE 8 and below are dying breeds, so we can expect to see more use of SVG in the future!

## Font Icons vs JPEG & PNG Icons

The first step in moving away from images as icons is usually the use of “font icons.” A font icon is is just a font family, like Arial or Helvetica, but rather than produce alphabetical characters, shapes and symbols are produced instead. There are lots of pre-built font icon libraries, but probably the most famous is Font Awesome.

Instead of using an image as an icon, the font icon set will allow you to use keyboard character (i.e. text) as an icon instead. This has numerous benefits. Like regular text, you can scale up or down a font icon simply by changing the font size – no need to make a new image! Similarly, if you want a different color icon, just change the font color. A single set of font icons can provide hundreds of combinations of sizes and colors, without needing to open Photoshop or Illustrator.

## Mobile Development

The popularity of mobile development and responsive websites introduced a new challenge to icon selection, namely screen size. It’s safe to say there are dozens of screen sizes, with more popping up. We front end developers have to consider a huge number of screens from the small phone, to the mega-size desktop, and yes — the phablet too! On top of that, retina screens were introduced, adding higher resolutions to screens.

If you’re just using images for icons, you’ll need to provide several sizes so that a retina-capable screen will look nice. On top of that, you’ll want to serve up images sizes that look great at all devices sizes. The one-size-fits-all approach means serving the largest size image possible, and scaling it done with CSS. This sets your site at a disadvantage when a visitor needs to download several megabyte size images to load your website! You’ll be losing traffic pretty quickly.

On the other hand, like we discussed earlier, using an icon font at various sizes is pretty trivial. At the same time, icon fonts have their own set of limitations too, and that is what makes SVG more attractive for icons.

## SVG Icons

There are several advantages to using SVG over font icons. For example, SVG images can be very complex. However, a font icon is generally a very simple object. Also, since a font icon is just a single keyboard character, when you change the font color the entire icon is the new color. Yet an SVG is a container for multiple paths, and CSS can change the color of each path individually. For example, a flag icon in SVG format might have a black pole and a red flag; as an icon font the entire icon would be black or red.

More importantly, an SVG icon magically fills up the space of its container and automatically scales when the container changes. You can rescale a font icon size pretty easily too, but you have to write CSS for every size icon you want to see. Since we have so many devices sizes to work with, this can get pretty tedious, and in general most sites stick with 1, 2, or 3 sizes for font icons. On the other hand, with SVG the icon just scales for you, regardless of device size.

Being vector based images means that SVG icons will look very crisp on all devices. This is in contrast to the font icon, which can be blurry depending on browser rendering. For example, webkit browsers have the ability to anti-alias fonts, and there are several hacks around to get a similar type effect in other browsers. Ultimately, icons may be nice and legible in one browser, but a bit fuzzy in another browser.

The clear winner for icons is SVG, if you’re working in an environment that supports it!

## Related Info

* [Can you use SVG?](http://caniuse.com/#search=svg)
* [Chris Coyier wrote a great post a couple weeks ago comparing SVG to font icons. He collected a great pro and con list.](http://css-tricks.com/icon-fonts-vs-svg)
* [Ten reasons we switched from an icon font to SVG, a post from Lonely Planet.](http://ianfeather.co.uk/ten-reasons-we-switched-from-an-icon-font-to-svg/)
* [SVG + Icon Fonts, some background information, including Modernizr testing SVG support](http://jefff.co/misc/svg)
