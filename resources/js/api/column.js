export function retrieve(context) {
    axios
        .get("/columns")
        .then(response => {
            context.commit('SET_COLUMNS', response.data)
        })
        .catch((err) => {
            console.log('error when retrieving columns', err)
        });
}

export function store(context, payload) {
    axios
        .post("/columns", payload)
        .then(() => {
            context.dispatch('retrieve')
        })
        .catch(error => {
            console.log("error when creating new column", error);
        });
}

export function destroy(context, payload) {
    axios
        .post(`/columns/${payload}`)
        .then(response => {
            context.commit('REMOVE_COLUMN', payload)
        })
        .catch(err => {
            console.log("error deleting column", err);
        });
}

export function update(context, payload) {
    axios
        .put(`/columns/${payload.id}`, payload)
        .then(() => {
            context.dispatch('retrieve')
        })
        .catch(err => {
            console.log("error updating column", err);
        });
}


