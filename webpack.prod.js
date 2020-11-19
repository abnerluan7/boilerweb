const BrotliPlugin = require('brotli-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const DuplicatePackageCheckerPlugin = require('duplicate-package-checker-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const { optimize, DefinePlugin } = require('webpack')
const { merge } = require('webpack-merge')
const common = require('./webpack.common')

module.exports = merge(common, {
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        loader: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM'
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    },
    minimize: true,
    minimizer: [new TerserPlugin()]
  },
  plugins: [
    new DefinePlugin({
      'process.env.API_URL': JSON.stringify('https://testapi.1education.info')
    }),
    new BrotliPlugin({
      asset: '[path].br[query]',
      test: /\.(js|css|html|svg)$/
    }),
    new HtmlWebpackPlugin({
      template: './template.prod.html',
      cache: true
    }),
    new optimize.ModuleConcatenationPlugin(),
    new DuplicatePackageCheckerPlugin(),
    new CopyPlugin({
      patterns: [
        { from: 'public/assets', to: 'assets' },
        { from: 'public/locales', to: 'locales' }
      ]
    })
  ]
})
