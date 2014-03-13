---
title: Understanding Context

area: docs
section: templates
---

> The goal of this guide is to help clarify how context works with Handlebars.

_(WIP)_

* Variables
* Block expressions
* Helpers
* Block helpers
* Subexpressions
* Nesting and inheritance


## Overview

When working with Handlebars, context can be tricky.

Given that we have:

```html
---
foo: Some info
---
```


* `{{data.foo}}`: YAML front matter
* `{{this.foo}}`
* `{{page.foo}}`
* `{{foo}}`
* `{{../foo}}`


### Conventions used in this guide

For the rest of this guide, we're going to assume that our config looks something like this:

```js
assemble: {
  options: {
    layout: 'templates/default.hbs'
  },
  site: {
    // files are listed explictly for the purposes of demonstration
    files: {
      '_gh_pages/': [
        'templates/pages/index.hbs',
        'templates/pages/about.hbs',
        'templates/pages/contact.hbs',
        'templates/pages/blog.hbs'
      ]
    }
  }
}
```

Let's also assume that each of our 4 pages has [YAML front matter][YAML-front-matter] that looks something like this:

In `index.hbs`:

```html
---
title: Home
---
```

In `about.hbs`:

```html
---
title: About Us
---
```

In `contact.hbs`:

```html
---
title: Contact Us
---
```

In `blog.hbs`:

```html
---
title: Blog
---
```

## The Challenge

Before we dive into the solutions, let's discuss the challenges in order clarify what we're trying to accomplish.

By the end of this guide, we should have a basic understanding of:

1. How context works with Handlebars.
2. How context works in Assemble, as well as how context works in:
   * [Pages][Pages]
   * [Layouts][Layouts]
   * [YAML Front Matter][YAML-front-matter]


## Pages

You really won't understand how context works in Handlebars until you spend some time playing around with collections. So let's jump right into it and add a `pages` collection to `index.hbs`:

```html
---
title: Home
---
<h1>{{title}}</h1>

<ul class="nav">
{{#each pages}}
  <li><a href="#">{{{title}}}</a></li>
{{/each}}
</ul>
```

Will result in:

```html
<h1>Home</h1>

<ul class="nav">
  <li><a href="#"></a></li>
  <li><a href="#"></a></li>
  <li><a href="#"></a></li>
  <li><a href="#"></a></li>
</ul>
```

**Why are the titles missing?**

As you can see, the title rendered only in the `<h1>`, but none of the page titles rendered in our nav block. The reason is that the context we used inside the `{{#each pages}}` block was incorrect. The solution is going to take a little explaining, so let's do one more experiment to help create a 360 degree view of what's happening.

Let's change our templates and run the build again. This time we'll add `../` to the `{{title}}` inside the `{{#each pages}}` block:

```html
---
title: Home
---
<h1>{{title}}</h1>

<ul class="nav">
{{#each pages}}
  <li><a href="#">{{{../title}}}</a></li>
{{/each}}
</ul>
```


* **A: The context is wrong**:


## Layouts


```html
---
title: YAML Front Matter
---
<h1>{{title}}</h1>

{{#each pages}}
  <a href="#">{{{title}}}</a>
{{/each}}
```


```html
---
title: Pages Collection
tags:
- pages
---
<div class="panel panel-success">
  <div class="panel-heading">
    <h4>{{title}}</h4>
  </div>
  <div class="panel-body">
    {{#each pages}}
      <a href="#">Title: {{{title}}}</a>
      <a href="#">Data title: {{{data.title}}}</a>
      <a href="#">Page title: {{{page.title}}}</a>
      <a href="#">../Title: {{{../title}}}</a>
      <a href="#">../Page title: {{{../page.title}}}</a>
    {{/each}}
  </div>
</div>
```


