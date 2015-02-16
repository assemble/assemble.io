## \{{inflect}}

> Returns the plural or singular form of a word based on a count.

Parameters:
* singular `string` - The singular form of the word. (Required)
* plural `string` - The plural form of the word. (Required)
* include `boolean` - whether or not to include the count before the word. (Optional)

Data:

```js
enemies = 0
friends = 1
```

Template:

```handlebars
\{{inflect enemies "enemy" "enemies"}}
\{{inflect friends "friend" "friends" true}}
```

Renders to:

```
enemies
1 friend
```