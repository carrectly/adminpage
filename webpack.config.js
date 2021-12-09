const isDev = process.env.NODE_ENV === 'development'
const path = require('path');

module.exports = {
	mode: isDev ? 'development' : 'production',
	entry: './client/index.js',
	output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'public')
	},
  devServer: {
    port: 1337,
    watchContentBase: true
  },
	resolve: {
		extensions: ['.js', '.jsx'],
	},
	devtool: 'source-map',
	watchOptions: {
		ignored: /node_modules/,
	},
	module: {
		rules: [
			{
				test: /\.(jsx|js)$/,
				exclude: /node_modules/,
				use: [{
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', {
                "targets": "defaults"
              }],
              '@babel/preset-react'
            ]
          }
        }]
			},
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader'],
			},
			{
				test: /\.s[ac]ss$/i,
				use: [
					'style-loader',
					'css-loader',
					{
						loader: 'sass-loader',
						options: {
							// Prefer `dart-sass`
							implementation: require('sass'),
						},
					},
				],
			},
		],
	},
}
