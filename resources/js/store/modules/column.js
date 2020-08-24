const state = {
    count: 1,
    test: "hello"
}

const mutations = {
    increment(state) {
        state.count++
    }
}

const getters = {
    doubleCount(state) {
        return state.count * 2
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    // actions,
    getters,
};
