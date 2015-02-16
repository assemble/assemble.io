## \{{extname}}

> "Return the extension of the path, from the last '.' to end of string in the last portion of the path. If there is no '.' in the last portion of the path or the first character of it is '.', then it returns an empty string."

Parameters: `string` (the value to test against).
Default: `none`

Template:

```handlebars
\{{extname 'index.html'}}
```

Renders to:

```
.html
```

Template:

```handlebars
\{{extname 'index.'}}
```

Renders to:

```
.
```

Template:

```handlebars
\{{extname 'index'}}
```

Returns nothing.
