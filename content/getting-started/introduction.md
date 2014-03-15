# Introduction
> Become familiar with the basics of Assemble.

Assemble makes it easy to combine templates, content, and data to produce any kind of static documents: web pages, web components, blog posts, and so on. This introduction guide covers where to find documentation on how to get started using Assemble and explains the terminology, building blocks, and core-concepts of a static site generator.

## Getting started
Visit the [Getting Started Guide][getting-started] for information on how to install, setup and configure your first Assemble project. If you are unfamiliar with [Grunt.js][Grunt] and [Gulp.js][Gulp], two task runners for which Assemble plugins are available, view their getting started guides. Although an in-dept understanding of these tools is not required, it is important to be familiar with the configuration of your entire stack, not just Assemble.

[Grunt]: http:// "Grunt.js Getting Started Guide"
[Gulp]: http://  "Gulp.js Getting Started Guide"

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

# Core Concepts

## Primary

## Secondary
