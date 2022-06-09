const { merge } = require('webpack-merge');

const common = require('./webpack.common');
const paths = require('./paths');

module.exports = merge(common, {
  // Set the mode to development or production
  mode: 'development',

  // Control how source maps are generated
  devtool: 'inline-source-map',
  devServer: {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'max-age=29030400, public',
    },
    overlay: {
      warnings: true,
      errors: true,
    },
    host: '0.0.0.0', // Spin up a server for quick development
    port: 443,
    historyApiFallback: true,
    quiet: true,
    hot: true,
    https: true,
  },
  watch: true,
  optimization: {
    runtimeChunk: true,
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
      // Styles: Inject CSS into the head with source maps
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: { sourceMap: true, importLoaders: 1, modules: false },
          },
          { loader: 'postcss-loader', options: { sourceMap: true } },
          { loader: 'sass-loader', options: { sourceMap: true } },
        ],
      },
    ],
  },
});
