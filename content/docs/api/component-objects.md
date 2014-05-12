# Component API

> Everthing in Assemble is a component: pages, posts, includes, layouts, actual UI components, ember-style components or any other encapsulated snippet of code than can be rendered.


## Component model

Examples:

* Blog post
* UI component
* Page


### Component methods

* `Component.create({})` // kind of like `Object.create()`

* `src`
* `dest`
* `data`
* `content`


* `Component._normalize({} || [])`

## Creating a new component model

> Assemble's API allows plugins to add components.

Pass a configuration object to the component model constructor.


```js
// Object for a single page
var pageObj = {src: '', dest: '// optional', data: {}, content: ''};
var page = new assemble.models.Component(pageObj)
```

### First-class components

```js
options: {
  data: ['*.json'],
  partials: []  // =>  assemble.partials
}

assemble.options.files // => assemble.pages
assemble.options.pages

assemble.options.partials
assemble.options.components
assemble.options.layout
```

```js
In | Out
assemble.options.foo | assemble.foo

```



### Component collections

* Adding a component to an existing collection
* Creating a new component collection


## Normalizing components

> Assemble expects either an array of objects or an object of objects.

* how Assemble normalizes components
* how your plugin can normalize components before they get to Assemble
  - array or object
  - must have X, Y, Z fields/keys etc.


object of objects


```js
{
  one: {
    data: {
      title: "Getting Started",
      date: "2014-01-01"
    },
    content: ""
  }
  ...
}
```

array of objects

```js
var obj = {
  "src": "*.json",
  "data": {
    "title": "Getting Started",
    "date": "2014-01-01",
    "layout": "post",
    "thumbnail": "<img class=\"media-object-round pull-right\" data-src=\"{{assets}}/js/holder.js/80x80\" alt=\"{{title}}\" src=\"data:image/png;base64,\">",
    "summary": "{{lorem ipsum.sentence}}",
    "categories": [],
    "tags": []
  },
  "content": "{{lorem ipsum.sentence}} <h2>h2 heading</h2> {{lorem ipsum.sentence}}<img class=\"media-object-round pull-left\" data-src=\"{{assets}}/js/holder.js/140x140\" alt=\"{{data.title}}\" src=\"data:image/png;base64,\">{{lorem ipsum.sentence}} {{lorem ipsum.sentence}} <img class=\"media-object-round pull-right\" data-src=\"{{assets}}/js/holder.js/140x140\" alt=\"{{data.title}}\" src=\"data:image/png;base64,\"> {{lorem ipsum.paragraph}}",
  "filename": "one"
}
```



* always normalized to an array of objects
* id / src
*

