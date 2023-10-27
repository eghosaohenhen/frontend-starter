<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { formatDate } from "@/utils/formatDate";
import { storeToRefs } from "pinia";
import { onBeforeMount, ref } from "vue";
import { fetchy } from "../../utils/fetchy";

const props = defineProps(["post"]);
const emit = defineEmits(["refreshPosts"]);
const loaded = ref(false);
const { currentUsername } = storeToRefs(useUserStore());
const mediaUrl = ref("");
const content_type = ref("");

// write a function that that will return url version of media given the media id by calling getMedia() to backend
//content is here because my backend 
const mediaIdtoUrl = async () => {
  let mediaObject;
  // console.log('content id',props.post.content); 
  try {
     mediaObject = await fetchy(`/api/media/${props.post.content}`, "GET", {
      query: {_id:props.post.content},
    });
  } catch {
    return;
  }
  // console.log('media object', mediaObject); 
  mediaUrl.value = mediaObject.content;
};

const deletePost = async () => {
  try {
    await fetchy(`/api/posts/${props.post._id}`, "DELETE");
  } catch {
    return;
  }
  emit("refreshPosts");
};
onBeforeMount(async () => {
  await mediaIdtoUrl();
  loaded.value = true;
});
</script>

<template>
  <p class="author">{{ props.post.author }}</p>
  <!-- to see whats in the object, ref = .value  -->
  <!-- <p>{{ props.post }}</p> -->
  <!-- content stuff  -->
  <!-- <p>{{ props.post.content }}</p> -->
  <div class="container" v-if = "props.post.postType.toString() === 'Media'.toString()">
    <v-img
        :src= "`${mediaUrl}`"
        :lazy-src="`${mediaUrl}`"
        
        aspect-ratio="1"
        cover
        class="bg-grey-lighten-2"
        
    >
    <!-- {{ selectTarget }} -->
        <!-- <template v-slot:error>
            <v-img
                class="mx-auto"
                cover
                :src="`./not-found-real.png`"
            ></v-img>
             -->
        <v-row
            class="fill-height ma-0"
            align="center"
            justify="center"
        >
        <!-- <v-img
            class="mx-auto"
            cover
            :src="`./not-found-real.png`"
        ></v-img> -->
            <!-- <v-progress-circular
            indeterminate
            color="grey-lighten-5"
            ></v-progress-circular> -->
        </v-row>
        <!-- </template> -->
    </v-img>
    <!-- <img src="https://www.xpand-it.com/wp-content/uploads/2019/05/AF_EN_facebook_linkedin_bootstrap.png" alt="HTML5 Icon" width="128" height="128"> -->

  </div>
  
  <div class="base">
    <menu v-if="props.post.author == currentUsername">
      <li><button class="button-error btn-small pure-button" @click="deletePost">Delete</button></li>
    </menu>
    <article class="timestamp">
      <!-- need v_if for toggle button to select either  -->
      <p v-if="props.post.dateCreated !== props.post.dateUpdated">Edited on: {{ formatDate(props.post.dateUpdated) }}</p>
      <p v-else>Created on: {{ formatDate(props.post.dateCreated) }}</p>
    </article>
  </div>
  
</template>

<style scoped>
p {
  margin: 0em;
}
img {
  width: 100%;
}

.author {
  font-weight: bold;
  font-size: 1.2em;
}


menu {
  list-style-type: none;
  display: flex;
  flex-direction: row;
  gap: 1em;
  padding: 0;
  margin: 0;
}

.timestamp {
  display: flex;
  justify-content: flex-end;
  font-size: 0.9em;
  font-style: italic;
}

.base {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.base article:only-child {
  margin-left: auto;
}
</style>
