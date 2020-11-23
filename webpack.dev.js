const Dotenv = require('dotenv-webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { merge } = require('webpack-merge')
const common = require('./webpack.common')

module.exports = merge(common, {
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        loader: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  devtool: 'inline-source-map',
  devServer: {
    publicPath: '/',
    contentBase: './public',
    writeToDisk: true,
    historyApiFallback: true,
    port: 3000,
    compress: true,
    hot: true
  },
  plugins: [
    new Dotenv({
      path: './.env',
      safe: true,
      systemvars: true
    }),
    new HtmlWebpackPlugin({
      template: './template.dev.html'
    })
  ]
})
