---
title: Collections

area: docs
section: templates
---

## Collections

What is included in a collection?

For any given collection, only items found in the [current target] will be added to the collection by Assemble.

For example, if we wish to render a list of all of the pages in the `pages` collection, we will only see the pages in the "current target".


## Pages for each Collection Item

If you want to list all of the pages in a target that have a certain tag, such as `Test`, you could would "wrap" the `\{{#each tags}}...\{{/each}}` block around the `\{{#each pages}}...\{{/each}}`
block. Something like this:

```html
\{{#each tags}}
  \{{#is tag "Test"}}
  <h1>\{{tag}}</h1>
  <ul>
    \{{#each pages}}
      <li>\{{data.title}}</li>
    \{{/each}}
  </ul>
  \{{/is}}
\{{/each}}
```

## Sorting

If you also want to _sort the pages_ by `date`, you would instead use `\{{#withSort pages}}`...`\{{/withSort}}` along with the second parameter that you wish to sort by, in this case `date`:

```html
\{{#each tags}}
  \{{#is tag "foo"}}
  <h1>\{{tag}}</h1>
  <ul>
    \{{#withSort pages data.date}}
      <li>\{{data.title}}</li>
    \{{/withSort}}
  </ul>
  \{{/is}}
\{{/each}}
```

_Note that you may only use dot notation for sorting. Names like `a['my.page']` will be interpreted as `a.my.page` and thus will not work._

### Sort order

Collections options can be configured to sort:

* `ascending` (or alias `asc`)
* `descending` (or alias `desc`)
* a property in the page `data` context


```js
assemble: {
  options: {
    collections: [
      {
        // the name of the collection
        name: 'tags',
        // the order in which to sort
        sortorder: 'desc'
      }
    ]
  }
}
```

"Pages" collections can also be sorted:

```js
assemble: {
  options: {
    pages: [
      {data: {title: 'Post #1'}, content: '\{{md "blog/post1.md"}}'},
      {data: {title: 'Post #2'}, content: '\{{md "blog/post2.md"}}'},
    ],
    collections: [
      {
        name: 'pages',
        sortorder: 'desc'
      }
    ]
  }
}
```




## Related Information

* [FAQ][faq]
