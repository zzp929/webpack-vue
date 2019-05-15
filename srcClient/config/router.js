import Router from 'vue-router'
import routes from './routes'

export default () => {
    return new Router({
        routes,
        mode: 'history',
        // base: '/base/',
        linkActiveClass: 'active-link',
        linkExactActiveClass: 'exact-active-link',  //修改当前选中路由加载的样式名字
        scrollBehavior(to, from, savedPosition) {//页面路由进行跳转，页面的滚动行为
            // to   要去的路径
            // from   来的路径
            // savedPosition   保存的路径
            if (savedPosition) {
                return savedPosition
            } else {
                return {x: 0, y: 0}
            }
        },
        // parseQuery() {
        //
        // },
        // stringifyQuery() {
        //
        // },
        fallback: true //当浏览器不支持 history.pushState 控制路由是否应该回退到 hash 模式。默认值为 true。
    })
}