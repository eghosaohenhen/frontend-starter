<!-- <script setup lang="ts"> -->
import { useUserStore } from "@/stores/user";
import { formatDate } from "@/utils/formatDate";
import { storeToRefs } from "pinia";
import { onBeforeMount, ref } from "vue";
import { fetchy } from "../../utils/fetchy";
import CollageListComponent from "../Collage/CollageListComponent.vue";

const props = defineProps(["collage_id","editor","own"]);
const drawer = ref(false);
const emit = defineEmits(["refreshCollages", "saved:collage_id", "refreshCollages"]);
const loaded = ref(false);
const { currentUsername } = storeToRefs(useUserStore());
let collage: any; 

const selectable = ref<boolean>(true);

const collageVisible = ref(false);
const toggleChildVisibility = () => {
  collageVisible.value = !collageVisible.value;
    };

// write a function that that will return url version of media given the media id by calling getMedia() to backend
//content is here because my backend 
const getCollageById = async () => {
  let collageObject;
  // console.log('content id',props.collage.content); 
  try {
     collageObject = await fetchy(`/api/collage/${props.collage_id.value}`, "GET", {
      query: {_id:props.collage_id.value},
    });
  } catch {
    return;
  }
  console.log('collage object', collageObject); 
  collage = collageObject;
};

const deleteCollage = async () => {
  try {
    await fetchy(`/api/collages/${props.collage_id}`, "DELETE");
  } catch {
    return;
  }
  emit("refreshCollages");
};

onBeforeMount(async () => {
  await getCollageById();
  loaded.value = true;
});
</script>

<template>
  <div class="header" >
    <div class = "row">
        <p class="author">{{ collage.author }}</p>
        <p class="author">{{ collage.author }}</p>

    </div>
    
    <div class="sidebar">

    
      <label :name="props.collage.flair">{{ props.collage.flair }} </label>
      <menu v-if="props.collage.author == currentUsername">
      <li><button class="button-error pure_button" @click="deleteCollage">Delete</button></li>
    </menu>
    </div>
  </div>
  
  <!-- to see whats in the object, ref = .value  -->
  <!-- <p>{{ props.collage }}</p> -->
  <!-- content stuff  -->
  <!-- <p>{{ props.collage.content }}</p> -->
  <div class="container" v-if = "props.collage.collageType === 'Media'">
  
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
  
  <div class="base" v-show="!minimized">
    <div class="text">
      <p class="user">{{ props.collage.author }}</p> {{ props.collage.caption }}
      <div class="sidebar">
        <button class="button-error fav_button" @click="toggleChildVisibility">Favorite</button>
      </div>
    </div>
    <v-scroll-y-transition>
      <div class="container">
        <h4 v-if="collageVisible">Save Collage to Collage</h4>
        <CollageListComponent @selected:content_id="collage_id = $event" :selectable="selectable" v-if="collageVisible" required/>
        <!-- <p>Parent Value: {{ content_id }}</p> -->
      </div>
    </v-scroll-y-transition>
    
    <v-list-subheader>View Comments ></v-list-subheader>
    <article class="timestamp">
      <!-- need v_if for toggle button to select either  -->
      <p v-if="props.collage.dateCreated !== props.collage.dateUpdated">Edited on: {{ formatDate(props.collage.dateUpdated) }}</p>
      <p v-else>Created on: {{ formatDate(props.collage.dateCreated) }}</p>
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
