<script setup lang="ts">
import UploadMedia from "@/components/Media/UploadMedia.vue";
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";
import { onBeforeMount, ref } from "vue";
import { fetchy } from "../../utils/fetchy";

// https://vuetifyjs.com/en/components/images/#caveats
const props = defineProps(["selectable"]);
let medias = ref<Array<Record<string, string>>>([]);
let selectTarget = ref<string>("");
let selectedOne = ref<boolean>(false);
const { currentUsername,isLoggedIn } = storeToRefs(useUserStore());
const emit = defineEmits(["refreshMedias", "selectedMedia", "selected:content_id", "selected:content_type"]);
// are emits async EGGO Q
async function toggleOverlay (index:number) {
    selectTarget.value = medias.value[index]._id;
    selectedOne.value = true;
    emit("selected:content_id", selectTarget.value);
    emit("selected:content_type", "Media");
};


async function getMedias(username?: string) {
  let query: Record<string, string> = username !== undefined ? { author:username } : {};
    console.log(query);
  let postResults;
  try {
    postResults = await fetchy("/api/media", "GET", { query });
    console.log(postResults);
  } catch (_) {
    return;
  }
  medias.value = postResults;
//   overlayVisible.value = Array(postResults.length).fill(false);
  emit("refreshMedias");
}

onBeforeMount(async () => {
  await getMedias(currentUsername.value);
});
</script>
<template>
    <!-- {{ medias }} -->
    <section v-if="isLoggedIn">
        <UploadMedia @refreshMedias="getMedias" />
        <v-row>
            <v-col
            v-for="(media,index) in medias"
            :key=media._id
            class="d-flex child-flex"
            cols="4"
            id = "image-container"
            
            >
                <v-img
                    :src="`${media.content}`"
                    :lazy-src="`${media.content}`"
                    
                    aspect-ratio="1"
                    cover
                    class="bg-grey-lighten-2"
                    @click="toggleOverlay(index)"
                >
                <!-- {{ selectable }}
                {{ selectTarget }} -->
                <template v-if="selectable">
                    <div class="overlay" v-show="selectTarget === media._id"></div>
                </template>
                    <template v-slot:error>
                        <v-img
                            class="mx-auto"
                            cover
                            :src="`not-found-real.png`"
                        ></v-img>
                        
                    <v-row
                        class="fill-height ma-0"
                        align="center"
                        justify="center"
                    >
                        <v-progress-circular
                        indeterminate
                        color="grey-lighten-5"
                        ></v-progress-circular>
                    </v-row>
                    </template>
                </v-img>
                
            </v-col>
        </v-row>
            <!-- <article v-for="media in medias" :key="media._id">
                <img :src="`${media.content}`" alt="Media Upload" width="128" height="128">
            
            <EditPostForm v-else :post="post" @refreshPosts="getPosts" @editPost="updateEditing" />
            </article> -->
    </section>
    <!-- bootstrap for styling html and css have to import then I can copy paste -->
</template>

<style scoped>
/* #image-container {
    position: relative;
    margin: 10px;
    cursor: pointer;
  } */

  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.5); /* White overlay with transparency */
    display: block;
  }

  .image-container:hover .overlay,
  .overlay.active {
    display: block;
  }

</style>