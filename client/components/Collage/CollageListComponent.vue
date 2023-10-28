
import CollageViewVue from '../../views/CollageView.vue';
<script setup lang="ts">
import MiniCollageComponent from "@/components/Collage/MiniCollageComponent.vue";
import { useUserStore } from "@/stores/user";
import { fetchy } from "@/utils/fetchy";
import { storeToRefs } from "pinia";
import { onBeforeMount, ref } from "vue";
import SearchCollageForm from "./SearchCollageForm.vue";

const { isLoggedIn } = storeToRefs(useUserStore());
const props = defineProps(["selectable","minimized","small"]);
const emit = defineEmits([ "selected:collage_id", "refreshCollages"]);
const loaded = ref(false);
const { currentUsername } = storeToRefs(useUserStore());
let collages = ref<Array<Record<string, string>>>([]);
let selectTarget = ref<string>("");
let selectedOne = ref<boolean>(false);
let searchName = ref("");
// props are like the constructor values for calls to this object 
async function getCollages(name?: string) {
  let query: Record<string, string> = name !== undefined ? { name } : {};
  let collageResults;
  try {
    collageResults = await fetchy("/api/collages", "GET", { query });
  } catch (_) {
    return;
  }
  console.log(collageResults)
  searchName.value = name ? name : "";
  collages.value = collageResults;
}
async function toggleOverlay (index:number) {
    selectTarget.value = collages.value[index]._id;
    selectedOne.value = true;
    emit("selected:collage_id", selectTarget.value);
};
// function updateEditing(id: string) {
//   editing.value = id;
// }

onBeforeMount(async () => {
  await getCollages();
  loaded.value = true;
});
</script>

<template>
  
    <h2 v-if="!searchName">Collages:</h2>
    <h2 v-else>Collages by {{ searchName }}:</h2>
    <SearchCollageForm class= "side" @getCollagesByName="getCollages(currentUsername)" />
    
  <section class="collages" v-if="loaded && collages.length !== 0">
    <article v-for="(collage,index) in collages" :key="collage._id">
        <div v-if="selectable">
            <MiniCollageComponent :collage="collage" @onClick= "toggleOverlay(index)" @refreshCollages="getCollages" />
            <div class="overlay" v-show="selectTarget === collage._id"></div>
       
        </div>

      <MiniCollageComponent :collage="collage" @refreshCollages="getCollages" />
      
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

.row {
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  max-width: 60em;
}
</style>