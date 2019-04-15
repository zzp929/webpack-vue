const path = require('path')
const webpack = require('webpack')
const {VueLoaderPlugin} = require('vue-loader')
const isDev = process.env.NODE_ENV === 'development'
const HTMLWebpackPlugin = require('html-webpack-plugin')

const config = {
    target: 'web',
    entry: path.join(__dirname, 'src/index.js'),   //入口文件   定义__dirname路径，保证绝对路径
    output: {
        filename: 'bundle.js',//出口文件
        path: path.join(__dirname, 'dist')
    },
    // resolve: {
    //     extensions: ['.js', '.vue', '.json'],
    //     alias: {
    //         '@': resolve('src'),
    //         'common': resolve('src/common'),
    //         'components': resolve('src/components'),
    //         'store': resolve('src/store'),
    //     }
    // },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: "vue-loader"
            },
            {
                test: /\.css$/,
                // loader: 'style-loader!css-loader'  //同下
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.(gif|jpg|jpeg|png|svg)$/,
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            limit: 1024,
                            name: '[name]-abc.[ext]'
                        }
                    }
                ]
            },
            {
                test: /\.styl/,
                use: [
                    'style-loader',
                    'css-loader',
                    'stylus-loader'
                ]
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),  //vue-loaderzai 15.*之后的版本使用都是需要伴生vueLoaderPlugin
        new HTMLWebpackPlugin(),
        //webpack在编译过程中以及在页面上自己写的js代码判断当前环境可以引用到
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: isDev ? '"development"' : '"production"'
            }
        })
    ],
}

if (isDev) {
    config.devtool = '#cheap-module-eval-source-map'
    config.devServer = {
        port: 8000,
        host: '0.0.0.0',
        overlay: {
            errors: true
        },
        hot: true
    }
    config.plugins.push(
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    )
}

module.exports = config