## \{{travis}}

> Creates a "full" Travis CI link in markdown format

Params: `branch`

Type: `String`

Usage: `\{{travis [branch]}}`

Template:

```handlebars
\{{travis}}`
```

Renders to:

```markdown
# [assemble v9.1.0](https://github.com/assemble/assemble)[![Build Status](https://travis-ci.org/assemble/assemble.png)](https://travis-ci.org/assemble/assemble)
```

Template with branch:

```handlebars
\{{travis 'master'}}
```

Renders to:

```markdown
# [assemble v9.1.0](https://github.com/assemble/assemble)[![Build Status](https://travis-ci.org/assemble/assemble.png?branch=master)](https://travis-ci.org/assemble/assemble)
```

## \{{travis-badge}}

> Creates a Travis CI link in markdown format

Params: `none`

Usage: `\{{travis-badge}}`

Template

```handlebars
\{{travis}}`
```

Renders to:

```markdown
[![Build Status](https://travis-ci.org/assemble/assemble.png)](https://travis-ci.org/assemble/assemble)
```