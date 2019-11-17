<template>
  <div class="card-container">
    <div
      draggable="true"
      @dragstart="cardDragStart"
      @dragend="cardDragEnded"
      @mouseover="showEllipses"
      @mouseleave="hideEllipses"
      :class="[{'dragged-card' : cardIsDragged}, 'task-card']"
    >
      <p class="card-name">{{ card.name }}</p>
      <div v-if="ellipses" class="ellipses" @click="toggleOpenCardMenu">...</div>
      <div v-if="openCardMenu">
        <div class="open-card-menu">
          <div @click="emitDeleteCard" class="open-card-menu-item">delete</div>
          <div class="open-card-menu-item">edit</div>
        </div>
      </div>
    </div>
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
    card: Object
  },
  data() {
    return {
      openCardMenu: false,
      ellipses: false,
      cardIsDragged: false,
      expandDragZone: false
    };
  },

  mounted() {
    this.setEventListeners();
  },

  methods: {
    setEventListeners() {
      this.$on("draggedCardEnteredDragZone", this.expandDragZoneHeight);
      this.$on("draggedCardLeftDragZone", this.collapseDragZoneHeight);
    },
    // state management
    toggleOpenCardMenu() {
      this.openCardMenu = !this.openCardMenu;
    },

    expandDragZoneHeight() {
      this.expandDragZone = true;
    },

    collapseDragZoneHeight() {
      this.expandDragZone = false;
    },

    showEllipses() {
      this.ellipses = true;
    },

    hideEllipses() {
      this.ellipses = false;
    },

    // emit CRUD events
    emitDeleteCard() {
      this.$emit("cardDeleted", this.card);
    },

    // drag methods
    cardDragStart(event) {
      const draggedCardId = this.card.id;
      const draggedCardListId = this.card._list_id;
      event.dataTransfer.setData(
        "text/plain",
        `${draggedCardId},${draggedCardListId},${this.card.name}`
      );
      event.dataTransfer.effectAllowed = "move";
      this.cardIsDragged = true;
    },

    cardDragOver(event) {
      event.preventDefault();
      event.dataTransfer.dropEffect = "move";
    },

    cardDragEnter() {
      event.preventDefault();
      event.dataTransfer.dropEffect = "move";
      this.$emit("draggedCardEnteredDragZone", this.card.id);
    },

    cardDragLeave() {
      event.preventDefault();
      event.dataTransfer.dropEffect = "move";
      this.$emit("draggedCardLeftDragZone");
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
      this.$emit("draggedCardLeftDragZone");
    },

    cardDragEnded(event) {
      this.cardIsDragged = false;
      if (event.dataTransfer.dropEffect !== "none") {
        this.$emit("removedDraggedCard", this.card.id);
      }
    }
  }
};
</script>

<style>
</style>
