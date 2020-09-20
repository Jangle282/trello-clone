import {
    store,
    destroy,
    update,
    storeNewCardOrder
} from '../../api/card';

const types = {
    CHANGE_DRAG_STATUS: 'CHANGE_DRAG_STATUS',
    SET_DRAGGED_CARD: 'SET_DRAGGED_CARD',
    SET_DRAG_TARGET: 'SET_DRAG_TARGET',
    SET_UPDATE_ORDER_PROGRESS: 'SET_UPDATE_ORDER_PROGRESS',
    CHANGE_DRAG_OVER_STATUS: 'CHANGE_DRAG_OVER_STATUS'
}


const state = {
    dragStatus: false,
    draggedCard: null,
    dragTarget: null,
    orderUpdateInProgress: false,
    dragOverStatus: false
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
    [types.SET_UPDATE_ORDER_PROGRESS](state, payload) {
        state.orderUpdateInProgress = payload
    },
    [types.CHANGE_DRAG_OVER_STATUS](state, payload) {
        state.dragOverStatus = payload
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
    },
    dragOverStatus() {
        return state.dragOverStatus
    }
}

const actions = {
    store,
    destroy,
    update,
    storeNewCardOrder,
    dragStart(context, payload) {
        context.commit('CHANGE_DRAG_STATUS', true)
        context.commit('SET_DRAGGED_CARD', payload)
    },
    dragEnter(context, payload) {
        context.commit('CHANGE_DRAG_OVER_STATUS', true)
        context.commit('SET_DRAG_TARGET', payload)
    },
    dragLeave(context) {
        context.commit('CHANGE_DRAG_OVER_STATUS', false)
        context.commit('SET_DRAG_TARGET', null)
    },
    dragDrop(context) {
        const dragTarget = state.dragTarget;
        const draggedCard = state.draggedCard;
        context.dispatch('column/spliceCard', {target: dragTarget, dragged: draggedCard}, {root:true})
        const draggedColumnIndex = context.rootState.column.columns.findIndex((col) => {
            return col.id === draggedCard.column_id;
        })
        const targetColumnIndex = context.rootState.column.columns.findIndex((col) => {
            return col.id === dragTarget.column_id;
        })
        context.dispatch('storeNewCardOrder', [draggedColumnIndex, targetColumnIndex])
    },
    dragEnd(context) {
        context.commit('CHANGE_DRAG_STATUS', false)
        context.commit('CHANGE_DRAG_OVER_STATUS', false)
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
