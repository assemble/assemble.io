---
title: options.assets

area: docs
section: configuration
---
## options.assets

> "Assets" directory to be used by dest files in a target.

Type: `String` (optional)
Default: `undefined`

_`options.assets` may be defined at the task- and/or target-levels._

## Overview
Oftentimes an "assets" directory is used in projects for containing the CSS, JavaScripts, images and other similar files.

Once the `assets` variable is defined in the Gruntfile, you may use the `\{{assets}}` variable anywhere in your templates and Assemble will generate a relative path from `dest` files to the specified `assets` directory.


## Example usage

Given the following task configuration in your project's Grunfile:

``` js
assemble: {
  options: {
    // Set the "default" assets dir at the task-level
    assets: 'docs/assets'
  },
  docs: {
    files: {
      'docs/': ['src/pages/**/*.hbs']
    }
  },
  components: {
    files: {
      'docs/components/': ['src/partials/**/*.hbs']
    }
  },
  main: {
    options: {
      // Override the task-level assets dir
      assets: 'dist/assets'
    },
    files: {
      'dist/': ['src/pages/**/*.hbs']
    }
  }
  // other stuff
}
```

And given the following templates:

```html
<link rel="stylesheet" href="\{{assets}}/css/bootstrap.css">
```

The output HTML will render as follows:

For the `assemble.docs` target

```html
<link rel="stylesheet" href="assets/css/bootstrap.css">
```

For the `assemble.components` target

```html
<link rel="stylesheet" href="../assets/css/bootstrap.css">
```

For the `assemble.main` target

```html
<link rel="stylesheet" href="assets/css/bootstrap.css">
```

**Note** that for `assets` to work predictably, _a slash must follow the `\{{assets}}` variable_


## More information

* [Options][]
* [variables][built-in-variables]