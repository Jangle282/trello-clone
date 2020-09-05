export function retrieve(context) {
    axios
        .get("/cards")
        .then(response => {
        })
        .catch(error => {
            console.log("error retrieving cards", error);
        });
}

export function store(context, payload) {
    axios
        .post("/cards", payload)
        .then(response => {
            context.dispatch('column/retrieve',  null, {root:true})
        })
        .catch(error => {
            console.log("error storing card", error);
        });
}

export function destroy(context, payload) {
    axios
        .delete(`/cards/${payload}`)
        .then(() => {
            context.dispatch('column/retrieve',  null, {root:true})
        })
        .catch(err => {
            console.log("error deleting card", err);
        });
}

export function update(context, payload) {
    console.log("payloud", payload)
    axios
        .put(`cards/${payload.id}`, payload)
        .then(response => {
            context.dispatch('column/retrieve',  null, {root:true})
        })
        .catch(err => {
            console.log("error updating card", err);
        });
}

export function saveCardOrder(context, payload) {
    // send a set of cards and a column id to reorder a column
    // context.commit('SET_UPDATE_ORDER_PROGRESS', true)
    // const data = {
    //     columns: context.state.columns[].cards
    // }
    // axios.post('/columns/order', data).then((response) => {
    //     context.commit('SET_UPDATE_ORDER_PROGRESS', false)
    //     context.dispatch('retrieve')
    // }).catch((error) => {
    //     console.log("error updating column order", error)
    // })
}


