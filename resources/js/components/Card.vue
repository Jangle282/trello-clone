<template>
    <div class="card-container">
        <div
            draggable="true"
            @dragstart="cardDragStart"
            @dragend="cardDragEnded"
            :class="[{'dragged-card' : (draggedCardId === this.card.id)}, 'task-card']"
            id="task-card"
        >
            <p class="card-name">{{ card.name }}</p>

            <div class="ellipses" @click="toggleOpenCardMenu">
                <div class="dots">...</div>
            </div>
        </div>

        <div v-if="openCardMenu" class="card-detail-container task-card">
            <div class="card-edit-inputs">
                <input v-model="card.name"/>
                <textarea v-model="card.description"/>
            </div>
            <div class="card-edit-btns">
                <div @click="updateCard" class>save</div>
                <div @click="deleteCard" class>delete</div>
            </div>
        </div>

        <div v-if="openCardMenu" @click="toggleOpenCardMenu" class="open-card-menu-overlay"></div>

        <div
            :class="[{ 'expand-drag-zone' : (dragTargetId === card.id && cardIsOverTarget)}, 'drag-zone' ]"
            @dragenter="cardDragEnter"
            @dragover="cardDragOver"
            @dragleave="cardDragLeave"
            @drop="cardDragDrop"
        ></div>
    </div>
</template>

<script>
import {mapGetters} from 'vuex';

export default {
    name: "Card",
    props: {
        cardData: Object,
    },
    data() {
        return {
            card: {
                type: Object,
                required: false,
            },
            openCardMenu: false,
        };
    },
    computed: {
        ...mapGetters({
            cardIsDragged: 'card/dragStatus',
            cardIsOverTarget: 'card/dragOverStatus',
            draggedCardId: 'card/draggedCardId',
            dragTargetId: 'card/dragTargetId',
        })
    },

    mounted() {
        this.card = this.cardData;
    },

    methods: {
        toggleOpenCardMenu() {
            this.openCardMenu = !this.openCardMenu;
        },

        deleteCard() {
            if (confirm("Are you sure you want to delete this card?")) {
                this.$store.dispatch("column/destroyCard", this.card);
            }
        },

        updateCard() {
            this.$store.dispatch("card/update", this.card);
        },

        cardDragStart() {
            console.log("start")
            this.$store.dispatch('card/dragStart', this.card)
        },

        cardDragEnter(event) {
            console.log("enter")
            event.preventDefault()
            if (this.card.id !== this.draggedCardId) {
                this.$store.dispatch('card/dragEnter', this.card)
            }
        },

        cardDragOver(event) {
            console.log("over")
            event.preventDefault()
        },

        cardDragLeave() {
            console.log("leave")
            this.$store.dispatch('card/dragLeave')
        },

        cardDragDrop() {
            console.log("drop")
            this.$store.dispatch("card/dragDrop");
        },

        cardDragEnded() {
            console.log("end")
            this.$store.dispatch('card/dragEnd')
        },
    },
};
</script>

<style>
</style>
