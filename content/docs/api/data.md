---
title: Config
collection: docs
category: api
---

Load data that will ultimately be passed to templates as context at runtime.

## .data

Used for setting data to be used in templates.

The method takes a string or array of glob patterns or file paths, or an object of data can be passed directly.

### Example

```
assemble.data({title: 'Blog'});
assemble.data('data/*.{json,yml}');
assemble.data(['config/*.yml', 'data/*.json']);
```

### .transform

Good for updating global data and options. Transforms are executed immediately and passed the current assemble upon initialization, so data and options can be updated.

### Example

```
// loads package.json data onto `assemble.cache.data`
assemble.transform('load-package-data', function(app) {
  app.data('package.json');
});
```
