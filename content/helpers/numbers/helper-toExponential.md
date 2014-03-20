## \{{toExponential}}

> Returns the number in exponential notation with one digit before the decimal point, rounded to `fractions` digits after the decimal point.

Parameters: fractions `int` - An integer specifying the number of digits after the decimal point. (Optional)

Data:

```js
value = 5
```

Template:

```handlebars
\{{toExponential value 5}}
```

Renders to:

```
5.00000e+0
```
