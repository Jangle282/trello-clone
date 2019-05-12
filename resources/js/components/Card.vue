<template>
  <div class="my-card">
    <p>{{ card.name }}</p>
  </div>
</template>

<script>
export default {
  name: "Card",
  props: {
    card: Object
  }
};
</script>

<style>
</style>


