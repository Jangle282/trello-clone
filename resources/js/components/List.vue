<template>
  <div class="list">
    <div class="list-header">
      <h6>{{slist.name || "add a list"}}</h6>
    </div>
    <div class="cardList">
      <Card v-for="card in filteredCards" :key="card.id" v-bind:card="card"/>
    </div>

    <div v-if="listIdforopenAddCard === slist.id" class="addCardForm">
      <form action>
        <input type="text" name id>
        <button>Add</button>
      </form>
      <button>X</button>
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
      filteredCards: [
        {
          name: "",
          id: 0,
          description: "",
          _list_id: 0
        }
      ]
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
    }
  },

  mounted() {},

  created() {
    if (this.cards) this.filterCards();
  }
};
</script>

<style>
</style>


