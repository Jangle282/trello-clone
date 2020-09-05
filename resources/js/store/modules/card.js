import {
    store,
    destroy,
    update,
    saveCardOrder
} from '../../api/card'

const types = {
    CHANGE_DRAG_STATUS: 'CHANGE_DRAG_STATUS',
    SET_DRAGGED_CARD: 'SET_DRAGGED_CARD',
    SET_DRAG_TARGET: 'SET_DRAG_TARGET',
    ORDER_CARDS: 'ORDER_CARDS',
    REORDER_CARDS: 'REORDER_CARDS',
    SET_UPDATE_ORDER_PROGRESS: 'SET_UPDATE_ORDER_PROGRESS'
}


const state = {
    dragStatus: false,
    draggedCard: null,
    dragTarget: null,
    orderUpdateInProgress: false
}

const mutations = {
    [types.CHANGE_DRAG_STATUS](state, payload) {
        state.dragStatus = payload
    },
    [types.SET_DRAGGED_CARD](state, payload) {
        state.draggedCard = payload
    },
    [types.SET_DRAG_TARGET](state, payload) {
        state.dragTarget = payload
    },
    [types.ORDER_CARDS](state) {
        // state.columns = state.columns.sort((a, b) => {
        //     return a.column_order - b.column_order;
        // });
    },
    [types.REORDER_CARDS](state) {
        // const targetIndex = state.columns.findIndex((col) => {
        //     return col.id === state.dragTarget.id
        // })
        // const draggedIndex = state.columns.findIndex((col) => {
        //     return col.id === state.draggedColumn.id
        // })
        // state.columns.splice(targetIndex, 0, state.columns.splice(draggedIndex, 1)[0])
    },
    [types.SET_UPDATE_ORDER_PROGRESS](state, payload) {
        state.orderUpdateInProgress = payload
    }
}

const getters = {
    getCards: (state) => {
        return state.cards
    },
    dragStatus() {
        return state.dragStatus
    },
    draggedCardId() {
        return state.draggedCard ? state.draggedCard.id : null
    },
    dragTargetId() {
        return state.dragTarget ? state.dragTarget.id : null
    }
}

const actions = {
    store,
    destroy,
    update,
    dropCard(context) {
        // reorder cards in vuex - splice it out of one and into another.

        // dispatch backend changes for affected columns


        // if one of the backend changes is already in prcess. cancel and put it back where it came from.
    },
    dragStart(context, payload) {
        context.commit('CHANGE_DRAG_STATUS', true)
        context.commit('SET_DRAGGED_CARD', payload)
    },
    dragEnter(context, payload) {
        if (payload.id !== state.draggedCard.id) {
            context.commit('SET_DRAG_TARGET', payload)
        }
    },
    dragEnd(context) {
        context.commit('CHANGE_DRAG_STATUS', false)
        context.commit('SET_DRAGGED_CARD', null)
        context.commit('SET_DRAG_TARGET', null)
    },
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
};
