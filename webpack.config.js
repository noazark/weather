const path = require( 'path' );
const nodeExternals = require( 'webpack-node-externals' );

// Config to bundle files for Web (browser)
const frontEndConfig = {
    target: 'web',
    entry: {
        app: [ './weather.js' ]
    },
    output: {
        path: path.resolve( __dirname, '../dist/web' ),
        filename: 'weather.js',
    },
    devServer: {
        host: '0.0.0.0', // Required for docker
        publicPath: '/assets/',
        contentBase: path.resolve( __dirname, './views' ),
        watchContentBase: true,
        compress: true,
        port: 9001
    },
    devtool: 'inline-source-map',
}

// Config to bundle files for NodeJS
const backEndConfig = {
    target: 'node',
    entry: {
        app: [ './weather.js' ]
    },
    output: {
        path: path.resolve( __dirname, '../dist/node' ),
        filename: 'weather.js'
    },
    externals: [ nodeExternals() ]
}

module.exports = [ frontEndConfig, backEndConfig ];