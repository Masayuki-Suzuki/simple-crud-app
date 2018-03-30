require('babel-core/register')
require('babel-polyfill')

const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const extractSass = new ExtractTextPlugin({
  filename: '/css/[name].css',
  allChunks: true
})

const DEV = !process.argv.includes('--env.prod')
const plugins = [
  new webpack.optimize.OccurrenceOrderPlugin(),
  new webpack.LoaderOptionsPlugin({ debug: true }),
  extractSass,
]

if (!DEV) {
  plugins.push(
    new webpack.optimize.UglifyJsPlugin({ compress: { screw_ie8: false, warnings: false } }),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.optimize.DedupePlugin(),
  )
}

module.exports = {
  entry: {
    app: ['babel-polyfill', path.join(__dirname, '../src/index.jsx')],
    style: path.join(__dirname, '../assets/sass/style.scss'),
    'vendor/normalize': path.join(__dirname, '../assets/sass/vendor/normalize.scss')
  },
  output: {
    path: path.resolve(__dirname, '../public/'),
    filename: 'js/[name].js',
  },
  module: {
    rules: [
      {
        oneOf: [
          {
            test: /\.(js|jsx)?$/,
            exclude: /node_modules/,
            loader: require.resolve('babel-loader'),
          },
          {
            test: /\.(sass|scss)?$/,
            exclude: /node_modules/,
            use: extractSass.extract({
              use: [
                {
                  loader: 'css-loader',
                },
                {
                  loader: 'postcss-loader',
                  options: {
                    ident: 'postcss',
                    plugins: (loader) => [require('autoprefixer')()]
                  }
                },
                {
                  loader: 'sass-loader',
                },
              ],
              // use style-loader in development
              fallback: 'style-loader',
            }),
          },
          {
            test: /\.(jpg|jpeg|png|gif|svg)$/,
            use: {
              loader: 'file-loader?name=/public/images/[name].[ext]'
            }
          },
          {
            test: /\.(woff|woff2|eot|ttf|svg)$/,
            loader: 'file-loader?name=/public/fonts/[name].[ext]'
          }
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.eot'],
  },
  devtool: DEV ? 'source-map' : false,
  plugins,
}
