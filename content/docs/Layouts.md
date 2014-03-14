---
title: Layouts

area: docs
section: templates
---

> Layouts are used for "wrapping" the content of individual pages with common elements, such as the `<head></head>` and footer sections, which usually contain necessities such as `<link></link>` and `<script></script>` tags.

## Basic Layout

A very simple layout might look something like this:

```handlebars
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>\{{title}}</title>
  </head>
  <body>
    \{{> body }}
  </body>
</html>
```

Where `\{{> body }}` is the point of insertion for content from any pages that use this layout.


### Defining layouts

In the Assemble task options you can specify a general layout to be used for all pages in a project:

```js
assemble: {
  options: {
    layout: 'layouts/default.hbs'
  }
}
```

### Multiple layouts

When your project has different types or groupings of pages, such as "docs", "blog" and "examples", {{!you may wish to use a specialized layout for each page type.}} and there are certain design or structural elements that are unique to each grouping, it often makes sense to:

1. Create a different target in the assemble task to accomodate each grouping
2. Give each target (e.g. each grouping of pages) its own special layout containing the unique elements required by each grouping. For example, every page in the `blog` target might have a right sidebar, whereas every page in the `docs` target might have a left sidebar:

For example:

```js
assemble: {
  options: {
    layout: 'default.hbs',
    layoutdir: 'layouts'
  },
  docs: {
    // override task-level layout
    options: {layout: 'docs-layout.hbs'},
    files: {'docs/': ['src/docs/*.hbs']},
  },
  site: {
    // override task-level layout
    options: {layout: 'site-layout.hbs'},
    files: {'site/': ['src/site/*.hbs']},
  }
  // ... other targets
}
```

### Nested layouts

Layouts can also be "stacked" so that the parent-most layouts contain the most commonly used elements while "child layouts" contain elements that are only necessary for specific pages or groupings of pages.

For example, if:

* all pages will require the same `<script></script>` and `<link>` tags
* some pages in your project should be rendered _with a sidebar_
* some pages should render _without a sidebar_

This is a good opportunity to use nested layouts.

#### Example Layout #1: parent layout

Our parent layout will only contain the most commonly required, generalized elements. We'll call this layout `parent-layout.hbs`:

```handlebars
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>\{{title}}</title>
    <link rel="stylesheet" href="main.css">
  </head>
  <body>
    \{{> body }}
    <script src="main.js"></script>
  </body>
</html>
```

#### Example Layout #2: child layout

Our "child" layout will contain additional markup for our sidebar, but it should also inherit all of the markup from the parent layout (since layouts are "flattened" before pages are rendered). For the markup to be inherited, we need to **specify a parent layout for our child layout**.

Specifying a _layout for a layout_ works the exact same way as specifying a layout for any regular page. It can be defined in the `options.layout` property in the Assemble task config in the Gruntfile (at the task and/or target level), or the layout can be specified in the child layout's YAML front matter. Here is an example of the latter:

`child-layout.hbs`

```html
---
layout: parent-layout.hbs
---
<!-- Only the child layout should have this sidebar! -->
<div class="row">
  <div class="col-lg-3">
    <div class="sidebar">
      <a href="#">Buttons</a>
      <ul class="nav">
        <li><a href="#button-expand-left"></a>Expand Left</li>
        <li><a href="#button-expand-right"></a>Expand Right</li>
        <li><a href="#button-expand-up"></a>Expand Up</li>
        <li><a href="#button-expand-down"></a>Expand Down</li>
      </ul>
    </div>
  </div>
  <div class="col-lg-9">
    <!-- render content from pages that specify this layout -->
    \{{> body }}
  </div>
</div>
```

You might recall that the `\{{> body }}` tag is the "insertion point" in a layout, specifying exactly where the content from each page will be passed in. Layouts are no different. A child layout will be inserted (flattened) into the parent layout at the point of the `\{{> body }}` tag.


#### Example "flattened" result

Continuing with the example from the previous section, the flattened layout for pages that use the "child" layout might look something like this at build:

