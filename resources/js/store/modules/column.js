import {
    retrieve,
    store,
    destroy,
    update
} from '../../api/column'

const state = {
    columns: []
}

const types = {
    SET_COLUMNS: 'SET_COLUMNS',
    ADD_COLUMN: 'ADD_COLUMN',
    REMOVE_COLUMN: 'REMOVE_COLUMN'
}

const mutations = {
    [types.SET_COLUMNS](state, payload) {
        state.columns = payload
    },
    [types.ADD_COLUMN](state, payload) {
        state.columns.push(payload)
    },
    [types.REMOVE_COLUMN](state, payload) {
        state.columns = state.columns.filter(col => {
            return col.id !== payload
        })
    }
}

const getters = {
    getColumns(state) {
        return state.columns
    }

}

const actions = {
    retrieve,
    store,
    destroy,
    update,
    addColumn(context, payload) {
        context.commit('ADD_COLUMN', payload)
        context.dispatch('store', payload)
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
};
