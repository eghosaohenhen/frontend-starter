<script setup lang="ts">
import { computed, ref } from "vue";
import { fetchy } from "../../utils/fetchy";
import MediaListComponent from "../Media/MediaListComponent.vue";

const content_id = ref("");
const caption = ref("");
const selectable = ref<boolean>(true);
const emit = defineEmits(["refreshPosts"]);
const flair = ref("");
const props = defineProps(["location", "post_type"]);
const mediaVisible = ref(false);
const text = ref("");
const icon = ref("");
const toggle_flair = ref(null);
const toggle_content = ref(null);
const content_type = ref(""); 
const toggleChildVisibility = () => {
      mediaVisible.value = !mediaVisible.value;
    };
const selectPostFlair = (selectedFlair:string) => {
  flair.value = selectedFlair; 

};
const isSubmitDisabled = computed(() => {
      // You can set your own validation logic here.
      return !flair.value || !content_id.value || !content_type.value;
});
const createPost = async () => {
  try {
    console.log("HERE IS CONTENT ID", content_id.value)
    //EGGO TODO front & back endpoints dont match 
    await fetchy(`/api/posts/${content_id.value}`, "POST", {
      body: {content:content_id.value, postType: content_type.value, flair:flair.value, caption:caption.value},
    });
  } catch (_) {
    return;
  }
  emit("refreshPosts");
  emptyForm();
};
function warn(message:string, event:MouseEvent) {
  // now we have access to the native event
  if (event) {
    event.preventDefault();
  }
  alert(message);
}
const emptyForm = () => {
  content_id.value = "";
  content_type.value = "";
  caption.value = "";
  flair.value = "";
};

</script>

<template>
  <div class="container">
  <form class="span1" @submit.prevent="createPost()" >
    
    <label for="content" class="default">Choose Post Flair</label> 
    
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
          <v-btn @click="selectPostFlair('General')"><h6>General</h6></v-btn>
          <v-btn @click="selectPostFlair('Artwork')"><h6>Artwork</h6></v-btn>
          <v-btn @click="selectPostFlair('Inspo')"><h6>Inspo</h6></v-btn>
          <v-btn @click="selectPostFlair('Tip')"><h6>Tip</h6></v-btn>
          <!-- {{ flair }} -->
        </v-btn-toggle>
      </v-col>
    </div>
  
    <div class="d-flex flex-column " id="Content">
      <v-col
        cols="12"
        class="py-2"
      >

        <v-btn-toggle
          v-model="toggle_content"
          shaped
          outlined
          mandatory
          class="buttons"
        >
          <v-btn @click="toggleChildVisibility">Choose Image<v-icon>mdi-format-align-left</v-icon>
            
          </v-btn>

          <v-btn>Choose Collage
            <v-icon>mdi-format-align-center</v-icon>
          </v-btn>
        </v-btn-toggle>
      </v-col>
    </div>
    
    <v-scroll-y-transition>
      <div class="container">
        <h1 v-if="mediaVisible">Choose Media to Post</h1>
        <MediaListComponent @selected:content_id="content_id = $event" @selected:content_type="content_type = $event" :selectable="selectable" v-if="mediaVisible" required/>
        <!-- <p>Parent Value: {{ content_id }}</p> -->
      </div>
    </v-scroll-y-transition>
    <!-- <v-btn @click="(event:MouseEvent) => warn('Form cannot be submitted yet.', event)">
      Add to Post 
    </v-btn> -->
    <!-- <p>Parent Value: {{ content_type }}</p> -->
    <!-- <textarea id="content" v-model="content_id" placeholder="Create a post!" required> </textarea> -->
    <textarea id="caption" v-model="caption" placeholder="[Optional] Add a Caption!!"> </textarea>

    <button type="submit" :disabled="isSubmitDisabled" class="pure-button-primary pure-button">Create Post</button>
  </form>
</div>
</template>

<style scoped>
.pure-button-primary pure-button {
  width: fit-content;
  align-self:center;
}
.buttons {
  display: flex;
  flex-direction: row;
  justify-content: center;
  
}

.container {
  max-width:770px;
  width:100%;
  display:flex;
  flex-direction:column;
  align-items:center;
  
}
form {
  background-color: var(--base-bg);
  border-radius: 1em;
  display: flex;
  flex-direction: column;
  gap: 0.5em;
  padding: 1em;
}

.flex-column{
  padding: 0.5em;
  align-items: center;
}

textarea {
  font-family: inherit;
  font-size: inherit;
  height: 6em;
  padding: 0.5em;
  border-radius: 4px;
  resize: none;
}
</style>
