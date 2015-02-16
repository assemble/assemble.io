## \{{ul}}

> Creates an unordered list.

Parameters: `Hash|HTML attributes`, `Optional`

HTML attributes to use on the `ul` element.

Data:

```js
var collection = [
  name: 'Leela'
  deliveries: 8021,
  name: 'Bender'
  deliveries: 239,
  name: 'Fry'
  deliveries: 1
];
```

Template:

```handlebars
\{{#ul collection class="deliveries-list"}}
  \{{name}} - \{{inflect deliveries "delivery" "deliveries" true}}
\{{/ul}}
```

Output:

```html
<ul class="deliveries-list">
  <li> Leela - 8021 deliveries </li>
  <li> Bender - 239 deliveries </li>
  <li> Fry - 1 delivery </li>
</ul>
```
