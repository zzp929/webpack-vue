const path = require('path')
const {VueLoaderPlugin} = require('vue-loader')

module.exports = {
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
                        options:{
                            limit:1024,
                            name:'[name]-aaa.[ext]'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin()   //vue-loaderzai 15.*之后的版本使用都是需要伴生vueLoaderPlugin
    ],
}