// filename: '[name].[chunkhash].js',
var path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
module.exports = {
    entry: {
        app: './app/index.js'
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    use: 'css-loader'
                })
            },
            {
                test: /\.png$/,
                use: "file-loader"
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('styles.css'),
        new UglifyJSPlugin()
    ],
    resolve: {
        alias: {
            app: path.resolve(__dirname, 'app')
        }
    }
};