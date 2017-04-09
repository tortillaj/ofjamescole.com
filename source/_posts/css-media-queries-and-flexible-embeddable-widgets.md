---
date: 2012-05-17T18:41:53-04:00
title: CSS Media Queries and Flexible Embeddable Widgets
subtitle: Getting more out of Responsive Design
tags:
    - css
    - design
comments: true
share: true
categories:
    - Development
---

While CSS3’s media queries are typically used in service of responsive design, we’ve identified another use for them: embeddable widgets.

It’s not uncommon for an organization to want to offer to its customers / supporters something they can quickly post onto their own websites, such as a poll or artwork announcing an upcoming event or current campaign/sale. In the case of images, the typical approach has been to offer several variants at some standard sizes and let the users choose which to embed. For more dynamic content, such as a poll or Twitter feed, users are typically presented with a fixed size.

Combining CSS3 media queries with iframes, however, gives you the ability to offer embeddable content that adapts its layout to the space given. You can offer one layout for columns only 150 pixels wide, one for 150-300 pixels, and another for when your widget is over 300 pixels wide, for example. Here’s how we’d recommend approaching this:

## Design your formats and write your CSS with media queries

The first step, obviously, is to figure out how many different layouts you want to offer and what the “breakpoints” are for switching between them. How many there are and where those breakpoints will lie depends on the content you’re putting in your widget, but a good starting place for considering what sizes to target is the IAB Display Advertising Guidelines, which outline common Web ad sizes (and may give you a good sense of what people’s websites are likely to be able to accommodate).

Once you’ve got your layouts designed, code them out with media queries (here’s a quick introduction to writing media queries), setting your breakpoints appropriately.

Depending on how you’ve approached your designs, the iframe your content appears in may be able to always work at a fixed height, or might need the height to vary depending on the width. Either way is fine, though having to adjust the height makes things a little bit more complicated.

## Include code for compatibility with Internet Explorer

CSS3 media queries are only supported by IE9 and above — and even IE9′s support is buggy. This normally isn’t an issue for responsive design, since the goal in that situation is to adjust to mobile devices (which aren’t running old versions of IE). But your iframe will be appearing on desktops, so you need to make sure your CSS is being loaded properly.

Fortunately, there’s respond.js, which you can embed into your page to ensure that old versions of IE will load the proper CSS. Respond.js is a small javascript that helps IE support media queries.

Unfortunately, though IE9 in theory supports responsive designs, it actually has problems with iframes that load external CSS files. So unless you’re including all your CSS inside a `<style>` tag in your page, you need to also get around this problem. As of this writing, the stock version of respond.js doesn’t affect IE9, so we’ve forked it and added some code specifically to account for this scenario. You can get our modified version of respond.js here.

## Write the code for embedding your iframe

How complex this is depends on several factors, such as whether or not the height of your iframe needs to adapt to the width. If it doesn’t, you can simply offer your users something like this:

``` html
<iframe src="http://www.yourwebsite.com/path/embed.html" width="100%" height="X" frameborder="0"></iframe>
```

Where http://www.yourwebsite.com/path/embed.html is the location of the HTML file for your embed, and X is set to a fixed height you’ve planned for your layouts.

However, if you need to adjust the height based on the width, instead what you’ll want to do is write some javascript that dynamically adjusts the height of the iframe. It might look something like this:

``` javascript
(function(){
	document.write('<iframe id="the-embed-id" style="border: 0;" src="http://www.yourwebsite.com/path/embed.html" width="100%" height="150" frameborder="0"><' + '/iframe>');
	var the_iframe = document.getElementById('the-embed-id'),
	offsetWidth = the_iframe.offsetWidth, newHeight = '60px';

	if (offsetWidth < 300) {
		newHeight = '600px';
	} else if (offsetWidth < 400) {
		newHeight = '300px';
	} else if (offsetWidth < 600) {
		newHeight = '80px';
	}

	the_iframe.style.height = newHeight;
}());
```

You’d then put those lines of Javascript (adjusted for your own breakpoints and desired heights, of course) into a file on your webserver, probably in the same directory as your embed.html with a name like embed.js, and offer the following snippet to your users to put on their sites:

``` bash
<script type="text/javascript" src="http://www.yourwebsite.com/path/embed.js"></script>
```

And there you have it! Provided your CSS media queries are well-formed, you’ve got the correct version of respond.js linked to from your embedded HTML page, and your embed code is error-free, you should now have a flexible widget that your advocates can put on their sites, and it will eat up as much horizontal real estate as allowed and the layout will adjust accordingly, even in IE.
