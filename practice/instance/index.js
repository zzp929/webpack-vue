import Vue from 'vue'

const app = new Vue({
    el: '#root',
    template: '<div ref="hahaha">this is content{{text}}</div>',
    data: {
        text: 0
    }
})

setInterval(() => {
    app.text++
}, 1000)

console.log(app);
// console.log(app.$data);
// console.log(app.$props);
// console.log(app.$el);
// console.log(app.$options);
// console.log(app.$root);
// console.log(app.$children);
// console.log(app.$slots);
// console.log(app.$scopedSlots);
// console.log(app.$refs);
// console.log(app.$isServer);

const unwatch = app.$watch('text', (newText, oldText) => {
    console.log(`${newText}:${oldText}`);
})
console.log(unwatch);
setTimeout(() => {
    unwatch()
}, 3000)


app.$on('text', (...arg) => {
    console.log(arg);
    console.log('text emited');
})
// $once 只会监听一次
app.$once('text', (...arg) => {
    console.log(arg);
    console.log('text emited');
})

app.$emit('text', 1, 2)

// app.$set({}, a, 1)    赋值
// app.$delete()         删除属性
// app.$forceUpdate      强制更新组件
// app.$nextTick         异步回调处理完就显示