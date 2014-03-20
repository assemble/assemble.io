---
title: Config vs. Content
lead: Why does Assemble use two templates engines by default?
---

I have been asked this question a couple of times. But recently one of our users created an issue to discuss the matter, and the answer I gave seemed to only create more questions. So I decided to dedicate a post to the matter.


YAML

Say, `foo.yml`:

```yaml
title: <%= title %>
```

YAML front matter

```yaml
---
title: <%= title %>
---
```

JSON

```json
{
  "title": "<%= title %>"
}
```

But... where is this `title` coming from!? It's all variables and no values!

The "correct" answer, since Assemble is more about configuration than convention, is that we need to decide where we want to store our variables and then stick to that as our convention.

So for the purposes of this example, let's set the `title` variable in the Gruntfile (e.g our config):

```js
assemble: {
  foo: {
    options: {
      title: 'Assemble'
    },
    files: {
      '<%= site.dest %>/': ['<%= site.pages %>/*.hbs']
    }
  }
}
```

Now, when we use the `<%= title %>` template, Assemble will assume that we are referring to the `title` variable defined in the options above.

Let's try using this variable in a page, such as `index.hbs`:

```handlebars
<h1>{{title}}!</h1>
```
Okay, this seems pretty straightforward, right? It also seems reasonable to expect that once this page is rendered to `index.html` by Assemble we would see:

```html
<h1>Assemble!</h1>
```

### Introducing YAML Front Matter

Let's mix things up a bit and add some YAML front matter to see what happens when the `title` property is defined both "locally" and "globally".

```handlebars
---
title: Home
---
<h1>{{title}}!</h1>
```
Although `title` is already defined globally, Assemble gives precedence to the locally-defined, `title` variable, so the rendered result would be:

```html
<h1>Home!</h1>
```

As in previous examples, if we try to use the `<%= title %>` variable to use the globally defined `title` (e.g. "Assemble"), we'll get a `Maximum call stack size exceeded` error.

```handlebars
---
# THIS WON'T WORK!
title: <%= title %> - Home
---
<h1>{{title}}!</h1>
```

Or we could do something like this:

```handlebars
---
site_title: <%= title %>
title: Home
---
<h1>{{title}}!</h1>
<h1>{{site_title}}!</h1>
```
