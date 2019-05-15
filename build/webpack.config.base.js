const path = require('path');    //定义绝对路径
const {VueLoaderPlugin} = require('vue-loader');

const config = {
    mode: process.env.NODE_ENV || 'production',  //webpack4,指定环境配置会按需加载配置
    target: "web",    // 指定webpack的编译目标是web平台
    entry: path.join(__dirname, '../srcClient/index.js'),   //入口文件  定义__dirname路径，join-绝对路径
    output: {
        filename: 'bundle.[hash:8].js', //出口文件
        path: path.join(__dirname, '../dist'), //输出路径
        publicPath: "/"
    },
    resolve: {
        alias: {//路径别名
        },
        extensions: ['.js', '.jsx', '.vue', '.json'],//配置此处，在import文件时可以省略后缀名，在匹配上有先后顺序
    },
    module: {
        rules: [
            // {
            //     test: /\.(vue|js|jsx)$/,
            //     loader: "eslint-loader",
            //     exclude: /node_modules/,
            //     enforce: 'pre'
            // },
            {
                test: /\.vue$/,       //正则，验证如果是vue文件
                loader: 'vue-loader', //用vue-loader打包
                // options: createVueLoaderOptions(isDEV)
            },
            {
                test: /\.jsx$/,
                loader: 'babel-loader'
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/  //js需要忽略掉node_modules里面的js文件,因为里面的文件已经编译过了
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
                            // name: '[name].[hash:8].[ext]'    //输出文件名字    hash冒号后面的数字表示hash值的长度
                            name: 'img/[name].[hash:7].[ext]'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin()     ////Vue-loader在15.*之后的版本都是 vue-loader的使用都是需要伴生 VueLoaderPlugin的,
    ]
};
module.exports = config;