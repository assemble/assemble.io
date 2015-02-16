## \{{toPrecision}}

> Returns the number in fixed-point or exponential notation rounded to `precision` significant digits.

Parameters: precision `int` - The number of digits. If omitted, it returns the entire number (without any formatting). (Optional)

Data:

```js
value = 555.322
```

Template:

```handlebars
\{{toPrecision value 4}}
```

Renders to:

```
555.3
```
