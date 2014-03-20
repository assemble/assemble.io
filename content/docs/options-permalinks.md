---
title: options.permalinks
shortname: permalinks

area: docs
section: configuration

published: false
---

Assemble supports a flexible way to build your site's URLs. You can specify the permalinks for your site through the [Configuration][] or on the [YAML Front Matter][yaml-front-matter] for each post. You're free to choose one of the built-in styles to create your links or craft your own. The default style is always `date`.

### Template Variables

| _Variable_ | _Description_ |
| ---------- |-------------- |
| `year` | Year from the post's filename |
| `month` | Month from the post's filename |
| `day` | Day from the post's filename |
| `title` | Title from the post's filename |
| `categories` | The specified categories for this post. Assemble automatically parses out double slashes in the URLs, so if no categories are present, it basically ignores this. |
| `i_month` | Month from the post's filename without leading zeros. |
| `i_day` | Day from the post's filename without leading zeros. |

### Built-in styles

| _Name_     | _Template_    |
| ---------- |-------------- |
| `date` | `/:categories/:year/:month/:day/:title.html` |
| `pretty` | `/:categories/:year/:month/:day/:title/` |
| `none` | `/:categories/:title.html` |

### Examples

Given a post named: `/2009-04-29-slap-chop.textile`

| _Setting_  | _Result_      |
| ---------- |-------------- |
| `permalink: date`. | `/2009/04/29/slap-chop.html` |
| `permalink: pretty` | `/2009/04/29/slap-chop/index.html` |
| `permalink: /:month-:day-:year/:title.html` | `/04-29-2009/slap-chop.html` |
| `permalink: /blog/:year/:month/:day/:title` | `/blog/2009/04/29/slap-chop/index.html` |