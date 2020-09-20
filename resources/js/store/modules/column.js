import {
    retrieve,
    store,
    destroy,
    update,
    saveColumnOrder,
} from '../../api/column'

const state = {
    columns: [],
    dragStatus: false,
    draggedColumn: null,
    dragTarget: null,
    orderUpdateInProgress: false
}

const types = {
    SET_COLUMNS: 'SET_COLUMNS',
    ADD_COLUMN: 'ADD_COLUMN',
    REMOVE_COLUMN: 'REMOVE_COLUMN',
    CHANGE_DRAG_STATUS: 'CHANGE_DRAG_STATUS',
    SET_DRAGGED_COLUMN: 'SET_DRAGGED_COLUMN',
    SET_DRAG_TARGET: 'SET_DRAG_TARGET',
    ORDER_COLUMNS: 'ORDER_COLUMNS',
    REORDER_COLUMNS: 'REORDER_COLUMNS',
    SET_UPDATE_ORDER_PROGRESS: 'SET_UPDATE_ORDER_PROGRESS',
    SPLICE_CARD: 'SPLICE_CARD',
    APPEND_CARD: 'APPEND_CARD',
    REMOVE_CARD: 'REMOVE_CARD'
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
    },
    [types.CHANGE_DRAG_STATUS](state, payload) {
        state.dragStatus = payload
    },
    [types.SET_DRAGGED_COLUMN](state, payload) {
        state.draggedColumn = payload
    },
    [types.SET_DRAG_TARGET](state, payload) {
        state.dragTarget = payload
    },
    [types.ORDER_COLUMNS](state) {
        state.columns = state.columns.sort((a, b) => {
            return a.column_order - b.column_order;
        });
        state.columns.forEach(col => {
            col.cards.sort((a,b) => {
                return a.column_order - b.column_order
            })
        })
    },
    [types.REORDER_COLUMNS](state) {
        const targetIndex = state.columns.findIndex((col) => {
            return col.id === state.dragTarget.id
        })
        const draggedIndex = state.columns.findIndex((col) => {
            return col.id === state.draggedColumn.id
        })
        state.columns.splice(targetIndex, 0, state.columns.splice(draggedIndex, 1)[0])
    },
    [types.SET_UPDATE_ORDER_PROGRESS](state, payload) {
        state.orderUpdateInProgress = payload
    },
    [types.APPEND_CARD](state, payload) {
        const columnIndex = state.columns.findIndex((col) => {
            return col.id === payload.column_id;
        })
        state.columns[columnIndex].cards.push(payload)
    },
    [types.SPLICE_CARD](state, payload) {
        const draggedColumnIndex = state.columns.findIndex((col) => {
            return col.id === payload.dragged.column_id;
        })
        const draggedCardIndex = state.columns[draggedColumnIndex].cards.findIndex((card) => {
            return card.id === payload.dragged.id
        })
        const targetColumnIndex = state.columns.findIndex((col) => {
            return col.id === payload.target.column_id;
        })
        const targetCardIndex = state.columns[targetColumnIndex].cards.findIndex((card) => {
            return card.id === payload.target.id
        })

        state.columns[draggedColumnIndex].cards.splice(draggedCardIndex, 1);

        state.columns[targetColumnIndex].cards.splice(targetCardIndex+1, 0, payload.dragged)
    },
    [types.REMOVE_CARD](state, payload) {
        const columnIndex = state.columns.findIndex((col) => {
            return col.id === payload.column_id;
        })
        const cardIndex = state.columns[columnIndex].cards.findIndex((card) => {
            return card.id === payload.id
        })
        state.columns[columnIndex].cards.splice(cardIndex, 1);
    }
}

const getters = {
    getColumns(state) {
        return state.columns
    },
    dragStatus() {
        return state.dragStatus
    },
    draggedColumnId() {
        return state.draggedColumn ? state.draggedColumn.id : null
    },
    dragTargetId() {
        return state.dragTarget ? state.dragTarget.id : null
    }
}

const actions = {
    retrieve,
    store,
    destroy,
    update,
    saveColumnOrder,
    orderColumns(context) {
        context.commit('ORDER_COLUMNS')
    },
    addColumn(context, payload) {
        context.commit('ADD_COLUMN', payload)
        context.dispatch('store', payload)
    },
    dragStart(context, payload) {
        context.commit('CHANGE_DRAG_STATUS', true)
        context.commit('SET_DRAGGED_COLUMN', payload)
    },
    dragEnter(context, payload) {
        if (payload.id !== state.draggedColumn.id) {
            context.commit('SET_DRAG_TARGET', payload)
            context.commit('REORDER_COLUMNS', false)
        }
    },
    dragEnd(context) {
        context.commit('CHANGE_DRAG_STATUS', false)
        context.commit('SET_DRAGGED_COLUMN', null)
        context.commit('SET_DRAG_TARGET', null)
        if (state.orderUpdateInProgress === false) {
            context.commit('ORDER_COLUMNS')
        }
    },
    appendCard(context, payload) {
        context.commit('APPEND_CARD', payload)
        context.dispatch('card/store', payload, {root:true})
    },
    spliceCard(context, payload) {
        context.commit('SPLICE_CARD', payload)
    },
    destroyCard(context, payload) {
        context.commit('REMOVE_CARD', payload)
        context.dispatch('card/destroy', payload.id, {root:true})
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
};
