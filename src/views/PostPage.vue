<template>
  <CommunityBackground :color="color" :community_name="post.community_name" />

  <section class="flex w-full lg:w-11/12 mx-auto justify-between px-2 xs:px-3">
    <div class="space-y-2 w-full">
      <!--Post-->
      <div class="mt-6 dark:text-zinc-300 flex items-center overflow-x-auto sm:justify-center">
        <div class="scrollbar dark:dark-scrollbar flex w-full overflow-auto overflow-y-hidden rounded border border-gray-300 bg-white dark:border-[#343536] dark:bg-[#1a1a1b] sm:w-11/12 lg:w-5/6">
          <div class="hidden items-center py-4 xs:flex flex-col xs:w-12 shrink-0 ">
            <button @click="voteUp" class="dark:hover:bg-blue-900 hover:bg-blue-200 rounded">
              <img
                  v-if="!isDark"
                  src="/src/assets/upvote-black.svg" alt="" class="h-6" />
              <img
                  v-if="isDark"
                  src="/src/assets/upvote-light.svg" alt="" class="h-6" />
            </button>
            <div class="font-semibold my-2">
              {{ post.rating }}
            </div>
            <button @click="voteDown" class="dark:hover:bg-red-900 hover:bg-red-200 rounded">
              <img
                  v-if="!isDark"
                  src="/src/assets/downvote-black.svg" alt="" class="h-6" />
              <img
                  v-if="isDark"
                  src="/src/assets/downvote-light.svg" alt="" class="h-6" />
            </button>
          </div>

          <div class="flex flex-col">
            <div class="w-full dark:bg-[#1a1a1b] p-3 min-w-[16rem] shrink-0">
              <h1 class="font-semibold text-xl">{{ post.title }}</h1>
              <p class="mt-4">{{ post.text }}</p>
            </div>
            <div class="flex items-center w-full xs:dark:bg-[#1a1a1b] bg-gray-100 xs:bg-white dark:bg-[#161617] dark:border dark:border-transparent dark:border-t-[#343536] xs:dark:border-t-transparent py-1.5 px-1">

              <div class="flex xs:hidden mr-3">
                <button @click="voteUp" class="dark:hover:bg-blue-900 hover:bg-blue-200 rounded">
                  <img
                      v-if="!isDark"
                      src="/src/assets/upvote-black.svg" alt="" class="h-6" />
                  <img
                      v-if="isDark"
                      src="/src/assets/upvote-light.svg" alt="" class="h-6" />
                </button>

                <p class="font-semibold mx-2">{{ post.rating }}</p>

                <button @click="voteDown" class="dark:hover:bg-red-900 hover:bg-red-200 rounded">
                  <img
                      v-if="!isDark"
                      src="/src/assets/downvote-black.svg" alt="" class="h-6" />
                  <img
                      v-if="isDark"
                      src="/src/assets/downvote-light.svg" alt="" class="h-6" />
                </button>
              </div>

              <button v-if="!isLoading" class="flex hover:bg-zinc-50 dark:hover:bg-zinc-800 p-1 px-2 rounded" >
                <img v-if="!isDark" src="/src/assets/comment-black.svg" alt="" class="h-5" />
                <img v-if="isDark" src="/src/assets/comment-light.svg" alt="" class="h-5" />

                <span v-if="comments.length === 1" class="font-semibold text-xs ml-1.5">{{ comments.length }} Comment</span>
                <span v-else class="font-semibold text-xs ml-1.5">{{ comments.length }} Comments</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="dark:text-zinc-300 flex items-center overflow-x-auto sm:justify-center">
        <div class="flex w-full overflow-auto overflow-y-hidden rounded border border-gray-300 bg-white dark:border-[#343536] dark:bg-[#1a1a1b] sm:w-11/12 lg:w-5/6">

          <div class="p-6 flex flex-col w-full">
            <p class="text-xs text-black dark:text-zinc-400 px-0.5 pb-1">Comment it:</p>
            <textarea class="h-28 w-full border border-zinc-200 dark:border-zinc-900 rounded focus:outline-none focus:border-blue-400 dark:focus:border-zinc-500 p-3 bg-zinc-50 dark:bg-zinc-800" placeholder="What are your thoughts?"></textarea>
            <div class="justify-end flex ">
              <button class="mt-2 px-6 py-1.5 bg-[#0079d3] dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700 rounded-xl text-xs font-semibold text-white">Comment</button>
            </div>
          </div>

        </div>
      </div>

      <div v-if="comments.length" class="dark:text-zinc-300 flex items-center overflow-x-auto sm:justify-center">
        <div class="flex w-full overflow-auto overflow-y-hidden rounded border border-gray-300 bg-white dark:border-[#343536] dark:bg-[#1a1a1b] sm:w-11/12 lg:w-5/6">

          <div class="px-3 py-1 flex flex-col w-full">
            <div class="border border-zinc-300 dark:border-zinc-700 rounded-xl bg-gray-50 dark:bg-zinc-800 my-2 p-2" v-for="(comment, index) in comments" :key="comment.id">
              <p class="text-xs font-semibold break-words">Gall Anonim</p>
              <p class="text-xxs text-zinc-500 break-words">{{ comment.created_at }}</p>
                <p class="my-2 break-words">{{ comment.text }}</p>

              <div class="flex justify-start items-center">
                <button @click="commentVoteUp(index)" class="dark:hover:bg-blue-900 hover:bg-blue-200 rounded p-1">
                  <img
                      v-if="!isDark"
                      src="/src/assets/upvote-black.svg" alt="" class="h-5" />
                  <img
                      v-if="isDark"
                      src="/src/assets/upvote-light.svg" alt="" class="h-5" />
                </button>
                <p class="font-semibold px-1">{{ comment.rating }}</p>
                <button @click="voteDown(index)" class="dark:hover:bg-red-900 hover:bg-red-200 rounded p-1">
                  <img
                      v-if="!isDark"
                      src="/src/assets/downvote-black.svg" alt="" class="h-5" />
                  <img
                      v-if="isDark"
                      src="/src/assets/downvote-light.svg" alt="" class="h-5" />
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>

    <CommunityInfoCard :community_name="post.community_name"/>
  </section>
</template>

<script setup>

import axios from "axios";
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import {useDark} from "@vueuse/core/index";
import CommunityBackground from '../components/UI/CommunityBackground.vue';
import CommunityInfoCard from "../components/UI/CommunityInfoCard.vue";

const isDark = useDark();

const route = useRoute();
const router = useRouter();

const post = ref([]);
const comments = ref([]);

const isLoading = ref(true);


const color = ref('#fff123');

function fetchData() {
  axios
    .get("http://127.0.0.1:8000/api/post/" + route.params.id)
    .then((response) => {
      post.value = response.data;
      comments.value = response.data.comments;

      router.push({
        name: "post",
        params: {
          community_name: response.data.community_name,
          id: response.data.id,
          slug: response.data.slug,
        },
      });

      isLoading.value = false;
      console.log(response.data);
      console.log(route.params);
    })
    .catch((error) => {
      console.log(error);
      isLoading.value = false;
    });
}

function commentVoteUp(id) {
  comments.value[id].rating++;
}


function voteDown(id) {
  comments.value[id].rating--;
}

onMounted(async () => {
  fetchData();
});
</script>