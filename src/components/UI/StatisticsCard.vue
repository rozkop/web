<template>
  <div
    class="m-2 flex min-w-[14rem] items-center rounded border border-zinc-200 bg-zinc-100 dark:border-transparent dark:bg-[#1e1e20] dark:text-zinc-300"
  >
    <div class="flex p-3">
      <img src="/src/assets/star.svg" alt="" class="h-12" />
    </div>

    <div class="flex flex-col">
      <p class="font-bold">{{ rating }}</p>
      <h1 class="text-xs font-semibold">{{ title }}</h1>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

defineProps(["title", "rating"]);
</script>