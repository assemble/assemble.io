# Get the most out of Handlebars


## Tips and Tricks

### Strings as params

For basic and straightforward use cases you can pass a string as a parameter to partial.

```handlebars
{{> btn-github 'small' }}
```

Assuming all other parameters are static in the `btn-github.hbs` partial (abbreviated for clarity):

```handlebars
<iframe class="github-btn" src="http://ghbtns.com/github-btn.html?user=assemble&repo=assemble&type=watch&count=true;size={{.}}" allowtransparency="true" frameborder="0" scrolling="0" width="100px" height="20px"></iframe>
```

### Feature toggling

