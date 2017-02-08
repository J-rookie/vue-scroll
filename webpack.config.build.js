var config = require('./webpack.config.js');
var Webpack = require("webpack");

config.plugins.push(new Webpack.DefinePlugin({
          'process.env':{
            'NODE_ENV': JSON.stringify('production')
          }
        }))

config.devtool = false;

module.exports = config;