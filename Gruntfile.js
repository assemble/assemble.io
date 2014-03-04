/*
 * Documentation for Assemble: the static site generator and 
 * component builder for Node.js, Grunt.js and Yeoman.
 * https://github.com/assemble/assemble-docs/
 *
 * Copyright (c) 2013, Upstage
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {

  // Mix local utilities into grunt instance.
  grunt.util._.mixin(require('./src/extensions/mixins'));

  // Report elapsed execution time of grunt tasks.
  require('time-grunt')(grunt);

  var prettify = function(src) {
    return require('js-prettify').html(src, {
      indent_size: 2,
      indent_inner_html: true
    }).replace(/(\r\n|\n\r|\n|\r){2,}/g, '\n');
  };

  // Project configuration.
  grunt.initConfig({

    /**
     * Metadata for templates
     */
    pkg      : grunt.file.readJSON('package.json'),
    bootstrap: grunt.file.readYAML('src/less/bootstrap.yml'),
    ghpages  : grunt.file.readYAML('src/less/ghpages.yml'),
    site     : grunt.file.readYAML('src/data/site.yml'),
    helpers  : grunt.file.readJSON('templates/pages/helpers.json'), // config for "helpers" docs

    /**
     * Process LESS files
     */
    less: {
      options: {
        imports: {reference: '<%= ghpages.globals %>'}
      },
      main: {
        src: ['<%= bootstrap.bundle.docs %>', '<%= ghpages.bundle.docs %>'],
        dest: '<%= site.destination %>/assets/css/assemble.css'
      },
      gist: {
        src: ['src/less/docs/gist-overrides.less'],
        dest: '<%= site.destination %>/assets/css/gist.css'
      },
      markdown: {
        src: ['src/less/components/markdown.less'],
        dest: '<%= site.destination %>/assets/css/markdown.css'
      }
    },

    /**
     * Generate up-to-date list of Assemble's GitHub repos
     */
    github: {
      repos: {
        options: {filters: {type: 'public'}},
        src: '/orgs/assemble/repos?page=1&per_page=100',
        dest: 'src/data/repos.json'
      }
    },

    /**
     * Generate the site.
     */
    assemble: {
      options: {
        today: '<%= grunt.template.today() %>',
        production: true,
        flatten: true,
        // plugins: ['assemble-contrib-contextual'],
        contextual: {
          dest: './temp'
        },
        data: ['src/data/*.{json,yml}', 'package.json'],
        assets: '<%= site.destination %>/assets',
        helpers: ['src/extensions/*.js', 'helper-prettify'],
        partials: ['templates/includes/**/*.{hbs,md}'],
        layoutdir: 'templates/layouts',
        layout: 'default.hbs',
        marked: {sanitize: false },
        // postprocess: prettify,
        prettify: {
          indent: 2,
          condense: true,
          padcomments: true
        }
      },

      /**
       * Generate markdown navigation links 
       */
      links: {
        options: {
          postprocess: false,
          flatten: true,
          ext: '.hbs'
        },
        src: 'templates/includes/snippets/links-template.md.hbs',
        dest: 'templates/includes/snippets/generated-links.md.hbs'
      },

      /**
       * Build the main docs.
       */
      docs: {
        files: [
          {
            expand: true,
            cwd: 'templates/pages',
            src: ['*.hbs'],
            dest: '<%= site.destination %>/'
          },
          {
            expand: true,
            cwd: 'templates/pages/docs',
            src: ['*.hbs'],
            dest: '<%= site.destination %>/docs/',
            ext: '.html'
          },
          {
            expand: true,
            cwd: 'templates/pages/contributing',
            src: ['*.hbs'],
            dest: '<%= site.destination %>/contributing/',
            ext: '.html'
          }
        ]
      },

      /**
       * "Blog" section.
       */
      blog: {
        options: {layout: 'blog.hbs'},
        files: {
          '<%= site.destination %>/blog/': ['templates/pages/blog/*.hbs']
        }
      },

      /**
       * "Helpers" section. 
       * Uses: templates/pages/helpers.json
       */
      helpers: {
        options: {
          ext: '.html',
          flatten: true,
          engine: 'handlebars',
          pages: '<%= helpers.pages %>'
        },
        src: ['templates/pages/helpers/index.hbs'],
        dest: '<%= site.destination %>/helpers/'
      },

      /**
       * "Boilerplates" section.
       */
      boilerplates: {
        files: [
          {
            expand: true,
            cwd: 'templates/pages/boilerplates/',
            src: ['*.hbs'],
            dest: '<%= site.destination %>/boilerplates/',
            ext: '.html'
          }
        ]
      }
    },

    copy: {
      docs: {
        files: [
          {expand: true, cwd: 'contributing', src: ['**'], dest: '<%= site.destination %>/contributing'},
          {expand: true, cwd: 'docs', src: ['**'], dest: '<%= site.destination %>/docs'},
          {expand: true, cwd: './', src: ['*.html'], dest: '<%= site.destination %>/'}
        ]
      }
    },

    // Before generating new files, clean out files from previous build.
    clean: {
      ghpages: ['<%= site.destination %>/**/*.html']
    }
  });

  // Set the base path for Bootstrap LESS library.
  grunt.config.set('vendor.base', 'vendor');

  // Load npm and local plugins.
  grunt.loadNpmTasks('assemble');
  grunt.loadNpmTasks('assemble-less');
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.loadTasks('tasks');

  // Default task to be run.
  grunt.registerTask('default', [
    'clean:ghpages',
    'assemble:helpers',
    'assemble',
    'newer:less',
    'sync'
  ]);
};