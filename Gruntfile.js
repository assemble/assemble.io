/*
 * Documentation for Assemble
 * https://github.com/assemble/assemble-docs/
 *
 * Copyright (c) 2013 Upstage
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {
  var hljs = require('highlight.js');
  // Internal lib
  grunt.util._.mixin(require('./src/helpers/mixins').init(grunt));



  // Project configuration.
  grunt.initConfig({

    // Metadata for templates
    pkg: grunt.file.readJSON('package.json'),
    bootstrap: grunt.file.readYAML('src/less/bootstrap.yml'),
    ghpages  : grunt.file.readYAML('src/less/ghpages.yml'),

    less: {
      options: {
        paths: ['src/less', 'src/less/components', 'vendor/bootstrap/less'],
        imports: {
          less: '<%= ghpages.globals %>'
        }
      },
      main: {
        src: ['<%= ghpages.bundle.docs %>'],
        dest: 'docs/assets/css/assemble.css'
      },
      gist: {
        src: ['src/less/docs/gist-overrides.less'],
        dest: 'docs/assets/css/gist.css'
      },
      markdown: {
        src: ['src/less/components/markdown.less'],
        dest: 'docs/assets/css/markdown.css'
      }
    },

    // Templates
    assemble: {
      options: {
        marked: {
          breaks: false,
          gfm: true,
          langPrefix: 'language-',
          pedantic: false,
          sanitize: false,
          silent: false,
          smartLists: false,
          smartypants: false,
          tables: true
        },
        production: true,
        today: '<%= grunt.template.today() %>',
        layoutdir: 'src/templates/layouts',
        helpers: 'src/helpers/helpers.js',
        assets: 'docs/assets',
        data: [
          'src/data/*.{json,yml}',
          'package.json'
        ],
        partials: [
          'src/templates/partials/**/*.{hbs,md}'
        ]
      },
      links: {
        options: {
          ext: '.hbs',
          layout: false
        },
        files: [
          { expand: true, flatten: true, src: ['src/templates/partials/snippets/generated-links.md.hbs'], dest: 'src/templates/partials/' },
        ]
      },
      docs: {
        options: {
          layout: 'layout-docs.hbs'
        },
        files: [
          { expand: true, flatten: true, cwd: 'src/templates/pages', src: ['*.hbs'], dest: './' },
          { expand: true, flatten: true, cwd: 'src/templates/pages/docs', src: ['*.hbs'], dest: 'docs/', ext: '.html' }
        ]
      },
      helpers: {
        options: {
          layout: 'layout-helpers.hbs'
        },
        files: [
          { expand: true, flatten: true, cwd: 'src', src: ['templates/pages/helpers/*.hbs'], dest: './docs/helpers', ext: '.html' }
        ]
      },
      boilerplates: {
        options: {
          layout: 'layout-boilerplates.hbs'
        },
        files: [
          { expand: true, flatten: true, cwd: 'src', src: ['templates/pages/boilerplates/*.hbs'], dest: './docs/boilerplates', ext: '.html' }
        ]
      },
      diagnostics: {
        options: {
          layout: 'layout-diagnostics.md.hbs',
          ext: '.html'
        },
        files: [
          {
            expand: true,
            cwd: 'src/templates/pages',
            src: ['*.hbs', 'docs/*.hbs', 'examples/*.hbs', 'helpers/**/*.hbs'],
            dest: './tmp/diagnostics/',
            ext: '/index'
          }
        ]
      }
    },
    github: {
      options: {
        filters: {'type': 'public'}
      },
      readme: {
        src: '/repos/assemble/assemble/readme',
        dest: 'src/data/readme.json'
      },
      repos: {
        src: '/orgs/assemble/repos',
        dest: 'src/data/repos.json'
      }
    },
    prettify: {
      options: {
        prettifyrc: '.prettifyrc'
      },
      docs: {
        files: [
          {expand: true, cwd: 'docs/', ext: '.html', src: ['**/*.html'], dest: 'docs/'},
          {expand: true, cwd: './',    ext: '.html', src: ['*.html'],    dest: './'}
        ]
      }
    },
    copy: {
      docs: {
        files: [
          {expand: true, cwd: 'docs', src: ['**'],     dest: '../assemble-docs-gh-pages/docs'},
          {expand: true, cwd: './',   src: ['*.html'], dest: '../assemble-docs-gh-pages/'}
        ]
      }
    },

    // Before generating any new files,
    // remove files from previous build.
    clean: {
      all: ['*.html', 'docs/*.html'],
      tmp: ['tmp/diagnostics/**/*.{html,md}']
    }
  });

  // Set the base path for Bootstrap LESS library.
  grunt.config.set('vendor.base', 'vendor');

  // Load npm and local plugins.
  grunt.loadNpmTasks('assemble');
  grunt.loadNpmTasks('assemble-less');
  grunt.loadNpmTasks('grunt-github-api');
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  // Default task to be run.
  grunt.registerTask('default', [
    'clean',
    'less',
    'assemble:links',
    'assemble:docs',
    'assemble:helpers',
    'assemble:boilerplates',
    // 'assemble:diagnostics',
    'prettify',
    'copy'
  ]);
};


