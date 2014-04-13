Install with [npm](npmjs.org):

```bash
npm i {%= typeof g !== 'undefined' ? '-g ' : '' %}{%= name %} {%= typeof save !== 'undefined' ? '--save' : '--save-dev' %}
```