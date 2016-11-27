---
date: 2014-05-14T18:00:06-04:00
title: "Modern Front End Development Using AngularJS with .NET MVC"
comments: true
share: true
tags:
    - .net
    - c#
    - angularjs
    - js
categories:
    - Development
---

While the Razor syntax provided in the View layer for .NET apps is very powerful, it isn’t always as flexible as you need, and won’t always provide you with friendly markup on the front end. At the same time, there may be instances where you’d like to decouple your front end from the back end, and in those cases you most likely won’t want to use Razor at all in favor of plain HTML.

## Background

AngularJS is a fantastic Javascript MVC framework. It has exploded in popularity, virtually overtaking other frameworks like Backbone and Ember. AngularJS provides some amazing capabilities out of the box, and can convert your non-trivial jQuery based apps into something more powerful and yet more simple to maintain.

While there are some solid reasons to use AngularJS for a large scale app as opposed to some other Javascript MVC, I’d rather not delve into them now. My purpose here is to demonstrate how you’d accomplish AngularJS integration with a traditional, custom .NET API application.

## Use Case

While working for New Signature, I recently produced a dashboard for a client, powered by a .NET API using the Web API framework, and AngularJS on the front end. We created lots of charts and graphs to view various information: exactly what you’d expect in a dashboard. Those chart widgets were developed using the equally fantastic D3JS library. If you’re looking to create custom charts, maps, or any other kind of visualization, you’ll want to check D3 out as well.

Yet I digress.

AngularJS supports a rather new type of development, the Single Page Application (SPA). This type of application doesn’t feature any page reloads because Javascript is used to render each view. While the user is in fact navigating through your application, it will appear as if they’re not leaving a single page. New Signature developed this dashboard as a SPA, and I’ll explain how we accomplished that.

### AngularJS Views

The views were written as `cshtml` documents, that way I can incorporate the Razor syntax where needed. For example, rather than let the front end handle authentication, we left that to .NET. We were redeveloping a previously built application, and rather than write functionality to handle authentication, we left it with .NET and Razor. The AngularJS view layer is of course plain HTML, and that’s the most simple and direct way to work with the browser. Yet as I’ve demonstrated, there are sometimes cases where you need Razor, and if you can allow yourself that flexibility you should take it.

You certainly don’t need to keep Razor for anything though, and totally decoupling the front end leads to some unintended benefits. For example, a strictly HTML / JS front end can be hosted anywhere. It need not live in the .NET project at all. In this situation, the .NET app is strictly an API layer. Once you’re in this regime, it will lead you to even more possibilities. A client may want an iOS app or Windows Store app. If you have an API layer, you can create an HTML / JS app with AngularJS, then package it with PhoneGap (a.k.a. Cordova). This will result in giving you a fully native app that’s eligible to be sold in its respective marketplace. That’s clearly better than hiring specialized teams of native app devs.

### AngularJS Routing

On the front end, routing between pages is handled by AngularJS. On the .NET end, pages are served via the standard MVC architecture. Like any other .NET app, you’ll have a single layout. The layout needs an ng-view container where AngularJS will insert your view. If you’re maintaining Razor in your view layer, you’ll need to include the @RenderBody directive inside your ng-view container.

We left all our views inside the Views directory, just like any other .NET application. You’ll need to create a dummy controller whose only purpose is to serve up your AngularJS views. The controller name doesn't really matter, so name it something like FrontEnd. Or, you can do what we did and just serve the views out of your Home controller:

``` cs
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace MyApp.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Main()
        {
            return PartialView();
        }
    }
}
```

You’ll see we’re returning a PartialView. In the .NET framework, this just means to return the contents of a view partial without wrapping it in the layout – exactly what we want. Now, in your AngularJS app, you can setup a route like this:

``` javascript
angular.module('angularApp').config(function($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: 'Home/Main',
    controller: 'MainCtrl'
  });
});
```

The actual view should be placed in the same directory that .NET expects it to be located. In this example, that is `Views/Home/Main.cshtml`.

Those two items, the view layer and routing, are the only two challenges you’ll face when integrating a Javascript MVC into .NET. They’re also not terribly difficult to deal with either!

### Development Tips

Now that we’ve made it this far, I wanted to share some strategies I used during the development process.

The first suggestion is using Web Essentials. Like the name implies, you should really consider it an essential plugin to use with Visual Studio when developing web applications. It is mostly for front end development, but will be useful to any web developer. The plugin provides previews for all your preprocessing languages in a split pane layout. For example, I use Coffeescript and Sass here at New Signature. With the Web Essentials plugin, I can see my Coffeescript in the left side of the screen where I type; on the right side of the screen I see the compiled Javascript. The plugin itself can be used to generate all your scripts and styles, which can then be used by the .NET Bundler for inclusion in your project.

Secondly, I used the Grunt task runner. For those that haven’t used it, Grunt is simply a way to automate a ton of tasks that we front end developers have to do and therefore speeds up our development time. I used Grunt to compile both CSS and Javascript. I did just type earlier that Web Essentials can compile your assets as well. With Grunt though, we get the bonus of having Live Reload too, so that our browser will automatically reload for us once we’ve completed our changes.

### Learn More

Here are some resources to learn more about using .NET with AngularJS and Cordova.

* [A template extension for a SPA in AngularJS for .NET](http://visualstudiogallery.msdn.microsoft.com/5af151b2-9ed2-4809-bfe8-27566bfe7d83)
* You can use Grunt as you would in any other application development, but [Mike O’Brien shows an advanced implementation integrating Nuget, testing, and deployment](http://www.mikeobrien.net/blog/using-grunt-to-build-and-deploy-dotnet-apps).
* [Daniel Zen on using AngularJS & Cordova to build native apps](http://www.youtube.com/watch?v=wVntVkRLR3M)
