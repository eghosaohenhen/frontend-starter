<script setup lang="ts">
import { useToastStore } from "@/stores/toast";
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";
import { computed, onBeforeMount } from "vue";
import { RouterLink, RouterView, useRoute } from "vue-router";

const currentRoute = useRoute();
const currentRouteName = computed(() => currentRoute.name);
const userStore = useUserStore();
const { isLoggedIn } = storeToRefs(userStore);
const { toast } = storeToRefs(useToastStore());

// Make sure to update the session before mounting the app in case the user is already logged in
onBeforeMount(async () => {
  try {
    await userStore.updateSession();
  } catch {
    // User is not logged in
  }
});
</script>

<template>
  <!-- <link href="https://fonts.googleapis.com/css2?family=Fredoka&display=swap" rel="stylesheet"> -->
  <header>
    <nav v-if="isLoggedIn">
      <div class="title">
        
        <RouterLink :to="{ name: 'Home' }">
          <img src="@/assets/images/picture.png" />
        </RouterLink>
      </div>
      <ul>
        <li>
          <RouterLink :to="{ name: 'Home' }" :class="{ underline: currentRouteName == 'Home' }" > Explore </RouterLink>
        </li>
        <li v-if="isLoggedIn">
          <RouterLink :to="{ name: 'Settings' }" :class="{ underline: currentRouteName == 'Settings' }"> Settings </RouterLink>
        </li>
        
        <li v-else>
          <RouterLink :to="{ name: 'Login' }" :class="{ underline: currentRouteName == 'Login' }"> Login </RouterLink>
        </li>
        <li v-if="isLoggedIn">
          <RouterLink :to="{ name: 'Media' }" :class="{ underline: currentRouteName == 'Media' }"> Media </RouterLink>
        </li>
      </ul>
    </nav>
    <article v-if="toast !== null" class="toast" :class="toast.style">
      <p>{{ toast.message }}</p>
    </article>
  </header>
  <RouterView />
</template>

<style scoped>
@import "./assets/toast.css";
@import "./assets/main.css";

nav {
  padding: 1em 2em;
  display: flex;
  align-items: center;
}
li {
  font-family: 'Starborn';
  color: #2f01d1ff !important;
}

h1 {
  font-size: 1em;
  margin: 0;
}
body {
  background-color: lightblue;
}

.title {
  display: flex;
  align-items: center;
  gap: 0.5em;
}

img {
  height: 3em;
}

a {
  font-size: large;
  color: #2f01d1ff;
  text-decoration: none;
}

ul {
  list-style-type: none;
  margin-left: auto;
  display: flex;
  align-items: center;
  flex-direction: row;
  gap: 1em;
}

.underline {
  text-decoration-color: purple;
}
</style>
