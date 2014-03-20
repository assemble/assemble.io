---
title: Idiomatic Data

area: docs
section: data

published: false
---
# Idiomatic Data

> "Semantically, data isn't just _data_. Conventions help us bring order to chaos. Idioms are really just informal conventions." <br>
> — Jon Schlinkert


There is "[data][]" and there is "[Idiomatic Data][]".

## Table of Contents

* how the data is used by the build system,
* how variables are used with templates
* how mock data can be used
* conventions and best practices
* data: configuration data, metadata and content
* Lo-Dash templates
* YFM, YAML, JSON and Task and Target Options

Configuration conventions

* [Gruntfile][]
* External files
* [YAML Front Matter][]



## Conventions for working with Data

Adopt consistent and clear naming conventions. While working with data, remember that every name you choose needs to be obviously identifiable and easily associated with whatever partial, page or other object for which the data was created. Otherwise you will find it difficult to track down errors when you get console messages such as `property "name" not found`. "Which name?" is what you'll be thinking.

> Lt. Cmdr. Data: My programming may be inadequate to the task.
> Counselor Deanna Troi: We're all more than the sum of our parts, Data. You'll have to be more than the sum of your programming.

Assemble is only as effective as the conventions used in your project. If there is too much abstraction in your templates or data, then problems will be more difficult to track down and your project will be harder to maintain.

Assemble offers a number of options for working with data, both **structured** and **unstructured**. To establish a common dialog throughout Assemble's documentation, let us agree that:

* **Structured data**: data is "structured" when it has a pre-defined _data model_.
* **Unstructured data**: data is "unstructured" when it does not have a pre-defined _data model_.

* **Config data**: structured data
* **Metadata**: structured data
* **Content**: unstructured data



It is often advantageous to make

even if the data contains sub-elements of data which can be manipulated inpendently from the sum of those elements, regardless of the granularity of those elements.





## Templates

TODO...

Assemble takes advantage of [Lo-Dash templates]() to simplify configuration

``` json
{
  "helpers": `<%= config.helpers %>`
}
```

> Visit the Grunt.js docs to learn more about using [Lo-Dash templates]() in your Gruntfile →


Note: Section heading ideas

* Data: Flexibility vs. Conventions
* Configuration data, metadata and content:

## Data

### Configuration data, metadata and content

Since Assemble makes it easy and flexible to use data however you want via YAML front matter, `.yml/yaml` and `.json` files, custom variables defined in the options of the `assemble` task or target. Thus it's exceedingly easy for the lines to be blurred between data that will be used for "configuration" and data that will used for supplying metadata or content to your templates.

Before we explore

### "Data is data", does the difference matter?

Superficially, no, there isn't really a difference since it's all just "data", right? But _semantically_ there is a huge difference, so you might consider using conventions for organizing your data in such a way that it is clear which data is intended for each purpose.

## Idiomatic data

First, let's reflect on the


### Project settings

### Metadata

### Content


* **config**: build configuation. Example: path to custom helpers.
  * **build** and **buildignore**: project file paths and path-exclude patterns, respectively.

**Project Variables**

* **global**: global variable for a single project.
  * **site**:
    * **page**:
    * **post**:


## Global data

`global.json`


``` json
{
  "name": "Project"
}
```

## Page data

`about.json`

``` json
{
  "title": "About",
  "layout": "default"
}



`boilerplate.json`

``` json

"pages": [
    {
      "title: "Home",
      "template": "src/pages/home.hbs",
      "content": "./docs/about-us.md"
    },
    {
      "file": "src/pages/about-us.hbs",
      "title: "About",
      "layout": "",
      "content": "./docs/about-us.md"
    }
  ]
}


* **`defaults.json`**: define some default metadata to be used across projects.

For example, `author name` and `email`.

``` json
{
  "author": {
    "name": "Jon Schlinkert",
    "email": "jon@assemble.com",
    "url": "https://jonschlinkert.github.com/"
  }
}
```



## build / buildignore

* **.build**: this file is kind of a project manifest, but it only contains project files and paths and it doesn't contain any other metadata about the project. Thus, it's only useful for the build system.
* **.buildignore**: contains files and paths for the build system to ignore.



TODO...

  * JSON
  * YAML

If you are familiar with a `package.json` file, then you're familiar with this concept. When we refer to "external config files", we're just saying "anything outside of your pages (html) or Gruntfile". If you wish, you can use a `package.json` as a configuration file in your project.

**Example**

For anyone who isn't familiar, this example `package.json` is from the Bootstrap project:

```
{
  "name": "bootstrap",
  "description": "Sleek, intuitive, and powerful front-end framework for faster and easier web development.",
  "version": "3.0.0",
  "keywords": [
    "bootstrap",
    "css"
  ],
  "homepage": "http://twitter.github.com/bootstrap/",
  "author": "Twitter Inc.",
  "scripts": {
    "test": "make test"
  },
  "repository": {
    "type": "git",
    "url": "https://github.com/twitter/bootstrap.git"
  },
  "licenses": [
    {
      "type": "Apache-2.0",
      "url": "http://www.apache.org/licenses/LICENSE-2.0"
    }
  ],
  "devDependencies": {
    "uglify-js": "1.3.4",
    "jshint": "0.9.1",
    "recess": "1.1.6",
    "connect": "2.1.3",
    "hogan.js": "2.0.0"
  }
}
```

TBC...


## YAML Front-Matter

Let's create a blog post to talk about the advantages of YAML front-matter, let's call it `06-21-2013-yaml-is-great.mustache`, and we'll use a component from [Upstage](upstage) for our blog post template:

``` html
---
post:
  title: YAML Front-Matter
  description: How using YAML Front-Matter will make your life easier.
  layout: layout-post.mustache
---
<h1>\{{ page.title }}</h1>
<p>\{{ page.description }}</p>
```

In our YAML front-matter, we reference the layout, `layout-post.mustache`. This is the layout that will be used by the blog post, here is what it might look like:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>\{{ page.title }}</title>
  </head>
  <body>
    \{{> body }}
  </body>
</html>
```

The `\{{> body }}` template is where the content for the post will be rendered.

## Related information

  * Learn more about [Supported file types][], including `.mustache`, `.md`, `.hbs`, `.html` and others.
  * Get components from [Toolkit](toolkit)

[toolkit]: https://github.com/assemble/toolkit "Visit Toolkit's Repo on GitHub"
