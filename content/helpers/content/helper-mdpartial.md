## \{{mdpartial}} and \{{eachPartial}}

> Helpers for [Assemble](https://github.com/assemble/assemble) and [Handlebars](http://github.com/wycats/handlebars.js) 
> that make working with Markdown partials easier and more flexible.
> `{{mdpartial}}` is a block helper which renders a Markdown partial and passes data to it, and
> `{{eachPartial}}` iterates over a set of partials.

### Quickstart

```bash
npm install handlebars-helper-mdpartial --save-dev
```

Then register the helper explicitly in the Gruntfile:

```js
grunt.initConfig({
  assemble: {
    options: {
      helpers: ["handlebars-helper-mdpartial", "foo/*.js"]
    }
  }
});
```

### \{{mdpartial}}

> Similar to [`{{partial}}`](https://github.com/helpers/handlebars-helper-partial), but this helper is used as **block helper**. 

Inside the block you can use `{{this.content}}` to get the content of the partial. Also you have access to the context (in order of precedence):

1. **given context**     : a context explicitly passed as a second parameter, e.g. `{{partial "foo" bar}}`, will win over other contexts.
2. **YAML front matter** : YAML front matter of the partial
3. **this**              : A context of `this` usually means either YAML front matter of the "inheriting" page or a block expression wrapping the helper
4. **Assemble options**  : Custom properties defined in Assemble options
5. **grunt.config.data** : Data from `grunt.config.data` (e.g. `pkg: grunt.file.readJSON("package.json"`))

**Note:** this helper can be used for all partials, not just those ending in `*.md`. If the partial ends with `*.md` then `{{this.content}}` will return the content rendered as HTML.

### \{{eachPartial}}

> Iterates over a set of partials and adds their data to the context object.
> The set of partials can be filtered using blobbing patterns. 
> It can be used inside other partials. 

The context is:

1. **YAML front matter** : YAML front matter of the partial
2. `{ partialSrc: "[filepath]", partialName: "[name]" }`
3. **Assemble options**  : Custom properties defined in Assemble options
4. **grunt.config.data** : Data from `grunt.config.data` (e.g. `pkg: grunt.file.readJSON("package.json"`))

### Examples

```handlebars
{{#eachPartial "**/*.md"}}
  ...
  {{partialSrc}} {{partialName}}
  ...  
{{/eachPartial}}
```

```handlebars
{{#mdpartial "foo"}}
  {{this.bar}} {{this.content}}
{{/mdpartial}}
```

```handlebars
{{#mdpartial "path/to/foo.md"}}
  {{this.bar}} {{this.content}}
{{/mdpartial}}
```

Optionally pass in a context object as the second parameter:

```handlebars
{{#mdpartial "foo" contextObject}}
  {{this.bar}} {{this.content}}
{{/mdpartial}}
```

The two helpers also work great together:

```handlebars
{{#eachPartial "**/*.md"}}
  {{#mdpartial this}}
    
    {{this.content}}
        
    {{partialSrc}} {{partialName}}
    
  {{/mdpartial}}
{{/eachPartial}}
```

### Author

[Alex Bogdanovski](https://github.com/albogdano)

### License
MIT License
