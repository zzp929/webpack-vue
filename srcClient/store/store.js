import Vuex from 'vuex'
import defaultState from './state/state' //数据仓库
import mutations from './mutations/mutations' // 修改数据
import getters from './getters/getters' // 获取数据
import createLogger from 'vuex/dist/logger'

const isDev = process.env.NODE_ENV === 'development'
export default () => {
    return new Vuex.Store({
        strict: isDev,//开发配置，可以限制修改vuex中state的方式，规范代码
        state: defaultState,
        mutations,
        getters,
        plugins: isDev ? [createLogger()] : []// 开发环境下显示vuex的状态修改
    });

}