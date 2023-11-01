<script setup lang="ts">
import CollageListComponent from "@/components/Collage/CollageListComponent.vue";
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";
import { ref } from "vue";
import router from "../router";


const { currentUsername, isLoggedIn } = storeToRefs(useUserStore());
const emit = defineEmits(["addEditor"]);
const isMaximized = ref(false); 
const selectable = ref(true);
let collageSelected = ref<Array<Record<string, string>>>([]);
let editor = ref(false); 
let own = ref(false); 
const switchCollageView = (collage:any) => {
  isMaximized.value = !isMaximized.value;
  if (isMaximized.value){
    collageSelected.value = collage; 
  }
    };
async function switchPage() {
  void router.push({ name: "AddCollage" });
}
</script>

<template>
  {{ isMaximized }}
  <div class="column" id="container" v-show="!isMaximized">
    <menu>
        <h2>Private Collages</h2>
        
            <label name="Add New" @click="switchPage">Add New </label>
    </menu>
      <CollageListComponent :own="true" :selectable="true" @selected:collage="switchCollageView($event)"/>
      <h2>Shared Collages</h2>
      <CollageListComponent :editor="true" :selectable="true" :own="false" @selected:collage="switchCollageView"/>
  </div>
  <div class="column" id="container" v-show="isMaximized">
    <menu>
        <h2>{{ collageSelected }}</h2>
        
            <label name="Add Editor" @click="emit('addEditor')">Add Editor </label>
    </menu>
      
      <!-- <CollageComponent :editor="editor" :own="own" :collage="maximizedCollage"/> -->
  </div>
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
