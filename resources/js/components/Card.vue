<template>
  <div @mouseover="showEllipses" @mouseleave="hideEllipses" class="task-card">
    <p class="card-name">{{ card.name }}</p>
    <div v-if="ellipses" class="ellipses" @click="toggleOpenCardMenu">...</div>
    <div v-if="openCardMenu" class>
      <div class="open-card-menu">
        <div @click="deleteCard" class="open-card-menu-item">delete</div>
        <div class="open-card-menu-item">edit</div>
      </div>
    </div>
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
      ellipses: false
    };
  },
  methods: {
    toggleOpenCardMenu() {
      this.openCardMenu = !this.openCardMenu;
    },
    showEllipses() {
      this.ellipses = true;
    },
    hideEllipses() {
      this.ellipses = false;
    },
    deleteCard() {
      this.$emit("cardDeleted", this.card);
      
    }
  }
};
</script>

<style>
</style>


