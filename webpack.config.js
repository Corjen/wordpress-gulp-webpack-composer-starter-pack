const webpack = require('webpack')
const path = require('path')
const devIp = require('dev-ip')()

const host = devIp[0] || 'localhost'

module.exports = {
  entry: {
    app: [
      path.resolve(__dirname, 'src/app/main.js'),
      path.resolve(__dirname, 'src/js/main.js'),
      'webpack/hot/dev-server',
      'webpack-dev-server/client?http://' + host + ':8080/'
    ]
  },
  output: {
    app: {
      path: path.resolve(__dirname, '/public/wp-content/themes/coolideasacademy/js/'),
      filename: 'bundle.js',
      publicPath: path.resolve(__dirname, '/public/wp-content/themes/coolideasacademy/js/')
    }
  },
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['react', 'es2015']
        }
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    port: 8080,
    contentBase: path.resolve(__dirname, '/public/wp-content/themes/coolideasacademy/js/'),
    historyApiFallback: true,
    hot: true,
    host: host,
    proxy: {
      '*': 'http://localhost:3000'
    }
  }
}
