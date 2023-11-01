
import CollageViewVue from '../../views/CollageView.vue';
<script setup lang="ts">
import MiniCollageComponent from "@/components/Collage/MiniCollageComponent.vue";
import { useUserStore } from "@/stores/user";
import { fetchy } from "@/utils/fetchy";
import { storeToRefs } from "pinia";
import { onBeforeMount, ref } from "vue";

const { isLoggedIn } = storeToRefs(useUserStore());
const props = defineProps(["selectable", "own", "editor", "contributor"]);
const emit = defineEmits([ "selected:collage", "refreshCollages"]);
const loaded = ref(false);
const { currentUsername } = storeToRefs(useUserStore());
let collages = ref<Array<Record<string, string>>>([]);
let selectTarget = ref<string>("hu");
let selectedOne = ref<boolean>(false);
let searchName = ref("");

// props are like the constructor values for calls to this object 
async function getCollages(filterType?: string, filter?:string) {
  //author is actually 
  let query: Record<string, string>;
  if(filterType === "author"){
    query = (filter)? {author:filter}:{}; 
  }else if (filterType === "contributor"){
    query = (filter)? {exclusive: "true", editor:filter}:{};
  }else{
    query = (filter)? {editor:filter}:{};
  }
  
  console.log(query, "collage query");
  let collageResults;
  try {
    collageResults = await fetchy("/api/collages", "GET", { query });
  } catch (_) {
    return;
  }
  console.log(collageResults)
  collages.value = collageResults;
}

async function toggleOver (index:number) {
  console.log('in select target', index);
  selectTarget.value = collages.value[index]._id;
  selectedOne.value = true;
  emit("selected:collage", selectTarget.value);
};
// function updateEditing(id: string) {
//   editing.value = id;
// }

onBeforeMount(async () => {
  if (props.own) {
    await getCollages("author", currentUsername.value);
  } else if (props.editor) {
    await getCollages("editor", currentUsername.value);
  }else if (props.contributor) {
    await getCollages("contributor", currentUsername.value);
  }else{
    await getCollages();

  }
  
  loaded.value = true;
});
</script>

<template>
  
    <h2 v-if="!searchName">Collages:</h2>
    <h2 v-else>Collages by {{ searchName }}:</h2>
    <!-- @refreshCollages="getCollages('contributor', currentUsername) -->
    <!-- <SearchCollageForm class= "side" @getCollagesByName="getCollages(currentUsername)" :own="props.own" :editor="props.editor"/> -->
  <section class="collages" v-if="loaded && collages.length !== 0">
    <article @onClick= "toggleOver(index)" v-for="(collage,index) in collages" :key="collage._id">
      {{ selectable }}
      {{ selectTarget }}

      
        <div v-show="selectable">
            
              <MiniCollageComponent :collage="collage" />
            <!-- <div class="overlay" v-show="selectTarget === collage._id"></div> -->
       
        </div>

      <!-- <MiniCollageComponent :collage="collage" @refreshCollages="getCollages" /> -->
      
    </article>
  </section>
  <p v-else-if="loaded">No collages found</p>
  <p v-else>Loading...</p>
</template>

<style scoped>
section {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 1em;
}
.side{
  list-style-type: none;
  margin-left: auto;
  display: flex;
  align-items: center;
  flex-direction: row;
  gap: 1em;
}
section,
p,
.row {
  margin: 0 auto;
  max-width: 100%;
  justify-content: center;
  display: flex;
  align-items: center;
  flex-direction: row;
  gap: 1em;
}

article {
  background-color: #ffffff;
  border-radius: 1em;
  display: flex;
  flex-direction: column;
  gap: 0.5em;
  padding: 1em;
}

.collages {
  display: flex;
  padding: 1em;
  flex-wrap: wrap;
}
.overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.5); /* White overlay with transparency */
    display: block;
  }
.row {
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  max-width: 60em;
}
</style>