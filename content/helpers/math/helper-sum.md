## \{{sum}}

> Returns the sum of multiple numbers. Similar to `\{{#add}}` block helper but accepts multiple arguments.

Parameters: `none`

Data:

```js
value = {
  a: 1,
  b: 2,
  c: 3
}
```
Template:

```handlebars
\{{sum value.a value.b value.c}}
```
Renders to:

```
6
```
