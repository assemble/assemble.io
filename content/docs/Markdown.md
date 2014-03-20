---
title: Markdown

area: docs
section: content

categories:
- content
- markdown
tags:
- content
- converters
- markdown
- HTML
---

> With Assemble you can use markdown however you want, wherever you want

An advantage of writing content with markdown is that it is free from the angle brackets and tags used in HTML, so it feels and looks more like "content" than "code".

With Assemble you can write: entire documents in markdown, and choose where and when to compile them to HTML; document fragments in markdown, which can be "included" or used as partials within other larger documents; and/or, sections of markdown directly inside HTML documents (referred to as "inline markdown").

### Markdown expression

Use the markdown expression, `\{{md}}`, to enable importing of external markdown content.

```handlebars
\{{md "../path/to/content.md"}}
```

Alternatively, you can add the content variable to the [YAML Front Matter][options#yaml-font-matter-options] (YFM) of a page.

```yaml
---
page:
  title: Home
content: ../path/to/content.md
---
```

This will allow you to just use just `content` in the markdown expression, the path will be pulled from YFM.

```handlebars
\{{md content}}
```

### Markdown block expression

The `\{{#markdown}}...\{{/markdown}}` block expression is used to "wrap" markdown content that is written "inline" directly inside HTML documents:

```markdown
<div> <!-- HTML is cool. I guess. --> </div>

\{{#markdown}}
## But Inline Markdown is awesome

> This is markdown content

* Useful for simple content
* Great for blog posts
* Easier on the eyes than angle brackets
* Even links look prettier
* Such wow

### Pretty links

[Visit Assemble](http://github.com/assemble/assemble)

\{{/markdown}}

```

In a layout, can also wrap the `\{{> body }}` tag with the `\{{#markdown}}...\{{/markdown}}` block helper to convert any HTML pages that use that layout to markdown:

```handlebars
\{{#markdown}}
  \{{> body }}
\{{/markdown}}
```
