module.exports = function(grunt) {
  'use strict';

  var EMPTY = "empty:";

  //
  // Grunt configuration:
  //
  // https://github.com/cowboy/grunt/blob/master/docs/getting_started.md
  //
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    meta: {
      banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' + '<%= grunt.template.today("yyyy-mm-dd") %>\\n' + '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' + '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' + ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */'
    },
    config: {
      src: 'src/',
      dist: 'dist/',
      temp: 'temp/'
    },
    clean: {
      build: ["<%= config.dist %>"]
    },
    copy: {
      dist: {
        files: [{
          expand: true,
          flatten: true,
          src: [""],
          dest: '<%= config.dist %>',
          filter: 'isFile'
        }]
      }
    },
    less: {
      development: {
        options: {
          paths: []
        },
        files: {
        }
      },
      production: {
        options: {
          paths: [],
          compress: true
        },
        files: {
        }
      }
    },
    uglify: {
      options: {
        mangle: true,
        sourceMap: '<%= config.dist %>scripts/source-map.js'
      },
      dist: {
        files: {
          '<%= config.dist %>scripts/page/boot.min.js': ['<%= config.dist %>scripts/page/boot.js']
        }
      }
    },
    imagemin: {
      dist: {
        options: {
          optimizationLevel: 3
        },
        files: {
        }
      }
    }
  });

  //grunt.loadNpmTasks('grunt-contrib');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-string-replace');
  grunt.loadNpmTasks('grunt-contrib-imagemin');

  // Default task.
  grunt.registerTask('default', [
    'clean:build',
    'copy:dist',
    'less:development',
    'less:production',
    'requirejs',
    'string-replace:html',
    'string-replace:css',
    'string-replace:js',
    'uglify',
    'imagemin'
  ]);

  // Alias the `test` task to run the `mocha` task instead
  //grunt.registerTask('test', 'server:phantom mocha');

};