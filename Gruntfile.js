/*
 * gh-pages for Assemble
 * https://github.com/assemble/assemble-examples/
 *
 * Copyright (c) 2013 Upstage
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  var _ = grunt.util._; // lodash

  // Internal lib
  _.mixin(require('./src/mixins').init(grunt));

  // Project configuration.
  grunt.initConfig({

    // Metadata for templates
    pkg: grunt.file.readJSON('package.json'),
    bootstrap: grunt.file.readYAML('src/bootstrap.yml'),
    ghpages  : grunt.file.readYAML('src/ghpages.yml'),

    less: {
      options: {
        paths: ['src/less', 'src/less/components', 'vendor/bootstrap/less'],
        imports: {
          less: '<%= ghpages.globals %>'
        }
      },
      main: {
        src:  ['<%= ghpages.bundle.docs %>'],
        dest: 'docs/assets/css/assemble.css'
      }
    },

    // Templates
    assemble: {
      options: {
        flatten: true,
        production: true,
        today: '<%= grunt.template.today() %>',
        
        assets: 'docs/assets',
        data: [
          'src/data/*.{json,yml}', 
          'package.json'
        ],
        helpers: ['src/local-helpers.js','config/*-helpers.js'],
        layoutdir: 'src/templates/layouts',
        partials: ['src/templates/partials/**/*.{hbs,md}']
      },
      // readme: {
      //   options: {
      //     ext: '',
      //     partials: 'src/readme/sections/*.hbs',
      //     data: [
      //       '<%= config.assemble_master %>/package.json'
      //     ]
      //   },
      //   files: [
      //     { expand: true, flatten: true, cwd: 'src/assemble/', src: ['sections/*.hbs', '!index.hbs'], dest: '<%= config.assemble_master %>/docs/' },
      //     { expand: true, flatten: true, cwd: 'src/assemble/', src: ['README.md.hbs'], dest: 'src/assemble/' }
      //   ]
      // },
      links: {
        options: {
          ext: '.hbs',
          layout: false
        },
        files: [
          { expand: true, flatten: true, cwd: 'src/templates/partials/snippets', src: ['generated-links.md.hbs'], dest: 'src/templates/partials' },
        ]
      },
      pages: {
        options: {
          layout: 'layout-landing.hbs'
        },
        files: [
          { expand: true, cwd: 'src/templates/pages', src: ['*.hbs'], dest: './' }
        ]
      },
      docs: {
        options: {
          layout: 'layout-docs.hbs'
        },
        files: [
          { expand: true, flatten: true, cwd: 'src/templates/pages/docs', src: ['*.hbs'], dest: 'docs/', ext: '.html' }
        ]
      }
    },

    prettify: {
      options: {
        prettifyrc: '.prettifyrc'
      },
      demo: {
        expand: true,
        cwd: 'docs/',
        ext: '.html',
        src: ['**/*.html'],
        dest: 'docs/'
      },
      root: {
        expand: true,
        cwd: './',
        ext: '.html',
        src: ['*.html'],
        dest: './'
      }
    },

    copy: {
      docs: {
        files: [
          {expand: true, cwd: 'docs', src: ['**'], dest: '../assemble-docs-gh-pages/docs'},
          {expand: true, cwd: './', src: ['*.html'], dest: '../assemble-docs-gh-pages/'}
        ]
      }
    },

    // Before generating any new files,
    // remove files from previous build.
    clean: {
      all: ['docs/*.html', '*.html']
    }
  });


  // Set the base path for Bootstrap LESS library.
  grunt.config.set('vendor.base', 'vendor');
  grunt.config.set('docs.content', 'vendor/assemble-wiki');

  // Load npm and local plugins.
  grunt.loadNpmTasks('assemble');
  grunt.loadNpmTasks('assemble-less');
  grunt.loadNpmTasks('assemble-manifest');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-github-api');
  grunt.loadNpmTasks('grunt-prettify');
  grunt.loadNpmTasks('grunt-shell');

  // Default tasks to be run.
  grunt.registerTask('default', [
    'clean',
    'less:main',
    'assemble:links',
    'assemble:pages',
    'assemble:docs',
    'prettify',
    'copy'
  ]);

  // Convenience aliases.
  grunt.registerTask('repos',   ['github:repos']);
  grunt.registerTask('readme',  ['assemble:readme']);
  grunt.registerTask('docs',    ['assemble:docs']);
};


