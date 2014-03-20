---
title: Errors

area: docs
section: configuration
---

> Now that the name of this page caught your attention, this page is for posting progress and reporting on actions to be taken in areas regarding namespacing variables, error logging and so on. This is a WIP, so until the matter is resolved we will of course continue to update this page as information becomes available, or as we gain consensus on actions to be taken.

## Error Reporting

The current plan is to create a utility library specifically for logging and reporting error messages related to helpers. If you want to contribute either with code or discussion, please [visit this issue](https://github.com/assemble/handlebars-helpers/issues/32) and [this issue](https://github.com/assemble/handlebars-helpers/issues/23).


## Avoiding Variable Name Collisions

This section is an off-shoot of the ongoing conversation on [this issue](https://github.com/assemble/handlebars-helpers/issues/38).

We are currently discussing ways to automatically detect collisions to provide warnings about them, but in the meantime it is important for you to be aware that there is potential for name collision with built-in variables and helpers.

The [assemble/handlebars-helpers](https://github.com/assemble/handlebars-helpers) library is rather large, and until a better solution is found there is potential for variable name collision with any helper in that library. It has been proposed that Assemble namespace helpers if no other viable solution is found. We want to avoid namespacing if at all possible, so our current plan is to see if better reporting can mitigate the issue. If not, we'll look at namespacing. Please add your comments [on this issue](https://github.com/assemble/handlebars-helpers/issues/32) or [this issue](https://github.com/assemble/handlebars-helpers/issues/23).


## Current Action

In addition to the existing documentation, issues that have been created to track the discussion, and potential solutions listed above, we are currently documenting all the "reserved" variables and what they do in the documentation. This should be available any day now (as of 7/15/2013)

Other feedback or contributions are encouraged. Visit either the [handlebars-helpers issues](https://github.com/assemble/handlebars-helpers/issues) or the [assemble issues](https://github.com/assemble/assemble/issues) to add your voice to the conversation.
