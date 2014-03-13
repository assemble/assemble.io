---
title: Partials

area: docs
section: templates

categories:
- templates
tags:
- includes
- partials

logo:
  URL: media/images/logo.png
  classes:
    - logo
    - main
  width: 80
  height: 40
  title: Assemble This!

hide-partial-YFM:
  class: ""
---

> Like "includes", partials are reusable fragments of code that can be included in a page and rendered. Partials are useful when you have blocks of reusable code that are applicable in different contexts.

## Assemble, Mustache, Handlebars and Partials

Partials are a part of the [Mustache template language](http://mustache.github.io/) of which Handlebars is superset.  More information about partials in general can be found in the [Mustache documentation](http://mustache.github.io/mustache.5.html). Assemble, when used with the [Handlebars](http://handlebarsjs.com/) engine, allows partials to be defined and used. 

## An Example with Handlebars

Let us consider a simple partial as an example that would be used to generate an HTML `img` tag:

`img.hbs`
```html
<img src="\{{assets}}/images/\{{URL}}"
     class="\{{#each classes}}\{{this}} \{{/each}}"
     id="\{{#if id}}\{{id}}\{{else}}\{{slugify title}}\{{/if}}"
     width="\{{width}}"
     height="\{{height}}"
     title="\{{title}}"
     alt="\{{#if alt}}\{{alt}}\{{else}}\{{title}}\{{/if}}"/>
```

As you can see, Handlebars tags are used as placeholders for inserting various properties. For example, the `\{{URL}}` tag will insert a property `URL` from the current context.

Now that we have defined a partial, we can include the partial in a template via the standard Mustache syntax `\{{> [partial-name w/o extension]}}`.  Using our `img.hbs` partial example above and the following HTML template:

`header.html`
```html
---
{{#logo}}
logo:
  URL: {{URL}}
    classes:
    {{#classes}}
    - {{.}}
    {{/classes}}
  width: {{width}}
  height: {{height}}
  title: {{title}}
{{/logo}}
---
<header class="root">
    \{{#page.logo}}
      \{{> img}}
    \{{/page.logo}}
</header>
```
Assemble would produce the following output:

```html
<header class="root">
    {{#logo}}
      {{> img}}
    {{/logo}}
</header>
```

Note that we enclosed our `\{{> img}}` partial invocation inside the `\{{#page.logo}} .. \{{/page.logo}}` section to setup the context in which the partial properties will be evaluated.  In this case they are coming from the YAML front matter we defined in `header.html`, though the context can be set via the many methods supported by Assemble and Handlebars.

Handlebars provides a more convenient syntax for invoking a partial with a given context via `\{{> [partial-name] [context]}}`. Thus, we could change our `header.html` template as follows:

`header.html`
```html
---
{{#logo}}
logo:
  URL: {{URL}}
    classes:
    {{#classes}}
    - {{.}}
    {{/classes}}
  width: {{width}}
  height: {{height}}
  title: {{title}}
{{/logo}}
---
<header class="root">
    \{{> img page.logo}}
</header>
```
and Assemble would produce the same output as above. With this syntax, the desired context in which to evaluate the partial is passed explicitly as a paramter to the partial.

## Configuration

To use partials in Assemble, we must specify where partials can be found in the configuration options for the `assemble` Grunt task:

`Gruntfile.js`
```js
    assemble: {
        options: {

            // setup default partials locations
            partials: ['templates/includes/**/*.{hbs,md}']
            }
        }
```

as well as within a collection's options:

`Gruntfile.js`
```js
    assemble: {
      
        my-collection: {
            options: {
                partials: ['my-collection/templates/partials/**/*.{hbs,md}']
            }
        }
    }
```

## YAML Front Matter in Partials

Though partials can have YAML front matter, currently in Handlebars there is a [known issue](https://github.com/wycats/handlebars.js/pull/182) which causes the YAML front matter in a partial to be ignored if the partial is invoked within *any* context. Thus, the following updated `img.hbs` partial from above with YAML front matter:

`img.hbs`
```html
---
class: image
---
<img src="\{{assets}}/images/\{{URL}}"
     class="\{{#each classes}}\{{this}} \{{/each}}\{{class}}"
     id="\{{#if id}}\{{id}}\{{else}}\{{slugify title}}\{{/if}}"
     width="\{{width}}"
     height="\{{height}}"
     title="\{{title}}"
     alt="\{{#if alt}}\{{alt}}\{{else}}\{{title}}\{{/if}}"/>
```

would produce the same output as above, neglecting to add on the `\{{class}}` property as listed in the partial.

Fortunately Assemble provides two helpers which will merge the partial's YAML front matter into the context and give the expected results:

* [handlebars-helper-partial](https://github.com/helpers/handlebars-helper-partial)
* [handlebars-helper-include](https://github.com/helpers/handlebars-helper-include)

So taking our updated example partial, we could use the Assemble `partial` helper in the following way to be sure our partial's YAML front matter data is merged into the overall context when evaluated:

`header.html`
```html
<header class="root">
    \{{partial 'img' page.logo}}
</header>
```

Note how when using the `\{{partial}}` helper we must put the name of the partial to include in quotes.

Finally, Assemble would produce the following output:

```html
<header class="root">
    {{partial 'img' page.logo}}
</header>
```
with the partial's own YAML front matter included in the context, producing the extra `image` class attribute value.

## Partials in Handlebars Specifics

The `Handlebars.registerPartial` method, which registers a partial, accepts the name of the partial as its first argument and either a _template source string_ or a _compiled template_ as its second argument. Accepting a compiled template as the second argument enables you to, for example, use the partial in a loop that outputs a list but also append items to the list later using the partial's template function. For an example of this, check out the [handlebars-helpers-include](https://github.com/helpers/handlebars-helper-include/blob/master/index.js) code.


{{#draft}}
To use a partial from a template, simply include `\{{> partial-name }}`. For example:
{{/draft}}

#### Also see [options.partials][options-partials] →
