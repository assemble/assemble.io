/*
 * assemble-docs <https://github.com/assemble/assemble-docs>
 *
 * Copyright (c) 2014 Jon Schlinkert, Brian Woodward, contributors.
 * Licensed under the MIT license.
 */


module.exports = function(grunt) {

  'use strict';

  // Force unix-style newlines
  grunt.util.linefeed = '\n';

  // Initialize mixins
  grunt.util._.mixin(require('./data/utils/mixins'));

  /**
   * Project configuration.
   */

  grunt.initConfig({

    // Project metadata
    site   : grunt.file.readYAML('.assemblerc.yml'),
    pkg    : grunt.file.readJSON('package.json'),
    core   : grunt.file.readJSON('data/core.json'),
    helpers: grunt.file.readYAML('data/helpers.yml'),
    vendor : grunt.file.readJSON('.bowerrc').directory,

    bootstrap: {
      js: '<%= vendor %>/bootstrap/dist/js',
    },

    metadata: {
      year: '<%= grunt.template.today("yyyy") %>',
      banner: [
        '/*!',
        ' * <%= site.brand %> v<%= core.version %> <<%= core.homepage %>>',
        ' * Copyright 2013-<%= metadata.year %>, <%= site.authors %>.',
        ' * Source code licensed under the <%= site.license.source.type %> license.',
        ' * Docs licensed under <%= site.license.docs.type %>.',
        ' */\n\n'
      ].join('\n')
    },

    // Lint JavaScripts
    jshint: {
      options: {
        jshintrc: '<%= site.scripts %>/.jshintrc'
      },
      all: [
        'Gruntfile.js',
        '<%= site.helpers %>/*.js',
        '<%= site.plugins %>/*.js',
        '<%= site.scripts %>/*.js',
        '<%= site.utils %>/*.js',
      ]
    },

    // Pull down a list of repos from the Assemble org using
    // GitHub's API. Resulting JSON is supplied to the templates.
    repos: {
      namespaced: {
        options: {username: 'assemble'},
        files: {
          '<%= site.data %>/repos.json': ['repos?page=1&per_page=100']
        }
      }
    },

    // Build HTML from templates and data
    assemble: {
      options: {
        flatten: true,
        production: false,
        assets: '<%= site.public %>',
        css: '<%= less.site.dest %>',

        // Metadata
        pkg: '<%= pkg %>',
        site: '<%= site %>',
        core: '<%= core %>',
        data: ['<%= site.data %>/*.{json,yml}'],

        // Templates
        partials: ['<%= site.includes %>/**/*.hbs', 'structure/snippets/*.hbs'],
        layoutdir: '<%= site.layouts %>',
        layoutext: '<%= site.layoutext %>',
        layout: '<%= site.layout %>',

        // Extensions
        plugins: '<%= site.plugins %>',
        helpers: ['<%= site.helpers %>/*.js'],

        // 'anchors' plugin > Add anchors markup
        // to headings in rendered HTML
        anchors: {
          template: '<%= site.templates %>/snippets/anchor.js'
        },

        // 'download' plugin > Download docs for
        // helpers from GitHub
        download: {
          repo: 'assemble/handlebars-helpers',
          dest: 'tmp/',
          files: ['docs/helpers.zip']
        },

        // 'decompress' plugin > Decompress zip
        // file for helper docs
        decompress: {
          files: ['tmp/helpers.zip'],
          dest: 'tmp/helpers/'
        },

        // marked-extras options
        marked: {
          process: true,
          heading: '<%= site.templates %>/snippets/heading.tmpl',
          prefix: 'language-'
        }
      },
      site: {
        options: {
          content: ['content/helpers/**/*.md'],
          // permalinks: {
          //   structure: ':basename:ext'
          // }
        },
        files: {'<%= site.dest %>/': ['<%= site.pages %>/*.hbs']}
      }
    },

    prettify: {
      options: {
        indent_scripts: 'keep'
      },
      site: {
        files: [
          {expand: true, cwd: '<%= site.dest %>', src: '*.html', dest: '<%= site.dest %>/', ext: '.html'}
        ]
      }
    },

    connect: {
      options: {
        port: 3000,
        livereload: 35729,
        hostname: 'localhost'
      },
      livereload: {
        options: {
          open: true,
          base: ['<%= site.dest %>']
        }
      }
    },

    // Compile Less to CSS
    less: {
      options: {
        process: true,
        paths: ['styles', 'styles/bootstrap', 'styles/components']
      },
      site: {
        src: ['styles/index.less'],
        dest: '<%= assemble.options.assets %>/css/index.css'
      }
    },

    csslint: {
      strict: {
        options: {
          csslintrc: 'styles/.csslintrc'
        },
        src: ['<%= less.site.dest %>']
      }
    },

    csscomb: {
      options: {
        config: 'styles/.csscomb.json'
      },
      site: {
        src: ['<%= less.site.dest %>'],
        dest: '<%= less.site.dest %>'
      }
    },

    // Remove unused CSS from output.
    uncss: {
      options: {
        ignore: ['#webfonts', '.active']
      },
      site: {
        src: ['<%= site.dest %>/*.html'],
        dest: '<%= less.site.dest %>'
      }
    },

    // Minify JavaScripts
    uglify: {
      options: {banner: '<%= metadata.banner %>'},
      site: {
        src: ['<%= site.scripts %>/**/*.js'],
        dest: '<%= site.public %>/js/docs.min.js'
      }
    },

    copy: {
      // Copy Bootstrap's scripts to local directory
      vendor: {
        src: '<%= bootstrap.js %>/bootstrap.js',
        dest: '<%= site.scripts %>/vendor/bootstrap.js'
      },
      // Copy source images, fonts and icons to site `public` directory
      assets: {
        files: [
          {expand: true, cwd: '<%= site.assets %>', src: '**', dest: '<%= site.public %>/'}
        ]
      }
    },

    // Before generating new files, clean files from previous build.
    clean: {
      example: ['<%= site.dest %>/**/*.{html,css,js}']
    },

    // Watch certain files, rebuild when changes are saved.
    watch: {
      options: {livereload: true},
      site: {
        files: [
          '<%= site.content %>/**/*.md',
          '<%= site.content %>/_config.yml',
          '<%= site.data %>/*.json',
          '<%= site.data %>/*.yml',
          '<%= site.helpers %>',
          '<%= site.styles %>/**/*.less',
          '<%= site.templates %>/**/*.hbs',
        ],
        tasks: ['clean', 'copy', 'less:site', 'assemble']
      }
    }
  });

  /**
   * Load Plugins
   */

  // Load npm plugins to provide necessary tasks.
  grunt.loadNpmTasks('assemble');
  grunt.loadNpmTasks('assemble-less');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-csslint');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-prettify');
  grunt.loadNpmTasks('grunt-repos');
  grunt.loadNpmTasks('grunt-sync-pkg');
  grunt.loadNpmTasks('grunt-uncss');

  /**
   * Register Tasks
   */

  grunt.registerTask('update', ['repos', 'default']);

  // Runt tests and lint code.
  grunt.registerTask('test', ['jshint', 'csslint']);

  // Design-oriented tasks.
  grunt.registerTask('design', [
    'clean',
    'copy',
    'less:site',
    'assemble:site',
    'connect',
    'watch'
  ]);

  // Default tasks to be run.
  grunt.registerTask('default', [
    'jshint',
    'copy',
    'uglify',
    'less:site',
    'assemble:site',
    'prettify'
  ]);
};
