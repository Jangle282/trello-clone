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
        <input v-model="card.name" />
        <textarea v-model="card.description" />
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
      console.log(
        "drop",
        event.dataTransfer.getData("text/plain").split(",")[0] * 1
      );
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
      console.log("end", event.dataTransfer.getData("text/plain"));
      this.cardIsDragged = false;
      if (event.dataTransfer.dropEffect !== "none") {
        this.$emit("removedDraggedCard", this.card);
      }
    }
  }
};
</script>

<style>
</style>
