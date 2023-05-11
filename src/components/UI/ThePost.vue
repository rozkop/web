<template>
  <!--Post-->
  <div
    class="flex items-center overflow-x-auto dark:text-zinc-300 sm:justify-center"
  >
    <div
      class="scrollbar dark:dark-scrollbar flex w-full overflow-auto overflow-y-hidden rounded border border-gray-300 bg-white hover:border-gray-400 dark:border-[#343536] dark:bg-[#1a1a1b] dark:hover:border-zinc-600 sm:w-5/6"
    >
      <div
        class="hidden shrink-0 flex-col items-center bg-gray-100 py-4 dark:bg-[#161617] xs:flex xs:w-12"
      >
        <button
          @click="voteUp"
          class="rounded hover:bg-blue-200 dark:hover:bg-blue-900"
        >
          <img
            v-if="!isDark"
            src="/src/assets/upvote-black.svg"
            alt=""
            class="h-6"
          />
          <img
            v-if="isDark"
            src="/src/assets/upvote-light.svg"
            alt=""
            class="h-6"
          />
        </button>
        <div class="my-2 font-semibold">
          {{ post.rating }}
        </div>
        <button
          @click="voteDown"
          class="rounded hover:bg-red-200 dark:hover:bg-red-900"
        >
          <img
            v-if="!isDark"
            src="/src/assets/downvote-black.svg"
            alt=""
            class="h-6"
          />
          <img
            v-if="isDark"
            src="/src/assets/downvote-light.svg"
            alt=""
            class="h-6"
          />
        </button>
      </div>

      <router-link
        :to="{
          name: 'post',
          params: {
            id: post.id,
            community_name: post.community.name,
            slug: post.slug,
          },
        }"
        class="flex flex-col w-full"
      >
        <div class="w-full min-w-[16rem] shrink-0 p-3 dark:bg-[#1a1a1b]">
          <div class="flex flex-col">
            <router-link
                :to="{
                    name: 'community',
                    params: {
                      community_name: post.community.name,
                      filter: '',
                    },
                  }"
                class="text-xs font-bold hover:underline"
            >u/{{ post.community.name }}
            </router-link>
            <div class="flex space-x-1 items-center">
              <p class="text-xxs overflow-auto">Posted by {{ post.user }} </p>
              <p class="text-xxs text-zinc-400">• {{ post.created_at }}</p>
            </div>
          </div>

          <h1 class="text-xl font-semibold">{{ post.title }}</h1>
          <p class="mt-2">{{ post.text }}</p>
        </div>
        <div
          class="flex w-full items-center bg-gray-100 px-1 py-1.5 dark:border dark:border-transparent dark:border-t-[#343536] dark:bg-[#161617] xs:bg-white xs:dark:border-t-transparent xs:dark:bg-[#1a1a1b]"
        >
          <div class="mr-3 flex xs:hidden">
            <button
              @click="voteUp"
              class="rounded hover:bg-blue-200 dark:hover:bg-blue-900"
            >
              <img
                v-if="!isDark"
                src="/src/assets/upvote-black.svg"
                alt=""
                class="h-6"
              />
              <img
                v-if="isDark"
                src="/src/assets/upvote-light.svg"
                alt=""
                class="h-6"
              />
            </button>

            <p class="mx-2 font-semibold">{{ post.rating }}</p>

            <button
              @click="voteDown"
              class="rounded hover:bg-red-200 dark:hover:bg-red-900"
            >
              <img
                v-if="!isDark"
                src="/src/assets/downvote-black.svg"
                alt=""
                class="h-6"
              />
              <img
                v-if="isDark"
                src="/src/assets/downvote-light.svg"
                alt=""
                class="h-6"
              />
            </button>
          </div>

          <button
            class="flex rounded p-1 px-2 hover:bg-zinc-50 dark:hover:bg-zinc-800"
          >
            <img
              v-if="!isDark"
              src="/src/assets/comment-black.svg"
              alt=""
              class="h-5"
            />
            <img
              v-if="isDark"
              src="/src/assets/comment-light.svg"
              alt=""
              class="h-5"
            />

            <span
              v-if="post.count_comments === 1"
              class="ml-1.5 text-xs font-semibold"
              >{{ post.count_comments }} Comment</span
            >
            <span v-else class="ml-1.5 text-xs font-semibold"
              >{{ post.count_comments }} Comments</span
            >
          </button>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { useDark } from "@vueuse/core/index";

const isDark = useDark();

const props = defineProps(["post"]);

function voteUp() {
  props.post.rating++;
}

function voteDown() {
  props.post.rating--;
}
</script>
