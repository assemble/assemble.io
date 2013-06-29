assemble {
  docs: {
    options: {
      partials: ['src/templates/partials/**/*.hbs', 'src/templates/snippets/**/*.hbs']
    },
    files: {
      'docs/': ['src/templates/pages/*.hbs']
    }
  }
}