---
title: Templates Overview

area: docs
section: templates
---

> Assemble allows use of either Lo-Dash or Handlebars templates, depending on where the templates are used.


## Separation of Concerns

In general:

* Lo-Dash templates are used for configuration and metadata. Lo-Dash may be used in the Gruntfile, JSON/YAML files, YAML front matter, etc.
* Handlebars templates are used for content. These templates may be used in the content of pages or partials.


_Note that there is **[one exception][pages-collections]** to this separation of concerns_, and these two libs also make a great team when you use them together.


### [Lo-Dash templates](http://lodash.com/)

#### Syntax
A basic template looks like this:

```yaml
title: <%= pkg.name %>
```
#### Usage

Lo-Dash templates can be used in:

* Gruntfile
* YAML/JSON files
* YAML front matter of files (pages, partials, etc.)

However, Lo-Dash templates **cannot be used in the "content of pages"**.

Assemble only limits _where_ you can use Lo-Dash templates, beyond that you can do anything with Lo-Dash templates that you can do with JavaScript. Keep in mind, however, that the more logic you add to the YAML front matter of page for instance, the more complicated you make your pages and the more difficult your projects will be to maintain.


### [Handlebars templates](http://handlebarsjs.com/)

#### Syntax
A basic expression looks like this:

```html
<h1>\{{component.title}}</h1>
```

Usage: May be used only in the "content" of pages, e.g. _anywhere but the YAML front matter of a page._.

Although Handlebars is most often used for generating HTML, you can also _generate_ JSON, XML, YAML, CSS, LESS, SASS and so on.

This keeps Lo-Dash templates focused on configuration(ish) data, or data that is used directly by the build process, and Handlebars focused on rendering content with as little logic as possible.


