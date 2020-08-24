export function retrieve(context) {
    axios
        .get("/cards")
        .then(response => {
            context.commit('SET_CARDS', response.data)
        })
        .catch(error => {
            console.log("error retrieving cards", error);
        });
}

export function store(context, payload) {
    axios
        .post("/cards", payload)
        .then(response => {
            context.dispatch('retrieve')
        })
        .catch(error => {
            console.log("error storing card", error);
        });
}

export function destroy(context, payload) {
    axios
        .post(`/cards/${payload}`)
        .then(() => {
            context.commit('REMOVE_CARD', payload)
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
            context.dispatch('retrieve')
        })
        .catch(err => {
            console.log("error updating card", err);
        });
}





