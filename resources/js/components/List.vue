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
        v-for="card in filteredCards"
        :key="card.id"
        v-bind:card="card"
        @cardDeleted="confirmDeleteCardMessage"
      />

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
            _list_id: 0
          }
        ];
      },
      newCardData: {
        name: "",
        _list_id: this.slist.id,
        description: ""
      },
      ellipses: false,
      openListMenu: false
    };
  },

  watch: {
    cards() {
      this.filterCards();
    }
  },

  methods: {
    filterCards() {
      this.filteredCards = this.cards.filter(card => {
        return card._list_id === this.$props.slist.id;
      });
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

<style>
</style>


