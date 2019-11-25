<template>
  <div class="list">
    <div class="list-header">
      <div class="list-title-container">
        <h6>{{slist.name || "add a list"}}</h6>
      </div>
      <div class="ellipses" @click="toggleOpenListMenu">
        <div class="dots">...</div>
      </div>
      <div v-if="openListMenu" class>
        <div class="open-list-menu">
          <div @click="confirmDeleteListMessage" class="open-card-list-item">delete</div>
          <div class="open-card-list-item">edit</div>
        </div>
      </div>
    </div>
    <div class="cardList">
      <Card
        v-for="(card, index) in filteredCards"
        :key="index"
        v-bind:card="card"
        @cardDeleted="confirmDeleteCardMessage"
        @cardDropped="cardDropped"
        @removedDraggedCard="cardRemovedByDrag"
      />
    </div>

    <div v-if="listIdforopenAddCard === slist.id" class="add-card-form">
      <input
        v-model="newCardData.name"
        type="text"
        name="title"
        id="title"
        ref="cardTitle"
        @keyup.enter="submitAddCard"
      />
      <div @click="submitAddCard">Add</div>
      <div @click="$emit('toggleAddCards', null)">X</div>
      <div>...</div>
    </div>
    <div
      v-else
      class="add-card-form"
      v-on:click.prevent="$emit('toggleAddCards', slist.id)"
      @click="focusInput"
    >Add a Card</div>
  </div>
</template>

<script>
import Card from "./Card";

export default {
  name: "List",
  components: { Card },

  props: {
    slist: {
      name: String,
      id: Number
    },
    listIdforopenAddCard: Number,
    cards: Array
  },

  data() {
    return {
      filteredCards() {
        return;
        [
          {
            name: "",
            id: 0,
            description: "",
            _list_id: 0,
            list_order: 0
          }
        ];
      },
      newCardData: {
        name: "",
        _list_id: this.slist.id,
        description: "",
        list_order: 1
      },
      openListMenu: false,
      cardIsDragged: Number
    };
  },

  watch: {
    cards() {
      this.filterCards();
    }
  },

  created() {
    if (this.cards) this.filterCards();
  },

  methods: {
    // drag methods
    cardDropped(cardDragData) {
      const nextCard =
        this.filteredCards.find(
          card => card.list_order > cardDragData.dropZoneListOrder
        ) || null;
      const cardNewListOrder =
        nextCard !== null
          ? cardDragData.dropZoneListOrder +
            (nextCard.list_order - cardDragData.dropZoneListOrder) / 2
          : cardDragData.dropZoneListOrder + 0.1;
      const dropZoneListIndex = this.filteredCards.findIndex(
        card => card.id === cardDragData.dropZoneCardId
      );
      const droppedCard = {
        name: cardDragData.draggedCardName,
        id: cardDragData.draggedCardId,
        _list_id: this.slist.id,
        list_order: cardNewListOrder
      };
      this.filteredCards.splice(dropZoneListIndex + 1, 0, droppedCard);
      this.fireUpdateCard(droppedCard);
    },

    cardRemovedByDrag(cardId) {
      const cardIndex = this.filteredCards.findIndex(
        card => card.id === cardId
      );
      this.filteredCards.splice(cardIndex, 1);
    },

    // state management
    filterCards() {
      this.filteredCards = this.cards
        .filter(card => {
          return card._list_id === this.$props.slist.id;
        })
        .sort((a, b) => a.list_order - b.list_order);
    },

    resetAddCardValues() {
      this.newCardData = {
        name: "",
        description: "",
        _list_id: this.slist.id
      };
    },

    toggleOpenListMenu() {
      this.openListMenu = !this.openListMenu;
    },

    // AXIOS methods
    submitAddCard() {
      var newCard = this.newCardData;
      newCard.list_order = this.filteredCards.length
        ? this.filteredCards[this.filteredCards.length - 1].list_order + 1
        : 1;
      this.resetAddCardValues();
      this.$emit("newCardCreated", newCard);
      axios
        .post("/cards", newCard)
        .then(response => {
          this.$emit("updateCards");
        })
        .catch(error => {
          console.log("error submitting add new card form");
        });
    },

    fireUpdateCard(cardData) {
      axios
        .put(`cards/${cardData.id}`, cardData)
        .then(response => {
          this.$emit("updateCards");
        })
        .catch(err => {
          console.log(err);
        });
    },

    deleteCard(data) {
      this.$emit("cardDeleted", data);
      axios
        .post(`/cards/${data.id}`)
        .then(() => {})
        .catch(err => {
          console.log("error deleting card");
        });
    },

    deleteSlist() {
      const listId = this.slist.id;
      this.$emit("listDeleted", listId);
      axios
        .post(`/slists/${listId}`)
        .then(response => {})
        .catch(err => {
          console.log("error deleting list");
        });
    },

    // alerts and pop ups
    confirmDeleteCardMessage(data) {
      if (confirm("Are you sure you want to delete this card?")) {
        this.deleteCard(data);
      }
    },

    confirmDeleteListMessage() {
      if (confirm("Are you sure you want to delete this list?")) {
        this.deleteSlist();
      }
    },

    focusInput() {
      this.$nextTick(() => {
        this.$refs.cardTitle.focus();
      });
    }
  }
};
</script>


<style>
</style>


