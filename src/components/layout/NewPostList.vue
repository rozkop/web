<template>
  <section
    class="mx-auto mb-6 flex w-full justify-between px-2 xs:px-3 md:w-5/6 lg:w-2/3"
  >
    <div class="w-full space-y-3">
      <PostInput />
      <PostFiltersCard />

      <div v-for="post in posts" :key="post.id">
        <ThePost :post="post" />
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
    .get("/api/new")
    .then((response) => {
      posts.value = response.data.data;
      posts.value.forEach((post) => {
        post.created_at = new Date(post.created_at).toLocaleDateString();
      })
    })
    .catch((error) => {
      console.log(error);
    });
}

onMounted(async () => {
  await fetchData();
});
</script>
