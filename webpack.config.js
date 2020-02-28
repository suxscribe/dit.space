const path = require('path')
const fs = require('fs')
const webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CopyWebpackPlugin= require('copy-webpack-plugin');
const autoprefixer = require('autoprefixer');

function generateHtmlPlugins(templateDir) {
	const templateFiles = fs.readdirSync(path.resolve(__dirname, templateDir));
	return templateFiles.map(item => {
	  const parts = item.split(".");
	  const name = parts[0];
	  const extension = parts[1];
	  return new HtmlWebpackPlugin({
		filename: `${name}.html`,
		template: path.resolve(__dirname, `${templateDir}/${name}.${extension}`)
		// inject: false //don't add js and css to html
	  });
	});
}


const htmlPlugins = generateHtmlPlugins('./src/html/views')

const config = {
	entry: ["./src/js/index.js", "./src/scss/style.scss"],
	output: {
	  filename: "./js/bundle.js",
	  // publicPath: 'http://suxscribe.tmweb.ru/transsignal/'
	},
	devtool: "source-map",
	mode: "production",
	// optimization: {
	//   minimizer: [
	//     new TerserPlugin({
	//       sourceMap: true,
	//       extractComments: true
	//     })
	//   ]
	// },
	module: {
	  rules: [
		
		{
		  test: /\.(sass|scss)$/,
		  include: path.resolve(__dirname, "src/scss"),
		  use: [
			{
			  loader: MiniCssExtractPlugin.loader,
			  options: {}
			},
			{
			  loader: "css-loader",
			  options: {
				sourceMap: true,
				url: false
			  }
			},
  
			{
			  loader: "postcss-loader",
			  options: {
				ident: "postcss",
				sourceMap: true,
				plugins: () => [
				  require("cssnano")({
					preset: [
					  "default",
					  {
						discardComments: {
						  removeAll: true
						}
					  }
					]
				  })
				]
			  }
			},
			{
			  loader: "sass-loader",
			  options: {
				sourceMap: true
			  }
			}
		  ]
		},
		{
		  test: /\.html$/,
		  include: path.resolve(__dirname, "src/html/includes"),
		  use: ["raw-loader"]
		}
	  ]
	},
	plugins: [
	  new MiniCssExtractPlugin({
		filename: "./css/style.bundle.css"
	  }),
	  new CopyWebpackPlugin([
		{
		  from: "./src/fonts",
		  to: "./fonts"
		},
		{
		  from: "./src/favicon",
		  to: "./favicon"
		},
		{
		  from: "./src/assets",
		  to: "./assets"
		}
	  ])
	].concat(htmlPlugins)
  };

module.exports = (env, argv) => {
	externals: {
	}
	if (argv.mode === "production") {
		config.plugins.push(new CleanWebpackPlugin());
	}
	return config;
};



// module.exports = {
// 	entry: './src/index.js',
// 	output: {
// 		// mode: 'development', // 'production' = -p key
// 		filename: './js/main.js', //[hash]
// 		path: path.resolve(__dirname,'dist'),
// 		// publicPath: 'http://suxscribe.tmweb.ru/transsignal/'
// 	},
// 	devtool: 'source-map',
// 	devServer: {
// 		contentBase: './dist'
// 	},
// 	plugins: [
// 		new HtmlWebpackPlugin({
// 			template: './src/html/views/index.html',
// 		}),
// 		new HtmlWebpackPlugin({
// 			filename: 'project.html',
// 			template: './src/html/views/project.html',
// 		}),
// 		new HtmlWebpackPlugin({
// 			filename: 'content.html',
// 			template: './src/html/views/content.html',
// 		}),
// 		new HtmlWebpackPlugin({
// 			filename: 'content-list.html',
// 			template: './src/html/views/content-list.html',
// 		}),

// 		new MiniCssExtractPlugin({
// 			// Options similar to the same options in webpackOptions.output
// 			// all options are optional
// 			filename: './css/[name].css', // создает одноименный файл // .[hash]
// 		}),
// 		new CopyWebpackPlugin([{
// 				from: './src/fonts',
// 				to: './fonts'
// 			  },
// 			  {
// 				from: './src/favicon',
// 				to: './favicon'
// 			  },
// 			  {
// 				from: './src/assets',
// 				to: './assets'
// 			  },
// 			  /*{
// 				from: './src/uploads',
// 				to: './uploads'
// 			  }*/
// 		]),
// 		new CleanWebpackPlugin({
// 			cleanOnceBeforeBuildPatterns:['**/*.css*','**/*.js*'] //remove everything before build
// 		}
// 		),
// 		new webpack.LoaderOptionsPlugin({
// 			options: {
// 				postcss: [
// 					autoprefixer()
// 				]
// 			}
// 		})
// 		/*new OptimizeCssAssetsPlugin({
// 			assetNameRegExp: /\.css$/g,
// 			cssProcessor: require('cssnano'),
// 			cssProcessorPluginOptions: {
// 				preset: ['default', { discardComments: { removeAll: true } }], //remove comments
// 			},
// 			canPrint: true
// 		})*/

// 	], //.concat(htmlPlugins)
// 	module: {
// 		rules: [

// 			{ test: /\.html$/,
// 			  include: path.join(__dirname, 'src/html/includes'),
// 			  use: {
// 			    loader: 'html-loader',
// 			    options: {
// 			      interpolate: true
// 			    }
// 			  }
// 			},
// 			{
// 				test: /\.(scss|css)$/,
// 				use: [
// 					MiniCssExtractPlugin.loader,
// 					'css-loader',
// 					'postcss-loader',
// 					'sass-loader'
// 				]
// 			},
// 			// {
// 			// 	test: /\.(jpg|png|svg|gif|webp)$/,
// 			// 	use: [
// 			// 		{
// 			// 			loader: 'file-loader',
// 			// 			options: {
// 			// 				name: '[name].[ext]',
// 			// 				outputPath: './assets/',
// 			// 				useRelativePath: true
// 			// 			}
// 			// 		},
// 			// 		/*{ //optimize images
// 			// 			loader: 'image-webpack-loader',
// 			// 			options: {
// 			// 				mozjpeg: {
// 			// 					progressive: true,
// 			// 					quality: 70
// 			// 				}
// 			// 			}
// 			// 		}*/
// 			// 	]
// 			// },
// 			{ test: /\.(woff|woff2|eot|ttf)$/, loader: 'url-loader?limit=100000' }
// 		],
// 	},
// }