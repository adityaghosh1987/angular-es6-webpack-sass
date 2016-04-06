var WEBPACK = require('webpack'),
	PATH = require('path'),
	MERGE = require('webpack-merge'),
	HTML_WEBPACK_PLUGIN= require('html-webpack-plugin'),
	CLEAN = require('clean-webpack-plugin');
	COPY_PLUGIN = require('copy-webpack-plugin');

var isProduction = process.env.NODE_ENV === 'production' ? true : false;
var appPlugins = { plugins : [] };

var paths = {
				development : PATH.resolve(__dirname, './development'),
				production : PATH.resolve(__dirname, './production')
			};

var common = {
	context: paths.development,
	entry : {
		bundle : isProduction ? ['./app/core/bootstrap.js'] : ['webpack/hot/dev-server', './app/core/bootstrap.js']
	},
	output : {
		path: isProduction ? PATH.join(paths.production) : PATH.join(paths.development),
		filename : isProduction ? '[name].[chunkhash].js' : '[name].[hash].js'
	},
	resolve : {
		root : [paths.development]
	}
};

var modules = {
	module : {
		loaders : [
			{
				/**
				*	To add style, css, sass loader -> npm install -D style-loader css-loader sass-loader
				*	To Add auto prefixer -> npm install autoprefixer-loader --save-dev
				*	npm install node-sass --save-D
				*/
				test: /\.scss$/,
				loader: 'style!css!sass!autoprefixer-loader'
			},
			{
				/**
				*	npm install -D jshint-loader babel-loader ng-annotate-loader babel-preset-es2015
				*/
				test: /\.js$/,
				loader: 'ng-annotate!babel?presets[]=es2015!jshint',
				exclude: /node_modules|bower_components/
			},
		  {
				/**
				*	npm install file-loader --save-dev
				*	the image ./src/img.jpg will be copy and renamed as
				*	such: dist/img/img-a4bd04.jpg
				*/
				test: /\.(png|jpg|gif)$/,
				loader: "file-loader?name=img/img-[hash:6].[ext]"
		  },
		  {
				test: /\.(ico)$/,
				exclude: /node_modules/,
				loader:'file-loader?name=[name].[ext]&context=./'
		  },
			{
				test: /\.html$/,
        loader: "html-loader"
			}
		]
	}
};

if(isProduction){
	var templateObject = {
	  extraFiles: 'favicon',
      template: 'app/index-view.html', // Load a custom template
      inject: true
    },
	jsUglifier = {compress: {warnings: false}};

	// Cleaning production folder Don't write logs to console
	appPlugins.plugins.push(new CLEAN([paths.production], {verbose: false }));
	appPlugins.plugins.push(new HTML_WEBPACK_PLUGIN(templateObject));
	appPlugins.plugins.push(new WEBPACK.optimize.UglifyJsPlugin(jsUglifier));
	appPlugins.plugins.push(new COPY_PLUGIN([{ from: 'assets' }]));
}else{
	appPlugins.plugins.push(new HTML_WEBPACK_PLUGIN(
		{
			template: 'app/index-view.html', // Load a custom template
			inject: 'body' // Inject all scripts into the body
		}
	));

	//To support individual reload except home
	common.devServer = {
    historyApiFallback: true
	}
}
appPlugins.plugins.push(new WEBPACK.optimize.CommonsChunkPlugin({
        names: ['vendor', 'manifest']
      }));

module.exports = MERGE(common, appPlugins, modules);
