<template>
  <!-- Create Post Input -->
  <div
    :class="isAuth ? 'mt-4' : 'mt-1'"
    class="flex items-center overflow-x-auto sm:justify-center"
  >
    <div
      v-if="isAuth"
      class="scrollbar dark:dark-scrollbar flex h-16 w-full overflow-auto overflow-y-hidden rounded-md border border-gray-300 bg-white p-2 dark:border-[#343536] dark:bg-[#1a1a1b] sm:w-5/6"
    >
      <img
        v-if="avatarSrc"
        :src="avatarSrc"
        alt=""
        class="mr-2 hidden rounded-3xl p-1 xxs:flex"
      />
      <img
        v-else-if="!avatarSrc"
        src="https://eu.ui-avatars.com/api/background=e5e7eb?name="
        alt=""
        class="mr-2 hidden rounded-3xl p-1 xxs:flex"
      />

      <input
        @click="goToCreatePostPage"
        type="text"
        placeholder="Create Post"
        class="mr-1 min-w-[7rem] flex-grow rounded border bg-gray-100 px-4 text-black placeholder:text-sm placeholder:text-zinc-500 focus:outline-none dark:border-[#343536] dark:bg-[#272729] dark:text-gray-300 dark:hover:border-gray-500"
      />
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import { useAuth } from "../../composables/auth";
import { useRouter } from "vue-router";

const { userData } = useAuth();

const isAuth = ref(false);

const router = useRouter();

const avatarSrc = ref("");

const setAvatarSrc = () => {
  if (userData.name) {
    avatarSrc.value = `https://eu.ui-avatars.com/api/background=e5e7eb&color=151515?name=${userData.name}`;
  }
};

watch(userData, setAvatarSrc);

function goToCreatePostPage() {
  router.push({ name: "submit" });
}

onMounted(() => {
  if ($cookies.get("auth_token")) {
    isAuth.value = true;
  }
});
</script>
