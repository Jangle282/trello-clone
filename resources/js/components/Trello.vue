<template>
    <div class="pageContainer">
        <TopBar/>
        <div class="mainContainer">
            <div class="board">
                <Column
                    v-for="column in this.columns"
                    :key="column.id"
                    v-bind:cards="cards"
                    v-bind:colIdForOpenAddCard="colIdForOpenAddCard"
                    v-bind:column="column"
                    v-on:toggleAddCards="toggleAddCards"
                    @newCardCreated="newCard"
                    @cardDeleted="deleteCard"
                    @colDeleted="deleteColumn"
                    @updateCards="getCards"
                />

                <div class="column">
                    <div v-if="colFormOpen" class="addColForm">
                        <input
                            v-model="newColData.name"
                            type="text"
                            name="title"
                            id="title"
                            ref="colTitle"
                            @keyup.enter="fireCreateColumn"
                        />
                        <div @click="fireCreateColumn">Add</div>
                        <div @click="toggleColForm">X</div>
                    </div>
                    <div v-else class="column-header">
                        <div @click="toggleColForm" class="column-title-container">
                            <h6>Add a Column</h6>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import TopBar from "./TopBar";
import Column from "./Column";

export default {
    name: "Trello",

    components: {
        TopBar,
        Column
    },

    data() {
        return {
            columns: null,
            cards: null,
            colIdForOpenAddCard: null,
            colFormOpen: false,
            newColData: {
                name: ""
            }
        };
    },

    created() {
        this.getCards();
        this.getColumns();
    },

    methods: {
        // AXIOS methods
        getCards() {
            axios.get("/cards").then(response => {
                this.cards = response.data;
                console.log("cards updated");
            });
        },

        getColumns() {
            axios.get("/columns").then(response => {
                this.columns = response.data;
            });
        },

        fireCreateColumn() {
            const newColumn = this.newColData;
            this.columns.push(newColumn);
            this.clearAddColForm();
            axios
                .post("/columns", newColumn)
                .then(response => {
                    this.getColumns();
                })
                .catch(error => {
                    console.log("error in when creating new column");
                });
            this.colFormOpen = false;
        },

        // state management
        toggleAddCards(colId) {
            this.colIdForOpenAddCard = colId;
        },

        toggleColForm() {
            this.colFormOpen = !this.colFormOpen;
            this.$nextTick(() => {
                this.$refs.colTitle.focus();
            });
        },

        newCard(newCardData) {
            this.cards.push(newCardData);
            // this.getCards();
        },

        clearAddColForm() {
            this.newColData = {
                name: ""
            };
        },

        deleteCard(data) {
            this.cards = this.cards.filter(card => {
                return card.id !== data.id;
            });
        },

        deleteColumn(colId) {
            this.columns = this.columns.filter(col => {
                return col.id !== colId;
            });
        }
    }
};
</script>

<style lang="scss">
@import "../../sass/app.scss";
</style>
