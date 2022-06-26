const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { merge } = require('webpack-merge');

const paths = require('./paths');
const common = require('./webpack.common');

module.exports = merge(common, {
  mode: 'production',
  devtool: false,
  output: {
    path: paths.build,
    publicPath: '/',
    filename: 'js/[name].[contenthash].bundle.js',
    chunkFilename: 'js/[name].chunk.js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: [paths.src],
        exclude: /node_modules/,
        loader: require.resolve('babel-loader'), // JavaScript: Use Babel to transpile JavaScript files
        options: {
          compact: true,
          presets: ['@babel/env', '@babel/react'],
          plugins: [
            '@babel/plugin-proposal-export-default-from',
            '@babel/plugin-syntax-dynamic-import',
            [
              '@babel/plugin-proposal-decorators',
              {
                legacy: true,
              },
            ],
            [
              '@babel/plugin-proposal-class-properties',
              {
                loose: false,
              },
            ],
            '@babel/plugin-transform-react-jsx',
          ],
        },
      },
      {
        test: /\.(sass|scss|css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              sourceMap: false,
              modules: false,
              url: true,
              esModule: true,
            },
          },
          'postcss-loader',
          'sass-loader',
        ],
      },
    ],
  },
  plugins: [
    // Extracts CSS into separate files
    new MiniCssExtractPlugin({
      filename: 'styles/[name].[contenthash].css',
      chunkFilename: '[id].css',
    }),
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin({
        parallel: true,
      }),
      new TerserPlugin({
        test: /\.js(\?.*)?$/i,
        parallel: true,
        exclude: [
          /\.min.js/,
          // /node_modules/
        ],
        terserOptions: {
          ecma: 8,
        },
      }),
      '...',
    ],
    runtimeChunk: true,
    splitChunks: { chunks: 'all' },
  },
  performance: {
    hints: false,
  },
});
