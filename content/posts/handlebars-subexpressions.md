---
title: Handlebars Subexpressions
published: false
---

Examples:

Subexpressions in Expression Helpers

* `\{{titleize basename}}` => `\{{default title basename}}` => `\{{default title (titleize basename)}}`.

* `\{{rel (isPermalink '/#' 'index')}}`

Subexpressions in Block Helpers

```handlebars
{{#each (expand files)}}
  {{md (basename .)}}
{{/each}}
```


* **Expression helpers**: These are just regular functions that take the name of the helper and the helper function as arguments. Once an expression helper is registered, it can be called anywhere in your templates, then Handlebars takes the expression's return value and writes it into the template. For example, `\{{titleize basename}}` would write out the `basename` of the "current" file in title case.

* **Subexpressions**: with subexpressions, you may invoke multiple helpers _within a single mustache_, and pass in the results of inner helper invocations as arguments to outer helpers. Subexpressions are delimited by parentheses. For example, the `default` helper takes two values, the first being the "desired" value and the second being a default or fallback value if the first value doesn't exist, e.g. `\{{default title basename}}`.  So if the `title` value doesn't exist, the helper will use the `basename` of the file instead. This means our value won't be title case, as a "real" title is expected to be. Howver, using subexpressions we can spice things up a bit and transform the basename to meet our needs: `\{{default title (titleize basename)}}`.


The final block.

```handlebars
{{#each section}}
  {{#each (expand files)}}
    {{#markdown}}
      {{inline .}}
    {{/markdown}}
  {{/each}}
{{/each}}
```