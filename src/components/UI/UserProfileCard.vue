<template>
  <div class="rounded shrink-0  border border-zinc-200 bg-white p-4 hover:bg-zinc-100 cursor-pointer">
      <div class="flex justify-between items-center">
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

defineProps(['title'])

</script>