```handlebars
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>\{{title}}</title>
    <link rel="stylesheet" href="main.css">
  </head>
  <body>
    <div class="row">
      <div class="col-lg-3">
        <div class="sidebar">
          <a href="#">Buttons</a>
          <ul class="nav">
            <li><a href="#button-expand-left"></a>Expand Left</li>
            <li><a href="#button-expand-right"></a>Expand Right</li>
            <li><a href="#button-expand-up"></a>Expand Up</li>
            <li><a href="#button-expand-down"></a>Expand Down</li>
          </ul>
        </div>
      </div>
      <div class="col-lg-9">
        \{{> body }}
      </div>
    </div>
    <script src="main.js"></script>
  </body>
</html>
```


## Layout FAQ

* Layouts are optional. If you don't need one, don't define one.
* At build time, nested layouts are "flattened" before content is passed in from pages (child layouts are progressively "merged" into their respective parent layouts until there are no parent layouts left in the stack.)
* Layouts "inherit" the context of pages that use the layout.
* Layouts can be defined at the **task-level**, **target-level**, in the **YAML front-matter** of a page, or in the `data.layout` property for pages defined in an `options.pages` collection. {{! TODO link to info about options.pages }}


### Layout Granularity

> As with CSS, the more specific layout wins

1. **Task options**: Great for defining a "project-wide" default.
2. **Target options**: Override the "project default" in the `options` for each target. Offers greater control over which "types" of pages get which `layout`.
3. **Each page**: If you require more granularity you can define a layout in the [YFM][yaml-front-matter] of a page, or in the `data: {}` object for a page in a `pages` collection.
4. **Sub-pages**: Since pages/layouts can be nested you could specify a different layout for multiple parts of a page.
{{#draft}5. **`.json` or `.yml` files**: THIS HASN'T BEEN IMPLEMENTED{{/draft}}

### Layout Specificity

| Level                       | Description                                               |  |
| --------------------------- | --------------------------------------------------------- | -------------------------- |
| **none**                    | Layouts are optional and don't need to be used.           |                            |
| **Task**                    | Defined at the task-level of the assemble task.           | Project level              |
| **Target**                  | Defined at the target-level in the assemble task.         | Sub-project level          |
| **Layout property** (data)  | Defined in the `data: {}` object in a `pages` collection. | Page and/or sub-page level |
| **Layout property** (YFM)   | Defined in the YAML front matter of a page.               | Page and/or sub-page level |


{{#draft}}
* `default.hbs`: the default layout for the project, and it's the only layout that would really be "needed" in an actual project, since it wraps the demo pages
* `component.hbs`: a child layout that inherits the default layout, this is a specialized "inner layout" for wrapping components with certain details about the "current demo".

For those who are more visual, layouts are nested

Layouts in this project are nested in the following order:

These "nested" layouts are flattened before content is rendered.

**TODO**

Introduce:

* pages
* data
* src-dest/files-objects/files-arrays
{{/draft}}



## Layout example

Layouts are optional, but the `\{{> body }}` tag is required for content to be pulled into a layout.

```handlebars
<!DOCTYPE html>
<html>
  <head>
    <title>\{{title}}</title>
  </head>
  <body>
    <!-- the body "pulls in" content from pages -->
    {{> body }}
  </body>
</html>
```


### Multiple layouts

Since you can create as many [targets](http://gruntjs.com/configuring-tasks) as you require, defining layouts in the Gruntfile is a great way of quickly setting up your layout "defaults". In the `assemble` task in your Gruntfile.js, you can define a layout at the task-level, and/or a different layout for each build target:

```javascript
assemble: {
  options: {
    layout: 'layouts/default.hbs'
  },
  site: {
    files: {
      'site/': ['templates/pages/*.hbs']
    }
  },
  blog: {
    options: {
      layout: 'layout/post.hbs'
    },
    files: {
      'blog/': ['templates/posts/*.hbs']
    }
  },
  docs: {
    options: {
      layout: 'layouts/docs.hbs'
    },
    files: {
      'docs/': ['templates/docs/*.hbs']
    }
  }
}
```

## Page-specific Layouts

If you require a higher level of granularity than defining layouts in the Gruntfile, you may also define layouts on a page-by-page basis, thus overriding both the task-level ("global") defaults and the target-level defaults.

To do so, just add the layout to the [YFM][yaml-front-matter] of the page like this:

```yaml
---
layout: path/to/layout.hbs
---
```

## Disabling Layouts

* **Pages**: add `layout: false` or `layout: none` to the YAML front matter of any page that should build without a layout.
* **Targets**: add `layout: false` or `layout: none` to the options of any target that should build pages without a layout.


## Example usage
Your imagination is the only limit to what can be done with layouts, so these are just examples.

```handlebars
<!DOCTYPE html>
<html>
  <head>
    <title>\{{title}}</title>
  </head>
  <body>

    <!-- HEADER -->
    <header class="masthead subhead">
      <div class="container">
        <div class="row">
          <div class="col col-lg-12">
            <h1><span class="text-muted">Docs /&nbsp;</span> \{{#if section}}\{{ section }} \{{else}}\{{basename}}\{{/if}}</h1>
          </div>
        </div>
      </div>
    </header>

    <!-- CONTENT -->
    <div class="container">
      \{{> body }}
    </div>

    <!-- FOOTER -->
    \{{> footer }}
  </body>
</html>
```

<a name="nested-layouts" id="nested-layouts"></a>
## Nested Layouts

Layouts can be nested inside other layouts. This enables highly granular control over how pages and layouts are organized. A common strategy is to use a basic "master" or "default" layout for a site, which contains only the most common, bare necessities for a site. This default layout is then inherited by other more specialized layouts.

For example, your default layout may contain the `<head></head>`, footer, common link and script tags for a site:

```handlebars
<!DOCTYPE html>
<html lang="en">
  <head>
    \{{> header }}
  </head>
  <body>

    \{{> body }}

    <section id="footer">
      \{{> footer }}
    </section>
  </body>
</html>
```

And more specialize layouts might contain side navigation for a section of the site, like this:

```handlebars
---
layout: default.hbs
---
<header class="masthead subhead">
  <div class="container">
    <h1><span class="text-muted">Docs /&nbsp;</span>\{{titleize basename}}</h1>
  </div>
</header>

<ul class="nav nav-pills nav-stacked">
  \{{#each pages}}
  <li><a href="\{{relative ../page.dest this.dest}}">\{{data.title}}</a></li>
  \{{/each}}
</ul>

\{{> body }}
```

At build time layouts are "flattened" first before pages are passed in. In other words, the above example becomes this first:

```handlebars
<!DOCTYPE html>
<html lang="en">
  <head>
    \{{> header }}
  </head>
  <body>
    <header class="masthead subhead">
      <div class="container">
        <h1><span class="text-muted">Docs /&nbsp;</span>\{{titleize basename}}</h1>
      </div>
    </header>
    <ul class="nav nav-pills nav-stacked">
      \{{#each pages}}
      <li><a href="\{{relative ../page.dest this.dest}}">\{{data.title}}</a></li>
      \{{/each}}
    </ul>

    \{{> body }}

    <section id="footer">
      \{{> footer }}
    </section>
  </body>
</html>
```


### Layouts for other formats

#### Markdown layouts

Layouts don't have to be HTML, they can be whatever language you want them to be. If you're generating markdown pages instead of HTML, maybe for a project wiki or other markdown documentation, then you'll want to use a markdown formatted `layout`.

In this example, instead of adding adding the traditional head and footer we'll add some link references to make sure the same ones are used on every generated page. This makes it easier to maintain links and it also cuts down on potential for broken links:

```markdown
\{{> body }}

* * *

_This page was generated using Grunt and [assemble][repo] on \{{ today }}._

[org]: https://github.com/assemble
[repo]: https://github.com/assemble/assemble
[issues]: https://github.com/assemble/assemble/issues
[docs]: https://github.com/assemble/assemble-docs
```

#### README Layout

```markdown
# \{{pkg.name}} \{{travis-badge}}

> \{{pkg.description}}

\{{> body }}

* * *

_This readme was generated using Grunt and [assemble][repo] on \{{ today }}._

[org]: https://github.com/assemble
[repo]: https://github.com/assemble/assemble
[issues]: https://github.com/assemble/assemble/issues
[docs]: https://github.com/assemble/assemble-docs
```


## Layout FAQ
* Layouts are optional
* When a layout is specified, _it must include a `\{{> body }}` tag to render content_ from any file that uses the layout.
* Layouts may be defined in the Gruntfile or in [YFM][yaml-front-matter] of a page.
* A layout defined for a target will override a layout defined at the task level.
* A layout defined in [YFM][yaml-front-matter] will override a layout defined in the Gruntfile
* [Lo-dash templates][templates-overview] can be used in YAML front-matter to specificy a layout.


## Related info
* [options.layout][options-layout]
* [Pages][pages]
* [Partials][partials]
* [templates-overview][templates-overview]
* [YFM][yaml-front-matter]


{{#draft}}
### Define layouts in JSON or YAML
Layouts can also be defined on a page-by-page basis using `.json` or `.yml` data files.

Or you can optionally add the layout to external configuration files for each page, using

```json
{
  "layout": ""
}
```
or a `[page-name].yml`

```yaml
---
page:
  layout
---
```

```json
{
  "layout": {
    "header" : "header-template",
    "sidebar": "sidebar-template",
    "body"   : "body-template",
    "footer" : "footer-template"
  }
}
```
## Default Layout
\{{! THESE ARE JUST CONCEPTS }}

`config.json` or something

```json
{
  "layout": ""
}
```
Example layout configuration:

```json
{
  "layouts"  : {
    "default" : {
      "name" : "default",
      "sections" : [
        "site.section"
      ]
    }
  }
}
```
\{{! THESE ARE JUST CONCEPTS }}

```json
{
  "name": "Stark",
  "author": "Jon Schlinkert",
  "layouts": {
    "default": {
      "name": "Subpage",
      "sections": [
        "header",
        "one-sidebar",
        "footer"
      ]
    },
    "fullwidth": {
      "name": "Full-width",
      "sections": [
        "header",
        "full-width",
        "footer"
      ]
    }
  },
  "navigations": [
    {
      "title": "Main Navigation",
      "name": "mainNav"
    },
    {
      "title": "Secondary Navigation",
      "name": "secondaryNav"
    }
  ],
  "stylesheets": [
    "global.less",
    "typography.less"
  ]
}
```

\{{! THESE ARE JUST CONCEPTS }}

### Layout Variations

Consider the common case where the homepage has a different layout than the sub pages. Let's say that the homepage is full-width and the "sub-pages" have a sidebar, the header and footer sections are the same, but the middle content section is different.

**Step 1: Create Multiple section Files**

First, create the shared layouts in any folder, such as `src/templates/sections/` :

* header.hbs
* footer.hbs

Then create the two different sections for the middle content section:

* full-width.hbs
* sidebar.hbs


**Step 2: Configure Layouts**

Set up the multiple layouts in a configuration file (such as `pages.json`):

```json
// ignore this!!! I'm experimenting with ideas so it's inconsistent...
[
  {
    "home" : {
      "name" : "Sidebar",
      "template": "index.hbs",
      "layout" : "default.hbs",
      "sections" : [ "header", "sidebar", "footer" ]
    },
    "homepage" : {
      "name" : "Full Width",
      "sections" : [ "header", "full-width", "footer" ]
    }
  },
  {
    "layouts" : {
      "default" : {
        "name" : "Sidebar",
        "sections" : [ "header", "sidebar", "footer" ]
      },
      "homepage" : {
        "name" : "Full Width",
        "sections" : [ "header", "full-width", "footer" ]
      }
    }
  }
]
```json

```json
{
  "config": {
    "defaults": {
      "layouts" : {
        "site": "",
        "area": "",
        "collections": "",
        "default" : {
          "name" : "Sidebar",
          "sections" : [ "header", "sidebar", "footer" ]
        },
        "homepage" : {
          "name" : "Full Width",
          "sections" : [ "header", "full-width", "footer" ]
        },
        "homepage" : {
          "name" : "Full Width",
          "sections" : [ "header", "full-width", "footer" ]
        }
      }
    }
  }
}
```
You can also specify the default homepage layout. If you add a layout variable named "homepage". See example above. The homepage default layout overrides all other default layouts.

## Additional layout types

* Page layouts
* Section layouts
* Partial layouts


{{/draft}}
