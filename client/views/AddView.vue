<script setup lang="ts">
import CreatePostForm from "@/components/Post/CreatePostForm.vue";
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";


const { currentUsername, isLoggedIn } = storeToRefs(useUserStore());
</script>

<template>
  <main class="column" id="container">
    
      <h3>Add a Post</h3>
      
      <CreatePostForm/>
  </main>
</template>

<style scoped>
h3 {
  text-align: center;
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
