require('babel-polyfill')

const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const SiteData = require('../assets/siteData')

const extractSass = new ExtractTextPlugin({
  filename: '/original/css/[name].css',
  allChunks: true
})

const DEV = !process.argv.includes('--env.prod')
const plugins = [
  new webpack.optimize.OccurrenceOrderPlugin(),
  new webpack.LoaderOptionsPlugin({ debug: true }),
  new HtmlWebpackPlugin({
    filename: 'index.html',
    inject: false,
    template: './assets/pug/jobfind/index.pug',
  }),
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
    path: path.resolve(__dirname, '../www/jobfind-pc/'),
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
            test: /\.pug$/,
            exclude: /(node_modules|partials|components|contents)/,
            use: [
              {
                loader: "raw-loader",
              },
              {
                loader: "pug-html-loader",
                options: {
                  pretty: true,
                  data: SiteData
                }
              }
            ]
          },
          {
            test: /\.(jpg|jpeg|png|gif|svg)$/,
            use: {
              loader: 'file-loader?name=/jobfind-pc/original/images/[name].[ext]'
            }
          },
          {
            test: /\.(woff|woff2|eot|ttf|svg)$/,
            loader: 'file-loader?name=/jobfind-pc/original/fonts/[name].[ext]'
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
