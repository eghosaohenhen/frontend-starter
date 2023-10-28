<script setup lang="ts">
import { ref } from "vue";

const name = ref("");
const emit = defineEmits(["getCollagesByName"]);
</script>

<template>
  <form @submit.prevent="emit('getCollagesByName', name)" class="pure-form">
    <fieldset>
      <legend>Search by Name</legend>
      <input id="author" type="text" v-model="name" placeholder="Collage Name" />
      <button type="submit" class="pure-button pure-button-primary">Search</button>
    </fieldset>
  </form>
</template>

<style scoped>
form {
  display: flex;
  gap: 0.5em;
  padding: 1em;
  align-items: center;
}
</style>
