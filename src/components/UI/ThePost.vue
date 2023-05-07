<template>
  <!--Post-->
  <div class="dark:text-zinc-300 flex items-center overflow-x-auto sm:justify-center">
    <div class="scrollbar dark:dark-scrollbar flex w-full overflow-auto overflow-y-hidden rounded border border-gray-300 bg-white dark:border-[#343536] dark:bg-[#1a1a1b] sm:w-5/6 hover:border-gray-400 dark:hover:border-zinc-600">
      <div class="hidden items-center py-4 xs:flex flex-col xs:w-12 shrink-0 bg-gray-100 dark:bg-[#161617]">
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

      <router-link :to="{
        name: 'post',
        params: {
          id: post.id,
          community_name: post.community_name,
          slug: post.slug,
        },
      }" class="flex flex-col">
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

          <button class="flex hover:bg-zinc-50 dark:hover:bg-zinc-800 p-1 px-2 rounded" >
            <img v-if="!isDark" src="/src/assets/comment-black.svg" alt="" class="h-5" />
            <img v-if="isDark" src="/src/assets/comment-light.svg" alt="" class="h-5" />

            <span v-if="post.comments.length === 1" class="font-semibold text-xs ml-1.5">{{ post.comments.length }} Comment</span>
            <span v-else class="font-semibold text-xs ml-1.5">{{ post.comments.length }} Comments</span>
          </button>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script setup>

import {useDark} from "@vueuse/core/index";

const isDark = useDark();

const props = defineProps(['post'])

function voteUp() {
  props.post.rating++;
}

function voteDown() {
  props.post.rating--;
}

</script>