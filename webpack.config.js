var path = require("path");
var webpack = require("webpack");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
	entry: {
		index: "./src/index.js",
	},
	resolve: {
		extensions: [".mjs", ".js", ".html", ".npy"],
	},
	output: {
		path: __dirname + "/public",
		filename: "[name].bundle.js",
		chunkFilename: "[name].[id].js",
	},
	module: {
		rules: [
			{
				test: /\.(html|js)$/,
				exclude: /node_modules/,
				loader: "babel-loader",
				options: {
					presets: ["@babel/preset-env"],
				},
			},
			{
				test: /\.css$/i,
				use: ["to-string-loader", "css-loader"],
			},
			{
				test: /\.(html|svelte)$/,
				exclude: /node_modules/,
				loader: "svelte-loader",
			},
			{
				test: /\.(npy|npc)$/,
				exclude: /node_modules/,
				loader: "numpy-loader",
				options: {
					outputPath: "data/",
				},
			},
			{
				test: /\.svg$/,
				exclude: /node_modules/,
				loader: "svg-inline-loader",
				options: {
					removeSVGTagAttrs: true,
					removingTagAttrs: ["font-family"],
				},
			},
			{
				test: /\.(png|jpg|jpeg)$/,
				exclude: /node_modules/,
				loader: "file",
				options: {
					outputPath: "images/",
				},
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: "./src/index.ejs",
			filename: "index.html",
			chunks: ["index"],
		}),
		new CopyWebpackPlugin([{ from: "static/" }]),
	],
	devServer: {
		historyApiFallback: true,
		overlay: true,
		stats: "minimal",
		contentBase: __dirname + "/public",
	},
	devtool: "inline-source-map",
};
