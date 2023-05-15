<template>
  <div
    class="shrink-0 cursor-pointer rounded border-zinc-200 bg-white p-4 shadow hover:bg-zinc-100 dark:border-zinc-600 dark:bg-[#303034] dark:text-zinc-200 dark:hover:border-transparent dark:hover:bg-zinc-800"
  >
    <div class="flex items-center justify-between">
      <h1 class="text-lg font-semibold">{{ title }}</h1>
      <img
        v-if="!isDark"
        class="flex h-4"
        src="/src/assets/down-arrow-black.svg"
        alt=""
      />
      <img
        v-if="isDark"
        class="flex h-4"
        src="/src/assets/down-arrow-light.svg"
        alt=""
      />
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";
import { useDark } from "@vueuse/core";

const isDark = useDark();

defineProps(["title"]);
</script>