<template>
  <router-link
    class="flex"
    :to="{
      name: 'post',
      params: {
        community_slug: post.community.slug,
        id: post.id,
        slug: post.slug,
      },
    }"
    v-for="post in posts"
  >
    <div
      class="w-full rounded bg-zinc-100 px-4 py-2 hover:bg-zinc-50 dark:bg-[#1e1e20] dark:text-zinc-300"
    >
      <p
        class="break-words text-xxs font-semibold text-[#0079d3] dark:text-[#ff6542]"
      >
        c/{{ post.community.name }}
      </p>
      <h1 class="break-words font-semibold">{{ post.title }}</h1>
      <p class="break-words text-xxs font-semibold">
        Posted by u/{{ post.user.name }} on
        {{ new Date(post.created_at).toLocaleDateString() }}
      </p>

      <div class="mt-2 flex items-center">
        <img
          v-if="!isDark"
          src="/src/assets/comment-black.svg"
          alt=""
          class="mt-0.5 h-4"
        />
        <img
          v-if="isDark"
          src="/src/assets/comment-light.svg"
          alt=""
          class="mt-0.5 h-4"
        />
        <p class="ml-0.5 text-xxs">{{ post.count_comments }}</p>
        <img
          v-if="isLiked"
          src="/src/assets/star.svg"
          alt=""
          class="ml-2 h-4"
        />
      </div>
    </div>
  </router-link>
</template>

<script setup>
import { defineProps } from "vue";
import { useDark } from "@vueuse/core";

const isDark = useDark();

const props = defineProps(["posts", "isLiked"]);
</script>
