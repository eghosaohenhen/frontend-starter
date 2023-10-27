<script setup lang="ts">
import { useMediaStore } from "@/stores/media";
import { ref } from "vue";

let mediaUrl = ref("");
const file = ref<null | File>(null);
const emit = defineEmits(["refreshMedias"]);
const {uploadMedia, deleteMedia} = useMediaStore();

async function uploadMediaUrl() {
  await uploadMedia(mediaUrl.value);
  emit("refreshMedias");
  mediaUrl.value = "";
}


</script>
<!-- <template>
    <form @submit.prevent="uploadMediaUrl" class="pure-form">
        <fieldset>
            <v-file-input accept="image/*" label="File input"></v-file-input>
            <button type="submit" class="pure-button pure-button-primary">Upload</button>
        </fieldset>
    <div class="mt-3">
      Files: <strong>{{ file }}</strong>
    </div>
    </form>
    
  </template>
  
  <script setup lang="ts">
  
  </script> -->

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
