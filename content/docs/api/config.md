---
title: Config
collection: docs
category: api
---

The purpose of the config API is to set and get general configuration values that can be used by any method. In other words, these methods are generically, and globally usable.

## .option

The .option() method sets values on the assemble.options object.

```
// set
assemble.option('abc', true);

// get
assemble.option('abc')); //=> true
assemble.options.abc; //=> true
In addition to .option(), the following methods may be used as convenience methods for getting and setting Boolean values on the options object:

assemble.enable('xyz');
//=> assemble.options.xyz = true;
Is xyz enabled?

assemble.enabled('xyz');
// 'true'
Is xyz disabled?

assemble.disabled('xyz');
// 'false'
Then let's disable it!

assemble.disable('xyz');
.set / .get

The .set() method sets values on the assemble.cache object. This object is reserved just for you. Whatever the use case, feel free to set() to your heart's content.

assemble.set('level', 'admin');
assemble.get('level');
//=> 'admin'
