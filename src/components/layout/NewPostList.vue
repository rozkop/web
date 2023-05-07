<template>
<section class="flex w-full md:w-5/6 lg:w-2/3 mx-auto justify-between mb-6 px-2 xs:px-3">
  <div class="space-y-3 w-full">

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
function fetchData() {
  axios
      .get("http://127.0.0.1:8000/api/new")
      .then((response) => {
        posts.value = response.data.data;
        console.log(posts.value)
      })
      .catch((error) => {
        console.log(error);
      });
}


onMounted(async() => {
  fetchData();
});

</script>
