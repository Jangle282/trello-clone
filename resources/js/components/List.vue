<template>
  <div class="list">
    <div class="list-header">
      <h6>{{slist.name || "add a list"}}</h6>
    </div>
    <div class="cardList">
      <Card v-for="card in filteredCards" :key="card.id" v-bind:card="card" />

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
      }
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

    submitAddCard(data) {
      // clear the input in the add form
      // change so not another call to retrieve all cards rather adding new card to main array.
      // do same thing with lists so can see new ones added
      // try and add a list and then cards to that list
      // also remake add caard form so it isn't a form
      // scroll to bottom of list on adding a new card so can see what as just added
      // add new card on hitting return
      // when adding a new card it was taking too long for the new card to appear on the board
      // because had to retrieve all teh cards again
      // solution was to push it to the arrya straight away and
      // then do the callasynchronously to refresh all the cards
      // it still takes too long to clear the input form on clicking add
      // ... I want it to be like real trello where it is instantaneously added
      // and there is no waiting around for it to happen
      // maybe this is why you use Vuex
      axios
        .post("/cards", this.newCardData)
        .then(response => {
          this.$emit("newCardCreated", this.newCardData);
          this.resetAddCardValues();
        })
        .catch(error => {
          console.log("error submitting add new list form", error);
        });
    },

    resetAddCardValues() {
      this.newCardData = {
        name: "",
        description: "",
        _list_id: this.slist.id
      };
    }
  },

  created() {
    if (this.cards) this.filterCards();
  }
};
</script>

<style>
</style>


