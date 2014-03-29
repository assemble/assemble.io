---
published: false
---
# Why does Assemble use two template engines!?

> The goal of this post is to clear up the confusion and explain once and for all why, in Assemble, two template engines are definitely better than one.

Sometimes it confuses newcomers that Assemble uses two template engines, and understandably so. But there are very good reasons for doing so, and I hope to convince you here that it's worth the effort to understand why.

## Defining "templates"

> Templates keep your code as organized, modular, and reusable as it can be. Which means projects will be easier to maintain as a result.

Before we move on, perhaps we should establish a common definition for the term "template" so we have a foundation to build from throughout the rest of our time together. In the most generic of terms, let's agree that a template is a _**placeholder** that will be replaced at build time (by a template engine) with **an actual value**_.

This definition shouldn't be very controversial. Afterall,


A template is a document or document fragment that contains variables that will be replaced (by the template engine) with actual data, content or other documents. Assemble uses Handlebars.js as its default template engine, so the syntax you see in the examples comes from that library.

Handlebars is super powerful, giving you as much freedom and power as you need to arrange your templates the way you want them. Assemble adds to this by offering built-in support and conventions for the following template structures:

We use Lo-Dash templates and mixins to expand config values, exactly how you would do in a Gruntfile, e.g.:

```js
jshint: {
  options: {
    jshintrc: '.jshintrc'
  },
  all: ['<%= site.scripts %>/*.js']
}
```

Using your example from above, you would do something like this:

```json
{
  "my": {
    // note that `foo` is the name of the parent object, I'll explain below
    "prop": "some value <%= foo.some.other-prop %>"
  },
  "some": {
    "other-prop": "Hello World"
  }
}
```

Here are some examples of lodash templates being with an Assemble config:

* This is where default values are defined: https://github.com/assemble/assemble.io/blob/v0.3.0/.assemblerc.yml#L6
* This is where the `site` property is extened into the context: https://github.com/assemble/assemble.io/blob/master/Gruntfile.js#L36

if you want to go further than just passing a string from one place to another, you can use mixins.


Mixins are really just Actually the 18n plugin has a couple good examples of this. [This file](https://github.com/assemble/assemble-contrib-i18n/blob/master/test/fixtures/data/i18n-alt.json#L6) uses templates with a [basic `expand` mixin](https://github.com/assemble/assemble-contrib-i18n/blob/master/Gruntfile.js#L10-L15) that I created.

When mixins are registered in the Gruntfile exactly as in the example they will be available to your templates.
