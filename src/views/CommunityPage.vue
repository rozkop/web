<template>
  <CommunityBackground :color="community.color"/>
  <section
    class="mx-auto my-6 flex w-full justify-between px-2 xs:px-3 md:w-5/6 lg:w-2/3"
  >
    <div class="w-full space-y-3">

        <!-- Filter tabs -->
        <div class="flex justify-center">
          <div
              class="flex w-full justify-start rounded-md border bg-transparent dark:border-zinc-700 xs:justify-evenly border-gray-300 bg-white p-3 dark:border-[#343536] dark:bg-[#1a1a1b] sm:w-5/6 sm:justify-start"
          >
            <!--Desktop screen size-->
            <div
                class="font-semibold text-zinc-600 dark:text-zinc-300 flex flex-wrap"
            >
              <div class="cursor-pointer" @click="changeFilter('hot')">
                <div
                    class="flex items-center rounded-lg px-2 mr-2 py-1 hover:bg-gray-50 hover:text-[#0079d3] dark:hover:bg-[#252524] dark:hover:text-zinc-200"
                >
                  <img
                      v-if="!isDark"
                      src="/src/assets/fire-black.svg"
                      alt=""
                      class="h-5 pr-2"
                  />
                  <img
                      v-if="isDark && route.params.filter !== 'hot'"
                      src="/src/assets/fire-light.svg"
                      alt=""
                      class="h-5 pr-2 fill-orange-600"
                  />
                  <img
                      v-if="isDark && route.params.filter === 'hot'"
                      src="/src/assets/fire-orange.svg"
                      alt=""
                      class="h-5 pr-2"
                  />
                  <p :class="route.params.filter === 'hot' ? 'text-[#0079d3] dark:text-[#ff6542]' : 'text-zinc-900 dark:text-zinc-300' ">Hot</p>
                </div>
              </div>

              <div class="cursor-pointer" @click="changeFilter('new')">
                <div
                    class="flex items-center rounded-lg px-2 py-1 hover:bg-gray-50 dark:hover:bg-[#252524] dark:hover:text-zinc-200"
                >
                  <img
                      v-if="!isDark"
                      src="/src/assets/new-icon-black.svg"
                      alt=""
                      class="h-5 pr-2"
                  />
                  <img
                      v-if="isDark && route.params.filter !== 'new'"
                      src="/src/assets/new-icon-light.svg"
                      alt=""
                      class="h-5 pr-2"
                  />
                  <img
                      v-if="isDark && route.params.filter === 'new'"
                      src="/src/assets/new-icon-orange.svg"
                      alt=""
                      class="h-5 pr-2"
                  />
                  <p :class="route.params.filter === 'new' ? 'text-[#0079d3] dark:text-[#ff6542]' : 'text-zinc-900 dark:text-zinc-300' ">New</p>
                </div>
              </div>
            </div>
          </div>
        </div>

      <div v-for="post in posts" :key="post.id">
        <ThePost :post="post" />
      </div>
    </div>

    <div
        class="hidden h-full w-1/4 shrink-0 rounded border border-gray-300 bg-white p-3 dark:border-[#343536] dark:bg-[#1a1a1b] dark:text-zinc-200 md:flex"
    >
      <CommunityInfoCard :community="community" />
    </div>
  </section>
</template>

<script setup>
import CommunityBackground from "../components/UI/CommunityBackground.vue";
import CommunityInfoCard from "../components/UI/CommunityInfoCard.vue";
import ThePost from "../components/UI/ThePost.vue";

import axios from "axios";
import {ref, onMounted } from "vue";

import { useRoute, useRouter } from "vue-router";
import { useDark } from "@vueuse/core/index";

const isDark = useDark();


const route = useRoute();
const router = useRouter();

const posts = ref([]);
const community = ref([]);


function changeFilter(newFilter) {
  router.push({params: {
    filter: newFilter
  }})

  fetchCommunityPosts(newFilter);
}

function fetchCommunityPosts(filter = route.params.filter) {
  axios
    .get("/api/c/" + route.params.community_name + '/' + filter)
    .then((response) => {
      console.log(response)
      posts.value = response.data.data.Posts;
      posts.value.forEach((post) => {
        post.created_at = new Date(post.created_at).toLocaleDateString();
      })

      community.value = response.data.data.Community;
      community.value.created_at = new Date(community.value.created_at).toLocaleDateString();
    })
    .catch((error) => {
      console.log(error);
    });
}


onMounted(async () => {
  fetchCommunityPosts();
});
</script>