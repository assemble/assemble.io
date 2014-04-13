---
area: plugins
title: Overview
section: plugins
---

> Plugins extend the core functionality of Assemble.

Plugins are a new feature, but we know they'll play a big part in Assemble's future. We're looking for great plugins to add to our documentation and "contrib" collection, so please [let us know](https://github.com/assemble/assemble/issues/new) if you have something in mind!

If you authored an Assemble plugin, please submit a pull request to add it to this page!

## Contrib Plugins

{{! TODO: get from src/data/repos.json#filter=assemble-contrib}}
+ [assemble-contrib-anchors](https://github.com/assemble/assemble-contrib-anchors): Assemble plugin for creating anchor tags from generated html.
+ [assemble-contrib-contextual](https://github.com/assemble/assemble-contrib-contextual): Generates a JSON file containing the context of each page. Basic plugin to help see what's happening in the build.
+ [assemble-contrib-decompress](https://github.com/assemble/assemble-contrib-decompress): Assemble plugin for extracting zip, tar and tar.gz archives.
+ [assemble-contrib-download](https://github.com/assemble/assemble-contrib-download): Assemble plugin for downloading files from GitHub.
+ [assemble-contrib-lunr](https://github.com/assemble/assemble-contrib-lunr): Assemble plugin for creating a search engine within your static site using lunr.js.
+ [assemble-contrib-markdown](https://github.com/assemble/assemble-contrib-markdown): Convert markdown files to HTML using marked.js. This plugin is an alternative to Assemble's markdown Handlebars helpers. Both are useful in different scenarios.
+ [assemble-contrib-permalinks](https://github.com/assemble/assemble-contrib-permalinks): Permalinks plugin for Assemble, the static site generator for Grunt.js and Yeoman. This plugin enables powerful and configurable URI replacement patterns, presets, uses Moment.js for parsing dates, and much more.
+ [assemble-contrib-sitemap](https://github.com/assemble/assemble-contrib-sitemap): Sitemap generator plugin for Assemble
+ [assemble-contrib-toc](https://github.com/assemble/assemble-contrib-toc): Create a table of contents in the generated HTML, using Cheerio.js
+ [assemble-contrib-wordcount](https://github.com/assemble/assemble-contrib-wordcount): Assemble plugin for displaying a word-count on blog posts or pages.

## Community Plugins

* [sirlantis/assemble-image-resizer](https://github.com/sirlantis/assemble-image-resizer): Assemble plugin for resizing images found in your templates.
* [adjohnson916/assemble-markdown-data](https://github.com/adjohnson916/assemble-markdown-data): An Assemble plugin for automatic parsing of markdown in data.
* [adjohnson916/assemble-related-pages](https://github.com/adjohnson916/assemble-related-pages): An Assemble plugin for generating lists of related pages.
* [albogdano/assemble-partial-data](https://github.com/albogdano/assemble-partial-data): An Assemble plugin for aggregating and grouping data from partials.
## Plugins we want

Here are some plugins we'd like to see. ([let us know](https://github.com/assemble/assemble/issues/new) if you build one and want to make it a contrib plugin):

* navigation
* indexing
* component-builders for YUI, OOCSS (make sure you talk to us about these if you're interested!)
* theme generators

## Things we're working on or need help with

* yeoman plugin generator
* grunt init template
* documentation
* best practices for creating plugins

