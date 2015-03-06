Assemble makes it easy to combine templates, content, and data to produce any kind of static documents: web pages, web components, blog posts, and so on. This introduction guide covers where to find documentation on how to get started using Assemble and explains the terminology, building blocks, and core-concepts of a static site generator.

---
title: Why Assemble?

area: docs
section: getting started

published: false
---

> As a _site generator_, Assemble was designed to do orders of magnitude more than just "render templates". However, if all you need is to generated templates, it can't get much easier than Assemble.



To demonstrate what assemble can do, take a look at some [examples][2].

A few reasons to try assemble:

* Inits/generators and boilerplates to use
* Documentation and actively supported
* Node.js/JavaScript alternative to Jekyll
* Full-featured site generated based on Grunt.js
* Easily deploy static sites to gh-pages (link to init and boilerplates)
* Grunt.js based, so you can use Assemble to build your site, and fill in any gaps in your build process with other grunt plugins.
* `npm install assemble` and be running in a couple of minutes.
* Assemble let's you use any combination of the following as data sources for your templates: [JSON][json] files, [YAML][yaml] files, [YAML front-matter][yaml-front-matter], and even custom properties in the `assemble` task or target options.
* Methods to the [assemble object][3] can be used for creating custom **[build "steps"][methods]**
* Built-in [variables][built-in-variables] and [helpers][helpers] for generating [sitemaps][sitemap], collections of pages, categories, tags, archives, or even custom collections and collection items.
* Assemble's [helper library](https://github.com/assemble/handlebars-helpers) is pretty awesome, which we externalized and generalized to a project called [handlebars-helpers][4], which now includes somewhere around 100-110 helpers. You will get a better sense of the "unique" helpers we provide by checking out the code in handlebars-helpers (either the coffeescript source files or generated javascript in the lib folder), or the [helper examples](https://github.com/assemble/handlebars-helpers-examples).
* You can build or omit specific pages using the various [src-dest configurations](http://gruntjs.com/configuring-tasks#files) offered from Grunt.js, and use as many targets as you need to build your site.
* [Layouts][layouts] can optionally be used to "wrap" pages with common code, such as a `<head>`, footer, scripts and stylesheets.
* [Partials][partials] can be used to include reusable code fragments. Useful for UI abstractions (e.g. "components" or "modules") or for snippets of code like the script for Google Analytics.
* The way assemble handles [templates-overview][templates-overview] and [data/metadata][data] is pretty powerful. You can, for instance, create a big library of partials, then create a bunch of `[name].json` or YAML data files that have the same names as the partials. Then just add the paths to the data files and partials in the assemble task and/or target options, and when you run `grunt assemble` any partials that are used anywhere in your pages will automatically be registered, and context will be appropriately applied.
* Let's say you're building a website/webapp that includes a bunch of UI components, like Bootstrap's LESS components. you could use assemble to not only build your pages, but also your documentation - and part of the live application - from the same source files. In a nutshell, in the assemble task you would set up one or more targets for building "static pages", then for your docs you could create another target where you could either build each partial (component) into a page of its own, or multiple partials per page, or both - or however you want to do it.
* Assemble wants to be the best task for generating pages from templates and data. Being based on Grunt.js means that Assemble is just another plugin. At the end of the day, pages are just a part of your project, so you can surround Assemble with any other plugins you need from the Grunt.js community, or custom plugins, to fill in whatever gaps still exist in your build process. In other words, we have no need or motivation to try to bundle in everything you can think of. So no need for this: "Assemble concats, minifies, shreds, dices, slices and does your taxes". You can use whatever plugin you think is best to accomplish each one of those tasks.
* Assemble is open source. We're just a couple of nerds that decided to do this on our own time, completely for fun, because we love doing it. Plus, we use Assemble on our own projects every day so we understand how it's being used and what could be done to improve it.


## Guiding philosophies

1. Leverage native [Grunt.js](http://gruntjs.com) functionality wherever possible, whenever practical
2. Try to focus on generalizing utliity functionality. This makes Assemble more flexible and keeps us from being hard-coded to a specific use case as we found with other site builders. However, we need to have conventions for things that can be generalized, such as the various means of accessing data, exposing options and methods and so on. We're just not big fans of "you can use as many includes (partials) as you want, as long as they're all in a special folder called 'includes', and with an underscore in front of it just to make absolutely sure that we know it's for includes, so call it '_includes'".Being built on top of Grunt gets us around these kinds of silly restrictions pretty easily. You can stick partials in as many directories as you want, just tell Assemble where they are in the task or targets. Same goes for data, pages, layouts, and even custom helpers - which are just like the "filters" used in Jekyll.
3. We use it, use it, use it... a lot. We try to break it as often as possible. And we use it constantly on projects that matter to us, so we're always motivated to fix it. This works.

{{#draft}}
## Use cases

* "I just want to generate templates, I don't need a _site generator_"
* "I need a personal blog"
* "I need to build the gh-pages for my GitHub project"
{{/draft}}

[sitemap]: https://github.com/assemble/assemble-boilerplate-sitemap
[1]: http://github.com/assemble/assemble
[2]: https://github.com/assemble/assemble-examples
[3]: https://github.com/assemble/assemble/blob/master/docs/docs-methods.md
[4]: https://github.com/assemble/handlebars-helpers


## Getting started

If you can work with HTML, you will be able to use Assemble! If this kind of templating is completely new to you, don't worry if it doesn't make sense right away. Give it time. Once it "clicks", a whole new world of possibilities in front end development will open up for you! Your code will become more modular and reusable, and your projects will become richer, more organized and easier to maintain.

## Getting Started with Grunt.js + Assemble
Glad to see you are interested in using Assemble! If you are developer and familiar with installing packages from npm, skip to the [Developer's Getting Started Guide](#developers).

Before continuing, be sure to have [Yeoman][5], [Bower][3] and the [Grunt CLI][4] installed. If you do not, don't fret, this guide will show you how to install them!

Throughout this process, we will use **Yeoman** as our "scaffolding tool". As explained in the introduction, the scaffold will be a base, foundational set of files that we can use to kickstart each project. **Bower** will be used as a packaged manager. If we need to use jQuery or Twitter Bootstrap, we can use Bower to install it. Lastly, the Grunt CLI is the interface will use to control Grunt from the command line.

To get started with any new Assemble project, we recommend using the [Yeoman generator for Assemble](https://github.com/assemble/generator-assemble).

After you're setup with Yeoman you may install the Assemble generator with:

```bash
npm install -g generator-assemble
```

Next, create a new directory for your project, and in that directory run:

```bash
mkdir /my-new-project
yo assemble
```

If all build success you're well on your way to successfully building your first Assemble project!

## Issues
We're always willing to help new users, so please stop out to [Assemble's GitHub Issues][1] or ask a question on [StackOverflow][2] and someone from the core team or our super-supportive community will help you out!

## Developers

[1]: https://github.com/assemble/assemble/issues "Assemble Issue Tracker"
[2]: http://stackoverflow.com/questions/tagged/assemble "StackOverflow Assemble Tag"

[3]: https://github.com/bower/bower
[4]: https://github.com/gruntjs/grunt-cli
[5]: http://yeoman.io/gettingstarted.html

# Introduction to Assemble

> Assemble makes it easy to combine templates, data and content to produce any kind of resulting documents, such as HTML web pages, UI components, styleguides, blog posts, and so on.

_(WIP)_

## Getting Started

* Installation (TODO)
* Brief Example (TODO)


```handlebars
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <!-- variables like `title` are simply placeholders for real data -->
    <title>{{title}}</title>
  </head>
  <body>
    <!-- insertion point for any page using this layout -->
    {{> body }}
  </body>
</html>
```

### Core Concepts

* Templates
  - Layouts
  - Pages
  - Partials (includes)
* Data
* Content

## Templates

> A template is a document or document fragment that contains variables that will be replaced (by the template engine) with actual data, content or other documents.

Assemble has built-in support for the following template concepts:

* **Layouts**: used to "wrap" pages with common elements, such as site-wide navigation, footers, the `<head></head>` section and so on.
* **Pages**: typically have a 1-to-1 relationship with the actual generated HTML pages in a project, e.g. `about.hbs` => `about.html` or `about/index.html`. But pages can also be dynamically generated from config data.
* **Partials**: document fragments or snippets of code that will be included, inserted or embedded into other templates at build time.

Let's walk through these in more detail.

### Layouts

Since layouts are used to "wrap" other pages with common elements, a basic layout might look something like this:

```handlebars
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <!-- variables like `title` are simply placeholders for real data -->
    <title>{{title}}</title>
  </head>
  <body>
    <!-- insertion point for any page using this layout -->
    {{> body }}
  </body>
</html>
```

You can tell Assemble that you want to use a particular layout by defining it in the options:

```js
options: {
  layout: 'path/to/my-layout.hbs'
}
```

If you need more than one layout, no worries [we have you covered](#TODO: layouts introduction)!


### Pages

> Pages, generally structural in nature, are optionally wrapped with layouts and contain _more HTML than textual content_.

A basic page might look something like this:

```handlebars
<div class="page-header">
  <h2 id="about">About Us</h2>
</div>

<div class="docs-section">
  <div class="page-header">
    <h2 id="team">Team</h2>
  </div>
  <!-- This markdown helper will include the content from `team.md` and convert it to HTML -->
  {{md 'team'}}
  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
</div>

<div class="docs-section">
  <div class="page-header">
    <h2 id="history">History</h2>
  </div>
  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
</div>
```

### Partials

> Partials allow you to define a chunk of code one time and use it in multiple places.

Partials are often used for UI components such as buttons, navbars or modals. But they can also be used for any other snippets or sections of code that might be repeated across multiple pages, or for code that might otherwise be reusable in some way. Partials are easy to spot since they use a `>`, which is the special [Handlebars.js syntax](http://blog.teamtreehouse.com/handlebars-js-part-2-partials-and-helpers)) that is only used with partials: e.g. `{{> foo }}`.

Continuing with the `layout` example from above, to use a partial for the `head` section simply create a new file, such as `head.hbs` or whatever you prefer, then extract the code from the head section and add it to the new file:

```handlebars
<!-- `head.hbs` partial -->
<meta charset="UTF-8">
<title>{{title}}</title>
```

Before continuing on, ensure that the filepath to your newly created partial, `head.hbs`, is specified in your project's configuration so Assemble can take note of it, ensuring that the partial can be used in your templates.

Now, to actually use the partial, add the `{{> head }}` template to the `head` section of your layout where the code was removed. Assemble makes this simple by allowing you to use the name of the file you just created as the name of the partial:

```handlebars
<!DOCTYPE html>
<html lang="en">
  <head>
    <!-- The `>` means that this is a partial and its content will be inserted here. -->
    {{> head }}
  </head>
  <body>
    {{> body }}
  </body>
</html>
```

## Content

> Content is usually written in an easy-to-read plain text format such as markdown, but Assemble can be extended to convert any format.

Additionally, Assemble can convert your content to HTML according to your preferences:

* Convert 1-to-1 into HTML pages, e.g. `about.md` converts to `about.html` (or `about/index.html` if you use [permalinks](#TODO))
* Insert into other pages (as includes)
* Concatenate several content files together before converting to pages or being inserted into (template) pages. [assemble.io/helpers/](http://assemble.io/helpers/) is a good example of this. Each helper/section on this page is created from more than [100 individual markdown files][helpers].


## Data

> Data from specified JSON or YAML files is made available for use in your templates.

This is best explained through examples, so given we have a partials for generating buttons, `button.hbs`:

```handlebars
<button type="button" class="btn {{modifier}}">{{text}}</button>
```

And given we have a corresponding file, `button.json`, with the following data:

```json
[
  {
    "text": "Success!",
    "modifier": "btn-success"
  },
  {
    "text": "Error!",
    "modifier": "btn-error"
  },
  {
    "text": "Warning!",
    "modifier": "btn-warning"
  }
]
```

When used like this:

```handlebars
{{#each button}}
  {{> button }}
{{/each}}
```
Which results in:

```html
<button type="button" class="btn btn-success">Success!</button>
<button type="button" class="btn btn-error">Error!</button>
<button type="button" class="btn btn-warning">Warning!</button>
```

Beyond using data files to pass to templates as context, they can also be used for global project configuration and setting options. See the [documentation for data](#TODO) to learn more.


## Extending Assemble

_TODO_

* Plugins
* Helpers
* API


[permalinks]: https://github.com/assemble/assemble-contrib-permalinks
[helpers]: https://github.com/assemble/assemble-docs/tree/master/src/content/helpers
