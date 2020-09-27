<template>
  <div>
    <div
      :class="['column', {'column-drop-zone' : showColDropZoneStyle}]"
      draggable="true"
      @dragstart="colDragStart"
      @dragend="colDragEnded"
      @dragenter="colDragEnter"
      @dragover="colDragOver"
      @drop="colDragDrop"
      id="column"
    >
      <div v-if="!showColDropZoneStyle">
        <div :class="[ { 'pointer-none' : colDragInProgress},'column-header']">
          <div v-if="editTitleOpen" class="edit-title-open, column-title-container">
            <input v-model="column.name" @keyup.enter="saveColTitle" ref="colTitle" />
          </div>

          <div v-else @click="openEditTitle" class="column-title-container">
            <h6>{{ column.name || "add a column" }}</h6>
          </div>

          <div class="delete-button" @click="deleteColumn">
            <div>X</div>
          </div>
        </div>

        <div :class="[ {'pointer-none' : colDragInProgress},'cardList']">
          <Card
            v-for="card in column.cards"
            :key="card.id"
            :cardData="card"
          />
        </div>

        <div
          v-if="addCardFormOpen"
          :class="[ {'pointer-none' : colDragInProgress},'add-card-form']"
        >
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
          :class="[ {'pointer-none' : colDragInProgress},'add-card-form']"
          @click="toggleAddCardForm"
        >Add a Card</div>
      </div>
    </div>
  </div>
</template>

<script>
import Card from "./Card";
import { mapGetters } from "vuex";

export default {
  name: "Column",
  components: { Card },

  props: {
    column: {
      name: String,
      id: Number,
      column_order: Number,
    },
  },

  data() {
    return {
      newCardData: {
        name: "",
        column_id: this.column.id,
        description: "",
        column_order: 1,
      },
      editTitleOpen: false,
      cardIsDragged: Number,
      droppedInSameColumn: false,
      addCardFormOpen: false,
    };
  },
  computed: {
    ...mapGetters({
      colDragInProgress: "column/dragStatus",
      draggedColId: "column/draggedColumnId",
      targetColId: "column/dragTargetId",
    }),
    showColDropZoneStyle() {
      return (
        this.colDragInProgress &&
        this.draggedColId &&
        this.draggedColId === this.column.id &&
        this.targetColId
      );
    },
  },

  methods: {
    colDragStart(event) {
        if (event.target.id === 'column') {
            console.log("col start")
            this.$store.dispatch("column/dragStart", this.column);
        }
    },
    colDragEnded(event) {
        if (event.target.id === 'column') {
            console.log("col end")
            this.$store.dispatch("column/dragEnd", this.column);
        }
    },
    colDragEnter(event) {
        if (this.colDragInProgress) {
            console.log("col enter")
            event.preventDefault();
            this.$store.dispatch("column/dragEnter", this.column);
        }
    },
    colDragOver(event) {
        if (this.colDragInProgress) {
            console.log("col over")
            event.preventDefault();
        }
    },
    colDragDrop() {
        if (this.colDragInProgress) {
            console.log("col drop")
            this.$store.dispatch("column/saveColumnOrder");
        }
    },

    saveColTitle() {
        if (this.column.name.length > 0) {
            this.$store.dispatch("column/update", this.column);
            this.editTitleOpen = false;
        }
    },

    deleteColumn() {
      if (confirm("Are you sure you want to delete this list?")) {
        this.$store.dispatch("column/destroy", this.column.id);
      }
    },

    openEditTitle() {
      this.editTitleOpen = true;
      this.focusInput("colTitle");
    },

    storeCard() {
        if (this.newCardData.name.length > 0) {
            const newCard = this.newCardData;
            newCard.column_order = this.column.cards ? this.column.cards.length : 0
            this.$store.dispatch("column/appendCard", newCard);
            this.resetAddCardValues();
        }
    },

    resetAddCardValues() {
      this.newCardData = {
        name: "",
        description: "",
        column_id: this.column.id,
      };
    },

    toggleAddCardForm() {
      this.addCardFormOpen = !this.addCardFormOpen;
      this.focusInput();
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
    }
  },
};
</script>


<style>
</style>
