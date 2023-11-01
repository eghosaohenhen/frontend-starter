<script setup lang="ts">
import { computed, ref } from "vue";

const author = ref("");
const mediaVisible = ref(false);
const flair = ref("");
const toggle_flair = ref(null);
const toggleChildVisibility = () => {
      mediaVisible.value = !mediaVisible.value;
    };
const selectPostFlair = (selectedFlair:string) => {
  flair.value = selectedFlair; 

};
const emit = defineEmits(["getPostsByFilter"]);
const isSubmitDisabled = computed(() => {
      // You can set your own validation logic here.
      return !flair.value && !author.value;
});
const searchFilter = async () => {
  if (author.value){
    emit('getPostsByFilter', "author", author.value);
  }else{
    emit('getPostsByFilter', "flair", flair.value);
  }
  emptyForm();
};
const emptyForm = () => {
  author.value = "";
  flair.value = "";
};
</script>

<template>
  <form @submit.prevent="searchFilter" class="pure-form">
    <v-btn id="btn"  @click="toggleChildVisibility">Search By</v-btn>
    <div class="container" v-if="mediaVisible">
      <fieldset>
        
        <legend>Author</legend>
        <input id="author" type="text" v-model="author" placeholder="Username" />
 
      <legend>Flair</legend>
      <div class="d-flex flex-column " id="Flair">
        <v-col
          cols="12"
          class="py-2"
        >

          <v-btn-toggle
            v-model="toggle_flair"
            shaped
            outlined
            mandatory
            class="buttons"
            id="Flair"
          >
            <v-btn id="btn" @click="selectPostFlair('General')">General</v-btn>
            <v-btn id="btn" @click="selectPostFlair('Artwork')">Artwork</v-btn>
            <v-btn id="btn" @click="selectPostFlair('Inspo')">Inspo</v-btn>
            <v-btn id="btn" @click="selectPostFlair('Tip')">Tip</v-btn>
            <!-- {{ flair }} -->
          </v-btn-toggle>
        </v-col>
      </div>
      </fieldset>
      <button type="submit" class="pure-button pure-button-primary" :disabled="isSubmitDisabled" >Search</button>
      
    </div>
<!--     
      <legend>Author</legend>
      <input id="author" type="text" v-model="author" placeholder="Username" />
      <button type="submit" class="pure-button pure-button-primary">Search</button>
      <legend>Search by Author</legend>
      <input id="author" type="text" v-model="author" placeholder="Username" />
      <button type="submit" class="pure-button pure-button-primary">Search</button> -->
      
  </form>
</template>

<style scoped>
form {
  display: flex;
  gap: 0.5em;
  padding: 1em;
  align-items: center;
  flex-direction: column;
  flex-wrap: wrap;
  border-radius: 1em;
  background-color: var(--muted-lavender);
  /* flex:1; */
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

#btn{
  font-family: inherit;
}
</style>
