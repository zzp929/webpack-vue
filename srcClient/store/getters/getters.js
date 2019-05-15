// 我们一般使用getters来获取state的状态，而不是直接使用state
export default {
    fullName(state) {
        return `${state.firstName} ${state.lastName}`
    }
}