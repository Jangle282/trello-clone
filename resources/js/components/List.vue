<template>
  <div class="list">
    <div class="list-header">
      <h6>{{slist.name || "add a list"}}</h6>
    </div>
    <Card v-for="card in filteredCards" :key="card.id" v-bind:card="card"/>
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
      filteredCards: Array
    };
  },

  created() {
    this.filteredCards = this.cards.filter(card => {
      return card._list_id === this.$props.slist.id;
    });
  }
};
</script>

<style>
</style>


