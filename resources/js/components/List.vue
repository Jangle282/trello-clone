<template>
  <div class="list">
    <div class="list-header">
      <h6>{{slist.name || "add a list"}}</h6>
    </div>
    <div class="cardList">
      <Card v-for="card in filteredCards" :key="card.id" v-bind:card="card"/>
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

  // watch the cards prop and call a method to filter them and set filtered cards
  // create a default thing to load if there isn't anything in the data yet
  created() {
    if (this.cards) this.filterCards();
  }
};
</script>

<style>
</style>


