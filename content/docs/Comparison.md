---
title: Comparison

area: docs
section: overview

published: false
---

{{#TODO}} TODO: Use the following info from the Jekyll docs to create a comparison {{/TODO}}

## How does Assemble compare to other site generators?

### Jekyll

Jekyll is self-described as being "blog aware", which essentially means that if you put your posts in a specific folder and follow a specific naming convention, then Jekyll will publish everything in that folder resulting in... _a blog_.


## The basics

In a nutshell, if you give Assemble a path to one or more source files (`src`), and a path to a destination (`dest`),

***

Jekyll is a simple, blog aware, static site generator. That’s what the site says. But, what exactly does this mean? A static site generator is a program that takes a set of files and generates your site with them. As you’ll see, we’ll be able to use a set of templates, create the content files separately, and then use Jekyll to generate our site. The “blog aware” part means that we could use this to create a blog, or any website that has a series of post-like entries (such as a portfolio). Let’s give it a try!

***

It takes a template directory (representing the raw form of a website), runs it through Markdown or Textile and Liquid converters, and produces a static website suitable for any web server. Jekyll is also the engine behind GitHub Pages.

***

Jekyll is a parsing engine bundled as a ruby gem used to build static websites from dynamic components such as templates, partials, liquid code, markdown, etc. Jekyll is known as “a simple, blog aware, static site generator”.

***

### What does Jekyll Do?

Jekyll is a ruby gem you install on your local system. Once there you can call jekyll --server on a directory and provided that directory is setup in a way jekyll expects, it will do magic stuff like parse markdown/textile files, compute categories, tags, permalinks, and construct your pages from layout templates and partials.

Once parsed, Jekyll stores the result in a self-contained static _site folder. The intention here is that you can serve all contents in this folder statically from a plain static web-server.

You can think of Jekyll as a normalish dynamic blog but rather than parsing content, templates, and tags on each request, Jekyll does this once beforehand and caches the entire website in a folder for serving statically.

### Jekyll is Not Blogging Software

### Jekyll is a parsing engine.

Jekyll does not come with any content nor does it have any templates or design elements. This is a common source of confusion when getting started. Jekyll does not come with anything you actually use or see on your website - you have to make it.

### Why Should I Care?

Jekyll is very minimalistic and very efficient. The most important thing to realize about Jekyll is that it creates a static representation of your website requiring only a static web-server. Traditional dynamic blogs like Wordpress require a database and server-side code. Heavily trafficked dynamic blogs must employ a caching layer that ultimately performs the same job Jekyll sets out to do; serve static content.

Therefore if you like to keep things simple and you prefer the command-line over an admin panel UI then give Jekyll a try.

Developers like Jekyll because we can write content like we write code:

* Ability to write content in markdown or textile in your favorite text-editor.
* Ability to write and preview your content via localhost.
* No internet connection required.
* Ability to publish via git.
* Ability to host your blog on a static web-server.
* Ability to host freely on GitHub Pages.
* No database required.