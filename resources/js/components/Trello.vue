<template>
    <div class="pageContainer">
        <TopBar/>
        <div class="mainContainer">
            <div class="board">
                <Column
                    v-for="column in columns"
                    :key="column.id"
                    :column="column"
                />

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
    </div>
</template>


<script>
import TopBar from "./TopBar";
import Column from "./Column";
import {mapGetters} from 'vuex';

export default {
    name: "Trello",

    components: {
        TopBar,
        Column
    },

    data() {
        return {
            colIdForOpenAddCard: null,
            colFormOpen: false,
            newColData: {
                name: ""
            }
        };
    },
    computed: {
        ...mapGetters({
            cards: 'card/getCards',
            columns: 'column/getColumns'
        })
    },

    mounted() {
        this.$store.dispatch('card/retrieve')
        this.$store.dispatch('column/retrieve')
    },

    methods: {
        storeColumn() {
            this.$store.dispatch('column/addColumn', this.newColData)
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
                name: ""
            };
        },

    }
};
</script>

<style lang="scss">
@import "../../sass/app.scss";
</style>
