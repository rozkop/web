<template>
  <div
    v-if="userData"
    class="hidden h-full w-1/4 shrink-0 rounded border border-gray-300 bg-white p-3 dark:border-[#343536] dark:bg-[#1a1a1b] dark:text-zinc-200 md:flex"
  >
    <div class="flex w-full flex-col space-y-2">
      <div class="flex flex-col items-start space-y-2">
        <div class="flex items-center space-x-2">
          <img src="/src/assets/logoCircle.png" alt="" class="h-7" />
          <h1 class="flex justify-start font-semibold">
            {{ community.name }}
          </h1>
        </div>

        <p class="w-11/12 text-xs">{{ community.description }}</p>

        <p class="mb-4 w-11/12 text-xs text-zinc-400">
          Created: {{ community.created_at }}
        </p>
        <button
          @click="removeCommunity"
          class="flex items-center rounded-xl border border-zinc-200 bg-zinc-100 p-1 hover:bg-zinc-200 dark:border-transparent dark:bg-zinc-800 dark:text-white dark:hover:bg-zinc-700"
          v-if="community.user.id === userData.id"
        >
          <img
            v-if="!isDark"
            class="mr-1 flex h-4"
            src="/src/assets/bin-black.svg"
            alt=""
          />
          <img
            v-if="isDark"
            class="mr-1 flex h-4"
            src="/src/assets/bin-light.svg"
            alt=""
          />
          <span class="text-xs">Delete community</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useDark } from "@vueuse/core";
const isDark = useDark();

import { createToaster } from "@meforma/vue-toaster";

const toaster = createToaster();

import { defineProps } from "vue";

const props = defineProps(["community", "userData"]);

import { useRouter } from "vue-router";

const router = useRouter();

import axios from "axios";

function removeCommunity() {
  axios
    .delete("/api/c/" + props.community.slug + "/delete")
    .then(() => {
      toaster.success(`Community deleted!`, {
        position: "top",
      });
      router.push({ name: "main" });
    })
    .catch((error) => {
      toaster.error(error, {
        position: "top",
      });
    });
}
</script>
