const webpack = require('webpack');
const package = require('./package.json');
const banner  =
    " Vuedals plugin v" + package.version + "\n" +
    "\n" +
    " Multiple event based modal windows, with a single component\n" +
    "\n" +
    " This is a plugin to open any number of modal windows without having to attach them to the DOM\n" +
    " @author "+ package.author.name +" <"+ package.author.email +">\n" +
    " "+ package.homepage +"\n" +
    " Released under the MIT License.";
const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
    mode: 'development',

    entry: './src/main.js',

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'vuedals.js',
        library: 'Vuedals',
        libraryTarget: 'umd',
        umdNamedDefine: true
    },

    resolve: {
        extensions: ['', '.js', '.vue']
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: __dirname,
                exclude: /node_modules/
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.sass$/,
                use: [
                    'css-loader',
                    'sass-loader'
                ]
              }
        ]
    },

    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin()],
    },

    resolve: {
        alias: {
            //'vue$': 'vue/dist/vue.common.js'
        }
    },

    plugins: [
        new webpack.BannerPlugin(banner),
        new VueLoaderPlugin()
    ]
};