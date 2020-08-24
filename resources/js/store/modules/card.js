import {
    retrieve,
    store,
    destroy,
    update
} from '../../api/card'

const types = {
    SET_CARDS: 'SET_CARDS',
    REMOVE_CARD: 'REMOVE_CARD',
    ADD_CARD: 'ADD_CARD'
}


const state = {
    cards: []
}

const mutations = {
    [types.SET_CARDS](state, payload) {
        state.cards = payload
    },
    [types.REMOVE_CARD](state, payload) {
        state.cards = state.cards.filter(card => {
            return card.id !== payload
        })
    },
    [types.ADD_CARD](state, payload) {
        state.cards.push(payload)
    }
}

const getters = {
    getCards: (state) => {
        return state.cards
    }
}

const actions = {
    retrieve,
    store,
    destroy,
    update,
    addCard(context, payload) {
        context.commit('ADD_CARD', payload)
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
