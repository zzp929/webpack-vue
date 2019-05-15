import Vue from 'vue'

const app = new Vue({
    el: "#root",
    template: '<div>{{text}}</div>',
    data: {
        text: 0
    },

    //vue实例创建前后执行 --------------没有vue实例
    beforeCreate() {
        console.log(this.$el, 'beforeCreate');
    },
    created() {
        console.log(this.$el, 'created');
    },

    //挂载dom节点，渲染数据前后执行
    beforeMount() {//-----vue实例是根节点
        console.log(this.$el, 'beforeMount');
    },
    mounted() {//-----vue实例是template,<div>{{text}}</div>
        console.log(this.$el, 'mounted');
    },

    //数据更新前后执行
    beforeUpdate() {
        console.log(this, 'beforeUpdate');
    },
    updated() {
        console.log(this, 'updated');
    },
    //在组件章节会涉及到  和keep-alive有关
    activated() {
        console.log(this, 'activated');
    },
    deactivated() {
        console.log(this, 'deactivated');
    },

    //销毁前后执行
    beforeDestroy() {
        console.log(this, 'beforeDestroy');
    },
    destroyed() {
        console.log(this, 'destroyed');
    },

    render(h) {
        // throw new TypeError('render error')
        throw  new TypeError('render error')
        // console.log('render function invoked')
        // return h('div', {}, this.text)
    },
    renderError(h, err) {//开发的时候可以用，正式环境打包上线不会调用
        //只能捕获本组件的报错，调用的组件报错不会捕获
        return h('div', {}, err.stack)
    },
    errorCaptured() {
        //可以搜集线上的错误
        // 和renderError的区别就是会向上冒泡捕获信息，并且正式环境可以使用
    }
})


// setInterval(() => {
//     app.text++
// }, 1000)