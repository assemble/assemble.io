
/*
 * assemble-docs <https://github.com/assemble/assemble-docs>
 *
 * Copyright (c) 2014 Jon Schlinkert, Brian Woodward, contributors.
 * Licensed under the MIT license.
 */
'use strict';


var load = require('resolve-dep');
var argv = require('minimist')(process.argv.slice(2));
var modeFlag = argv.m || argv.mode;
var deployFlag = argv.deploy;

// This also uses grunt's debug
// var debug = argv.debug;


module.exports = function(grunt) {

  // Force unix-style newlines
  grunt.util.linefeed = '\n';

  // Mix utils into Lo-Dash
  grunt.util._.mixin(require('./data/_utils/utils'));

  // Report the execution time of each task.
  require('time-grunt')(grunt);

  // Initialize Grunt configuration
  grunt.initConfig({

    // Project Metadata
    site     : grunt.file.readYAML('.assemblerc.yml'),
    pkg      : grunt.file.readJSON('package.json'),
    vendor   : grunt.file.readJSON('.bowerrc').directory,
    _assemble: grunt.file.readJSON('data/_assemble.json'),

    load: {
      helpers:    load('handlebars-helper-*'),
      middleware: load('assemble-middleware-*'),
    },

    metadata: {
      year: '<%= grunt.template.today("yyyy") %>',
      banner: [
        '/*!',
        ' * <%= site.brand %> v<%= _assemble.version %> <<%= _assemble.homepage %>>',
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
        assets: '<%= site.public %>',
        css: '<%= less.docs.dest %>',

        // Metadata
        pkg: '<%= pkg %>',
        site: '<%= site %>',
        _assemble: '<%= _assemble %>', // from github.com/assemble/assemble
        data: [
          {name: ':basename', src: ['<%= site.data %>/{,*/}*.{json,yml}']}
        ],

        // Includes
        partials: [
          '<%= site.components %>/{,*/}*.hbs',
          '<%= site.includes %>/{,*/}*.hbs',
          '<%= site.snippets %>/*.hbs',
          '<%= site.content %>/**/*.md'
        ],

        // Layouts
        layoutdir: '<%= site.layouts %>',
        layoutext: '<%= site.layoutext %>',
        layout: '<%= site.layout %>',

        // Extensions
        mixins: ['<%= site.mixins %>/utils.js'],
        helpers: ['<%= site.helpers %>/*.js', '<%= load.helpers %>'],
        middleware: ['<%= load.middleware %>'],

        // permalinks middleware options
        permalinks: {
          preset: 'pretty'
        },

        // marked-extras options (markdown helper)
        marked: {
          process: true,
          heading: '<%= site.snippets %>/heading.tmpl',
          prefix: 'lang-'
        },

        // `inline` helper options
        inline: {
          origin: true,
          prepend: 'popover-source-link'
        }
      },

      // assemble.io
      site: {
        options: {theme: 'docs'},
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
        path: 'tmp/validation-status.json',
        reportpath: 'tmp/validation-report.json',
        relaxerror: '<%= site.html.errorcodes %>'
      },
      site: {
        files: {
          src: '<%= site.dest %>/{,*/}*.html'
        }
      }
    },

    // Prettify HTML
    prettify: {
      options: {
        indent_scripts: 'keep'
      },
      site: {
        files: [
          {expand: true, cwd: '<%= site.dest %>', src: '{,*/}*.html', dest: '<%= site.dest %>/', ext: '.html'}
        ]
      }
    },


    /**
     * CSS tasks
     */

    // Compile Less to CSS
    less: {
      options: {
        paths: [
          '<%= site.styles %>',
          '<%= site.styles %>/vendor/bootstrap',
          '<%= site.styles %>/components'
        ]
      },
      docs: {
        options: {
          globalVars: {theme: 'docs'}
        },
        src: ['<%= site.styles %>/index.less'],
        dest: '<%= site.public %>/css/docs.css'
      },
      // blog: {
      //   options: {
      //     globalVars: {theme: 'blog'}
      //   },
      //   src: ['<%= less.docs.src %>'],
      //   dest: '<%= site.public %>/css/blog.css'
      // }
    },

    // Lint CSS
    csslint: {
      strict: {
        options: {
          csslintrc: '<%= site.styles %>/.csslintrc'
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
        src: ['<%= less.docs.dest %>'],
        dest: '<%= less.docs.dest %>'
      }
    },

    // Remove unused CSS from output.
    uncss: {
      options: {
        ignore: ['#webfonts', '.active']
      },
      site: {
        src: ['<%= site.dest %>/{,*/}*.html'],
        dest: '<%= less.docs.dest %>'
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
        // '<%= site.scripts %>/{,*/}*.js',
        // '<%= site.utils %>/{,*/}*.js',
      ]
    },

    // Minify JavaScripts
    uglify: {
      options: {banner: '<%= metadata.banner %>'},
      site: {
        src: ['<%= site.scripts %>/{,*/}*.js'],
        dest: '<%= site.public %>/js/docs.min.js'
      }
    },


    /**
     * "setup" tasks
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
      example: ['<%= site.dest %>/{,*/}*.{html,css,js}']
    },

    /**
     * "Live" tasks
     */

    // Run a Connect server
    connect: {
      options: {
        port: 9000,
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
      html: {
        tasks: ['assemble'],
        files: [
          '<%= site.templates %>/{,*/}*.hbs',
          '<%= site.content %>/{,*/}*.md',
          '<%= site.data %>/{,*/}*.{yml,json}'
        ]
      },
      css: {
        tasks: ['less'],
        files: [
          '<%= site.styles %>/{,*/}*.less'
        ]
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '<%= site.dest %>/{,*/}*.html',
          '<%= site.assets %>/{,*/}*.css',
          '<%= site.assets %>/{,*/}*.js',
          '<%= site.assets %>/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
        ]
      }
    }
  });

  // check for a command line option to deploy
  if (deployFlag) {
    grunt.config.set('site.root', '_deploy');
  }


  if (modeFlag) {
    grunt.config.set('site.mode', modeFlag);
  }


  /**
   * Load Plugins
   */

  // Load npm plugins to provide necessary tasks.
  require('load-grunt-tasks')(grunt);

  /**
   * Tasks to be run
   */

  // First things first.
  grunt.registerTask('prep', [
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
    // 'validation',
    // 'csslint'
  ]);

  // Prep for deployment.
  grunt.registerTask('prod', [
    'uglify'
  ]);

  // Lint and runt tests.
  grunt.registerTask('document', [
    'verb'
  ]);


  /**
   * Tasks to be run
   */

  // Design-oriented tasks.
  grunt.registerTask('design', [
    'default',
    'connect',
    'watch:design'
  ]);

  // Default tasks to run with the `grunt` command.
  grunt.registerTask('default', [
    'prep',
    'lint',
    'compile',
    'prettify',
    'uglify',
    'document'
  ]);
};
