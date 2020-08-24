<template>
    <div class="column">
        <div class="column-header">
            <div v-if="editTitleOpen" class="edit-title-open, column-title-container">
                <input
                    v-model="column.name"
                    @keyup.enter="saveColTitle"
                    ref="colTitle"/>
            </div>

            <div
                v-else
                @click="openEditTitle"
                class="column-title-container"
            >
                <h6>{{ column.name || "add a column" }}</h6>
            </div>

            <div
                class="delete-button"
                @click="deleteColumn"
            >
                <div>X</div>
            </div>
        </div>

        <div class="cardList">
            <Card
                v-for="card in filteredCards"
                :key="card.id"
                :cardData="card"
                @cardDropped="cardDropped"
                @removedDraggedCard="cardRemovedByDrag"
            />
        </div>

        <div v-if="addCardFormOpen" class="add-card-form">
            <input
                v-model="newCardData.name"
                type="text"
                name="title"
                id="title"
                ref="cardTitle"
                @keyup.enter="storeCard"
            />
            <div @click="storeCard">Add</div>
            <div @click="toggleAddCardForm">X</div>
            <div>...</div>
        </div>

        <div
            v-else
            class="add-card-form"
            @click="toggleAddCardForm"
        >Add a Card
        </div>
    </div>
</template>

<script>
import Card from "./Card";
import {mapGetters} from "vuex";

export default {
    name: "Column",
    components: {Card},

    props: {
        column: {
            name: String,
            id: Number
        },
    },

    data() {
        return {
            filteredCards: () => {
                return [
                    {
                        name: "",
                        id: 0,
                        description: "",
                        column_id: 0,
                        column_order: 0
                    }
                ];
            },
            newCardData: {
                name: "",
                column_id: this.column.id,
                description: "",
                column_order: 1
            },
            editTitleOpen: false,
            cardIsDragged: Number,
            droppedInSameColumn: false,
            addCardFormOpen: false
        };
    },
    computed: {
        ...mapGetters({
            cards: 'card/getCards'
        })
    },

    watch: {
        cards() {
            this.filterCards();
        }
    },

    created() {
        if (this.cards) this.filterCards();
    },

    mounted() {
        // this.setEventListeners();
    },

    methods: {
        // setEventListeners() {
        //   this.$on("removedDraggedCard", this.cardRemovedByDrag);
        // },

        filterCards() {
            this.filteredCards = this.cards
                .filter(card => {
                    return card.column_id === this.$props.column.id;
                })
                .sort((a, b) => a.column_order - b.column_order);
        },

        saveColTitle() {
            this.editTitleOpen = false;
            this.updateColumn();
        },

        updateColumn() {
            this.$store.dispatch('column/update', this.column)
        },

        deleteColumn() {
            if (confirm("Are you sure you want to delete this list?")) {
                this.$store.dispatch('column/destroy', this.column.id)
            }
        },

        openEditTitle() {
            this.editTitleOpen = true;
            this.focusInput("colTitle");
        },

        storeCard() {
            const newCard = this.newCardData;
            newCard.column_order = this.filteredCards.length
                ? this.filteredCards[this.filteredCards.length - 1].column_order + 1
                : 1;
            this.$store.dispatch('card/addCard', newCard)
            this.resetAddCardValues();
        },

        resetAddCardValues() {
            this.newCardData = {
                name: "",
                description: "",
                column_id: this.column.id
            };
        },

        toggleAddCardForm() {
            this.addCardFormOpen = !this.addCardFormOpen
            this.focusInput()
        },

        focusInput(ref) {
            if (ref === "colTitle") {
                this.$nextTick(() => {
                    this.$refs[ref].focus();
                });
            } else {
                this.$nextTick(() => {
                    this.$refs.cardTitle.focus();
                });
            }
        },

        cardDropped(cardDragData) {
            // event emmitted by the dragzone div, received by target column.
            // adds the dropped card data to the receiving column
            const nextCardInColumn =
                this.filteredCards.find(
                    card => card.column_order > cardDragData.dropZoneColOrder
                ) || null;

            const droppedCardNewColOrder =
                nextCardInColumn !== null
                    ? cardDragData.dropZoneColOrder +
                    (nextCardInColumn.column_order - cardDragData.dropZoneColOrder) / 2
                    : cardDragData.dropZoneColOrder + 0.1;

            const droppedCard = {
                name: cardDragData.draggedCardName,
                id: cardDragData.draggedCardId,
                column_id: this.column.id,
                column_order: droppedCardNewColOrder,
            };

            // if card is dropped within the same column, just update it's column order
            if (this.column.id === cardDragData.draggedCardColId) {
                this.droppedInSameColumn = true;
                const cardIndex = this.filteredCards.findIndex(
                    card => card.id === cardDragData.draggedCardId
                );
                this.filteredCards[cardIndex].column_order = droppedCardNewColOrder;
                this.filterCards();
            } else {
                // otherwise splice card into the column in the dropzone
                // it will be removed from the column of origin via dragend event.
                const dropZoneColIndex = this.filteredCards.findIndex(
                    card => card.id === cardDragData.dropZoneCardId
                );
                this.filteredCards.splice(dropZoneColIndex + 1, 0, droppedCard);
            }
            this.$store.dispatch('card/update', droppedCard)
        },

        cardRemovedByDrag(cardData) {
            if (!this.droppedInSameColumn) {
                console.log("dropped in dfferent col", this.droppedInSameColumn);
                const cardIndex = this.filteredCards.findIndex(
                    card => card.id === cardData.id
                );
                this.filteredCards.splice(cardIndex, 1);
            } else {
                this.droppedInSameColumn = false;
            }
        },
    }
};
</script>


<style>
</style>


