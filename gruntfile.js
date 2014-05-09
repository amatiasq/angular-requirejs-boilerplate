//jshint maxlen:120, camelcase:false

module.exports = function(grunt) {
  'use strict';
  grunt.loadNpmTasks('grunt-ngmin');
  grunt.loadNpmTasks('grunt-usemin');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-angular-templates');


  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    files: {
      html: 'comp/**/*.html',
      js: [
        'app/**/*.js',
        'comp/**/*.js',
        'tools/**/*.js',
      ],

      entry: {
        html: 'index.html',
        js: 'app/app.js',
        css: 'app/styles.less',
      },

      build: {
        html: 'tmp/templates.js',
        amd: 'tmp/amd-build.js',
        concat: 'tmp/concat-build.js',
        ngmin: 'tmp/ngmin-build.js',
        js: 'build/out.js',
        css: 'build/out.css',
      }
    },

    jshint: {
      options:{
        jshintignore: '.jshintignore',
        jshintrc: '.jshintrc'
      },
      config: [
        '*.json',
        '.jshintrc',
        'gruntfile.js',
      ],
      app: [ '<%= files.js %>' ],
    },

    ngmin: {
      almond: {
        src: '<%= files.build.concat %>',
        dest: '<%= files.build.ngmin %>'
      },
    },

    requirejs: {
      build: {
        options: {
          baseUrl: '',
          mainConfigFile: 'app/config.js',
          optimize: 'none',
          name: 'bower_components/almond/almond',
          include: 'app/app',
          insertRequire: [ 'app/app' ],
          out: '<%= files.build.amd %>',

          paths: {
            'angular-core': 'bower_components/angular/angular.min',
            'angular': 'bower_components/angular-route/angular-route.min',
          },
        }
      }
    },

    uglify: {
      almond: {
        options: {
          compress: {
            global_defs: { DEBUG: false },
            pure_getters: true,
            drop_console: true,
            //pure_funcs: [ 'require' ],
          },
        },
        src: '<%= files.build.ngmin %>',
        dest: '<%= files.build.js %>',
      },
      optimize: {
        options: {
          compress: {
            pure_getters: true,
            warnings: true,
          }
        },
        src: '<%= files.js %>',
        dest: 'tmp/optimize.js',
      }
    },

    concat: {
      options: {
        separator: ';',
      },
      almond: {
        src: [
          '<%= files.build.amd %>',
          '<%= files.build.html %>',
        ],
        dest: '<%= files.build.concat %>',
      },
    },

    less: {
      build: {
        options: {
          cleancss: true,
          relativeUrls: true,
        },
        src: '<%= files.entry.css %>',
        dest: '<%= files.build.css %>',
      },
    },

    ngtemplates: {
      app: {
        options: {
          standalone: true,
          module: 'app-templates',
          htmlmin: {
            collapseWhitespace: true,
            removeAttributeQuotes: true,
            removeComments: true,
            removeOptionalTags: true,
            removeRedundantAttributes: true,
          },
        },
        src: '<%= files.html %>',
        dest: '<%= files.build.html %>',
      }
    },

    usemin: {
      options: { force: true },
      html: '<%= files.entry.html %>',
    },

    clean: {
      tmp: [ 'tmp/' ],
      buildjs: [ '<%= files.build.js %>' ],
      buildcss: [ '<%= files.build.css %>' ],
    },

  });


  grunt.registerTask('default', [ 'build' ]);
  grunt.registerTask('optimizer', [ 'uglify:optimize' ]);
  grunt.registerTask('build-templates', [ 'ngtemplates', ]);
  grunt.registerTask('build-css', [ 'less' ]);
  grunt.registerTask('build-js', [
    //'jshint',
    'ngtemplates:app',
    'requirejs:build',
    'concat:almond',
    'ngmin:almond',
    'uglify:almond',
    'clean:tmp',
  ]);

  grunt.registerTask('build', [
    'build-js',
    'build-css',
    'usemin',
  ]);
};
