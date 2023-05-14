<template>
  <router-link
      class="flex"
      :to="{
      name: 'community',
      params: {
        community_slug: community.slug,
        filter: ''
      },
    }"
      v-for="community in communities"
  >
    <div class="flex mb-8 flex-col w-full bg-zinc-100 hover:bg-zinc-50 dark:bg-[#1e1e20] dark:text-zinc-300 rounded px-4 py-2">

      <div class="flex items-center">
        <img
            v-if="isLiked"
            src="/src/assets/star.svg"
            alt=""
            class="h-4 mr-2"
        />
        <h1 class="break-words font-semibold text-[#0079d3] dark:text-[#ff6542]">{{ community.name }}</h1>
      </div>

      <p class="break-words text-xxs">
        {{ community.description }}
      </p>

      <p class="break-words font-semibold text-xxs">
        Created by u/{{ community.user.name }} on
        {{ new Date(community.created_at).toLocaleDateString() }}
      </p>
    </div>
  </router-link>
</template>

<script setup>
import { defineProps } from "vue";
import { useDark } from "@vueuse/core";

const isDark = useDark();

defineProps(["communities", "isLiked"]);
</script>