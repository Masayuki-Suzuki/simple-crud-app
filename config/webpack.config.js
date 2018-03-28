require('babel-polyfill')

const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const SiteData = require('../assets/siteData')

const extractSass = new ExtractTextPlugin({
  filename: '/original/css/[name].css',
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
    custom: path.join(__dirname, '../assets/js/jobfind/custom.js'),
    topPage: path.join(__dirname, '../assets/sass/jobfind/topPage.scss'),
    original: path.join(__dirname, '../assets/sass/jobfind/original.scss'),
    'vendor/normalize': path.join(__dirname, '../assets/sass/jobfind/vendor/normalize.scss')
  },
  output: {
    path: path.resolve(__dirname, '../public/js'),
    filename: 'original/js/[name].js',
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
