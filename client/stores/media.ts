import { useUserStore } from "@/stores/user";
import { defineStore, storeToRefs } from "pinia";
import { computed, ref } from "vue";

import { fetchy } from "@/utils/fetchy";

export const useMediaStore = defineStore(
  "media",
  () => {
    //add support for different media types
    const currentMediaUrl = ref("");
    const { currentUsername } = storeToRefs(useUserStore());
    const isUploadedMedia = computed(() => currentMediaUrl.value !== "");

    const resetStore = () => {
      currentMediaUrl.value = "";
    };

    const uploadMedia = async (mediaUrl: string) => {
      await fetchy("/api/media", "POST", {
        body: { username: currentUsername.value, content: mediaUrl },
      });
    };

    // const updateSession = async () => {
    //   try {
    //     const { username } = await fetchy("/api/session", "GET", { alert: false });
    //     currentUsername.value = username;
    //   } catch {
    //     currentUsername.value = "";
    //   }
    // };

    // const logoutUser = async () => {
    //   await fetchy("/api/logout", "POST");
    //   resetStore();
    // };

    // const updateUser = async (patch: BodyT) => {
    //   await fetchy("/api/users", "PATCH", { body: { update: patch } });
    // };

    const deleteMedia = async () => {
      await fetchy("/api/media", "DELETE");
      resetStore();
    };

    return {
      currentMediaUrl,
      isUploadedMedia,
      uploadMedia,
      deleteMedia,
    };
  },
  { persist: true },
);
