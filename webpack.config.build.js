var config = require('./webpack.config.js');
var Webpack = require("webpack");

config.plugins.push(new Webpack.DefinePlugin({
          'process.env':{
            'NODE_ENV': JSON.stringify('production')
          }
        }))

config.entry = {
        './dist/vue-scroll':'./src/build2.js',
    },

config.devtool = false;

module.exports = config;