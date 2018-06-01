var webpack = require('webpack');
var path = require('path');

var autoprefixer = require('autoprefixer');
var precss       = require('precss');
var mixins       = require('postcss-mixins');

var ExtractTextPlugin = require("extract-text-webpack-plugin");

var appContext = path.join(__dirname, '/');

var NODE_ENV = process.env.NODE_ENV || "production";
console.log(NODE_ENV)

module.exports = {
  context: appContext,
  mode: 'development',
  entry: [
    'babel-polyfill',
    './js/index'
  ],
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "bundle.js",
    publicPath: "/",
  },
  devServer: {
    historyApiFallback: true,
  },
  module: {
    rules: [{
      test: /\.js?$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
      include: path.join(__dirname, '/js')
    }, {
      test: /\.css?$/,
      use: [
        'style-loader',
        { loader: 'css-loader'},
        { loader: 'postcss-loader', options: { postcss: [autoprefixer, precss, mixins], } }
      ]
    }, {
      test: /\.(png|jpg|svg|ttf|eot|woff|woff2)$/,
      loader: 'file-loader?name=[path][name].[ext]?[hash]'
    }, {
      test: /\.svg/,
      loader: 'svg-url-loader'
    }]
  },
  plugins: [
    new ExtractTextPlugin("[name].css", { allChunks: true }),
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: [autoprefixer, precss, mixins],
      },
    })
  ],
};
