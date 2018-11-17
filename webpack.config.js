const path = require('path');
const webpack = require('webpack');
const CompressionPlugin = require('compression-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
module.exports = {
  devtool: 'source-map',
  entry: './src/js/components/script.js',
  output: {
    path: path.resolve(__dirname, './js/'),
    filename: 'app.js',
  },
  plugins: [
    new UglifyJsPlugin({
      sourceMap: true,
      uglifyOptions: {
        compress: {
          warnings: false, // Suppress uglification warnings
          pure_getters: true,
          unsafe: true,
          unsafe_comps: true,
        },
        output: {
          comments: false,
        },
        ie8: false,
        exclude: [/\.min\.js$/gi] // skip pre-minified libs
      },
    }),
    new CompressionPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0,
    }),
		new BundleAnalyzerPlugin(),
  ],
};
