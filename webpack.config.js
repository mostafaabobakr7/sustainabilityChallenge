const path = require('path');
const CompressionPlugin = require('compression-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
// eslint-disable-next-line prefer-destructuring
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
module.exports = {
  devtool: 'source-map',
  entry: './src/js/components/index.js',
  output: {
    path: path.resolve(__dirname, './js/'),
    filename: 'app.js',
  },
  plugins: [
    new FriendlyErrorsWebpackPlugin(),
    new UglifyJsPlugin({
      sourceMap: true,
      uglifyOptions: {
        exclude: [/\.min\.js$/gi], // skip pre-minified libs
        mangle: true,
        ie8: false,
        compress: {
          warnings: false,
          pure_getters: true,
          unsafe: true,
          unsafe_comps: true,
        },
        output: {
          comments: false,
        },
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