{{#todo}}
* add links to resources for both libs. maybe cheatsheets
{{/todo}}


## Templating Basics

Most templating languages share a few common features:


## "Do"s and "Don't"s

### Don't

```json
// alert.json
{
  "message": "this is an alert from \{{site.name}}"
}
```

Or this:

```html
---
title: \{{pkg.name}} # Oops! Can't use handlebars here!!!
---

<h1>\{{title}}</h1>
```

Neither of those examples will because Handlebars templates can only be used **outside of the YAML front matter**.

This won't work either:

```html
---
title: My Site
---
<h1><%= title %></h1>
Whoa! Nope, this won't work either. No Lo-Dash in the "content" part of the page!
```

Lo-Dash templates can only be used in the YAML front Matter (or in YAML/JSON files, or the Gruntfile).

### Do

This works:

```json
// alert.json
{
  "message": "this is an alert from <%= site.name %>"
}
```

This works too:

```html
---
title: <% pkg.name %> # Nice!!! Assuming you are reading in the package.json in the Gruntfile, this works!
---

<h1>\{{title}}</h1>

And this title will pull data from the YAML front matter. It's kind of like cheating, accept not.
```

So does this:

```yaml
# alert.yml
modifier: alert-warning
strong: Be advised!
message: this is an alert from <%= site.name %> # pass in the site name
```

And then pass it to `alert.hbs`:

```html
<div class="alert \{{alert.modifier}}">
  <strong>\{{ alert.strong }}</strong>\{{ alert.message }}
</div>
```

{{#draft}}

## Higher-Level Template Conventions


## Layouts

* [layouts][layouts] are used for "wrapping" multiple pages with common code, like the `<head></head>`, footer and so on.
* [Pages][pages] When we refer to "pages" we're referring to:
    1. Any files that pass through the `src-dest` [file mapping](http://gruntjs.com/configuring-tasks#files) in the Assemble task
    2. Files that are built using the actual [pages array](http://assemble.io/Pages.html).
* [Partials][partials]



## [Handlebars](http://handlebarsjs.com/)

Handlebars is the default template engine that ships with Assemble.

TODO:

How Handlebars Paths work.

Handlebars supports simple paths, just like Mustache.

```handlebars
<p>\{{name}}</p>
```

Handlebars also supports nested paths, making it possible to look up properties nested below the current context.

### Example

Layout

```html
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

### Adding data to sections

To add data to a section, you have to understand how context works. For example, if we have a JSON file named `section.json` :

```json
{
  "header" : {
    "title" : "Page Title",
    "description" : "This is the page description."
  }
}
```

And we want that data to end up in our templates, so our templates must start with the `section` variable:

```handlebars
\{{#section.header}}
<div class="page-header">
  <h1>\{{ title }}</h1>
  <p>\{{ description }}</p>
</div>
\{{/section.header}}
```

Output:

```html
<div class="page-header">
  <h1>Page Title</h1>
  <p>This is the page description.</p>
</div>
```


## Lo-Dash


```html
---
title: Home
list: <% _.forEach(people, function(name) { %><li><%= name %></li><% }); %>
people:
- Jon Schlinkert
- Brian Woodward
---
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>\{{title}}</title>
  </head>
  <body>
    <section class="people">
      <ul>
        \{{{list}}}
      </ul>
    </section>
  </body>
</html>
```



## Arrays

The `\{{#each}}` helper is used for accessing data in arrays. Let's say we start with an array of items:

```json
{
  "items" : [
    {
      "title" : "First Item",
      "description" : "This is the first item description."
    },
    {
      "title" : "Second Item",
      "description" : "This is the second item description."
    },
    {
      "title" : "Third Item",
      "description" : "This is the third item description."
    }
  ]
}
```

Inside our templates, we use the `\{{#each}}` helper like this:

```handlebars
\{{#each items}}
<div>
  <h1>\{{ title }}</h1>
  <p>\{{ description }}</p>
</div>
\{{/each}}
```

And it compiles to:

```html
<div>
  <h1>First Item</h1>
  <p>This is the first item description.</p>
</div>
<div>
  <h1>Second item</h1>
  <p>This is the second item description.</p>
</div>
<div>
  <h1>Third Item</h1>
  <p>This is the third item description.</p>
</div>
```


### Lo-Dash Templates in YAML Front Matter

Although the Handlebars helpers from [handlebars-helpers][handlebars-helpers] can be extremely useful and powerful, they can only be used inside the content of a page. So there are certain situation where they fall short, such as when you want to make a string lowercase _and_ replace spaces in the string with dashes.

Also see the [Lo-Dash-Cheatsheet][cheatsheet-lo-dash].

For example:

From this

```
Page Title
```

To this

```
page-title
```

We could use the `\{{hyphenate}}` Handlebars helper from [handlebars-helpers][handlebars-helpers] in the content of the page:

```handlebars
---
title: Page Title
---
<div class="\{{hyphenate title}}">
  <h1>\{{ title }}</h1>
</div>
```

But this will only replace spaces with hyphens: `Page-Title`, and not lowercase. To get the results we need we can use Lo-Dash templates inside the YAML front matter:

```handlebars
---
title: Page Title
class: <%= title.toLowerCase().split(" ").join("-") %>
---
<div class="\{{class}}">
  <h1>\{{ title }}</h1>
</div>
```
Results in `page-title`.

#### Lo-Dash and Handlebars together

Or, depending on your tastes, you might find it preferrable to use combination of underscore templates in the YAML front matter with handlebars in the page itself.

```handlebars
---
title: Page Title
class: <%= title.toLowerCase() %>
---
<div class="\{{hyphenate class}}">
  <h1>\{{ title }}</h1>
</div>
```

### Where can Lo-Dash Templates be used with Assemble?

* Inside the Gruntfile
* In YAML front matter of pages **and partials**
* In JSON or YAML files that supply content or data to pages or partials
* In external JSON or YAML files that are used to supply configuration data to Assemble

For example, inside `alert.json` :

```json
{
  "class": "welcome-alert",
  "message": "Welcome to <%= title %>, the best place on the web."
}
```

Or the same in YAML:

```yaml
class: welcome-alert
message: Welcome to <%= title %>, the best place on the web
```

Here are the global defaults:

1. `YAML front matter` : YAML front matter must be the first thing in the file and takes the form of:YAML front-matter allows wins over all other methods, if
not defined the following option is used.
2. page.json:
3. config.json with a `page` or `pages` object

```yaml
---
scaffold:
  theme:
  title: Home
  layout: full-width
  published: false
  tags:
---
```

## Page

Same as global defaults:
 1. `YAML Front Matter` on each page is the _most_ specific, and will always "win" over other methods
 2. `page.json`
 3. `something.json` which references a `page` or `pages` objects or properties

One way to take advantage of specificity is to **use underscore templates inside your YAML Front Matter**. For example:

```yaml
---
project: <%= projects %>/<%= project.type %>/<%= project.name %>.json
---
```
or:

```yaml
---
project:
  name: Project Name
  theme: <%= themes %>/<%= theme.type %>/<%= theme.name %>.json
  scaffold: <%= scaffolds %>/<%= scaffold.type %>/<%= scaffold.name %>.json
    page: <%= pages %>/<%= page.type %>/<%= page.name %>.json
      title: Page Name
      layout: <%= layouts %>/<%= layout.type %>/<%= layout.name %>.json
        section:
          - <%= sections %>/<%= sections.type %>/<%= sections.name %>.json
          components:
            - <%= component.name %>.json
            - <%= component.name2 %>.json
---
```


## Templates

**Template Processors**


## Layout


### Sections

zones...

## Partials

components, widgets, modules...

### Snippets

reusable blocks of code which are not


## Data

  * "mock" data
  * content
  * microcopy


{{/draft}}


## Related Information

* [Pages][pages]
* [Partials][partials]
* [Layouts][layouts]
* [Helpers][helpers]
