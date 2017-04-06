var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

function resolve (dir) {
  console.log('resolveFn: ');
  console.log(path.join(__dirname, '.', dir));
  return path.join(__dirname, '.', dir)
}

module.exports = {
  entry: './src/js/clickFn.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[id].[name].[chunkhash:8].js'
  },
  resolve: {
    extensions: ['.js', '.json'],
    alias: {
      'src': resolve('src')
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'postcss-loader']
        })
      },
      {
        test: /\.(png|jpg|gif|svg|woff2?|eot|ttf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 400000,
          name: '[name]-[hash:8].[ext]'
        }
      }
    ]
  },

  plugins: [
    new ExtractTextPlugin('[name].[hash:8].css'),

    new HtmlWebpackPlugin({
      template: 'src/index.html'
    }),
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: function () {
          return [require('autoprefixer')({
            browsers: ['last 2 versions', 'Android >= 4.0']
          })];
        }
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ]
};
