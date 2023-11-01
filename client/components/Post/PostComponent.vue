<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { formatDate } from "@/utils/formatDate";
import { storeToRefs } from "pinia";
import { computed, onBeforeMount, ref } from "vue";
import { fetchy } from "../../utils/fetchy";
import CollageListComponent from "../Collage/CollageListComponent.vue";

const props = defineProps(["post","minimized","small", "index"]);
const drawer = ref(false);
const emit = defineEmits(["refreshPosts", "saved:post_id", "refreshCollageList"]);
const loaded = ref(false);
const { currentUsername } = storeToRefs(useUserStore());
const mediaUrl = ref("");
const content_type = ref("");
const collage_id = ref(""); 

const selectable = ref<boolean>(true);

const collageVisible = ref(false);
const toggleChildVisibility = () => {
  collageVisible.value = !collageVisible.value;
    };

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
const isSubmitDisabled = computed(() => {
      // You can set your own validation logic here.
      return !collage_id.value;
});
const deletePost = async () => {
  try {
    await fetchy(`/api/posts/${props.post._id}`, "DELETE");
  } catch {
    return;
  }
  emit("refreshPosts");
};
const selectCollage = async (collageObject:any) =>{
  collage_id.value = collageObject._id;
}
const createFavorite = async () => {
  emit("saved:post_id", props.post._id,collage_id.value);
  // void router.push({ name: "AddCollage" });
  emit("refreshPosts");
};
onBeforeMount(async () => {
  await mediaIdtoUrl();
  loaded.value = true;
});
</script>

<template>
  <div class="header" v-show="!props.minimized">
    
    <p class="author">{{ props.post.author }}</p>
    <div class="sidebar">

    
      <label :name="props.post.flair">{{ props.post.flair }} </label>
      <menu v-if="props.post.author == currentUsername">
      <li><button class="button-error pure_button" @click="deletePost">Delete</button></li>
    </menu>
    </div>
  </div>
  
  <!-- to see whats in the object, ref = .value  -->
  <!-- <p>{{ props.post }}</p> -->
  <!-- content stuff  -->
  <!-- <p>{{ props.post.content }}</p> -->
  <div class="container" v-if = "props.post.postType === 'Media'">
  
    <v-img
        :src= "`${mediaUrl}`"
        :lazy-src="`${mediaUrl}`"
        
        aspect-ratio="1"
        cover
        class="bg-grey-lighten-2"
        
    >
    <template v-slot:placeholder>
        <div id = "grey" class="d-flex align-center justify-center fill-height">
          Not Found
        </div>
      </template>
        <v-row
            class="fill-height ma-0"
            align="center"
            justify="center"
        >
        </v-row>  
    </v-img>
        <!-- <v-img
            class="mx-auto"
            cover
            :src="`./not-found-real.png`"
        ></v-img> -->
            <!-- <v-progress-circular
            indeterminate
            color="grey-lighten-5"
            ></v-progress-circular> -->
        
    <!-- <img src="https://www.xpand-it.com/wp-content/uploads/2019/05/AF_EN_facebook_linkedin_bootstrap.png" alt="HTML5 Icon" width="128" height="128"> -->

  
  </div>
  
  <div class="base" v-show="!props.minimized">
    <div class="text">
      <p class="user">{{ props.post.author }}</p> {{ props.post.caption }}
      <div class="sidebar">
        <button class="button-error fav_button" @click="toggleChildVisibility">Favorite</button>
      </div>
    </div>
    <v-scroll-y-transition>
      <form class="span1" @submit.prevent="createFavorite()" v-show="collageVisible">
        <div class="container">
        <h4 v-if="collageVisible">Choose Collage</h4>
        <CollageListComponent  :contributor= "true" :selectable="selectable" v-if="collageVisible" required/>
        <button class="button-error fav_button" type="submit" :disabled="isSubmitDisabled" >Save Post</button>
      </div>
    
      </form>
      
    </v-scroll-y-transition>
    
    <v-list-subheader>View Comments ></v-list-subheader>
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
form {
  background-color: var(--muted-lavender);
  border-radius: 1em;
  display: flex;
  flex-direction: column;
  gap: 0.5em;
  padding: .5em;
}
label{
  border-radius: 10px;
  border-style: solid;
  border-width: medium;
  border-color:var(--dark-plum);
  color:white; 
  background: var(--muted-lavender);
  
  
}
.large{
  width:100px;
    height:200px;
    padding: 10px;
  width:200px;
}
.small{
  width:85px;
    height:95px;
}
.fav_button{
  padding: .1em;
  font-size: small;
  border-radius: 8px;
  border-style: solid;
  border-width: medium;
  border-color:var(--medium-pink);
  background: var(--light-pink);
  color:var(--muted-lavender);
}
.pure_button{
  padding: .1em;
  border-radius: 10px;
  border-style: solid;
  border-width: medium;
  border-color:var(--magenta);
  color:var(--dark-plum);
}
.sidebar{
  display:flex;
  flex-direction: row;
  align-items: flex-end;
  margin-left:auto;
}
.header{
  width: 100%;
  display:flex;
  flex-direction:row;
  align-items:center;
  justify-content: space-between;
}
.user{
  font-weight:bold;
}
.author {
  background-color: white;
  font-weight: bold;
  font-size: 1.2em;
}
.icon{
  height:25px;
  width:25px;
  
}
.text{
  display:flex;
  flex-direction:row;
  align-self:flex-start;
  gap:1em;
  width:100%;
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
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}

.base article:only-child {
  margin-left: auto;
}
</style>
