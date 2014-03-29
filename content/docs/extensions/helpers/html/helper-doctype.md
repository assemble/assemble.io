## \{{doctype}}

> Easy way to add an uncommonly used doctype.

Default is HTML 5 (`<!DOCTYPE html>`) although this is probably only useful on projects that use anything besides HTML 5.

Template:

```handlebars
\{{DOCTYPE 'svg 1.1'}}
```

Renders to:

```handlebars
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
```

Available doctypes:

### HTML 5 (default)

* `\{{doctype '5'}}` | aliases: `html`, `html5`

### XML

* `<?xml version="1.0" encoding="utf-8" ?>`
* `\{{doctype 'xml'}}`

### XHTML

* `\{{doctype 'basic'}}`
* `\{{doctype 'strict'}}`
* `\{{doctype 'transitional'}}`
* `\{{doctype 'frameset'}}`
* `\{{doctype '1.1'}}` | aliases: `1.1`, `xhtml 1.1`
* `\{{doctype 'mobile'}}`

### HTML 4.01

* `\{{doctype '4'}}` | aliases: `4.01`, `4.01 strict`
* `\{{doctype '4.01 trans'}}`
* `\{{doctype '4.01 frameset'}}`

### SVG

* `\{{doctype 'svg'}}` | aliases: `svg`, `svg 1.1`, `svg1.1`
* `\{{doctype 'svg 1.0'}}` | aliases: `svg 1.0`, `svg1.0`, `svg1`
