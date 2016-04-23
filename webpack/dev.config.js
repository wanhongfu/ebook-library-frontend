var path = require('path');
var webpack = require('webpack');

var port = process.env.NODE_PORT || 3000;

module.exports = {
    // devtool: 'cheap-module-eval-source-map',
    devtool: '#eval-source-map',

    entry: [
        './src/'
    ],

    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'app.js',
        publicPath: '/static/'
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ],

    resolve: {
        extensions: ['', '.js', '.jsx']
    },

    module: {
        loaders: [{
            test: /\.(js|jsx)$/,
            loaders: ['babel'],
            exclude: /node_modules/
        }, {
            test: /\.scss$/,
            loader: 'style!css!sass'
        }, {
            test: /\.css$/,
            loader: 'style!css!sass'
        }]
    },

    devServer: {
        contentBase: './src',
        historyApiFallback: true,
        hot: true,
        inline: true,
        progress: true,
        port: port
    }
};
