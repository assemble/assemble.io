/*
 * Documentation for Assemble
 * https://github.com/assemble/assemble-docs/
 *
 * Copyright (c) 2013 Upstage
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

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
        imports: {reference: '<%= ghpages.globals %>'}
      },
      main: {
        src: ['<%= bootstrap.bundle.docs %>', '<%= ghpages.bundle.docs %>'],
        dest: '_gh_pages/assets/css/assemble.css'
      },
      gist: {
        src: ['src/less/docs/gist-overrides.less'],
        dest: '_gh_pages/assets/css/gist.css'
      },
      markdown: {
        src: ['src/less/components/markdown.less'],
        dest: '_gh_pages/assets/css/markdown.css'
      }
    },

    // Templates
    assemble: {
      options: {
        today: '<%= grunt.template.today() %>',
        marked: {sanitize: false},
        helpers: 'src/helpers/*.js',
        production: true,
        assets: '_gh_pages/assets',
        layoutdir: 'src/templates/layouts',
        partials: ['src/templates/partials/**/*.{hbs,md}'],
        data: ['src/data/*.{json,yml}', 'package.json']
      },
      links: {
        options: {ext: '.hbs'},
        src: 'src/templates/partials/link-template.md.hbs',
        dest: 'src/templates/partials/generated-links.md.hbs',
      },
      docs: {
        options: {layout: 'layout-docs.hbs'},
        files: [
          {
            expand: true,
            flatten: true,
            cwd: 'src/templates/pages',
            src: ['*.hbs'],
            dest: '_gh_pages/'
          },
          {
            expand: true,
            flatten: true,
            cwd: 'src/templates/pages/docs',
            src: ['*.hbs'],
            dest: '_gh_pages/docs/',
            ext: '.html'
          },
          {
            expand: true,
            flatten: true,
            cwd: 'src/templates/pages/contributing',
            src: ['*.hbs'],
            dest: '_gh_pages/contributing/',
            ext: '.html'
          }
        ]
      },
      helpers: {
        options: {layout: 'layout-helpers.hbs'},
        files: [
          {
            expand: true,
            flatten: true,
            cwd: 'src',
            src: ['templates/pages/helpers/*.hbs'],
            dest: '_gh_pages/helpers',
            ext: '.html'
          }
        ]
      },
      boilerplates: {
        options: {layout: 'layout-boilerplates.hbs'},
        files: [
          {
            expand: true,
            flatten: true,
            cwd: 'src',
            src: ['templates/pages/boilerplates/*.hbs'],
            dest: '_gh_pages/boilerplates/',
            ext: '.html'
          }
        ]
      }
    },

    github: {
      options: {
        filters: {type: 'public'}
      },
      pkg: {
        src: '/repos/assemble/assemble/contents/pkg-assemble.json',
        dest: 'src/data/pkg.json'
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
      options: {prettifyrc: '.prettifyrc'},
      docs: {
        files: [
          {expand: true, cwd: '_gh_pages/docs/', ext: '.html', src: ['**/*.html'], dest: '_gh_pages/docs/'},
          {expand: true, cwd: '_gh_pages/',      ext: '.html', src: ['*.html'],    dest: '_gh_pages/'}
        ]
      }
    },

    copy: {
      docs: {
        files: [
          {expand: true, cwd: 'contributing', src: ['**'],     dest: '../assemble-docs-gh-pages/contributing'},
          {expand: true, cwd: 'docs', src: ['**'],     dest: '../assemble-docs-gh-pages/docs'},
          {expand: true, cwd: './',   src: ['*.html'], dest: '../assemble-docs-gh-pages/'}
        ]
      }
    },

    // Before generating any new files, remove files from previous build.
    clean: {
      ghpages: ['_gh_pages/**/*.{html,css,js}']
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
    'clean:ghpages',
    'less',
    'assemble:links',
    'assemble:docs',
    'assemble:helpers',
    'assemble:boilerplates',
    'prettify'
  ]);
};