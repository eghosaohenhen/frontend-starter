<script setup lang="ts">

import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";
import { ref } from "vue";
import MediaListComponent from "../components/Media/MediaListComponent.vue";

const { currentUsername, isLoggedIn } = storeToRefs(useUserStore());
const selectable = ref<boolean>(false);
</script>

<template>
  <main>
    
    <section>
      <h1 v-if="isLoggedIn">Your Medias {{ currentUsername }}
        <MediaListComponent :selectable="selectable"/>
      </h1>
      <h1 v-else>Please login!</h1>
    </section>
  </main>
</template>

<style scoped>
h1 {
  text-align: center;
}
</style>