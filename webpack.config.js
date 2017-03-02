//
var path = require('path');
//
var Webpack = require("webpack");
//
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var extractSCSS = new ExtractTextPlugin("style.css")

module.exports={
    resolve: {
        // require时省略的扩展名，如：require('module') 不需要module.js
        extensions: ['.js','.vue','.css'],
        alias:{
            'vue$':'vue/dist/vue.js'
        }
    },
    //入口文件配置
    entry: {
        './app':'./example/main.js',
    },
    //产出文件配置
    output:{
        //path:path.join(__dirname),
        filename: '[name].js',
        //publicPath: './dist/'
        // 公共文件生成的地址
    },
    //webpack-dev-server配置
    devServer: {
      compress: true,
      host: "0.0.0.0",
      port: 8899
    },
    //模块配置
    module: {
        rules:[
            { test: /\.vue$/,
              loader: 'vue-loader'
            },
            {
              test: /\.css$/,
              // loader: extractSCSS.extract(['css','autoprefixer'])
              loader: extractSCSS.extract('css-loader!autoprefixer-loader')
            },
            {
              test: /\.js$/,
              exclude: /node_modules/,
              use:[{
                loader: "babel-loader",
                options:{
                  presets : ['es2015','stage-0'],
                  plugins : ['transform-runtime']
                }

              }]
            },

        ]
    },
    //插件配置
    plugins: [//注意这是一个数组..
        new Webpack.BannerPlugin("vue-scroll"),
        new Webpack.ProvidePlugin({
          Vue:'vue',
        }),
        extractSCSS
    ],
    // 开启source-map，webpack有多种source-map，在官网文档可以查到//生产模式要关闭否则体积吓死你
    devtool: 'eval-source-map'
}
