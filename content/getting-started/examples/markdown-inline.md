#### Write "inline" markdown
The `\{{#markdown}}\{{/markdown}}` block expression allows markdown to be written "inline" with any HTML and handlebars content.

Example:

```handlebars
\{{#markdown}}
# Inline Markdown is awesome

> this is markdown content

  * useful for simple content
  * great for blog posts
  * easier on the eyes than angle brackets
  * even links look prettier


### Pretty links
[Visit Assemble](\{{url.assemble.repo}})


### Even Prettier links
Embed handlebars templates to make them even prettier.

\{{#page.links}}
[\{{text}}](\{{href}})
\{{/page.links}}

\{{/markdown}}\{{! /end markdown}}
```
