module.exports = (isDev) => {
    return {
        preserveWhitepace: true,  //去除.vue文件template中的多余空格
        extractCSS: !isDev,         //将.vue文件中的css也单独打包出去，默认是false
        cssModules: {
            localIdentName: '[path]-[name]-[hash:base64:5]',
            camelCase: true
        },
        hotReload: isDev,          //禁止.vue文件进行热重载   重点在更新内容是否刷新页面，，配置成生产环境false
        loaders: {},
        preLoader: {},
        postLoader: {},
    }
}