<template>
  <div :class="{'dragged-card' : cardIsDragged}">
    <div
      draggable="true"
      @dragstart="cardDragStart"
      @dragend="cardDragEnded"
      @mouseover="showEllipses"
      @mouseleave="hideEllipses"
      class="task-card"
    >
      <p class="card-name">{{ card.name }}{{card.list_order}}</p>
      <div v-if="ellipses" class="ellipses" @click="toggleOpenCardMenu">...</div>
      <div v-if="openCardMenu">
        <div class="open-card-menu">
          <div @click="deleteCard" class="open-card-menu-item">delete</div>
          <div class="open-card-menu-item">edit</div>
        </div>
      </div>
    </div>
    <div
      class="drag-zone"
      @dragenter="cardDragEnter"
      @dragover="cardDragOver"
      @drop="cardDragDrop"
    >drag zone {{card.id}}</div>
  </div>
</template>

<script>
export default {
  name: "Card",
  props: {
    card: Object
  },
  data() {
    return {
      openCardMenu: false,
      ellipses: false,
      cardIsDragged: false
    };
  },
  methods: {
    toggleOpenCardMenu() {
      this.openCardMenu = !this.openCardMenu;
    },
    showEllipses() {
      this.ellipses = true;
    },
    hideEllipses() {
      this.ellipses = false;
    },
    deleteCard() {
      this.$emit("cardDeleted", this.card);
    },
    cardDragStart(event) {
      const draggedCardId = this.card.id;
      const draggedCardListId = this.card._list_id;
      event.dataTransfer.setData(
        "text/plain",
        `${draggedCardId},${draggedCardListId},${this.card.name}`
      );
      event.dataTransfer.effectAllowed = "move";
      this.cardIsDragged = true;
      console.log("drag started");
    },
    cardDragOver(event) {
      event.preventDefault();
      event.dataTransfer.dropEffect = "move";
      // console.log("over dragzone");
    },
    cardDragEnter(event) {
      event.preventDefault();
      event.dataTransfer.dropEffect = "move";
      // console.log("enter dragzone");
    },

    cardDragDrop(event) {
      event.preventDefault();
      const cardDragData = {
        draggedCardId:
          event.dataTransfer.getData("text/plain").split(",")[0] * 1,
        draggedCardListId:
          event.dataTransfer.getData("text/plain").split(",")[1] * 1,
        draggedCardName: event.dataTransfer.getData("text/plain").split(",")[2],
        dropZoneCardId: this.card.id,
        dropZoneListId: this.card._list_id,
        dropZoneListOrder: this.card.list_order
      };
      this.$emit("cardDropped", cardDragData);
    },

    cardDragEnded(event) {
      this.cardIsDragged = false;
      console.log("drage end event: ", event.dataTransfer.dropEffect);
      if (event.dataTransfer.dropEffect !== "none") {
        this.$emit("removedDraggedCard", this.card.id);
      }
    }
  }
};
</script>

<style>
</style>
