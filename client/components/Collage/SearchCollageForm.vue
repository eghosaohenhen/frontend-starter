<script setup lang="ts">
import { ref } from "vue";

const name = ref("");
const props = defineProps([ "own", "editor"]);
const emit = defineEmits(["getCollagesByName"]);
</script>

<template>
  <div class="container">

  
  <form @submit.prevent="emit('getCollagesByName', name, props.own, props.editor)" class="pure-form">
    <fieldset>
      <legend>Search by Name</legend>
      <input id="author" type="text" v-model="name" placeholder="Collage Name" />
      <button type="submit" class="pure-button pure-button-primary">Search</button>
    </fieldset>
  </form>
  </div>
</template>

<style scoped>
form {
  display: flex;
  gap: 0.5em;
  padding: 1em;
  align-items: center;
}
.container {
  /* max-width:770px;
  width:100%; */
  display:flex;
  flex-direction:column;
  position:relative;
  align-items:center;
  background-color: white;
  padding:0.5em;
  border-radius: 1em;
  
}
</style>
