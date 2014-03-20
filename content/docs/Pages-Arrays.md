---
title: Pages Arrays

area: docs
section: templates

published: false
---

> Pages ages can be passed into  to Assemble

Type: `Object`
Default: `null`

Each page in a collection is an object, which consists of a `metadata` object and a `content` property.

### metadata
Type: `Object|String`
Default: `null`

The `metadata` object may contain any arbitrary properties describes information about a page.

### content
Type: `String`
Default: `null`


* YFM vs. Metadata: When a page is defined, and the page's "content" property includes a page that has YFM: does YFM get merged with metadata in JSON? If not, which one wins?


TOPICS:

* Both lodash and handlebars templates may be used.


```json
[
  {
    "filename": "index",
    "data": {
      "title": "Home"
    },
    "content": "Content for \{{title}}"
  },
  {
    "filename": "about",
    "data": {
      "title": "About Us"
    },
    "content": "Content for \{{title}}"
  }
]
```

Or:

```json
{
  "about": {
    "data": {
      "title": "About"
    },
    "content": "Content for \{{title}}"
  },
  "index": {
    "data": {
      "title": "Home"
    },
    "content": "Content for \{{title}}"
  }
}
```
That way pages built this way can be targeted like: `<%= about.title %>`.


```json
{
  "one.html": {
    "data": { },
    "content": ""
  },
  "two.md": {
    "data": { },
    "content": ""
  },
  "three.xml": {
    "data": { },
    "content": ""
  },
  "four": {
    "data": { },
    "content": "This page takes on the ext of the task/target?"
  }
}
```
Seems like a great idea, offers a lot of control. Conceivably, one could generate an entire site using this format, including content pages, sitemap, etc.