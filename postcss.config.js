const autoPreFixer = require('autoprefixer');

module.exports = {
    plugins: [
        autoPreFixer()   //postcss是后处理css.   需要auto-prefixer优化css代码。添加兼容性代码等
    ]
}