// 对应的调用方法是  this.$store.dispatch()
export default {
    updateCountAsync(store, data) {
        setTimeout(() => {
            store.commit('updateCount', data.num)
        }, data.time)
    }
}