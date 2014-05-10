# Extensions

> Extensions for [Assemble](https://github.com/assemble/assemble)

The reason that extensions are placed in the `structure` directory is that, for the most part, helpers and plugins will operate on templates.

* [helpers](./helpers)
* [plugins](./plugins)

In other words, these particular extensions aren't useful _without_ the templates, and these particular templates will fail to build without these extensions.