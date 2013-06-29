feature-toggling using underscore templates, json and handlebars

First, let's say we want to enable/disable nav items, we might create a file called `nav-items.json` and add the `enabled` property for each nav item, like this:

```json
{
  "global-navbar": [
    {
      "text": "Themes",
      "enabled": true,
      "href": "./themes.html"
    },
    {
      "text": "Components",
      "enabled": true,
      "href": "./components.html"
    },
    {
      "text": "Sellers",
      "enabled": false,
      "href": "./start-selling.html"
    },
    {
      "text": "Domains",
      "enabled": false,
      "href": "./domains.html"
    }
  ]
}
```
and we would implement handlebars templates that take advantage of the `enabled` property:

```html
{{#if enabled}}<li><a href="{{href}}">{{text}}</a></li>{{/if}}
```

This is a nice approach for very simple use cases, but it's not maintainable for features that are pervasive throughout the system. In these cases it would be desirable to have a single place to selectively enable or disable a feature, leaving the rest for the build process to figure out. 

**The Solution**

Below is the contents of `site.json`. In this example, we are going to use the `features` property to selectively enable/disable features site-wide:

```json
{
  "domain": "themestack.io",
  "brand": "themestack",
  "company": "Themestack Inc.",
  "homepage": "http://themestack.io",
  "slogan": " Welcome to Themestack! Get themes built on Twitter Bootstrap, with features for developers.",
  "year": "2013",
  "analytics": {
    "google-analytics-id": "NA"
  },
  "features": {
    "domains-enabled": false,
    "vendors-enabled": false,
    "currencies-enabled": false
  }
}
```

This `site.features` object gives us a single place to turn a feature on or off, but for it to work, the true/false for each feature must be calculated with the correct context across each area of the system where the feature appears. We accomplish this with underscore templates, as with the "Domains" and "Sellers" nav items in the example below:

```json
{
  "global-navbar": [
    {
      "text": "Themes",
      "enabled": true,
      "href": "./themes.html"
    },
    {
      "text": "Components",
      "enabled": true,
      "href": "./components.html"
    },
    {
      "text": "Sellers",
      "enabled": "<%= site.features.sellers-enabled %>",
      "href": "./start-selling.html"
    },
    {
      "text": "Domains",
      "enabled": "<%= site.features.domains-enabled %>",
      "href": "./domains.html"
    }
  ]
}
```
