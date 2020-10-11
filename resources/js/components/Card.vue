<template>
    <div class="card-container">
        <div
            draggable="true"
            @dragstart="cardDragStart"
            @dragend="cardDragEnded"
            :class="[{'dragged-card' : (draggedCardId === this.card.id)}, 'task-card']"
            id="task-card"
            @click="openEditCardOverlay"
        >
            <p class="card-name">{{ card.name }}</p>

            <div class="ellipses" @click="openEditCardOverlay">
                <div class="dots">...</div>
            </div>
        </div>

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
        };
    },
    computed: {
        ...mapGetters({
            cardIsDragged: 'card/dragStatus',
            cardIsOverTarget: 'card/dragOverStatus',
            draggedCardId: 'card/draggedCardId',
            dragTargetId: 'card/dragTargetId',
            cardEditOverlayStatus: "card/cardEditOverlayStatus",
        })
    },

    mounted() {
        this.card = this.cardData;
    },

    methods: {
        openEditCardOverlay() {
            if (!this.cardEditOverlayStatus) {
                this.$store.dispatch("card/openEditCardOverlay", {...this.card});
            }
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
