/* eslint-env node */
module.exports = function ( config ) {
  config.set( {
    browsers: ['Chrome'],

    frameworks: ['browserify', 'mocha', 'chai', 'sinon'],

    reporters: ['mocha'],

    files: [
      'src/clients/**/*.js',
      'src/helpers/**/*.js',
      'test/**/test-*.js',
      'weather.js'
    ],

    preprocessors: {
      'src/clients/**/*.js': ['eslint', 'browserify'],
      'src/helpers/**/*.js': ['eslint', 'browserify'],
      'test/**/*.js': ['eslint', 'browserify'],
      'weather.js': ['eslint', 'browserify'],
    },

    eslint: {
      stopOnWarning: false,
      stopOnError: false
    },

    browserify: {
      debug: true,
      transform: [
        ['babelify']
      ]
    }
  } );

  if ( process.env.CIRCLECI ) {
    config.set( {
      reporters: ['progress', 'junit'],
      junitReporter: {
        outputDir: process.env.CIRCLE_TEST_REPORTS + '/junit/',
        outputFile: 'test-results.xml',
        useBrowserName: false
      }
    } );
  }
};
