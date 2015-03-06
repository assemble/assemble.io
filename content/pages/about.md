---
title: About

area: docs
section: getting started
---

> Assemble is a dead-simple static site and component generator for Node.js.

Assemble makes it easy to combine templates, data and content to produce any kind of resulting documents, such as HTML web pages, UI components, styleguides, blog posts, and so on. Assemble was created by [@jonschlinkert](https://github.com/jonschlinkert) and [@doowb](https://github.com/doowb) to get designers and developers on the same page.

## What you won't find in Assemble

### "Blog awareness"

Which really means "if you put your posts in a specific folder, and you name it exactly as required, then the parser will find your posts and render them into a blog". But Assemble isn't worried about what you put where, or where you go and how late you'll be out. You're a semi-responsible very bearded adult, you should be able to make your own decisions. Bottom line: Assemble is "beard aware". Wait... Assemble helps you make choices about your beard. Nevermind...

### Special required _folders

You won't find a requirement for directories like `_layouts`, `_posts` or `_anything-else`. Assemble is a Grunt.js plugin, so you have as much flexibility as you would with any other Grunt.js plugin. Your project structure is whatever you want it to be. You can put your [layouts][layouts], [pages][pages], posts, [partials][options-partials] or any other files wherever you want them to be. You can use an `includes` directory instead of `partials`. In fact, you could add hundreds of [targets](http://gruntjs.com/configuring-tasks) in the assemble task in your Gruntfile, and use a different convention for each one if you had a reason.

### _config.yml

A requirement to use `_config.yml`, or `config.json`, or `config` anything. Instead, Assemble provides [options.data][options-data] which enables you to use your own conventions for configuration. You can name your files however you want, or put them in whatever directory you want. It's up to you.


## Building blocks

* Data
* Content
* Structure
* Behavior
* Styles

## Terminology

### Data
Data is pieces of information. Assemble accepts two types of data: [JSON][JSON] (JavaScript Object Notation) and [YAML][YAML].

[JSON]: http://json.org "JSON Homepage"
[YAML]: http://yaml.org "YAML Hompage"

### Content
Content is information made available through a website or some other medium. Assemble accepts both HTML and [Markdown][1]. See the [Markdown guide][docs/markdown] for documentation.

[1]: http:// ""

#### Configuration
The configuration sets the rules for how Assemble will operate. In the case that Assemble is used as a task runner plugin, this will be in either the `gruntfile.js` or `gulpfile.js`. Basic configuration, such as layouts and custom options can also exist in the [YAML Front Matter][] of a page.

You can learn more about configuration in the [Options][docs/options] documentation.

#### Plugin

#### Template
> ...a pre-developed page layout in electronic or paper media used to make new pages with a similar design, pattern, or style.
> <cite>Wikipedia:<a href=http://en.wikipedia.org/wiki/Template>Template</a><cite>

Templates in Assemble are populated with whatever *content* or *data* you give it. In the case of a blog you might have a template titled `blog-layout.hbs` and the Markdown files that you write the blog posts in will be used to create the final HTML document.

Assemble uses the Handlebars (*.hbs) language in templates and you can find more information on layouts, Handlebars, and other options in the [docs][docs].

#### Scaffold
A [scaffold](http://en.wikipedia.org/wiki/Scaffolding) is a temporary structure used to support people and material in the construction or repair of buildings and other large structures. It is usually a modular system of metal pipes or tubes, although it can be from other materials. Use a scaffold to begin your projects.

#### Boilerplate
*Boilerplate code* refers to sections of code that have to be included in many places with little or no alteration. If you are familiar with [Twitter Bootstrap]() and/or [Zurb Foundation](), both could be considered boilerplates.

Historically, a bolier plate was the label used to identify the builder of steam boilers. You may have also heard of *Boilerplate text*: any text that is used, or can be reused, in new contexts or applications without being changed much from the original.
