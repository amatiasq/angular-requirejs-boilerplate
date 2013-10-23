//jshint camelcase:false

module.exports = function(grunt) {
	'use strict';

	grunt.initConfig({


		//
		// FILES STRUCTURE
		//
		files: {
			entry_point: {
				config: 'app/requirejs.config.js',
				js: 'app/main.js',
				test: 'test/runner.js',
				less: 'app/main.less',
			},

			build: {
				js: 'build/out.js',
				css: 'build/out.css',
			},

			js: [
				'app/**/*.js',
				'components/**/*.js',
				'!app/**/*.test.js',
				'!components/**/*.test.js',
				//'!<%= files.test %>',
			],
			test: [
				'<%= files.entry_point.test %>',
				'app/**/*.test.js',
				'components/**/*.test.js',
			],
			less: [
				'app/**/*.less',
				'components/**/*.less',
			],
			vendor: [
				'vendor/**/*',
				'node_modules/**/*',
				'bower_components/**/*',
			],
			config: [
				'Gruntfile.js',
				'karma.conf.js',
				'*.json'
			],
		},


		//
		// WATCH LISTENERS
		//
		watch: {
			config: {
				files: [ '<%= files.config %>' ],
				tasks: [ 'jshint:config' ],
			},

			app: {
				files: [ '<%= files.js %>' ],
				tasks: [ 'build-app' ],
			},

			test: {
				files: [ '<%= files.test %>' ],
				tasks: [ 'watch-tests' ],
			},

			less: {
				files: [ '<%= files.less %>' ],
				tasks: [ 'build-less' ],
			},
		},


		//
		// TESTS
		//

		karma: {
			options: {
				configFile: 'karma.conf.js',
			},
			run: { },
			once: {
				options: {
					singleRun: true,
					autoWatch: false,
				}
			}
		},


		//
		// BUILDERS
		//

		jshint: {
			options: {
				jshintrc: 'jshintrc.json',
				//ignores: '<%= files.vendor %>',
			},
			app: [ '<%= files.js %>' ],
			test: [ '<%= files.test %>' ],
			config: [ '<%= files.config %>' ],
		},

		requirejs: {
			build: {
				options: {
					almond: true,
					baseUrl: 'app',
					mainConfigFile: '<%= files.entry_point.config %>',
					name: 'main',
					out: '<%= files.build.js %>',
					optimize: 'none',
				}
			}
		},

		ngmin: {
			build: {
				src: '<%= files.build.js %>',
				dest: '<%= files.build.js %>',
			}
		},

		uglify: {
			build: {
				src: '<%= files.build.js %>',
				dest: '<%= files.build.js %>',
			}
		},

		less: {
			build: {
				src: [ '<%= files.entry_point.less %>' ],
				dest: '<%= files.build.css %>',
			}
		},

		autoprefixer: {
			build: {
				options: {
					browsers: ['last 2 version', 'ie 8']
				},
				src: '<%= files.build.css %>',
				dest: '<%= files.build.css %>'
			}
		},

		cssmin: {
			build: {
				src: '<%= files.build.css %>',
				dest: '<%= files.build.css %>',
			}
		},

		clean: {
			'before-build-less': [ '<%= files.build.css %>' ],
			'before-build-app': [ '<%= files.build.js %>' ],
			'repo': [
				'bower_components',
				// grunt stops working if we delete this folder
				//'node_modules',
				'build',
			]
		}
	});


	//
	// GRUNT PLUGINS
	//

	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-autoprefixer');
	grunt.loadNpmTasks('grunt-ngmin');
	grunt.loadNpmTasks('grunt-requirejs');
	grunt.loadNpmTasks('grunt-karma');


	//
	// BATCH TASKS
	//

	grunt.registerTask('build-less', [
		'clean:before-build-less',
		'less:build',
		'autoprefixer:build',
		'cssmin:build',
	]);

	grunt.registerTask('build-app', [
		'clean:before-build-app',
		'jshint:app',
		'karma:once',
		'requirejs:build',
		'ngmin:build',
		'uglify:build',
	]);

	grunt.registerTask('watch-tests', [
		'jshint:test',
		'karma:once',
	]);

	grunt.registerTask('test', [
		'karma:run',
	]);

	grunt.registerTask('lint', [
		'jshint',
	]);

	grunt.registerTask('build', [
		'build-app',
		'build-less',
	]);


	//
	// DEFAULT TASK
	//
	grunt.registerTask('default', [ 'watch' ]);
};
