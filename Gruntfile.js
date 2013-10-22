//jshint camelcase:false

module.exports = function(grunt) {
	'use strict';
	// Project configuration.

	grunt.initConfig({

		files: {
			entry_point: {
				config: 'app/requirejs.config.js',
				js: 'app/main.js',
				test: 'test/runner.js',
				less: 'app/main.less',
			},

			js: [
				'app/**/*.js',
				'components/**/*.js',
				'!<%= files.test %>',
			],
			test: [
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
				'*.json'
			],

		},

		watch: {
			dev: {
				files: [
					'<%= files.less %>',
					'<%= files.js %>',
					'<%= files.config %>',
				],
				tasks: [ 'build' ]
			}
		},

		jshint: {
			options: {
				jshintrc: 'jshintrc.json',
				//ignores: '<%= files.vendor %>',
			},
			dev: [ '<%= files.js %>' ],
		},

		ngmin: {
			dev: {
				expand: true,
				src: [ '<%= files.js %>' ],
				dest: 'build/ngmin',
			}
		},

		requirejs: {
			dev: {
				options: {
					almond: true,
					baseUrl: 'build/ngmin/app',
					mainConfigFile: 'build/ngmin/app/requirejs.config.js',
					name: 'main',
					out: 'build/out.js',
					//optimize: 'none',
				}
			}
		},

		less: {
			dev: {
				src: [ '<%= files.entry_point.less %>' ],
				dest: 'build/generated.css',
				compress: false,
			}
		},

		autoprefixer: {
			dev: {
				options: {
					browsers: ['last 2 version', 'ie 8']
				},
				src: 'build/generated.css',
				dest: 'build/out.css'
			}
		},

		copy: {
			'ngmin-vendor': {
				src: 'vendor/*',
				dest: 'build/ngmin/',
			}
		},

		clean: {
			'before-build': [ 'build' ],
			'after-build': [
				'build/ngmin',
				'build/generated.css',
			],
		}
	});

	// Grunt plugins
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-autoprefixer');
	grunt.loadNpmTasks('grunt-ngmin');
	grunt.loadNpmTasks('grunt-requirejs');
	//grunt.loadNpmTasks('grunt-karma');

	grunt.registerTask('build', [
		'clean:before-build',
		'jshint:dev',
		'ngmin:dev',
		'copy:ngmin-vendor',
		'requirejs:dev',
		'less:dev',
		'autoprefixer:dev',
		'clean:after-build',
	]);

	// Default task
	grunt.registerTask('default', [ 'watch:dev' ]);
};
