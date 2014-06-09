# Styles
> CSS styles are organized into the following concepts

## Generalized styles

- **Components**: generic UI components that can be used with any theme. Buttons, navbars, and so on.
- **Mixins**: generalized mixins that can be used with any theme
- **Utilities**: generalized styles that are either intended to be stop-gaps for more semantic or idiomatic alternatives, or allow for special styling overrides that wouldn't make sense to add to components themselves.  For example, `.pull-left` and `.pull-right` are utility classes for `float: left` and `float: right`. For the majority of use cases, some components might not need built-in floats, so the `.pull-` classes come in handy when one of these components needs a float.
- **Vendor**: Third-party styles from a framework, library or toolkit like Bootstrap or Zurb.

## Themes
> Themes can be thought of as **special styles**, built **on top of common styles**

**Core**

At minimum, every theme consists of the following:

- index.less
- variables.less

**Components**

Whenever possible, components are generalized, but themes can have their own components when they are specific enough. For example, a [book](./themes/book) theme might have components that are book-related. It wouldn't make sense for book-specific components to be lumped in with the generic components.
