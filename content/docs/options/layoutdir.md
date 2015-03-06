---
title: options.layoutdir
shortname: layoutdir

area: docs
section: configuration

categories:
- options
- templates
tags:
- options
- layout
- layoutdir
- layouts
- templates
---

## options.layoutdir

> Path to the directory to be used as the "cwd" for layouts

`layoutdir` makes maintaining [layouts][options-layout] a little easier on projects that require more than one layout. The primary advantage of using the feature is that you can change or rename the directory where your layouts are stored without having to update the path to each layout used throughout your project. It could also reduce some clutter in the [Gruntfile](http://gruntjs.com) and [YAML Front Matter][yaml-front-matter].

Additionally, a `layoutdir` can be defined for each [target](http://gruntjs.com/configuring-tasks), allowing for even greater control.

## Usage Examples

### Without `layoutdir`
When `layoutdir` _is not defined_, each layout must be defined using the _full path from the project root to the layout_.

```js
assemble: {
  options: {
    layout: 'src/templates/layouts/default-layout.hbs'
  },
  docs: {
    options: {
      layout: 'src/templates/layouts/docs-layout.hbs'
    },
    ...
  },
}
```

This also applies to [YAML front matter][yaml-front-matter] when it is necessary to "override" layouts at the page-level:

``` yaml
---
title: Blog
layout: src/templates/layouts/blog-layout.hbs
---
```

### With `layoutdir`

When `layoutdir` is defined only require the name of the layout to be used (_must include the file extension_):

```
assemble: {
  options: {
    layoutdir: 'src/templates/layouts',
    layout: 'default-layout.hbs'
  },
  docs: {
    options: {
      layout: 'docs-layout.hbs'
    },
    ...
  },
  blog: {
    options: {
      layout: 'blog-layout.hbs'
    },
    ...
  }
}
```

In [YAML front matter][yaml-front-matter]:

``` yaml
---
title: Layoutdir is Awesome
layout: blog-layout.hbs
---
```

## A Word of Caution: Use clear naming conventions
While `layoutdir` can make your project a little easier to manage, it is strongly recommended that you **establish clear and consistent naming conventions for your layouts, and follow them**. Otherwise, this feature might end up causing more problems than it solves, e.g., use unique names such as `layouts/default-layout.hbs` and `layouts/blog-layout.hbs` instead of `layouts/site/default.hbs` and `layouts/blog/default.hbs`.

To understand why this is important, imagine that you're project has three sub-projects, each with their own layout: `components`, `docs` and `blog`. This is a fairly basic, common scenario. However, remember that each may also have its own `layoutdir` as well, which creates potential for conventions that lead to using the wrong layout accidentally.

```js
// Bad Example: uses layouts all named `default.hbs` </3
assemble: {
  components: {
    options: {
      layoutdir: 'src/components/layouts',
      layout: 'default.hbs'
    }
  },
  docs: {
    options: {
      layoutdir: 'src/docs/layouts',
      layout: 'default.hbs'
    }
  },
  blog: {
    options: {
      layoutdir: 'src/blog/layouts',
      layout: 'default.hbs'
    }
  }
}

// Good example: uses descriptive layout names
assemble: {
  components: {
    options: {
      layoutdir: 'src/components/layouts',
      layout: 'components-layout.hbs'
    }
  },
  docs: {
    options: {
      layout: 'docs-layout.hbs'
    }
  },
  blog: {
    options: {
      layout: 'blog-layout.hbs'
    }
  }
}
```

Note that in the bad example, the layout name is the same for each target, but the `layoutdir` is a different directory, indicating that there are three different "default" layouts. While it might make sense for each target to have its own `layoutdir`, since layouts can be overridden in the [YAML front matter][yaml-front-matter] of individual pages, it is not a good idea to use the same name for multiple layouts, _unless you are intentionally using this naming convention as a strategy_. The reason is that it gets very difficult to track which page is building from which layout when working inside the pages themselves.

The second example uses one primary layout directory with each layout named descriptively. This allows for to to define `layoutdir` once and use unique layout names on the `layout` option at the task level. Moreover, using uniquely named layouts will allow you and your team to easily identify changes in version control.

### Difficult to follow

Without `layoutdir`, you have the entire path to follow, but without it you must rely on the name of the layout itself to guide you.

```html
---
title: Example 1
layout: default.hbs
---
```

Using a more descriptive name for the layout helps avoid confusion.

```html
---
title: Example 2
layout: blog-default.hbs
---
```

Of course, these are only recommendations and you will need to find a strategy that works best for each project.

#### Also see [Layouts][layouts] and [options.layout][options-layout] →
