var webpack = require('webpack');
var uglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
var autoprefixer = require('autoprefixer');
module.exports = {
  entry: {
    index: './src/entry/index.js',
    background: './src/entry/background.js'
  },
  output: {
    path: './build',
    filename: '[name].js'
  },
  module: {
    loaders:[
      {
        test: /\.js[x]?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react']
        }
      },
      {
        test: /\.[s]?css$/,
        loader: 'style-loader!css-loader!postcss-loader'
      }
    ]
  },
  postcss: function() {
    return [autoprefixer]
  },
  plugins: [
    new uglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.ProvidePlugin({
      React: "react",
      ReactDOM: "react-dom"
    }),
    new webpack.ProvidePlugin({
      'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
    })
  ]
};