import { storeToRefs } from "pinia";
import { createRouter, createWebHistory } from "vue-router";

import { useUserStore } from "@/stores/user";
import AddCollageView from "../views/AddCollageView.vue";
import AddView from "../views/AddView.vue";
import CollageView from "../views/CollageView.vue";
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/LoginView.vue";
import MediaView from "../views/MediaView.vue";
import NotFoundView from "../views/NotFoundView.vue";
import ProfileView from "../views/ProfileView.vue";
import SettingView from "../views/SettingView.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "Home",
      component: HomeView,
      meta: { requiresAuth: true },
    },
    {
      path: "/profile",
      name: "Profile",
      component: ProfileView,
      meta: { requiresAuth: true },
    },
    {
      path: "/addCollage",
      name: "AddCollage",
      component: AddCollageView,
      meta: { requiresAuth: true },
    },
    {
      path: "/addPost",
      name: "AddPost",
      component: AddView,
      meta: { requiresAuth: true },
    },
    {
      path: "/setting",
      name: "Settings",
      component: SettingView,
      meta: { requiresAuth: true },
    },
    {
      path: "/collage",
      name: "Collage",
      component: CollageView,
      meta: { requiresAuth: true },
    },
    {
      path: "/media",
      name: "Media",
      component: MediaView,
      meta: { requiresAuth: true },
    },
    {
      path: "/login",
      name: "Login",
      component: LoginView,
      meta: { requiresAuth: false },
      beforeEnter: (to, from) => {
        const { isLoggedIn } = storeToRefs(useUserStore());
        if (isLoggedIn.value) {
          return { name: "Settings" };
        }
      },
    },
    {
      path: "/:catchAll(.*)",
      name: "not-found",
      component: NotFoundView,
    },
  ],
});

/**
 * Navigation guards to prevent user from accessing wrong pages.
 */
router.beforeEach((to, from) => {
  const { isLoggedIn } = storeToRefs(useUserStore());

  if (to.meta.requiresAuth && !isLoggedIn.value) {
    return { name: "Login" };
  }
});

export default router;
