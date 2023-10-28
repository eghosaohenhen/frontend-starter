<script setup lang="ts">
import CreateCollageForm from "@/components/Collage/CreateCollageForm.vue";
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";
import { ref } from "vue";
import router from "../router";


const { currentUsername, isLoggedIn } = storeToRefs(useUserStore());
const post_id = ref("");
async function switchPage() {
  void router.push({ name: "Collage" });
}
</script>

<template>
  <main class="column" id="container">
    <div class="header">
        <img class= "icon" @click="switchPage" src="@/assets/images/back-arrow.svg">
    
    
  </div>
      
  <!-- < @selected:content_id="content_id = $event" @selected:content_type="content_type = $event" :selectable="selectable" v-if="mediaVisible" required/> -->
      <CreateCollageForm />
  </main>
</template>

<style scoped>
.sidebar{
  display:flex;
  flex-direction: row;
  align-items: flex-end;
}
.header{
  width: 100%;
  display:flex;
  flex-direction:row;
  align-items:center;
  justify-content: space-between;
}
.icon{
  height:50px;
  width:50px;
  
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
