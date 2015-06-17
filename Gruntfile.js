"use strict";

var ngrok = require('ngrok');

module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);

  // Project configuration.
  grunt.initConfig({
    // gzip assets 1-to-1 for production
    compress: {
      main: {
        options: {
          mode: 'gzip'
        },
        expand: true,
        cwd: 'src/css',
        src: ['**/*'],
        dest: 'build/css/'
      }
    },
    pagespeed: {
      options: {
        nokey: true,
        locale: "en_GB",
        threshold: 40
      },
      local: {
        options: {
          strategy: "desktop"
        }
      },
      mobile: {
        options: {
          strategy: "mobile"
        }
      }
    },
    imagemin: {
      png: {
        options: {
          optimizationLevel: 7
        },
        files: [
          {
            // Set to true to enable the following options…
            expand: true,
            // cwd is 'current working directory'
            cwd: 'src/img/',
            src: ['**/*.png'],
            // Could also match cwd line above. i.e. project-directory/img/
            dest: 'build/img/',
            ext: '.png'
          }
        ]
      },
      jpg: {
        options: {
          progressive: true
        },
        files: [
          {
            // Set to true to enable the following options…
            expand: true,
            // cwd is 'current working directory'
            cwd: 'src/img/',
            src: ['**/*.jpg'],
            // Could also match cwd. i.e. project-directory/img/
            dest: 'build/img/',
            ext: '.jpg'
          }
        ]
      }
    },
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        files: [{
          expand: true,
          cwd: 'src/js/',
          src: '**/*.js',
          dest: 'build/js/',
          ext: '.js'
        }]
      }
    },
    cssmin: {
      target: {
        files: [{
          expand: true,
          cwd: 'src/css/',
          src: '**/*.css',
          dest: 'build/css/',
          ext: '.min.css'
        }]
      }
    },
    htmlmin: {
      minify: {
        options: {
          removeComments: true,
          collapseWhitespace: true
        },
        files: [{
          expand: true,
          cwd: 'src/',
          src: '**/*.html',
          dest: 'build/',
          ext: '.html'
        }]
      }
    }
  });

  grunt.registerTask('psi-ngrok', 'Run pagespeed with ngrok',
                     function() {
                      var done = this.async();
                      var port = 8000;
                      ngrok.connect(port, function(err, url) {
                        if (err !== null) {
                          grunt.fail.fatal(err);
                          return done();
                        }
                        grunt.config.set('pagespeed.options.url', url);
                        grunt.task.run('pagespeed');
                        done();
                      });
  });
  // Default task(s).
  grunt.registerTask('default', ['uglify', 'cssmin', 'htmlmin', 'imagemin', 'psi-ngrok']);

};