---
title: Contributing to Assemble
---

## Questions

We love questions, and we love knowing how you're using Assemble. Before you create a new issue on one of Assemble's repos, please consider asking on [StackOverflow.com](http://stackoverflow.com/questions/tagged/assemble). This is entirely up to you, but your question and any answers to it are more likely to help other users in the future than a closed issue on GitHub. Also remember to add the <kbd>assemble</kbd> tag to your question!

## Reporting issues

Please read the following guidelines before opening any issue.

1. **Search for existing issues.** To avoid duplicate issues, it would help us out if you could please check first to see if someone else has reported the same issue. Moreover, the issue may have already been resolved with a fix available.
2. **Create an isolated and reproducible test case.** Be sure the problem exists in Assemble's code with a [reduced test case](http://css-tricks.com/reduced-test-cases/) that should be included in each bug report. Check to see if there is an existing issue over on the [Handlebars.js repo](https://github.com/wycats/handlebars.js/issues).
3. **Include clear examples.** Please be specific and complete as possible with your examples, and be sure to always wrap your code with fences, along with the appropriate language after the first fence: e.g. <code>```js</code>
4. **Share as much information as possible.** Include version of Assemble, customized or vanilla build, etc. where appropriate. Also include steps to reproduce the bug.

## Pull requests

* Any edits to the docs should be first done in the related templates or markdown content files first, then recompiled into the HTML
* CSS changes must be done in  `.less` files first, never just the compiled files
* Try not to pollute your pull request with unintended changes--keep them simple and small

Assemble's documentation is maintained at [assemble-docs](https://github.com/assemble/assemble-docs) and is built using Assemble.  by running the `grunt` command.

## Code Examples

**Please use correct language definitions** next to the markdown backticks in code examples, _even if the language is not supported by GitHub Flavored Markdown_. Since github's intelligent search takes note of these things, using the correct language after the first code fence will make issues and any related code examples easier to find in searches.

## Code standards: HTML

* Always use proper indentation
* Two spaces for indentation, _never tabs_
* Double quotes only, _never single quotes_
* Use tags and elements appropriate for an HTML5 doctype (e.g., self-closing tags, _without the unnecessary closing forward slash!_)

## Code standards: CSS

* Adhere to the [Recess CSS property order](http://markdotto.com/2011/11/29/css-property-order/)
* Multiple-line approach (one property and value per line)
* Always a space after a property's colon (.e.g, `display: block;` and not `display:block;`)
* End all lines with a semi-colon
* For multiple, comma-separated selectors, place each selector on it's own line
* Attribute selectors, like `input[type="text"]` should always wrap the attribute's value in double quotes, for consistency and safety (see this [blog post on unquoted attribute values](http://mathiasbynens.be/notes/unquoted-attribute-values) that can lead to XSS attacks).


## Code standards: JS

* Please use semicolons
* Single quotes, except where double quotes are necessary
* 2 spaces (no tabs)
* strict mode
* Use formatting that is consistent with the rest of the code
