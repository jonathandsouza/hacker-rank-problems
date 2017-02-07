'use strict';


module.exports = function (grunt) {

	process.execArgv = [];

	// Load grunt tasks automatically
	require('load-grunt-tasks')(grunt);

	// Time how long tasks take. Can help when optimizing build times
	require('time-grunt')(grunt);

	grunt.loadTasks('grunt/utils');

	// Define the configuration for all the tasks
	grunt.initConfig({

		clean: {
			build: {
				options: {
					force: true
				},
				files: [{
					dot: true,
					src: [
						'build'
					]
				}]
			}
		},

		// Add vendor prefixed styles
		uglify: {
			build: {
				files: {
					'build/main.js': ['build/main.js']
				}
			}
		},

		// Copies remaining files to places other tasks can use
		copy: {
			build: {
				files: [{expand: true, src: ['TEST-CASES.json'], dest: 'build/'}]
			}
		},

		execute: {
			test: {
				src: ['main.js']
			},
			build: {
				src: ['build/main.js']
			}
		},

		removelogging: {
			build: {
				src: "main.js",
				dest: "build/main.js"
			}
		}

	});

	grunt.registerTask('run-test', ['execute:test']);
	grunt.registerTask('run-build', ['clean:build', 'removelogging:build', 'uglify:build', 'copy:build', 'execute:build']);

};