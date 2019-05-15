const path = require('path');    //定义绝对路径
const webpack = require('webpack');
const HtmlPlugins = require('html-webpack-plugin');
const baseConfig = require('./webpack.config.base')
const merge = require('webpack-merge')//合并不同的webpack配置

let config = merge(baseConfig, {
    entry: path.join(__dirname, '../practice/index.js'),
    devtool: '#cheap-module-eval-source-map',  //把编译完的代码映射成能看懂的js 供调试-------webpack4,也默认配置了，可以取消掉
    module: {
        rules: [
            {
                //css预处理器
                test: /\.styl/,
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    'stylus-loader'
                ]
            }
        ]
    },
    resolve: {
        alias: {//路径别名
            'vue': path.join(__dirname, '../node_modules/vue/dist/vue.esm.js')//parctice演示代码需要引入不带runtime的vuejs文件
        },
        extensions: ['.js', '.jsx', '.vue', '.json'],//配置此处，在import文件时可以省略后缀名，在匹配上有先后顺序
    },
    devServer: {
        port: '8080',
        host: '0.0.0.0',    //可以通过本机内网访问,也可以通过本机IP访问
        overlay: {
            errors: true,        //让错误显示在网页上
        },
        hot: true,     //每次修改重新加载全部
    },
    plugins: [
        //把各种东西打包成html的出口文件
        //webpack在编译过程中以及在页面上自己写的js代码判断当前环境可以引用到
        new webpack.DefinePlugin({       //vue react时必须用的
            'process.env': {
                NODE_ENV: JSON.stringify('development')  //此处不处理一下development会报错
            }
        }),
        new HtmlPlugins({
            template: path.join(__dirname, '../index.html')
        }),       //正常情况用这一个就行,

        new webpack.HotModuleReplacementPlugin(),//是每次只刷新改变的组件，完善hot
        // new webpack.NoEmitOnErrorsPlugin()       //NoEmitOnErrorsPlugin可以减少调试时候不必要的功能展示----webpack4以废弃
    ]
})

module.exports = config;