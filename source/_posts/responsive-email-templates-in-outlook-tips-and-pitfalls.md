---
date: 2014-08-01T17:35:50-04:00
title: Responsive Email Templates in Outlook
subtitle: Tips and Pitfalls
comments: true
share: true
tags:
    - responsive
    - emails
categories:
    - Development
---

Creating HTML email templates can seem like a lesson in navigating minefields, due in part to the many various email clients and systems that process emails. In this article, I’ll focus on tips for creating responsive email templates in Microsoft Outlook.

## How Outlook Works

If your newsletter subscribers or clients are in an office setting in the United States, they’re likely using Outlook to view emails. The software has been around since at least 1997, going through several changes over time as Microsoft hones its support.

One of the major changes that affects responsive email templates occurred with the release of Outlook 2007. Prior to this release, Outlook 2003 used Internet Explorer 6 to render emails, a browser well known for not supporting modern HTML and CSS standards. On the other hand, Outlook 2007 started the trend of using Microsoft Word for rendering emails. If you’ve seen CSS properties for emails prefixed with “mso,” the reason is Microsoft Word’s integration with Outlook.

### Common Pitfalls

Because Word renders emails for Outlook, there are several common CSS properties that Outlook will not recognize. Some rules are ignored completely while other rules have a different interpretation.

First, media queries for targeting screen size or resolution are not supported in Outlook. This isn’t really a big deal as the Outlook client is used on desktop browsers. I bring this point up strictly to keep it in mind during development. It’s easy to forget when you open an email in Outlook, resize it, and wonder why your media queries aren’t working!

Secondly, CSS written in the head section of an HTML document will get removed from an Outlook email. This means that you’ll want to inline your CSS with HTML. Have no fear though! MailChimp provides an excellent CSS inliner tool to do the grunt work for you!

Next, the most common CSS properties to avoid are background-image, float, margin, and display. These four rules are very common in standard HTML / CSS development practices but are outright ignored in Outlook. The most common of the four is probably the margin property. Interestingly, when Microsoft officially merged Hotmail accounts into Outlook, the margin property was dropped in Hotmail users as well.

Finally, the padding and width properties are very widely used in CSS development. They are pretty well supported in most Outlook email templates. The main exception is block level elements. Specifically, applying padding or width in CSS to a div or p tag will not work with Outlook. For responsive email templates, they are largely supported for HTML tables.

## Creating Layouts for Responsive Email Templates

The major players in email delivery and testing services, including Campaign Monitor, MailChimp, and Litmus, recommend sticking to table-based layouts for responsive email templates. The reason for this strategy stems from the previous section about common CSS pitfalls. When you need to create a multi-column layout without use of float, margin, and display, you’re really left with using tables.

You may wonder about a table-based layout on a phone. At first glance, it seems like a wide table won’t work well for hand-held devices. Well, as it turns out, most of the CSS pitfalls mentioned here have full support in all the common phone software. Therefore, at the phone-level, set your table, tr, td elements all to behave as blocks using the display CSS property. Outlook will ignore these directives; your phone will not!

Further, because of the use of tables, using the `cellpadding` and `cellspacing` HTML attributes are recommended instead of using the padding CSS property on a per-cell basis. The reason is quite simple. Let’s say that hypothetically you have a row of 3 table cells. If the middle cell has a top or bottom padding via CSS, it will get applied to all cells in the row. This is how tables are meant to function in the HTML 4 spec, so it’s really in our best interest to use the HTML 4 attributes for tables.

## Challenges in Rendering

The final part to consider is how your email actually renders for your subscribers or clients. By far the most challenging aspect to grasp is that your HTML will more than likely get restructured by Outlook. In some cases this involves rearranging HTML elements, but in other cases this involves the introduction of new, sometimes deprecated HTML elements.

For a simple example, I wrote HTML for a table with two rows (tr elements). Inside one of these rows is a third-level heading – the h3 element.

![demonstration of email HTML as written](/img/email-written-h3.png)

This is what happens in Outlook, when the email is received by the client:

![demonstration of email HTML as interpreted by Outlook](/img/email-outlook-365-interpreted.png)

The first thing to notice between these two images is that the table now has only a single row. It’s not displayed in this image, but Outlook actually created a totally new table element and placed the second row inside this new table. Secondly, where there was once an h3 element, Outlook replaced that with a set of font and span tags. You’ll note that the font tag is deprecated in the current HTML standard.

The effect of this HTML editing means that your CSS should not be too specific: don’t expect adjacent or sibling selectors to work automatically, and don’t expect a container to always include a child element. You’ll note that the h3 tag I wrote also had a CSS class, but in Outlook that class is removed. This effect is the reason you should inline your CSS.

To conclude this article, I’d like to direct you to a few resources to help you succeed with creating responsive email templates.

### Resources

* [Background images](http://backgrounds.cm) and [Buttons](http://buttons.cm)
* [Word 2007 HTML and CSS Rendering](http://msdn.microsoft.com/en-us/library/aa338201%28office.12%29.aspx) – A guide from Microsoft in how Microsoft Word renders HTML
* [A Designer’s Guide to Outlook 2013](https://www.campaignmonitor.com/blog/post/3769/a-designers-guide-to-outlook-2013) - A look at the newest release of the Outlook desktop client from Campaign Monitor
* [The Ultimate Guide to CSS](https://www.campaignmonitor.com/css) - An all-encompassing guide to CSS properties in for responsive email templates
