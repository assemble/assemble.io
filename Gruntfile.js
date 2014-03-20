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

  // Report the execution time of each task.
  require('time-grunt')(grunt);


  /**
   * Initialize Grunt configuration
   */

  grunt.initConfig({

    /**
     * Metadata
     */

    site   : grunt.file.readYAML('.assemblerc.yml'),
    pkg    : grunt.file.readJSON('package.json'),
    core   : grunt.file.readJSON('data/core.json'),
    vendor : grunt.file.readJSON('.bowerrc').directory,

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

    // Alias for Bootstrap's javascripts
    bootstrap: {
      js: '<%= vendor %>/bootstrap/dist/js',
    },


    /**
     * HTML tasks
     */

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
        partials: ['<%= site.includes %>/**/*.hbs',  'structure/snippets/*.hbs'],
        layoutdir: '<%= site.layouts %>',
        layoutext: '<%= site.layoutext %>',
        layout: '<%= site.layout %>',

        // Extensions
        plugins: '<%= site.plugins.load %>',
        helpers: '<%= site.helpers.load %>',

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

        // HTML 'validation' plugin
        validation: {
          report: 'structure/validation-report.json',
          status: 'structure/validation-status.json'
        },

        // marked-extras options
        marked: {
          process: true,
          heading: '<%= site.templates %>/snippets/heading.tmpl',
          prefix: 'language-'
        }
      },

      // `site` target
      site: {
        options: {
          permalinks: {structure: ':basename/index.html'}
        },
        files: {'<%= site.dest %>/': ['<%= site.pages %>/*.hbs']}
      }
    },

    // Lint HTML
    validation: {
      options: {
        reset: true,
        failHard: true,
        charset: 'utf-8',
        doctype: 'HTML5',
        path: 'structure/validation-status.json',
        reportpath: 'structure/validation-report.json',
        relaxerror: '<%= site.html.errorcodes %>'
      },
      files: {
        src: '<%= site.dest %>/**/*.html'
      }
    },

    // Prettify HTML
    prettify: {
      options: {
        indent_scripts: 'keep'
      },
      site: {
        files: [
          {expand: true, cwd: '<%= site.dest %>', src: '**/*.html', dest: '<%= site.dest %>/', ext: '.html'}
        ]
      }
    },


    /**
     * CSS tasks
     */

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

    // Lint CSS
    csslint: {
      strict: {
        options: {
          csslintrc: 'styles/.csslintrc'
        },
        src: ['<%= less.site.dest %>']
      }
    },

    // Prettify CSS
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


    /**
     * JavaScript tasks
     */

    // Lint JavaScripts
    jshint: {
      options: {
        jshintrc: '<%= site.scripts %>/.jshintrc'
      },
      all: [
        'Gruntfile.js',
        '<%= site.helpers.path %>/*.js',
        // '<%= site.plugins.path %>/*.js',
        '<%= site.scripts %>/*.js',
        '<%= site.utils %>/*.js',
      ]
    },

    // Minify JavaScripts
    uglify: {
      options: {banner: '<%= metadata.banner %>'},
      site: {
        src: ['<%= site.scripts %>/**/*.js'],
        dest: '<%= site.public %>/js/docs.min.js'
      }
    },


    /**
     * Setup tasks
     */

    copy: {
      // Copy Bootstrap's js to local scripts
      vendor: {
        src: '<%= bootstrap.js %>/bootstrap.js',
        dest: '<%= site.scripts %>/vendor/bootstrap.js'
      },
      // Copy local `assets` to `public` directory
      assets: {
        files: [
          {expand: true, cwd: '<%= site.assets %>', src: '**', dest: '<%= site.public %>/'}
        ]
      }
    },

    // Clean files from previous build
    clean: {
      example: ['<%= site.dest %>/**/*.{html,css,js}']
    },

    // Pull down a list of repos from the Assemble's repos from
    // GitHub's API, so we can use the resulting JSON in templates.
    repos: {
      namespaced: {
        options: {username: 'assemble'},
        files: {
          '<%= site.data %>/repos.json': ['repos?page=1&per_page=100']
        }
      }
    },


    /**
     * "Live" tasks
     */

    // Run a Connect server
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

    // Watch certain files, rebuild when changes are saved.
    watch: {
      options: {livereload: true},
      design: {
        files: [
          '<%= site.data %>/**/*.{yml,json}',
          '<%= site.content %>/**/*.md',
          '<%= site.styles %>/**/*.less',
          '<%= site.templates %>/**/*.hbs',
        ],
        tasks: ['clean', 'less', 'assemble']
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
  grunt.loadNpmTasks('grunt-html-validation');
  grunt.loadNpmTasks('grunt-prettify');
  grunt.loadNpmTasks('grunt-repos');
  grunt.loadNpmTasks('grunt-sync-pkg');
  grunt.loadNpmTasks('grunt-uncss');


  /**
   * Task types
   */

  // First things first.
  grunt.registerTask('setup', [
    'clean',
    'copy',
  ]);

  // Compile CSS, HTML, etc.
  grunt.registerTask('compile', [
    'less',
    'assemble'
  ]);

  // Lint and runt tests.
  grunt.registerTask('lint', [
    'jshint',
    'validation',
    'csslint'
  ]);

  // Prep for deployment.
  grunt.registerTask('prod', [
    'repos',
    'uglify'
  ]);


  /**
   * Tasks to run
   */

  // Design-oriented tasks.
  grunt.registerTask('design', [
    'default',
    'connect',
    'watch:design'
  ]);

  // Default tasks to run with the `grunt` command.
  grunt.registerTask('default', [
    'setup',
    'compile',
    'prettify',
    'uglify',
    'lint',
  ]);
};
