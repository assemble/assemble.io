## \{{urlResolve}}

> Take a base URL, and a href URL, and resolve them as a browser would for an anchor tag.

Template:

```handlebars
\{{urlResolve url href}}
```

Example:

```handlebars
<a href="\{{urlResolve "http://example.com/one" "/two"}}"></a>
```
Renders to:

```handlebars
<a href="http://example.com/two"></a>
```
