<template>
    <div class="card-container">
        <div
            draggable="true"
            @dragstart="cardDragStart"
            @dragend="cardDragEnded"
            :class="[{'dragged-card' : cardIsDragged}, 'task-card']"
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
                <div @click="fireUpdateCard" class>save</div>
                <div @click="emitDeleteCard" class>delete</div>
            </div>
        </div>

        <div v-if="openCardMenu" @click="toggleOpenCardMenu" class="open-card-menu-overlay"></div>

        <div
            :class="[{ 'expand-drag-zone' : expandDragZone}, 'drag-zone' ]"
            @dragenter="cardDragEnter"
            @dragover="cardDragOver"
            @dragleave="cardDragLeave"
            @drop="cardDragDrop"
        ></div>
    </div>
</template>

<script>
export default {
    name: "Card",
    props: {
        cardData: Object
    },
    data() {
        return {
            card: {
                type: Object,
                required: false
            },
            openCardMenu: false,
            cardIsDragged: false,
            expandDragZone: false
        };
    },

    mounted() {
        this.setEventListeners();
        this.setInitialstate();
    },

    methods: {
        setEventListeners() {
            this.$on("draggedCardEnteredDragZone", this.expandDragZoneHeight);
            this.$on("draggedCardLeftDragZone", this.collapseDragZoneHeight);
        },
        // state management
        setInitialstate() {
            this.card = this.cardData;
        },

        toggleOpenCardMenu() {
            this.openCardMenu = !this.openCardMenu;
        },

        expandDragZoneHeight() {
            this.expandDragZone = true;
        },

        collapseDragZoneHeight() {
            this.expandDragZone = false;
        },

        // emit CRUD events
        emitDeleteCard() {
            this.$emit("cardDeleted", this.card);
        },

        fireUpdateCard() {
            axios
                .put(`cards/${this.card.id}`, this.card)
                .then(response => {
                    this.$emit("updateCards");
                })
                .catch(err => {
                    console.log(err);
                });
        },

        // drag methods for dragged card
        cardDragStart(event) {
            // puts card data in the drag event. Sets drag style on the selected card
            const draggedCardId = this.card.id;
            const draggedCardColId = this.card.column_id;
            event.dataTransfer.setData(
                "text/plain",
                `${draggedCardId},${draggedCardColId},${this.card.name}`
            );
            event.dataTransfer.effectAllowed = "move";
            this.cardIsDragged = true;
        },

        cardDragEnded(event) {
            // fired by dragged card to by the original column when dropped elsewhere.
            console.log("carddragend", event.dataTransfer.dropEffect !== "none");
            this.cardIsDragged = false;
            if (event.dataTransfer.dropEffect !== "none") {
                console.log("emmtted dragend evet", this.card);
                this.$emit("removedDraggedCard", this.card);
            }
        },

        // drag methods for receiving card drag zone
        cardDragOver(event) {
            // fired when the dragged card is over a receptive div i think i can remove this...
            event.preventDefault();
            event.dataTransfer.dropEffect = "move";
        },

        cardDragEnter() {
            // fired when a dragged card enters a drag zone - expands the drag zone
            event.preventDefault();
            event.dataTransfer.dropEffect = "move";
            this.$emit("draggedCardEnteredDragZone", this.card.id);
        },

        cardDragLeave() {
            // fired when a dragged card leaves a drag zone - collapses the drag zone div
            event.preventDefault();
            event.dataTransfer.dropEffect = "move";
            this.$emit("draggedCardLeftDragZone");
        },

        cardDragDrop(event) {
            // when cursor is relased over the div
            // retreives data about the card from the event
            //
            console.log(
                "drop",
                event.dataTransfer.getData("text/plain").split(",")[0] * 1
            );
            event.preventDefault();
            const cardDragData = {
                draggedCardId:
                    event.dataTransfer.getData("text/plain").split(",")[0] * 1,
                draggedCardColId:
                    event.dataTransfer.getData("text/plain").split(",")[1] * 1,
                draggedCardName: event.dataTransfer.getData("text/plain").split(",")[2],
                dropZoneCardId: this.card.id,
                dropZoneColId: this.card.column_id,
                dropZoneColOrder: this.card.column_order
            };
            // emit to column the card data to be added/changed in the receiving column
            this.$emit("cardDropped", cardDragData);
            // collapse drag zone
            this.$emit("draggedCardLeftDragZone");
        }
    }
};
</script>

<style>
</style>
