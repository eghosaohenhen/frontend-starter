<script setup lang="ts">
import { useMediaStore } from "@/stores/media";
import { ref } from "vue";

let mediaUrl = ref("");

const {uploadMedia, deleteMedia} = useMediaStore();

async function uploadMediaUrl() {
  await uploadMedia({ mediaUrl: mediaUrl.value });
  mediaUrl.value = "";
}


</script>

<template>
  <h2>Upload Media</h2>
  <form @submit.prevent="uploadMediaUrl" class="pure-form">
    <fieldset>
      <legend>Upload an image URL </legend>
      <input type="text" placeholder="Image Url" v-model="mediaUrl" required />
      <button type="submit" class="pure-button pure-button-primary">Upload Image Url</button>
    </fieldset>
  </form>
</template>
