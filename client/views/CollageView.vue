<script setup lang="ts">
import CollageListComponent from "@/components/Collage/CollageListComponent.vue";
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";
import router from "../router";


const { currentUsername, isLoggedIn } = storeToRefs(useUserStore());
async function switchPage() {
  void router.push({ name: "AddCollage" });
}
</script>

<template>
  <main class="column" id="container">
    <menu>
        <h2>Private Collages</h2>
        
            <label name="Add New" @click="switchPage">Add New </label>
    </menu>
      <CollageListComponent />
      <h2>Shared Collages</h2>
      <CollageListComponent />
  </main>
</template>

<style scoped>
#container{
    display:flex;
    flex-direction: column;
    align-items:flex-start;
    padding-left:4em;
    padding-right:4em;
}
menu{
    display:flex;
    justify-content: space-between;
    flex-direction: row;
    width: 100%;
    margin-right: auto;
    
}
h1 {
  text-align: center;
}
h2 {
  height:16px;
  font-size: 30px;
  text-align: right;
  color:var(--dark-plum); 
}
label{
  border-radius: 10px;
  border-style: solid;
  border-width: medium;
  border-color:var(--dark-plum);
  color:white; 
  font-size: 24px;
  background: var(--muted-lavender);
  padding:.1em;
}
/* #container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.left{
  display: flex;
  flex-direction: row;
  justify-content: center;
}
.right{
  display: flex;
  flex-direction: row;
  justify-content: center;
} */
</style>
