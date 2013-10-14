# Tables

Stuff to add:
  * `each` versus a single item. Data must be in an array for each.
  * context: for data, context is established by name of the json file, but for templates the file name is irrelevant and context is set by handlebars markup _inside the file_.
  * The name of the partial must match the name of the file.


Here you will learn how to create a handlebars "partial" for tables, `table.mustache`. The partial will allow you to easily add tables to your markup, while dynamically controlling the number of rows and cells in each table with external data.


This tutorial will cover:

  * Handlebars partials, `table.mustache`, `row.mustache`, and `cell.mustache` (we're learning partials here, so partials make the most sense)
  * Creating mock data using **json** or **yaml** for our tables (`table.json`)
  * Compiling our partials with Grunt.js.


Let's begin.



### Table Partials

We're going to split the code for our tables into three separate files, each representing a handlebars partials: `table.mustache`, `row.mustache`, and `cell.mustache`. Go ahead and create these empty files now.


**Our "base" table**

Inside the first partial, `table.mustache`, add some markup for a regular HTML table, and inside the table body insert a reference to our row **partial**, `\{{> row }}`. This will be used to insert our rows dynamically when we have some data. As a sidenote, after the tutorial feel free to remove the "inner partials" and replace them with HTML if you wish.

```html
<!-- table.mustache -->
<table>
  <tbody>
    \{{> row }}
  </tbody>
</table>
```


**Title and classes**

Now let's add a **title** above the table and let's add the class, `.table`, as well as a placeholder for a additional "modifier" classes which we'll call `\{{modifier}}` (in this example, we're using classes from the Bootstrap framework, but you can use any classes that work for you). Here is what you should have so far.

```html
<h4>\{{title}}</h4>
<table class="table \{{modifier}}">
  <tbody>
    \{{> row }}
  </tbody>
</table>
```


**Handlebars Section Tag for Context**

Next, we wrap the table in the handlebars section tag, `\{{#table}}`, in order to set context for the table. This allows our table to access the data contained in `table.json`, which we will create a little later:

```html
\{{#table}}
<h4>\{{title}}</h4>
<table class="table \{{modifier}}">
  <tbody>
    \{{> row }}
  </tbody>
</table>
\{{/table}}
```



### Row Partial

Create a file named `row.mustache`, add another `\{{modifier}}` placeholder so that we can modify our rows with whatever classes we need later on, and add the `\{{> cells }}` partial for our cells:

```html
<tr class="\{{modifier}}">
  \{{> cells }}
</tr>
```

This works well if we're only going to have one row in our table, but we need to make sure our partial will accomodate any arbitrary number of rows we decided to add to our data. So let's wrap the row in the handlebars `each` helper tag, so that _each row_ we define in our data is displayed. We're also going to use the plural, rows, because it will make more sense when we're adding data for our rows. <a href="#rowData"></a>

```html
\{{#each rows}}
<tr class="\{{modifier}}">
  <td> </td>
</tr>
\{{/each}}
```

**TIP**: Handlebars (mustache) tags work the same as HTML, we open and close with the same tag. So `\{{#each}}` closes with `\{{/each}}`, regardless of what other "attributes" are contained inside the `each` tag.



### Cell Partial

Inside `cell.mustache` create the markup for our cells. Add another `\{{modifier}}` placeholder for our classes, and wrap the cell in the `each` section tag so that we can add cells as needed:

```html
\{{#each cells}}
<td class="\{{modifier}}"> \{{cell}} </td>
\{{/each}}
```


## Data





**Data**

Create the file `table.json`, and add some properties to represent the data we need. We need to make sure that we match the properties to the handlebars templates we created earlier, so let's take an inventory.

We have three **partials**, nested as follows:
  * `table.mustache`
    * `row.mustache`
      * `cell.mustache`

When we create our data model, we need to ensure that the objects are nested the same way. Since our first object is `table`, we might think that our data should look like this:

```json
{
  "table": {
    // other data
  }
}
```
but we don't need to directly add `table` as a property in our data, because the context for the `table` object will be set by the file itself (or rather by the _name_ of the file itself), `table.json`. So what we really want is something like this:

```json
// table.json
{
  // rows and cells
}
```

We also need our properties to match up with the templates themselves, which can get confusing, so let's review this before we create the rest of the data model:

We have a partial for our tables, which references the `row` partial, and inside that we reference the `cell` partial.

```html
<!-- table.mustache -->
<table>
  <tbody>
    \{{> row }}
  </tbody>
</table>

<!-- row.mustache -->
\{{#each rows}}
  <tr class="\{{modifier}}">
    \{{> cell }}
  </tr>
\{{/each}}

<!-- cell.mustache -->
\{{#each cells}}
  <td class="\{{modifier}}"> \{{cell}} </td>
\{{/each}}
```

Remember that we named the partials using the **singular form** and we reference the data objects using the **plural form**, so here is what our data model should look like initially:

```json
// table.json
{
  "rows": [
    {
      "cells": [ ]
    }
  ]
}
```
Which correctly maps to the data model we created in our templates:

  * `table` (context established by the file name, **table.json**)
    * `row`
      * `cell`

We also have an array of rows and an array of cells, allowing us to define any number of rows or cells we require. And because we used the `each` section tag in our templates, all of our rows and cells will be automatically compiled and rendered properly for us.


Let's add more data to bring this together, and let's also add properties to match up with the `\{{modifier}}` and `\{{title}}` templates we created:

```json
{
  "title": "Important Table",
  "modifier": "table-condensed table-striped",
  "rows": [
    {
      "modifier": "",
      "cells": [ {"cell": "One"}, {"cell": "Two"}, {"cell": "Three"}, {"cell": "Four"} ]
    },
    {
      "modifier": "error",
      "cells": [ {"cell": "One"}, {"cell": "Two"}, {"cell": "Three"}, {"cell": "Four"} ]
    }
  ]
}
```





## Other tips

### If

Make certain parts of the markup such as titles conditional, like this

```html
\{{#if title}}<h4>\{{title}}</h4>\{{/if}}
```

This will ensure that an empty `<h4></h4>` isn't rendered in the output if no title exists.



### Multiple Tables

Add data for multiple tables in `table.json`, and wrap them in an array:

```json
[
  {
    "title": "First Table",
    "modifier": "table-striped",
    "rows": [
      {
        "modifier": "success",
        "row": { "cell1": "One", "cell2": "Two", "cell3": "Three", "cell4": "Four" }
      },
      {
        "modifier": "error",
        "row": { "cell1": "One", "cell2": "Two", "cell3": "Three", "cell4": "Four" }
      }
    ]
  },
  {
    "title": "Second Table",
    "modifier": "table-striped",
    "rows": [
      {
        "modifier": "success",
        "row": { "cell1": "One", "cell2": "Two", "cell3": "Three", "cell4": "Four" }
      },
      {
        "modifier": "error",
        "row": { "cell1": "One", "cell2": "Two", "cell3": "Three", "cell4": "Four" }
      }
    ]
  }
]
```

Now to use this data, we must go back to the table partial, `table.mustache`, and wrap the table with the `each` handlebars section tag so that the array of tables can be accessed.

```html
\{{#each table}}
  <h4>\{{title}}</h4>
  <table class="table \{{modifier}}">
    <tbody>
      \{{> row }}
    </tbody>
  </table>
\{{/each}}
```