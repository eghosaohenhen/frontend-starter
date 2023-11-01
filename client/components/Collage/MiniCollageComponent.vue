<script setup lang="ts">
import { storeToRefs } from "pinia";
import { onBeforeMount, ref } from "vue";
import router from "../../router";
import { useUserStore } from "../../stores/user";
import { fetchy } from "../../utils/fetchy";
import PostComponent from "../Post/PostComponent.vue";

const props = defineProps(["collage", "maximize"]);
let editors = ref<Array<Record<string, string>>>([]);
let content = ref<Array<Record<string, string>>>([]);
const drawer = ref(false);
const emit = defineEmits(["refreshCollages", "refreshContent","refreshEditors", "addContent"]);
const loaded = ref(false);
const { currentUsername } = storeToRefs(useUserStore());
const mediaUrl = ref("");
const minimized = ref(true); 
// const collageMaximized = ref(false);
// const toggleChildVisibility = () => {
//   collageMaximized.value = !collageMaximized.value;
//     };
async function switchPage() {
  void router.push({ name: "CollageComponent" });
}
async function getEditors() {
  let lquery: Record<string, string> = props.collage._id !== undefined ? { _id:props.collage._id } : {};
  console.log(lquery, props.collage._id, "HEERE");
  let editorResults;
  try {
    editorResults = await fetchy(`/api/collages/editors/${props.collage._id}`, "GET", { query: {_id:props.collage._id}, });
  } catch (_) {
    return;
  }
  console.log(editorResults);
  editors.value = editorResults;
  
}
async function getContent() {
    let lquery: Record<string, string> =props.collage._id !== undefined ? { _id:props.collage._id } : {};
  let contentResults;
  try {
    contentResults = await fetchy(`/api/collages/content/${props.collage._id}`, "GET", { query: {_id:props.collage._id}, });
  } catch (_) {
    return;
  }
  console.log(contentResults, "contentresults");
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
  await getEditors();
  await getContent();
  loaded.value = true;
});
</script>

<template>
  
  
  <!-- to see whats in the object, ref = .value  -->
  <!-- <p>{{ props.post }}</p> -->
  <!-- content stuff  -->
  <!-- <p>{{ props.post.content }}</p> -->
  <article>
  <div class="container" @onClick="switchPage">
    
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
      <h3>{{ props.collage.name }} </h3>
    
        Editors
        <div class ="row">
        <div v-for="(editor,index) in editors" :key="collage._id">
            
                <v-list-subheader id='chip' v-if="index < 3">{{ editor }}</v-list-subheader>
                <v-list-subheader v-else>... </v-list-subheader>
            
          </div>
        </div>
    <!-- <div class="sidebar">

    
      <label :name="props.post.flair">{{ props.post.flair }} </label>
      <menu v-if="props.post.author == currentUsername">
      <li><button class="button-error pure_button" @click="deletePost">Delete</button></li>
    </menu>
      <img class= "icon" @click="toggleOptions" src="@/assets/images/menu.svg">
    </div> -->
  </div>
</article>
  
  
</template>

<style scoped>
article {
  background-color: #ffffff;
  border-radius: 1em;
  display: flex;
  flex-direction: column;
  gap: 0.5em;
  padding: 1em;
}
p {
  margin: 0em;
}
#chip{
  display: inline-block;
  padding: 0 15px;
  height: 30px;
  font-size: 16px;
  line-height: 40px;
  border-radius: 15px;
  background-color: var(--base-bg);
}
.row{
  display:flex;
  flex-flow: row wrap;
}
.large{
    width:100px;
    height:200px;
    padding: 10px;
    
}
.small{
    width:85px;
    height:95px;
    
}
.right{
    width:100px;
    display:flex;
    flex-flow: column nowrap;
    justify-content:space-between;
    align-items: center;
    
}
.contents{
    display:flex;
    flex-flow: row nowrap;
    align-content: space-between;
    width: 200px;
    height:200px;
}

#grey{
    background: dimgray;
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
