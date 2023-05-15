<template>
  <!-- Filter tabs -->
  <div class="flex justify-center">
    <div
      class="flex w-full justify-start rounded-md border border-gray-300 bg-transparent bg-white p-3 dark:border-[#343536] dark:border-zinc-700 dark:bg-[#1a1a1b] xs:justify-evenly sm:w-5/6 sm:justify-start"
    >
      <!--Desktop screen size-->
      <div
        class="flex flex-wrap font-semibold text-zinc-600 dark:text-zinc-300"
      >
        <router-link :to="{ name: 'hot' }">
          <div
            class="mr-2 flex items-center rounded-lg px-2 py-1 hover:bg-gray-50 hover:text-[#0079d3] dark:hover:bg-[#252524] dark:hover:text-zinc-200"
          >
            <img
              v-if="!isDark"
              src="/src/assets/fire-black.svg"
              alt=""
              class="h-5 pr-2"
            />
            <img
              v-if="isDark && route.name !== 'hot'"
              src="/src/assets/fire-light.svg"
              alt=""
              class="h-5 fill-orange-600 pr-2"
            />
            <img
              v-if="isDark && route.name === 'hot'"
              src="/src/assets/fire-orange.svg"
              alt=""
              class="h-5 pr-2"
            />
            <p
              :class="
                route.name === 'hot'
                  ? 'text-[#0079d3] dark:text-[#ff6542]'
                  : 'text-zinc-900 dark:text-zinc-300'
              "
            >
              Hot
            </p>
          </div>
        </router-link>

        <router-link :to="{ name: 'new' }">
          <div
            class="flex items-center rounded-lg px-2 py-1 hover:bg-gray-50 hover:text-[#0079d3] dark:hover:bg-[#252524] dark:hover:text-zinc-200"
          >
            <img
              v-if="!isDark"
              src="/src/assets/new-icon-black.svg"
              alt=""
              class="h-5 pr-2"
            />
            <img
              v-if="isDark && route.name !== 'new'"
              src="/src/assets/new-icon-light.svg"
              alt=""
              class="h-5 pr-2"
            />
            <img
              v-if="isDark && route.name === 'new'"
              src="/src/assets/new-icon-orange.svg"
              alt=""
              class="h-5 pr-2"
            />
            <p
              :class="
                route.name === 'new'
                  ? 'text-[#0079d3] dark:text-[#ff6542]'
                  : 'text-zinc-900 dark:text-zinc-300'
              "
            >
              New
            </p>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useDark } from "@vueuse/core/index";

import { useRoute } from "vue-router";

const route = useRoute();

const isDark = useDark();
</script>
