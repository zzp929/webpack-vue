const path = require('path');    //定义绝对路径
const webpack = require('webpack');
const HtmlPlugins = require('html-webpack-plugin');
// const ExtractPlugin = require('extract-text-webpack-plugin')//把非js代码单独打包出来---webpack3
const MiniCssExtractPlugin = require('mini-css-extract-plugin')//把非js代码单独打包出来---webpack4
const baseConfig = require('./webpack.config.base')
const merge = require('webpack-merge')//合并不同的webpack配置
const cleanWebpackPlugin = require('clean-webpack-plugin')
const isDEV = process.env.NODE_ENV === 'development';   //判断命令的env是什么；由于装了cross-env 所以mac windows适配

let config;
// // 两个环境都需要webpack，判断环境
if (isDEV) {
    config = merge(baseConfig, {
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
        devServer: {
            port: '8000',
            host: '0.0.0.0',    //可以通过本机内网访问,也可以通过本机IP访问
            overlay: {
                errors: true,        //让错误显示在网页上
            },
            hot: true,     //每次修改重新加载全部
            historyApiFallback: {
                // index: '/index.html',
                disableDotRule: true//加上这配置disableDotRule的作用是：使带后缀的文件当不存在时也能fallback到index.html
            }
        },
        plugins: [
            //把各种东西打包成html的出口文件
            //webpack在编译过程中以及在页面上自己写的js代码判断当前环境可以引用到
            new webpack.DefinePlugin({       //vue react时必须用的
                'process.env': {
                    NODE_ENV: isDEV ? '"development"' : '"production"'
                }
            }),
            new HtmlPlugins({
                template: path.join(__dirname, '../index.html')
            }),       //正常情况用这一个就行,

            new webpack.HotModuleReplacementPlugin(),//是每次只刷新改变的组件，完善hot
            // new webpack.NoEmitOnErrorsPlugin()       //NoEmitOnErrorsPlugin可以减少调试时候不必要的功能展示----webpack4以废弃
        ]
    })
}
else {
    config = merge(baseConfig, {
        entry: {
            app: path.join(__dirname, '../srcClient/index.js'),
            // vendor: ['vue']//单独打包vue文件
        },
        output: {
            filename: '[name].[chunkhash:8].js' //出口文件
        },
        module: {
            rules: [
                {
                    test: /\.styl/,
                    use: [
                        process.env.NODE_ENV !== 'production' ? 'style-loader' : MiniCssExtractPlugin.loader,

                        'css-loader',
                        {
                            loader: 'postcss-loader',
                            options: {
                                sourceMap: true
                            }
                        },
                        'stylus-loader'
                    ]
                    // use: ExtractPlugin.extract({
                    //     fallback: 'style-loader',
                    //     use: [
                    //         'css-loader',
                    //         {
                    //             loader: 'postcss-loader',
                    //             options: {
                    //                 sourceMap: true
                    //             }
                    //         },
                    //         'stylus-loader'
                    //     ]
                    // })
                }
            ]
        },
        optimization: {//webpack4---打包配置再此处
            splitChunks: {
                chunks: 'all'
            },
            runtimeChunk: true
        },
        plugins: [
            new cleanWebpackPlugin(),   //删除生成的目录文件dist和 package.json文件中的rimraf功能相同
            // new ExtractPlugin('styles.[contentHash:8].css'),
            new MiniCssExtractPlugin({
                filename: 'style.[contentHash:8].css'
            })
            //webpack4升级这部分废弃，采用optimization
            // //注意vendor放在runtime前面
            // new webpack.optimize.CommonsChunkPlugin({
            //     name: 'vendor',
            //     minChunks: Infinity   //告诉webpack我们的vendor真的只想包含我们声明的内容
            // }),
            // //单独打包webpack部分代码
            // new webpack.optimize.CommonsChunkPlugin({
            //     name: 'runtime'
            // })
        ]
    })
}

module.exports = config;