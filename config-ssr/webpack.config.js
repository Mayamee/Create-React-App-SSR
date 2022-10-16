const webpackNodeExternals = require('webpack-node-externals')
const NodemonWebpackPlugin = require('nodemon-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const mode = process.env.MODE || 'development'
const paths = require('./paths')

module.exports = {
  target: 'node',
  mode,
  entry: `${paths.src}/index.js`,
  output: {
    filename: 'bundle.js',
    path: paths.build,
  },
  externals: [webpackNodeExternals()],
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  plugins: [new NodemonWebpackPlugin(), new CleanWebpackPlugin()],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            babelrc: false,
            presets: ['@babel/preset-env', ['@babel/preset-react', { runtime: 'automatic' }]],
          },
        },
      },
      {
        test: /\.(gif|jpe?g|png|ico)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
            },
          },
        ],
      },
      {
        test: /\.(otf|eot|svg|ttf|woff|woff2).*$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
            },
          },
        ],
      },
      {
        test: /\.(sass|scss|css)$/,
        use: ['css-loader', 'sass-loader'],
      },
    ],
  },
  optimization: {
    minimize: mode === 'production',
  },
}
