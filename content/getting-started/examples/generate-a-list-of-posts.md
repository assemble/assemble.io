## Render a "list" of Posts

```html
---
title: Blog
posts: ['src/posts/2013_05_10.md', 'src/posts/2013_05_12.md']
---
<div class="page-header">
  <h1>\{{ title }}</h1>
</div>

<h1>This is a simple blog</h1>

\{{#each posts}}
<h2>\{{md this}}</h2>
\{{/each}}
```


The `md` helper also accepts globbing patterns, so the following could also be used:

```html
---
title: Posts from May, 2013
posts: ['src/posts/2013_05_*.md']
---

<div class="page-header">
  <h1>\{{ title }}</h1>
</div>

\{{#each posts}}
<h2>\{{md this}}</h2>
\{{/each}}
```

{{#todo}}
* how to truncate posts using helpers
{{/todo}}