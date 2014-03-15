# Config

> Learn how to work with config data in your Assemble projects

When we refer to `config`, we're describing the actual "build" configuration that is being passed to Assemble. A complete build configuration would:

* tell Assemble where to find data files and templates to render
* register plugins, to add features or functionality to Assemble that doesn't exist natively
* register helpers with Assemble, which are essentially JavaScript functions that can be used anywhere in your templates
*

## Config data

The following examples will assume that:

1. You have a `_config.yml` file in the root of your project, and
2. That you are passing that into the assemble `options`, like this:

```js
options: {
  config: file.readYAMLSync('_config.yml')
}
```

Since any property on the `options` object will be added to the context, you can now use any property on the `config` object, anywhere in your templates.


## Underscore Templates

One of the many advantages of using templates in config data is that you don't need to repeat the same values over and over again. For example, in your `_config.yml` file, you can change this:

```yaml
# Templates
templates:   structure
pages:       templates/pages
includes:    templates/includes
layouts:     templates/layouts
```



```yaml
# Templates
templates:   structure
pages:       <%= config.templates %>/pages
includes:    <%= config.templates %>/includes
layouts:     <%= config.templates %>/layouts
```
