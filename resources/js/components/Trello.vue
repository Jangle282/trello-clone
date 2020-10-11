<template>
    <div :class="[{'no-scroll' : cardEditOverlayStatus },'pageContainer']">
        <TopBar/>
        <div class="mainContainer">
            <div class="board">
                <Column v-for="column in columns" :key="column.id" :column="column"/>

                <div class="column">
                    <div v-if="colFormOpen" class="addColForm">
                        <input
                            v-model="newColData.name"
                            type="text"
                            name="title"
                            id="title"
                            ref="colTitle"
                            @keyup.enter="storeColumn"
                        />
                        <div @click="storeColumn">Add</div>
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
        <div v-if="cardEditOverlayStatus" class="card-detail-overlay" @click.stop="closeEditCardOverlay">
            <div class="edit-card" @keyup.enter="updateCard" @click.stop="closeEditTitle">
                <div class="card-edit-title">
                    <h6 v-if="!editCardTitle" @click.stop="openEditCardTitle">{{editedCard.name}}"</h6>
                    <input
                        v-if="editCardTitle"
                        :placeholder="editedCard.name"
                        v-model="editedCard.name"
                        @keyup.enter="editCardTitle = false"
                    />
                    <span class="" @click="closeEditCardOverlay">X</span>
                </div>

                <div class="card-edit-description">
                    <h6>Description</h6>
                    <textarea
                        v-model="editedCard.description"
                        placeholder="Give a more detailed description..."
                    />
                </div>
                <div class="card-edit-buttons">
                    <div @click="updateCard" class="btn save-btn">Save</div>
                    <div @click="deleteCard" class="btn delete-btn">Delete</div>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import TopBar from "./TopBar";
import Column from "./Column";
import {mapGetters} from "vuex";

export default {
    name: "Trello",

    components: {
        TopBar,
        Column,
    },

    data() {
        return {
            colIdForOpenAddCard: null,
            colFormOpen: false,
            newColData: {
                name: "",
            },
            editCardTitle: false,
            editedCardPlaceholder: "",
        };
    },
    computed: {
        ...mapGetters({
            columns: "column/getColumns",
            cardEditOverlayStatus: "card/cardEditOverlayStatus",
            editedCard:'card/editedCard'
        }),
    },
    mounted() {
        this.$store.dispatch("column/retrieve");
    },

    methods: {
        openEditCardTitle() {
            this.editCardTitle = true
        },

        closeEditTitle() {
          if (this.editCardTitle) {
              this.editCardTitle = false
          }
        },

        closeEditCardOverlay() {
            if (this.cardEditOverlayStatus) {
                this.$store.dispatch("card/closeEditCardOverlay");
            }
        },

        deleteCard() {
            if (confirm("Are you sure you want to delete this card?")) {
                this.$store.dispatch("column/destroyCard", this.editedCard);
            }
        },

        updateCard() {
            this.$store.dispatch("card/update", this.editedCard);
        },

        storeColumn() {
            const colData = {
                name: this.newColData.name,
                column_order : this.columns ? this.columns.length : 0
            }
            this.$store.dispatch("column/addColumn", colData);
            this.clearAddColForm();
        },

        toggleColForm() {
            this.colFormOpen = !this.colFormOpen;
            this.$nextTick(() => {
                this.$refs.colTitle.focus();
            });
        },

        clearAddColForm() {
            this.newColData = {
                name: "",
            };
        },
    },
};
</script>

<style lang="scss">
@import "../../sass/app.scss";
</style>
