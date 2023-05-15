<template>
  <section
    class="mx-auto my-6 flex w-full justify-between px-2 xs:px-3 md:w-5/6 lg:w-2/3"
  >
    <div class="w-full space-y-3">
      <PostInput v-if="isAuth" />
      <PostFiltersCard />

      <div v-for="post in posts" :key="post.id">
        <ThePost @doFetchData="fetchData" :post="post" />
      </div>
    </div>
    <FrontpageInfoCard />
  </section>
</template>

<script setup>
import FrontpageInfoCard from "../UI/FrontpageInfoCard.vue";
import PostInput from "../UI/PostInput.vue";
import PostFiltersCard from "../UI/PostFiltersCard.vue";
import ThePost from "../UI/ThePost.vue";

import axios from "axios";
import { ref, onMounted } from "vue";

const posts = ref([]);

async function fetchData() {
  await axios
    .get("/api/")
    .then((response) => {
      posts.value = response.data.data;
      posts.value.forEach((post) => {
        post.created_at = new Date(post.created_at).toLocaleDateString();
        post.rating = JSON.parse(post.rating);
        post.rating = (post.rating.like || 0) - (post.rating.dislike || 0);
      });
    })
    .catch((error) => {
      console.log(error);
    });
}

const isAuth = ref(false);

onMounted(async () => {
  await fetchData();
  if ($cookies.get("auth_token")) {
    isAuth.value = true;
  }
});
</script>
