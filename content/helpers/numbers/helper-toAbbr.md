## \{{toAbbr}}

> Returns the number in abbreviation formats based on a value. The number is rounded to a particular decimal place.

Parameters: digits `int` - The number of digits to appear after the decimal point. (Optional)

Default: `2`

Data:

```js
value = 123456789
```

Template:

```handlebars
\{{toAbbr value}}
```

Renders to:

```
123.457m
```
