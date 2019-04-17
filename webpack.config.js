const path = require('path');    //定义绝对路径
const HtmlPlugins = require('html-webpack-plugin');
const webpack = require('webpack');
const ExtractPlugin = require('extract-text-webpack-plugin')//把非js代码单独打包出来

const isDEV = process.env.NODE_ENV === 'development';   //判断命令的env是什么；由于装了cross-env 所以mac windows适配

const {VueLoaderPlugin} = require('vue-loader');
const config = {
    target: "web",    // 指定webpack的编译目标是web平台
    entry: path.join(__dirname, 'src/index.js'),   //入口文件  定义__dirname路径，join-拼接对路径
    output: {
        filename: 'bundle.[hash:8].js', //出口文件
        path: path.join(__dirname, 'dist') //输出路径
    },
    resolve: {
        extensions: ['.js', '.jsx', '.vue', '.json'],//配置此处，在import文件时可以省略后缀名，在匹配上有先后顺序
    },
    module: {
        rules: [
            {
                test: /\.vue$/,       //正则，验证如果是vue文件
                loader: 'vue-loader' //用vue-loader打包
            },
            {
                test: /\.jsx$/,
                loader: 'babel-loader'
            },

            //使用的stylus没有引用css文件，所以不需要此配合

            // {
            //     test: /.css$/,
            //     // loader: 'style-loader!css-loader'  //同use使用方法一样
            //     use: [          //use就是loader 接收的是数组
            //         'style-loader',
            //         'css-loader'
            //     ]
            // },
            {
                test: /\.(gif|jpg|png|jpeg|svg)$/,
                use: [
                    {
                        loader: "url-loader",   //把图片转成base64的js代码---减少http请求
                        options: {         //配置：小于1024KB的转成js代码
                            limit: 1024,
                            name: '[name].[ext]'    //输出文件名字
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        //把各种东西打包成html的出口文件
        //webpack在编译过程中以及在页面上自己写的js代码判断当前环境可以引用到
        new webpack.DefinePlugin({       //vue react时必须用的
            'process.env': {
                NODE_ENV: isDEV ? '"development"' : '"production"'
            }
        }),
        new HtmlPlugins(),       //正常情况用这一个就行,
        new VueLoaderPlugin()     ////Vue-loader在15.*之后的版本都是 vue-loader的使用都是需要伴生 VueLoaderPlugin的,
    ]
};

// 两个环境都需要webpack，判断环境
if (isDEV) {
    config.module.rules.push({
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
    });
    config.devtool = '#cheap-module-eval-source-map';    //把编译完的代码映射成能看懂的js 供调试
    config.devServer = {
        port: '8000',
        host: '0.0.0.0',    //可以通过本机内网访问,也可以通过本机IP访问
        overlay: {
            errors: true,        //让错误显示在网页上
        },
        hot: true,     //每次修改重新加载全部
    }
    config.plugins.push(
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
        //HotModuleReplacementPlugin功能是每次只刷新改变的组件，完善hot、    NoEmitOnErrorsPlugin可以减少调试时候不必要的功能展示
    )
} else {
    config.entry = {
        app: path.join(__dirname, 'src/index.js'),
        vendor: ['vue']//单独打包vue文件
    }
    config.output.filename = '[name].[chunkhash:8].js'; //出口文件
    config.module.rules.push({
        test: /\.styl/,
        use: ExtractPlugin.extract({
            fallback: 'style-loader',
            use: [
                'css-loader',
                {
                    loader: 'postcss-loader',
                    options: {
                        sourceMap: true
                    }
                },
                'stylus-loader'
            ]
        })
    })
    config.plugins.push(
        new ExtractPlugin('styles.[contentHash:8].css'),

        //注意vendor放在runtime前面
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor'
        }),

        //单独打包webpack部分代码
        new webpack.optimize.CommonsChunkPlugin({
            name: 'runtime'
        })
    )
}

module.exports = config;