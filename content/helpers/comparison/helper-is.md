## \{{is}}

> Conditionally render a block if the condition is true (if x = y).

Parameters: `string|int` (the value to test against)
Default: `undefined`

##### Example #1:

Data:

```js
---
number = 5
---
```

Template:

```handlebars
\{{#is number 5}}
    Kiss my shiny metal ass!
\{{else}}
    Never mind :(
\{{/is}}
```

Renders to:

```
Kiss my shiny metal ass!
```

##### Example #2:

If you are using data from _YAML front matter_ or any specified `JSON` and/or `YAML` source files will get passed through to the context in your templates.

Data and Templates:

```handlebars
---
page:
  title: About Us
---

\{{#is page.title "Home"}}
    <h1> About Us </h1>
\{{else}}
    <h1> My Blog </h1>
\{{/is}}
```

Renders to:

```handlebars
<h1> About Us </h1>
```