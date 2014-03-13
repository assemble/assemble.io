* Configuration

* Data

* Layouts
* Pages
* Includes

* Content


* Content
* Structure
* Logic
* Styling

## Notes on terminology

* UI is the cause. UX is the effect.
* Logic is the cause. Behavior is the effect.
* Styling is the cause. Appearance is the effect.


# Assemble

> Assemble makes it easy to combine templates, data and content to produce any kind of resulting documents, including HTML web pages, web components, blog posts, and so on.

## Why use Assemble?

Assemble's point of differentiation from all of the other [static site generators](http://staticsitegenerators.net/) out there, is its focus on

* Assemble is much more than a static site generator. You can use Assemble for...
* Assemble is hands down the best tool available for rapid prototyping and mocking up HTML/CSS projects (sites, components, styleguides and so on)


## Versus other Site Generators

* Ease of use
* Modularity
* More configurable, flexible and powerful than any other static site generator.

## Core Concepts

* Templates
  - Layouts
  - Pages
  - Includes
* Data
* Content

## Templates

### What is a "template"?

A template is a document or document fragment that contains variables that will be replaced by actual data, content or other documents by Assemble.

> A template is a document or document fragment that contains variables that will be replaced (by the template engine) with actual data, content or other documents.

Using templates is a great way of keeping your code modular and easy to maintain. Templates help you separate the logic, data and markup in views, resulting in code that is more modular and reusable and projects that are organized and easier to maintain.

## Why use templating?

In general, leveraging templates is a great way to separate markup and logic in views, and to maximize code reusability and maintainability. With a syntax close to the desired output (i.e. HTML), you have a clear and fast way to get things done. Although templates can be used to output any kind of text, in this article we provide examples using HTML, since that is what we want in client-side development.

In today’s dynamic applications, the client frequently needs to update the user interface (UI). This might be done by fetching an HTML fragment from the server that can be readily inserted into the document. Yet this requires the server to support delivering such fragments (as opposed to complete pages). Moreover, as a client-side developer who is responsible for the markup, you want to have full control over your templates. No need to know anything about Smarty, Velocity, ASP, some other obscure server-side syntax or even worse: dealing with spaghetti code such as HTML containing those infamous `<?` or `<%` tags all over the place.

So let’s take a fresh look at a viable alternative: client-side templating.


### Layouts

> Layouts are used for "wrapping" the content of individual pages with common elements, such as the `<head></head>` and footer sections, which usually contain necessities such as `<link></link>` and `<script></script>` tags.

A basic layout might look something like this:

```handlebars
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>\{{title}}</title>
  </head>
  <body>
    \{{> body }}
  </body>
</html>