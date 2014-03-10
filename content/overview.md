## Getting Started

> What is Assemble?

* About
* History

## Where does Assemble fit in the build chain?

> Assemble has Grunt and Gulp plugins, Yeoman generators, lots of boilerplates and many example projects from the core team and the community!

* Generator
* Build system
  - Minifying => Assemble (via plugins and helpers)
  - Linting
  - Compiling, rendering => Assemble (core strength)
* Server

## Why use Assemble?

* Unique strengths
* Main focus
* Easy to use
* Configurable and extensible
* Many boilerplates, examples, great community / ecosystem
* Target users
* Use cases

Related

* Project showcase
* Who uses Assemble?
* Community

## How do I get started?

* Installation
* 5-minute getting started video
* Getting started guide
* Getting started tutorials (topical)
* Examples
* Boilerplates
* Generators: Initializing a new project
* Running Assemble the first time

Related

* Migration tools (Harp, Metalsmith, Jekyll, Wintersmith, )
* Live projects / examples

## Overview: Core concepts

* Configuration
  - Defaults
  - Global config
* Templates
  - template variables
  - layouts
  - pages
  - includes
  - template helpers
* Data
* Content

### Related concepts

> These things "dial in", but they aren't in the same room.

* Logic
* Styling

## Usage

* Configure
* Extend
* Build


## Development

### Extending Assemble

* Helpers: manipulate templates, data and content
* Mixins: manipulate config values
* Plugins: extend Assemble's core functionality
* Middleware

### API

* Utilities
* Plugins
* Middleware
* Helpers

## FAQ

*

## Features
Gulp
Grunt

* **Configuration AND convention**. Assemble is highly extensible, so tinkerers and power users will find many ways to add new features or augment existing functionality. For those who prefer the ease-of-use of opinionated systems like Jekyll or Harp, [grab a boilerplate](#TODO) or run [one of our generators](#TODO) and let Yeoman do the work, so you can spend less time on figuring out how to organize the project.
* Not only can Assemble, ahem... well, assemble, but also minification, concatenation, cache-busting and post-processing. Beyond that, Assemble's core functionality is infinitely extensible via plugins and middleware.

## Conventions

* Project organization

## Project Goals

* Near-term (current release): User experience
* Optimization / speed

## Contributing

* Pull requests
* Bugs / Issues
* Feature requests

## Community

* GitHub
* Google+
* StackOvervlow
* IRC


## Handlebars Templates

Assemble's default template engine, Handlebars.js, uses a syntax characterized by double-curly-braces, `{{foo}}`, affectionately reffered to as mustaches. The most basic handlebars template is a simple identifier (Handlebars.js calls these "Handlebars expressions"):

```handlebars
<h1>{{title}}</h1>
```
To use this


Here are some of the highlights.

* Basic Variables: `{{title}}`
* Function expressions:
* Block expressions:
* Subexpressions:
* Partials:
* Helpers:
