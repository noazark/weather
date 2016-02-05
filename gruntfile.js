module.exports = function( grunt ) {
    grunt.initConfig( {
    pkg: grunt.file.readJSON( "package.json" ),
    jshint: {
      all: {
        src: [ "gruntfile.js", "lib/**/*.js" ]
      }
    },
    karma: {
        unit: {
            configFile: "karma.conf.js"
        }
    },
    uglify: {
      options: {
        banner: "/* Name     = " + "<%= pkg.name %>\n" +
                " * Author   = " + "<%= pkg.author %>\n" +
                " * Version  = " + "<%= pkg.version %>\n" +
                " * License  = " + "<%= pkg.license %>\n" +
                " * About    = " + "<%= pkg.description %>\n*/\n\n"
      },
      dist: {
        files: {
          "dist/weather.min.js": [ "lib/**/*.js" ]
        }
      }
    },
    copy: {
      main: {
        src: 'lib/weather.js',
        dest: 'dist/weather.js',
      }
    },
    watch: {
      files: [ "lib/**/*.js" ],
      tasks: [ "jshint", "karma", "uglify" ]
    }
  } );

  grunt.loadNpmTasks( "grunt-contrib-jshint" );
  grunt.loadNpmTasks( "grunt-karma" );
  grunt.loadNpmTasks( "grunt-contrib-uglify" );
  grunt.loadNpmTasks( "grunt-contrib-watch" );
  grunt.loadNpmTasks( "grunt-contrib-copy" );

  grunt.registerTask( "default", [ "jshint", "karma", "watch" ] );
  grunt.registerTask( "lint", [ "jshint" ] );
  grunt.registerTask( "deploy", [ "jshint", "copy", "uglify" ] );

};
