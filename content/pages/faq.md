# Helpers

* Package.json deps

# Draft & Unpublished

* Code comments: HTML and Handlebars
* Block expressions
* `published` property in YAML front matter


# Navigation

* Matching up Ids.
* Dynamic or static?

# Data

* When to use?
  - lists
  - repetitious code


# Context

* data files, e.g. "functions.json" => {{#nav functions}}

# Content


{{#draft}}

> Shouldn't I aim to make autonomous?

Well, that's your call, but IMO it's best to create the helper that you need for the job your doing. We're planning on labeling helpers somehow to make it easy to differentiate them based on the following:

* Is is specific to assemble?
* does it require grunt? (e.g. what are the dependencies of the helper)
* is it a block helper?

and so on...

Not all of this is documented (since it's new), but assemble now allows you to add helpers from node_modules by simply adding the name of the helper module to your devDependencies and then adding the same name to the `helpers` property in the assemble options. You can even use minimatch patterns for any helpers in node modules. I'll explain why this is important in a moment...

But since assemble makes it so easy to add helpers we've decided to do the following:

1. continue maintaining common utility helpers in the handlebars-helpers project. these helpers should be the most generic, baseline helpers with the fewest dependencies and the most stability.
1. split other helpers into individual modules here: https://github.com/organizations/helpers.

So, for example, continuing the point about adding helpers from node_modules and using minimatch patterns, let's say your project uses 25 different helpers that each exists in a separate npm module. if they all follow a common naming convention, such as `helper-*` you could either do this to add them to assemble:

```js
options: {
  helpers: 'helper-*'
}
```
Or, IMO the better way to go would be to publish a npm package with a custom "collection" that really only consists of an index page that requires in the helpers you want to use. then just refer to that collection in assemble.

So I guess IMHO helpers are so easy to create, change and maintain that if you switch to another framework or stop using Grunt altogether we can either:

a. modify the helper or create another version that uses minimatch or other libs that don't require Grunt
b. you can still require grunt without using it for builds. this will make even more sense in the future after the grunt methods are split out into separate libs (see https://github.com/gruntjs/grunt-glob and https://github.com/gruntjs/grunt-file). they are planning on doing that soon.


{{/draft}}
