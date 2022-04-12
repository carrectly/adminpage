const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin');

const paths = require('./paths');

module.exports = {
  // Where webpack looks to start building the bundle
  entry: paths.src + '/app/index.js',

  // Where webpack outputs the assets and bundles
  output: {
    path: paths.build,
    filename: '[name].bundle.js',
    publicPath: '/',
  },

  // Customize the webpack build process
  plugins: [
    // Removes/cleans build folders and unused assets when rebuilding
    new CleanWebpackPlugin(),

    // Copies files from target to destination folder
    // new CopyWebpackPlugin({
    //   patterns: [
    //     {
    //       from: paths.public,
    //       to: 'assets',
    //       globOptions: {
    //         ignore: ['*.DS_Store'],
    //       },
    //       noErrorOnMissing: true,
    //     },
    //   ],
    // }),

    // Generates an HTML file from a template
    // Generates deprecation warning: https://github.com/jantimon/html-webpack-plugin/issues/1501
    new HtmlWebpackPlugin({
      title: 'Carrenly Admin App',
      favicon: paths.src + '/images/favicon.png',
      template: paths.src + '/app/index.html', // template file
      filename: 'index.html', // output file
      cache: true,
      inject: true,
      favicons: {
        appName: 'carrenlyadmin.com',
        appDescription: 'Carrectly Admin App',
        developerName: '',
        developerURL: null,
        background: 'transparent',
        theme_color: '#743794',
        icons: {
          android: true,
          appleIcon: true,
          appleStartup: true,
          coast: false,
          favicons: true,
          firefox: true,
          opengraph: true,
          twitter: true,
          yandex: true,
          windows: true,
        },
      },
    }),
  ],

  // Determine how modules within the project are treated
  module: {
    rules: [
      // JavaScript: Use Babel to transpile JavaScript files
      // { test: /\.(js|jsx)$/, use: ['babel-loader'] },

      // Images: Copy image files to build folder
      { test: /\.(jpe?g|gif|png|svg|pdf|wav|mp3|mp4|avi|mov|ico|webp)$/, type: 'asset/resource' },

      // Fonts and SVGs: Inline files
      { test: /\.(woff(2)?|eot|ttf|otf|svg|)$/, type: 'asset/inline' },
    ],
  },
  target: 'web',

  resolve: {
    modules: [paths.src, 'node_modules'],
    extensions: ['*', '.js', '.jsx', '.json'],
    alias: {
      '@': paths.src,
      assets: paths.build,
    },
  },
};
