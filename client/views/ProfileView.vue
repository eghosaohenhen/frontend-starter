<script setup lang="ts">
import PostListComponent from "@/components/Post/PostListComponent.vue";
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";


const { currentUsername, isLoggedIn } = storeToRefs(useUserStore());

</script>

<template>
  <main class="column" id="container">
    
      
      <section class ="row" id="center">
       
        <h1 v-if="isLoggedIn">{{ currentUsername }} Profile</h1>
        <h1 v-else>Please login!</h1>
      </section>
      <PostListComponent :own="true"/>
  </main>
</template>

<style scoped>
h1 {
  text-align: center;
}
h2 {
  height:16px;
  text-align: right;
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
