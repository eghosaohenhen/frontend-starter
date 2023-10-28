<script setup lang="ts">
import { storeToRefs } from "pinia";
import { onBeforeMount, ref } from "vue";
import router from "../../router";
import { useUserStore } from "../../stores/user";
import { fetchy } from "../../utils/fetchy";
import PostComponent from "../Post/PostComponent.vue";

const props = defineProps(["collage"]);
const minimized = ref<boolean>(true);
let editors = ref<Array<Record<string, string>>>([]);
let content = ref<Array<Record<string, string>>>([]);
const drawer = ref(false);
const emit = defineEmits(["refreshCollages", "refreshContent","refreshEditors"]);
const loaded = ref(false);
const { currentUsername } = storeToRefs(useUserStore());
const mediaUrl = ref("");
async function switchPage() {
  void router.push({ name: "Collage" });
}
async function getEditors(collage_id: string) {
  let query: Record<string, string> = collage_id !== undefined ? { collage_id } : {};
  let editorResults;
  try {
    editorResults = await fetchy(`/api/collages/${props.collage._id}/editors`, "GET", { query });
  } catch (_) {
    return;
  }
  console.log(editorResults);
  editors.value = editorResults;
}
async function getContent(collage_id: string) {
  let query: Record<string, string> = collage_id !== undefined ? { collage_id } : {};
  let contentResults;
  try {
    contentResults = await fetchy(`/api/collages/${props.collage._id}/content`, "GET", { query });
  } catch (_) {
    return;
  }
  console.log(contentResults);
  content.value = contentResults;
}
// write a function that that will return url version of media given the media id by calling getMedia() to backend
//content is here because my backend 

const deleteCollage = async () => {
  try {
    await fetchy(`/api/collages/${props.collage._id}`, "DELETE");
  } catch {
    return;
  }
  emit("refreshCollages");
};

onBeforeMount(async () => {
  await getEditors(props.collage._id);
  loaded.value = true;
});
</script>

<template @onClick="">
  
  
  <!-- to see whats in the object, ref = .value  -->
  <!-- <p>{{ props.post }}</p> -->
  <!-- content stuff  -->
  <!-- <p>{{ props.post.content }}</p> -->
  
  <div class="container">
    
    <section class="contents">
    <div class="left">
        <div class = "large" v-if="loaded && content.length !== 0">
        <PostComponent :post= "content[0]" :minimized="minimized" @refreshContent="getContent"></PostComponent>
        </div>
        <div class ="large" id="grey" v-else></div>
    </div>
    <div class="right">
        <div class = "small" v-if="loaded && content.length > 1">
        <PostComponent :post= "content[1]" :minimized="minimized" @refreshContent="getContent"></PostComponent>
        </div>
        <div class ="small "  id="grey" v-else></div>
        <div class = "small" v-if="loaded && content.length > 2">
        <PostComponent :post= "content[2]" :minimized="minimized" @refreshContent="getContent"></PostComponent>
        </div>
        <div class ="small"  id="grey" v-else></div>
    </div>
    </section>
  </div>
    <div class="footer">
    {{ props.collage.name }}
    <p class="author">
        <h3>Editors</h3>
        <article v-for="(editor,index) in editors" :key="collage._id">
            <section @refreshEditors="getEditors">
                <v-list-subheader v-if="index < 3">{{ editor }} </v-list-subheader>
                <v-list-subheader v-else>... </v-list-subheader>
            </section>
        </article></p>
    <!-- <div class="sidebar">

    
      <label :name="props.post.flair">{{ props.post.flair }} </label>
      <menu v-if="props.post.author == currentUsername">
      <li><button class="button-error pure_button" @click="deletePost">Delete</button></li>
    </menu>
      <img class= "icon" @click="toggleOptions" src="@/assets/images/menu.svg">
    </div> -->
  </div>
  
  
</template>

<style scoped>
p {
  margin: 0em;
}
.large{
    width:150px;
}
.small{
    width:75px;
}
.right{
    display:flex;
    flex-direction: column;
}
.contents{
    display:flex;
    flex-direction: row;
}

#grey{
    background-color: dimgray;
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
