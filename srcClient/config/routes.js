import login from '../views/login/login'
import Todo from '../views/todo/todo'

export default [
    {path: '/', redirect: '/login'},
    {
        path: '/login',
        component: login,
        name: 'login',
        meta: {
            title: '122',
            description: 'weq',
        },
    },
    {
        path: '/app',
        // path: '/app/:id',
        // props: true, //设置为true，可以直接在组件中通过有props获取参数，不用再通过this.$route.params
        props: (route) => {
            id:route.query.b
        },//尽量采用这种方式获取传递参数，少用this.$route，使组件解耦，增加复用性

        //以下两种写法实现路由懒加载，，import需要安装babel-plugin-syntax-dynamic-import插件，require不需要
        // component: () => import('../views/todo/todo'),
        component: resolve => require(['../views/todo/todo'], resolve),
        // components: {//这种情况对应组件内有多个router-view
        //     default: () => import('../views/todo/todo'),
        //     a: login
        // },
        name: 'app',
        children: [
            {
                path: 'test',
                component: login,
            }
        ],
        beforeEnter(to, from, next) {
            console.log('组件内 beforeEnter 守卫');
            next()
        },
    }
]