<template>
  <div class="list">
    <div @mouseover="showEllipses" @mouseleave="hideEllipses" class="list-header">
      <h6>{{slist.name || "add a list"}}</h6>
      <div v-if="ellipses" class="ellipses" @click="toggleOpenListMenu">...</div>
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

    <div v-if="listIdforopenAddCard === slist.id" class="addCardForm">
      <input v-model="newCardData.name" type="text" name="title" id="title" />
      <div @click="submitAddCard" type="submit">Add</div>
      <button @click.prevent="$emit('toggleAddCards', null)">X</button>
      <button>...</button>
    </div>
    <div v-else class="cardList">
      <p v-on:click.prevent="$emit('toggleAddCards', slist.id)">Add a Card</p>
    </div>
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
      ellipses: false,
      openListMenu: false,
      cardIsDragged: Number
    };
  },

  watch: {
    cards() {
      this.filterCards();
    }
  },

  methods: {
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
      console.log("cardRemovedByDrag: ");
      const cardIndex = this.filteredCards.findIndex(
        card => card.id === cardId
      );
      console.log("card index", cardIndex);
      this.filteredCards.splice(cardIndex, 1);
    },

    fireUpdateCard(cardData) {
      console.log("update card method");
      axios
        .put(`cards/${cardData.id}`, cardData)
        .then(response => {
          this.$emit("updateCards");
        })
        .catch(err => {
          console.log(err);
        });
    },

    filterCards() {
      this.filteredCards = this.cards
        .filter(card => {
          return card._list_id === this.$props.slist.id;
        })
        .sort((a, b) => a.list_order - b.list_order);
    },

    submitAddCard() {
      var newCard = this.newCardData;
      this.resetAddCardValues();
      this.$emit("newCardCreated", newCard);
      axios
        .post("/cards", newCard)
        .then(response => {})
        .catch(error => {
          console.log("error submitting add new list form");
        });
    },

    resetAddCardValues() {
      this.newCardData = {
        name: "",
        description: "",
        _list_id: this.slist.id
      };
    },

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

    toggleOpenListMenu() {
      this.openListMenu = !this.openListMenu;
    },

    showEllipses() {
      this.ellipses = true;
    },

    hideEllipses() {
      this.ellipses = false;
    }
  },

  created() {
    if (this.cards) this.filterCards();
  }
};
</script>

// dropped card needs to be spliced into the filtered cards array according to the indexes of the cards around it.
// add an order value to cards 
// add it to the Model 
// add it to the seeder - maybe just random number or whatever - just not in the same order as the IDs. 
// reseed the database 
// 
// they should then be ordered by that value when they are filtered
// when a card is dropped the order value needs to be set between the two cards where it is dropped
// so the order value has to be able to be a decimal
// also need to do an ajax edit call to update the list id and the order number of the card
// the list where it came from also has to remove the card from it's filtered items and 
// this will required sibling communication ... maybe not i think the 
// need a drop zone when list is empty - either in addcard or make a container that is the whole length that just appendsto the end
// this would need some visual feedback on it too 

<style>
</style>


