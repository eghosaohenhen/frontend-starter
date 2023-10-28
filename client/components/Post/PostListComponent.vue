<script setup lang="ts">
import PostComponent from "@/components/Post/PostComponent.vue";
import { useUserStore } from "@/stores/user";
import { fetchy } from "@/utils/fetchy";
import { storeToRefs } from "pinia";
import { onBeforeMount, ref } from "vue";
import SearchPostForm from "./SearchPostForm.vue";

const { isLoggedIn } = storeToRefs(useUserStore());
const props = defineProps(["selectable"]);
const loaded = ref(false);
const minimized = ref(true);
let posts = ref<Array<Record<string, string>>>([]);
// let editing = ref("");
let searchAuthor = ref("");
// props are like the constructor values for calls to this object 
async function getPosts(author?: string) {
  let query: Record<string, string> = author !== undefined ? { author } : {};
  let postResults;
  try {
    postResults = await fetchy("/api/posts", "GET", { query });
  } catch (_) {
    return;
  }
  console.log(postResults)
  searchAuthor.value = author ? author : "";
  posts.value = postResults;
}

// function updateEditing(id: string) {
//   editing.value = id;
// }

onBeforeMount(async () => {
  await getPosts();
  loaded.value = true;
});
</script>

<template>
  <div class="row">
    <!-- <h2 v-if="!searchAuthor">Posts:</h2>
    <h2 v-else>Posts by {{ searchAuthor }}:</h2> -->
    <SearchPostForm class= "side" @getPostsByAuthor="getPosts" />
  </div>
  <section class="posts" v-if="loaded && posts.length !== 0">
    <article v-for="post in posts" :key="post._id">
        <PostComponent :post="post" @refreshPosts="getPosts" />
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
