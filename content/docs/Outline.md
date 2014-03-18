---
title: Outline

area: docs
section: getting started

published: false
---
# Outline


## Introduction

* What is Assemble?
* Why was it created?
* Who created it?
* Why should you use it?


## Getting Started

* First steps
* `npm install grunt -g`, then `npm install assemble`
* Get to know Grunt.js > visit the docs

Pre-requisites to Using Assemble
* See how a task works
* See how a target works


## Fundamentals of Using Assemble

### The `assemble` task

* Options
* Layout
* Assets
* Data
* Partials
* Pages


### Options

Options can be defined at the task and/or target-levels. This offers a convenient way to use the task-level options for defining the "global" or "default" options for a project, and to then use the target-level options for overriding or extending the default options as necessary.

For example:

```js
assemble: {
  options: {
    // Specify default options
    layout: 'src/layouts/default-layout.hbs',
    partials: 'src/partials/*.{hbs,md}',
    data: 'src/data/*.{json,yml}'
  },

  // Build blog
  blog: {
    options: {
      layout: 'src/layouts/blog-layout.hbs',
      data: 'src/blog/data/*.{json,yml}'
    },
    files: [
      'blog/': ['src/blog/posts/*.md']
    ]
  },

  // Build gh-pages
  site: {
    options: {
      // Override defaults
      layout: 'src/layouts/site-layout.hbs'
    },
    files: [
      'site/': ['src/pages/*.hbs']
    ]
  },

  // Build components
  components: {
    options: {
      layout: 'src/layouts/component-layout.hbs'
    },
    files: [
      'components/': ['src/partials/*.hbs']
    ]
  },

  // Build documentation
  docs: {
    options: {
      layout: 'src/layouts/docs-layout.hbs'
    },
    files: [
      'docs/': ['src/docs/*.hbs']
    ]
  },

  // Build README
  readme: {
    options: {
      // remove "last" extension from template
      ext: ''
    }
    files: [
      'README.md': ['src/README.md.hbs']
    ]
  },

}
```

#### Layout `\{{> body }}` tag

Layouts are optional, so pages can be built with our without one. However, when a layout is used, it _must contain a `\{{> body }}`_ tag. Assemble uses this tag to "pull in" content from all the `src` pages specified in a target.


Given this task configuration:

```js
assemble: {
  blog: {
    options: {
      assets: 'blog/assets',
      layout: 'src/layouts/blog-layout.hbs'
    },
    files: [
      'blog/': ['src/blog/posts/post.hbs']
    ]
  }
}
```

With this layout, `blog-layout.hbs` :

```html
<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>\{{title}}</title>
    <link href="\{{assets}}/css/bootstrap.css" rel="stylesheet">
  </head>
  <body>
    <div class="container">

      <!-- this tag must be present!!! -->
      \{{> body }}

    </div>
  </body>
</html>
```

And this page, `post.hbs` :

```html
---
title: Welcome to my blog!
description: The best blog you'll find at this web address.
---
<div class="page-header">
  <h1>\{{title}}</h1>
  <p class="lead">\{{lead}}</p>
</div>

Aliquam erat volutpat. Ut imperdiet condimentum nisi non aliquet.
Vivamus sit amet consectetur sapien. Phasellus varius interdum urna,
eget mattis justo faucibus vel. Aliquam elementum, magna ut pretium
molestie, erat orci eleifend tellus, sit amet rhoncus arcu odio eu
sem. Proin lobortis mi ac ante luctus porta.
```

The rendered output will be:

```html
<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>Welcome to my blog!</title>
    <link href="blog/assets/css/bootstrap.css" rel="stylesheet">
  </head>
  <body>
    <div class="container">
      <div class="page-header">
        <h1>Welcome to my blog!</h1>
        <p class="lead">The best blog you'll find at this web address.</p>
      </div>
      Aliquam erat volutpat. Ut imperdiet condimentum nisi non aliquet.
      Vivamus sit amet consectetur sapien. Phasellus varius interdum urna,
      eget mattis justo faucibus vel. Aliquam elementum, magna ut pretium
      molestie, erat orci eleifend tellus, sit amet rhoncus arcu odio eu
      sem. Proin lobortis mi ac ante luctus porta.
    </div>
  </body>
</html>
```
