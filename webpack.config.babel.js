import webpack from 'webpack';
import copyFiles from 'copy-webpack-plugin';
import jquery from 'jquery';

module.exports = {
  devtool: "source-map",
  entry: [
    'webpack-dev-server/client?http://localhost:8080',
    // Dont reload on syntax errors
    'webpack/hot/only-dev-server',
    // Load the babel polyfill so we can use all es6 features
    'babel-polyfill',
    './src/index.js'
  ],

  resolve: {
    extensions: ['', '.js', '.jsx']
  },

  output: {
    path: __dirname + '/build/assets',
    filename: 'bundle.js',
    // Tell webpack-dev-server to serve the in memory bundle from the assets directory
    publicPath: '/assets/'
  },

  module: {
    loaders: [
      // Babelify the source JS
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|static)/,
        loaders: [
          // Enable hot module replacement
          'react-hot',
          'babel-loader'
        ]
      }
    ]
  },

  plugins: [
    // Copy the static files to the build dir
    new copyFiles([
      { from: 'static/', to: "../" }
    ]),
    
    // Ruins debugging, only enable in production
    //new webpack.optimize.UglifyJsPlugin({
    //  compress: {
    //    warnings: false
    //  }
    //}),
    new webpack.optimize.DedupePlugin(),
    new webpack.DefinePlugin({
        'process.env': {
            'NODE_ENV': JSON.stringify('production')
        }
    })
  ]
}