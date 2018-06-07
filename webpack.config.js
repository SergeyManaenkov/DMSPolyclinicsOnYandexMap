const path = require('path');
let HtmlPlugin = require('html-webpack-plugin');
let MiniCssExtractPlugin = require('mini-css-extract-plugin');
let CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
	entry: [
		'./src/js/entry.js',
		'./src/css/styles.css'
	],
	output: {
		filename: './js/scripts.js',
        publicPath: "./../",
        path: path.resolve(__dirname, 'dist'),
	},
	devtool: "source-map",
	module: {
		rules: [
			{
				test: /\.js$/,
				include: path.resolve(__dirname, 'src/js'),
				use: {
					loader: 'babel-loader',
					options: {
						presets: 'env'
					}
				}
			},
			{
				test:  /\.hbs$/,
				exclude: /(node_modules)/,
				use: {
					loader: 'handlebars-loader'
				}
			},
			{
				test:  /\.html$/,
				exclude: /(node_modules)/,
				use: {
					loader: 'html-loader'
				}
			},
			{
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: {
                            sourceMap: true,
                            minimize: false,
                            url: true //не корректно работают ссылки при значении true
                        }
                    },
                    "resolve-url-loader"
                ]
            },
            {
                test: /.(ttf|otf|svg|eot|woff(2)?)(\?[a-z0-9]+)?$/,
                //exclude: [path.resolve(__dirname, "src/img")],
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'fonts/[name].[ext]'
                        }
                    }
                ]
            },

		]
	},
    plugins: [
        new HtmlPlugin({
            title: 'index title',
            template: './src/index.html',
            filename: 'index.html',
            chunks: ['index']
        }),
		new MiniCssExtractPlugin({
            filename: "css/styles.css",
            chunkFilename: "[id].css"
        }),
		new CleanWebpackPlugin('dist',{
			verbose: true
		})
	]
};