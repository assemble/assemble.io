---
title: API
area: docs
section: development
published: false
---

Start by requiring assemble:

```js
var assemble = require('assemble');
```


## Getting started

### First things first

_Depending on the [`src-dest` format]() used in each target in the Gruntfile, you **will receive** different behavior and results._ Please see [files-configuration](FAQ.html#files-configuration) for more info about files formats.

It is also highly recommended that you read the [API documentation](http://gruntjs.com/api/grunt) on the [Grunt website](http://gruntjs.com/) before diving into development with Assemble. The [Task Configuration and Targets][tasks-targets] and [Building the Files Object Dynamically][files-object] section is particularly relevant when using `assemble.files` methods.

[tasks-targets]: http://gruntjs.com/configuring-tasks#task-configuration-and-targets
[files-object]: http://gruntjs.com/configuring-tasks#building-the-files-object-dynamically



## assemble.files

### assemble.files.dest

```js
assemble.files[0].dest;
```

### assemble.files.src

```js
assemble.files[0].src;
```

### results with different files configurations

#### 'src-dest' and 'files object' formats
Returns only the `dest` directory:

```js
dest/posts/
```

Please see [files-configuration](FAQ.html#files-configuration) for more info about files formats.


#### "files array" format
Returns the full `dest` path including the file's `basename` and `ext`:

```js
dest/posts/foo.html
```

Please see [files-configuration](FAQ.html#files-configuration) for more info about files formats.


### Usage examples
What can you do with these?

Add a "tag index" to list out all of the tags in a collection:

```js
var tagsIndex = function(str, tags) {
  grunt.file.write(path.join(assemble.files[0].dest, 'tags/index.html'), str, tags);
}
```



## this.page

### this.page.dest

```js
this.page.dest;
```

### this.page.src

```js
this.page.src;
```


