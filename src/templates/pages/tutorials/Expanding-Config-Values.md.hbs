# Expanding Config Values

> Use Lo-Dash Templates in the data context and expand config values from within the Grunfile:


TODO: overview


## Example Usage


### Variable paths

First, inside our Gruntfile let's define some `src`/`dest` paths in a _reusable_ way (and with 
creative license), so that we do not have to keep re-defining these same paths throughout the 
project. To keep it simple we'll just define a few paths, but this could get much larger in 
reality:

``` js
// Project configuration.
grunt.initConfig({

  // We will define our paths here, with this user-defined object "build"
  build: {
    data: 'src/templates/data',
    pages: 'src/templates/pages',
    includes: ['src/templates/includes', 'src/templates/snippets']
  }
  // Now, the build paths can now be used in Lo-Dash templates
  assemble: {
    blog: {
      options: {
        data: ['<%= build.data %>/*.{json,yml}']
        partials: ['<%= build.includes %>/**/*.hbs']
      },
      files: {
        'posts/': ['<%= build.pages %>/*.hbs']
      }
    }
  }
}
```


Then in page yaml header:

```yaml
---
content:
  docs: <%= paths.content %>/docs.md
---
```

Then in the handlebars:

```html
{{md content.docs}}
```


```json
{
  "paths": {
    "content": "<%= docs.content.src %>"
  }
}
```

TODO: finish example

``` js
assemble: {
  options: {
    // todo
  },
  file: {
    // todo
  }
}
```

Lo-Dash templates also work in YFM, JSON or YAML files.

## Usage Examples 


### `assemble.options` 

Given we have the following in our Gruntfile:
``` js
assemble: {
  options: {
    bower: '<%= grunt.file.readJSON("bower.json") %>',
  }
}
```

We could then use the custom `bower` variable in templates like this:

``` html
<title>{{bower.name}}</title>
```

or like this:

``` html
---
component: <%= bower.name %>
---
<title>{{component}}</title>
```

Alternatively we can define the `bower` variable directly in the YFM of a page:

``` html
---
bower: <%= grunt.file.readJSON("bower.json") %>
---
```

And use it in templates like this:
``` html
---
bower: <%= grunt.file.readJSON("bower.json") %>
component: <%= bower.name %>
---
<title>{{component}}</title>
```
or this:

``` html
---
bower: <%= grunt.file.readJSON("bower.json") %>
---
<title>{{bower.name}}</title>
```

or this:

``` html
---
component: <%= grunt.file.readJSON("bower.json").name %>
---
<title>{{component}}</title>
```

