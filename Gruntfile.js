/*
 * assemble.io <https://github.com/assemble/assemble.io>
 *
 * Copyright (c) 2014 Jon Schlinkert, Brian Woodward, contributors.
 * Licensed under the MIT license.
 */

'use strict';

var resolve = require('resolve-dep');
var argv = require('minimist')(process.argv.slice(2));
var modeFlag = argv.m || argv.mode;
var deployFlag = argv.deploy;

module.exports = function(grunt) {

  
  grunt.util.linefeed = '\n'; // Force unix-style newlines
  grunt.util._.mixin(require('./data/_utils/utils')); // Mix utils into Lo-Dash

  require('time-grunt')(grunt); // Report the execution time of each task.

  // Initialize Grunt configuration
  grunt.initConfig({

    /** 
     * Project Metadata:
     *
     * .assemblerc.yml: all Assemble.js confifguration
     */
    site     : grunt.file.readYAML('.assemblerc.yml'),
    pkg      : grunt.file.readJSON('package.json'),
    vendor   : grunt.file.readJSON('.bowerrc').directory,
    _assemble: grunt.file.readJSON('data/_assemble.json'),

    load: {
      helpers:    resolve('handlebars-helper-*'),
      middleware: resolve('assemble-middleware-*'),
    },

    metadata: {
      year: '<%= grunt.template.today("yyyy") %>',
      banner: [
        '/*!',
        ' * <%= site.brand %> v<%= _assemble.version %> <<%= _assemble.homepage %>>',
        ' * Copyright 2014-<%= metadata.year %>, <%= site.authors %>.',
        ' * Source code licensed under the <%= site.license.source.type %> license.',
        ' * Documentation licensed under <%= site.license.docs.type %>.',
        ' */\n\n'
      ].join('\n')
    },

    // Alias for Bootstrap's javascripts
    bootstrap: {
      js: '<%= vendor %>/bootstrap/dist/js',
    },

    /**
     * 1.0 HTML compilation tasks:
     * 
     * 1.1 _Assemble_ task will take Markdown, YAML, and JSON content
     * and compile HTML files.
     * 
     * 1.2 _Validation_ task will validate compiled HTML. 
     * 
     * 1.3 _Prettify_ task will take compiled HTML and remove extra lines
     * and spaces, fix indention, etc.
     */
    assemble: {
      options: {
        flatten: true,
        assets: '<%= site.public %>',
        css: '<%= less.docs.dest %>',
        pkg: '<%= pkg %>',
        site: '<%= site %>',
        _assemble: '<%= _assemble %>',
        
        data: [
          { 
            name: ':basename', 
            src: ['<%= site.data %>/{,*/}*.{json,yml}']
          }
        ],
          
        partials: [
          '<%= site.components %>/{,*/}*.hbs',
          '<%= site.includes %>/{,*/}*.hbs',
          '<%= site.snippets %>/*.hbs',
          '<%= site.content %>/**/*.md'
        ],
          
        layoutdir: '<%= site.layouts %>',
        layoutext: '<%= site.layoutext %>',
        layout: '<%= site.layout %>',

        mixins: ['<%= site.mixins %>/utils.js'],
        helpers: ['<%= load.helpers %>', '<%= site.helpers %>/*.js'],
        middleware: ['<%= load.middleware %>'],

        // permalinks middleware options
        permalinks: {
          preset: 'pretty'
        },

        // `markdown` and `md` helper options (for marked-extras)
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
      site: {
        options: {theme: 'docs'},
        files: {
          '<%= site.dest %>/': [
            '<%= site.pages %>/helpers.hbs',
            '<%= site.content %>/*.hbs'
          ]
        }
      },
      // Temporary task for homepage dev
      homepage: {
        files: {
          '<%= site.dest %>/': ['<%= site.content %>/index.hbs']
        }
      }
    },

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

    prettify: {
      options: {
        indent_scripts: 'keep'
      },
      site: {
        files: [
          {
            expand: true, 
            cwd: '<%= site.dest %>', 
            src: '{,*/}*.html', 
            dest: '<%= site.dest %>/', 
            ext: '.html'
          }
        ]
      }
    },
    
    /**
     * 2.0 Stylesheet tasks:
     * 
     * 2.1 _less_ task will compile CSS stylesheets
     * from LESS source code.
     *
     * 2.2 _autoprefixer_ task will make sure compiled
     * stylesheet supports the following browsers:
     *   - Last 2 versions of all major browsers
     *   - Internet Explorer 9
     *   - Internet Explorer 8
     *
     * 2.3 _csslint_
     */
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
          globalVars: { 
            theme: 'docs'
          }
        },
        src: ['<%= site.styles %>/index.less'],
        dest: '<%= site.public %>/css/docs.css'
      },
      homepage: {
        src: ['<%= site.styles %>/module/page-home.less'],
        dest: '<%= site.public %>/css/home.css'
      }
    },
    
    autoprefixer: {
      options: {
        browsers: ['last 2 version', 'ie 8', 'ie 9']
      },
      styles: {
        expand: true,
        flatten: true,
        src: '<%= site.public %>/css/*.css',
        dest: '<%= site.public %>/css/'
      },
    },

    csslint: {
      strict: {
        options: {
          csslintrc: '<%= site.styles %>/.csslintrc'
        },
        src: ['<%= less.site.dest %>']
      }
    },

    csscomb: {
      options: {
        config: 'styles/.csscomb.json'
      },
      site: {
        src: ['<%= less.docs.dest %>'],
        dest: '<%= less.docs.dest %>'
      }
    },
    
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
     * 3.0 JavaScript tasks:
     * 
     * 3.1 _jslint_ task will lint all scripts against
     * the rules in ".jshintrc".
     *
     * 3.2 _uglify_ task will concatentate scripts
     *    3.2.1 docs.js - primary scripts for /docs
          3.2.1 ie.js - provides IE8 support
     */
    jshint: {
      options: {
        jshintrc: '<%= site.scripts %>/.jshintrc'
      },
      all: [
        'Gruntfile.js',
        '<%= site.helpers.path %>/*.js'
        // '<%= site.plugins.path %>/*.js',
        // '<%= site.scripts %>/{,*/}*.js',
        // '<%= site.utils %>/{,*/}*.js',
      ]
    },

    uglify: {
      options: {
        banner: '<%= metadata.banner %>'
      },
      
      /** 
       * 3.2.1 "docs.js" 
       */
      docs: {
        src: ['<%= site.scripts %>/{,*/}*.js'],
        dest: '<%= site.public %>/js/docs.min.js'
      },
      
      /**
       * 3.2.2 "ie.js"
       * Provides support in older versions of IE.
       * Source scripts are installed via Bower.
       */
      ie: {
        src: [
          './vendor/html5shiv/dist/html5shiv.js',
          './vendor/respond/dest/respond.min.js'
        ],
        dest: '<%= site.public %>/js/ie.min.js'
      }
    },


    /**
     * 4.0 intial project tasks
     *
     * 4.1 _copy_ task
     *    4.1.1 vendor - Copy Bootstrap's js to local scripts
     *    4.1.2 assets - Copy local fonts and images to `public` directory
     * 
     * 4.2 _clean_ task will clean files from previous build.
     */
    copy: {
      vendor: {
        src: '<%= bootstrap.js %>/bootstrap.js',
        dest: '<%= site.scripts %>/vendor/bootstrap.js'
      },
      assets: {
        files: [
          {
            expand: true, 
            cwd: '<%= site.assets %>', 
            src: '**', 
            dest: '<%= site.public %>/'
          }
        ]
      }
    },
    
    clean: {
      example: ['<%= site.dest %>/{,*/}*.{html,css,js}']
    },

    /**
     * 5.0 Assemble Developer tasks
     *
     * 5.1 _connect_ task runs a local server at port 9000
     *
     * 5.2 _watch_ task watched source files for changes
     *    5.2.1 content - watch Markdown, Handlebars and source data files and run `assemble` task on change.
     *    5.2.2 styles - watch LESS source code and run `less` task on change.
     */
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
    
    watch: {
      options: {
        livereload: true
      },
      content: {
        tasks: ['assemble'],
        files: [
          '<%= site.templates %>/{,*/}*.hbs',
          '<%= site.content %>/{,*/}*.md',
          '<%= site.data %>/{,*/}*.{yml,json}'
        ]
      },
      styles: {
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
      },
      // Temporary task for homepage dev
      homepage: {
        tasks: ['assemble:homepage','less:homepage'],
        files: [
          '<%= site.content %>/index.hbs',
          '<%= site.styles %>/module/page-home.less'
        ]
      }
    }
  });

  /** 
   * Check for a command line option to deploy
   *
   * deployFlag -
   * modeFlag - 
   */
  if (deployFlag) { 
    grunt.config.set('site.root', '_deploy'); 
  }
  if (modeFlag) { 
    grunt.config.set('site.mode', modeFlag); 
  }

  /* Load all modules listed in package.json Plugins with load-grunt-tasks */
  require('load-grunt-tasks')(grunt);

  /**
   * 6.0 Primary tasks
   * 
   */
  grunt.registerTask('prep', ['clean','copy']); // Clean dest folder
  grunt.registerTask('compile', ['less','assemble']); // Compile CSS, HTML, etc.
  grunt.registerTask('lint', ['jshint',]); // Lint and runt tests.
  grunt.registerTask('prod', ['uglify']);
  grunt.registerTask('document', ['verb']); // Compile README.md

  /**
   * 7.0 Secondary tasks
   *
   * Use `grunt design` for development of the site.
   * Use `grunt` to compile a production ready version of the site.
   */
  grunt.registerTask('design', [
    'default',
    'connect',
    'watch:design'
  ]);
  grunt.registerTask('default', [
    'prep',
    'lint',
    'compile',
    'prettify',
    'uglify',
    'document'
  ]);
};
