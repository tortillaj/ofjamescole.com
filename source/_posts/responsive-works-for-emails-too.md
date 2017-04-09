---
date: 2011-12-12T18:48:01-04:00
title: Responsive Works for Emails, too!
subtitle: Delivering emails to mobile devices
tags:
    - responsive
    - emails
comments: true
share: true
categories:
    - Development
---

In the past, accommodating different email systems has largely consisted of simply offering an HTML formatted message, and a “plain text” version of the message for those who can’t (or won’t) receive HTML emails.

But unlike those in the past, today’s mobile phones do actually support HTML-formatted messages. While best practices for email template design have dictated a narrower width than typically used for web pages (usually 600 pixels vs. 980), even this narrower approach is problematic for all but the largest mobile screens, leaving your users either looking at tiny text or having to scroll horizontally to see your text.

This is particularly important when you consider that the share of email read on a mobile device is now around 25% and growing (based on trends from a year ago). Fortunately, the same responsive design techniques used for making websites mobile-friendly can be used in HTML email templates! Though CSS support among email clients varies significantly, popular mobile email clients (like those for the iPhone, iPad and Android) correctly understand an interpret CSS3 media-queries.

Responsive design for email allows designers to develop templates for smaller sizes — we recommend a query to target anything smaller than 620 pixels wide (which works well if your “desktop” design is 600 pixels wide), and within that using percentages and max-widths to keep your layout and images behaving. Bumping up the tezt size for smaller screens is also a good idea.

Thus, your responsive email code might look something like this:

``` css
@media only screen and (max-device-width: 620px) {
  table[id="outer"] {
    max-width: 600px;
    width: 100%;
  }

  img[id="header"] {
    max-width: 600px;
    width: 100%;
    height: auto;
  }

  td[class="content"] {
    font-size: 18px;
  }
}
```

(Note that we’re using the technique pioneered by Campaign Monitor to get around an issue with Yahoo! Mail here)

You may have to spend some time carefully planning out your code and CSS to avoid conflicts between your media query and any inline CSS you might be using (a common practice when it comes to email, regrettably sometimes necessary), but it’s time worth spending! Your readers will be more likely to read your email when they don’t have to side-scroll or zoom in just see your message.

Some email service providers, such as MailChimp, officially and actively support media queries in their template system. Others may not formally support it, but unless their system actively strips out CSS it thinks is invalid, you should be able to take advantage of this advanced CSS approach to make your messages more user-friendly on mobile devices.
