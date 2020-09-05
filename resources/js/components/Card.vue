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
        <input v-model="card.name" />
        <textarea v-model="card.description" />
      </div>
      <div class="card-edit-btns">
        <div @click="updateCard" class>save</div>
        <div @click="deleteCard" class>delete</div>
      </div>
    </div>

    <div v-if="openCardMenu" @click="toggleOpenCardMenu" class="open-card-menu-overlay"></div>

    <div
      :class="[{ 'expand-drag-zone' : (dragTargetId === this.card.id)}, 'drag-zone' ]"
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

    // drag methods for dragged card
    cardDragStart() {
        console.log("start")
        this.$store.dispatch('card/dragStart', this.card)
      // puts card data in the drag event. Sets drag style on the selected card
      // const draggedCardId = this.card.id;
      // const draggedCardColId = this.card.column_id;
      // event.dataTransfer.setData(
      //   "text/plain",
      //   `${draggedCardId},${draggedCardColId},${this.card.name}`
      // );
      // event.dataTransfer.effectAllowed = "move";

    },

    cardDragEnded() {
        console.log("end")
        // this.$store.dispatch('card/dragEnd')
      // fired by dragged card to by the original column when dropped elsewhere.
      // console.log("carddragend", event.dataTransfer.dropEffect !== "none");
      // if (event.dataTransfer.dropEffect !== "none") {
      //   console.log("emmtted dragend evet", this.card);
      //   this.$emit("removedDraggedCard", this.card);
      // }
    },

    cardDragOver(event) {
        console.log("over")
        event.preventDefault()
      // fired when the dragged card is over a receptive div i think i can remove this...
      // event.preventDefault();
      // event.dataTransfer.dropEffect = "move";
    },

    cardDragEnter(event) {
        console.log("enter")
        event.preventDefault()
        this.$store.dispatch('card/dragEnter', this.card)
      // fired when a dragged card enters a drag zone - expands the drag zone
      // event.preventDefault();
      // event.dataTransfer.dropEffect = "move";
    },

    cardDragLeave() {
        console.log("leave")
      // fired when a dragged card leaves a drag zone - collapses the drag zone div
      // event.preventDefault();
      // event.dataTransfer.dropEffect = "move";
      // this.$emit("draggedCardLeftDragZone");
    },

    cardDragDrop() {
        console.log("drop")
        this.$store.dispatch("column/removeCard");
        this.$store.dispatch("column/addCard");
      // when cursor is relased over the div
      // retreives data about the card from the event
      //
      // console.log(
      //   "drop",
      //   event.dataTransfer.getData("text/plain").split(",")[0] * 1
      // );
      // event.preventDefault();
      // const cardDragData = {
      //   draggedCardId:
      //     event.dataTransfer.getData("text/plain").split(",")[0] * 1,
      //   draggedCardColId:
      //     event.dataTransfer.getData("text/plain").split(",")[1] * 1,
      //   draggedCardName: event.dataTransfer.getData("text/plain").split(",")[2],
      //   dropZoneCardId: this.card.id,
      //   dropZoneColId: this.card.column_id,
      //   dropZoneColOrder: this.card.column_order,
      // };
      // // emit to column the card data to be added/changed in the receiving column
      // this.$emit("cardDropped", cardDragData);
      // // collapse drag zone
      // this.$emit("draggedCardLeftDragZone");
    },
  },
};
</script>

<style>
</style>
