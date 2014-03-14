---
title: Helpers
description: Handlebars Helpers

area: docs
section: templates
---

> Documentation for the helpers in the [handlebars-helpers][handlebars-helpers] library. If you find any errors or have suggestions for improvement [please let us know](https://github.com/assemble/assemble/issues). **Contributions are encouraged!**

Get Assemble's [helper generator →](https://github.com/assemble/generator-helper)

## What is Handlebars.js?

[Handlebars.js](https://github.com/wycats/handlebars.js) is currently Assemble's default template engine. In [their own words](http://handlebarsjs.com/), "Handlebars provides the power necessary to let you build semantic templates effectively with no frustration. Mustache templates are compatible with Handlebars, so you can take a Mustache template, import it into Handlebars, and start taking advantage of the extra Handlebars features."

### Handlebars Helpers Basics
Handlebars.js ships with some built-in helpers, such as `\{{#each}}`, `\{{#if}}` and `\{{#unless}}`. Here is how helpers work:

* A Handlebars helper call is a simple identifier, followed by zero or more parameters (separated by space).
* Each parameter is a Handlebars expression.
* Handlebars helpers can be accessed from any context in a template.

## Handlebars Helpers

Helpers are essentially custom JavaScript functions that can be used in your templates. This means that, for the most part, helpers can do just about anything that can be accomplished with JavaScript. But handlebars helpers provide more than just raw power, their are three different types of helpers that make accomplishing certain tasks easier depending on the need:

* **Expression helpers**: These are just regular functions that take the name of the helper and the helper function as arguments. Once an expression helper is registered, it can be called anywhere in your templates, then Handlebars takes the expression's return value and writes it into the template. For example, `\{{titleize basename}}` would write out the `basename` of the "current" file in title case.
* **Block helpers**: Block expressions allow you to define helpers that will invoke a section of your template with a different context than the current. Block helpers are registered the same way as expression helpers, with the difference being that Handlebars will pass the contents of the block compiled into a function to the helper. There are a number of block helpers included by default with Handlebars, `\{{#each}}...\{{/each}}`, `\{{#if}}...\{{/if}}` and `\{{#unless}}...\{{/unless}}`.
* **Subexpressions**: with subexpressions, you may invoke multiple helpers _within a single mustache_, and pass in the results of inner helper invocations as arguments to outer helpers. Subexpressions are delimited by parentheses. For example, the `default` helper takes two values, the first being the "desired" value and the second being a default or fallback value if the first value doesn't exist, e.g. `\{{default title basename}}`.  So if the `title` value doesn't exist, the helper will use the `basename` of the file instead. This means our value won't be title case, as a "real" title is expected to be. Howver, using subexpressions we can spice things up a bit and transform the basename to meet our needs: `\{{default title (titleize basename)}}`.

## Assemble's Built-in Helpers

Assemble includes the [handlebars-helpers][handlebars-helpers] library as a dependency, so all **110+ Handlebars helpers** from that library can be used anywhere in your templates!

### Helper features unique to Assemble

* File globbing using [minimatch](https://github.com/isaacs/minimatch) patterns. See the [`\{{glob}}` helper](https://github.com/assemble/handlebars-helpers/blob/master/lib/helpers/helpers-files.js#L20-L49) for an example.
* Access to all [Assemble](https://github.com/assemble/assemble) options and config data, as well as custom variables defined in the options and config.
* Ability to render either markdown or HTML conditionally, based on the file extension of the generated file.

#### Features for Grunt.js users

If you use Grunt.js, Helper options can be defined in the Assemble task or target options in your project's Gruntfile. For instance, you could define the indentation level for the [\{{prettify}}](https://github.com/helpers/helper-prettify) helper like this: `assemble: { options: { prettify: { indent: 2 }}}`

{{#todo}}
### Helpers created for Assemble

Most helpers from [handlebars-helpers][] can be used with any Handlebars project, but a handful of helpers were created specifically for Assemble, including:

* **dirname**: Returns the absolute path to the given file/directory. Would return: `path/to/variables.md`. Usage: `\{{dirname path}}`
* **pagename**: Returns the full-name of a given file. Would return: `variables.md`. Usage: `\{{filename "docs/toc.md"}}`
* **filename**: Can be used as an alternate for `pagename`.
* **basename**: Returns the basename of a given file. Would return: `variables` Usage: `\{{base "docs/toc.md"}}`
* **extension**: Returns the extension of a given file. Would return: `.md` Usage: `\{{extension "docs/toc.md"}}`
* **ext**: Can be used as an alternate for`extension`.
* **relative**: Returns the derived relative path from file A to file B. Usage: `\{{relative from to}}`. This can also be used with `page` and `pages`.
* **markdown**: Markdown block helper enables writing markdown inside HTML and then renders the markdown as HTML inline with the rest of the page. Usage: `\{{#markdown}}\{{/markdown}}`
* **md**: Markdown helper used to read in a file and inject the rendered markdown into the HTML. Usage: `\{{md path}}`
* **embed**: Embeds code from an external file as preformatted text. The first parameter requires a path to the file you want to embed. The second optional parameter allows forcing syntax highlighting for a specific language. Usage: `\{{embed 'path/to/file.js'}}` or `\{{embed 'path/to/file.hbs' 'html'}}`
* **jsFiddle**: Embed a jsFiddle, second parameter sets the desired tabs. Usage: `\{{jsfiddle id tabs}}`
* **gist**: Downloads and embeds public GitHub Gists by adding only the id of the Gist. Usage: `\{{gist id file}}`
{{/todo}}

Visit the [helpers section](http://assemble.io/helpers/) of the docs to see all of the available helpers. Or learn more about [adding custom helpers](http://assemble.io/docs/Custom-Helpers.html) to Assemble.

## Learn more about Handlebars.js

There are a number of great resources on the web for learning how to work with Handlebars templates. Here are a few that we hand-picked to help get you started:

* [Handlebars.js Tutorial: Learn Everything About Handlebars.js JavaScript Templating](http://javascriptissexy.com/handlebars-js-tutorial-learn-everything-about-handlebars-js-javascript-templating/ "Handlebar.js Tutorial")
* [Treehouse Blog, Getting Started with Handlebars.js](http://blog.teamtreehouse.com/getting-started-with-handlebars-js)
* [Treehouse Blog, Handlebars.js Part 2: Partials and Helpers](http://blog.teamtreehouse.com/handlebars-js-part-2-partials-and-helpers "Handlebars.js Partials and Helpers")
* [Treehouse Blog, Handlebars.js Part 3: Tips and Tricks](http://blog.teamtreehouse.com/handlebars-js-part-3-tips-and-tricks "Handlebars.js Tips and Tricks")
* [NetTuts+: An Introduction to Handlebars](http://net.tutsplus.com/tutorials/javascript-ajax/introduction-to-handlebars/)
* [Handlebarsjs.com](http://handlebarsjs.com/)

Another great resource is [stackoverflow.com](http://stackoverflow.com/questions/tagged/handlebars.js). To date, approximately 2,000 questions about Handlebars.js have been asked and answered there!

## Related Docs

* [generator-helper](https://github.com/assemble/generator-helper)
* [Custom Helpers][custom-helpers]
* [Templates][templates-overview]
* [handlebars-helpers Github repo][handlebars-helpers]

## Special Thanks

We'd like to express our gratitude to Dan Harper, Elving Rodriquez! A number of these helpers originated in the following repos:

* [Handlebars Helpers, by Dan Harper](http://github.com/danharper)
* [Swag v0.2.1, by Elving Rodriguez](http://elving.github.com/swag/)

We'd also like to say thanks to [Kevin Decker](https://github.com/kpdecker) and other contributors to the Handlebars project. We really appreciate the hard work that has gone into making Handlebars so powerful and easy to use!


[handlebars-helpers]: http://github.com/assemble/handlebars-helpers "Extensive collection of Handlebars helpers"
