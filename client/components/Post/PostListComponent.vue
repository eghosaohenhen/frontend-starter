<script setup lang="ts">
import PostComponent from "@/components/Post/PostComponent.vue";
import { useUserStore } from "@/stores/user";
import { fetchy } from "@/utils/fetchy";
import { storeToRefs } from "pinia";
import { onBeforeMount, ref } from "vue";
import SearchPostForm from "./SearchPostForm.vue";

const { isLoggedIn } = storeToRefs(useUserStore());
const { currentUsername } = storeToRefs(useUserStore());
const props = defineProps(["selectable", "own"]);
const loaded = ref(false);
let posts = ref<Array<Record<string, string>>>([]);
// let editing = ref("");
// props are like the constructor values for calls to this object 
async function getPosts(filterType?: string, filter?:string) {
  //author is actually 
  let query: Record<string, string>;
  if(filterType === "author"){
    query = (filter)? {author:filter}:{}; 
  }else{
    query = (filter)? {flair:filter}:{};
  }
  
  console.log(query);
  let postResults;
  try {
    postResults = await fetchy("/api/posts", "GET", { query });
  } catch (_) {
    return;
  }
  console.log(postResults)
  posts.value = postResults;
}
async function addContent(post_id:string, collage_id:string) {
  console.log("in add content this is post", post_id, collage_id)
    // let lquery: Record<string, string> =props.collage._id !== undefined ? { _id:props.collage._id } : {};
  let contentResults;
  try {
    let newFavorite = await fetchy(`api/favorites/${post_id}/collages/${collage_id}`, 
    "POST", 
    { body: {item_id:post_id, collage_id: collage_id}, });
    console.log(newFavorite.value, "newFavorite");

  } catch (_) {
    return;
  }
  // console.log(contentResults, "contentresults");
  // newFavorite.value = contentResults;
 
}
// function updateEditing(id: string) {
//   editing.value = id;
// }

onBeforeMount(async () => {
  if (props.own) {
    await getPosts("author", currentUsername.value);
  } else {
    await getPosts();
  }
  loaded.value = true;
});
</script>
<!-- v-if="!props.own" -->
<template>
  <div class="row">
    <SearchPostForm @getPostsByFilter="getPosts" />
  </div>
  <section class="posts" v-if="loaded && posts.length !== 0">
    <article v-for="(post,index) in posts" :key="post._id">
        <PostComponent :post="post" @refreshPosts="getPosts" :index="index" @saved:post_id="addContent"/>
      <!-- <PostComponent v-if="editing !== post._id" :post="post" @refreshPosts="getPosts" @editPost="updateEditing" />
      <EditPostForm v-else :post="post" @refreshPosts="getPosts" @editPost="updateEditing" /> -->
    </article>
  </section>
  <p v-else-if="loaded">No posts found</p>
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

.posts {
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
