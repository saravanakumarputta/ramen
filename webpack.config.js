const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: './src/App.js',
	output: {
		filename: './[name].js',
	},
	optimization: {
		splitChunks: {
			chunks: 'all',
		},
	},
	devtool: 'inline-source-map',
	devServer: {
		contentBase: './dist',
		stats: 'minimal',
		disableHostCheck: true,
		clientLogLevel: 'silent',
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './src/index.html',
		}),
	],
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
			},
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader'],
			},
			{
				test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: '[name].[ext]',
							outputPath: 'fonts/',
						},
					},
				],
			},
		],
	},
};
