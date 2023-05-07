<template>
  <!-- Filter tabs -->
  <div class="flex justify-center">
    <div
        class="flex w-full justify-start rounded-md border xs:border-gray-300 dark:border-transparent xs:bg-white xs:p-3 xs:dark:border-[#343536] bg-transparent xs:dark:bg-[#1a1a1b] xs:justify-evenly sm:w-5/6 sm:justify-start"
    >
      <!--Small screen size-->
      <div
          ref="filterList"
          class="flex rounded-xl dark:bg-[#373739] bg-white px-2 font-semibold text-[#0079d3] dark:text-zinc-300 hover:bg-gray-50 xs:hidden"
      >
        <button
            @click="openFilterList"
            class="flex items-center rounded-lg p-2"
        >
          <span v-if="hotRoute">
            <img
                v-if="!isDark"
                src="/src/assets/fire-black.svg" alt="" class="h-5 pr-2" />
            <img
                v-if="isDark"
                src="/src/assets/fire-light.svg" alt="" class="h-5 pr-2" />
          </span>
          <span v-if="newRoute">
            <img
                v-if="!isDark"
                src="/src/assets/new-icon-black.svg" alt="" class="h-5 pr-2" />
            <img
                v-if="isDark"
                src="/src/assets/new-icon-light.svg" alt="" class="h-5 pr-2" />
          </span>

          <span v-if="hotRoute" class="capitalize">Hot</span>
          <span v-if="newRoute" class="capitalize">New</span>

          <img
              v-if="!isDark"
              src="/src/assets/down-arrow-black.svg"
              class="flex h-3 pl-2"
              alt=""
          />
          <img
              v-if="isDark"
              src="/src/assets/down-arrow-light.svg"
              class="flex h-3 pl-2"
              alt=""
          />
        </button>
      </div>

      <div
          class="xs:hidden"
          :class="isFilterListOpened ? 'absolute' : 'hidden'"
      >
        <!-- Dropdown menu -->
        <router-link
            :to="hotRoute ? {name: 'new'} : {name: 'hot'}"
            class="absolute z-10 mx-0 mt-11 rounded-xl bg-white px-0 py-2 dark:bg-[#373739] dark:text-gray-300 dark:hover:bg-[#242425] hover:bg-gray-50"
        >
          <div
              class="text-2xl flex w-[7rem] flex-col font-semibold space-y-1 "
          >
            <div class="flex pt-1 px-4">

              <div v-if="newRoute">
                <img
                    v-if="!isDark"
                    src="/src/assets/fire-black.svg" alt="" class="h-5 pr-2" />
                <img
                    v-if="isDark"
                    src="/src/assets/fire-light.svg" alt="" class="h-5 pr-2" />
              </div>
              <div v-if="hotRoute">
                <img
                    v-if="!isDark"
                    src="/src/assets/new-icon-black.svg" alt="" class="h-5 pr-2" />
                <img
                    v-if="isDark"
                    src="/src/assets/new-icon-light.svg" alt="" class="h-5 pr-2" />
              </div>

              <span v-if="newRoute">
                Hot
              </span>
              <span v-if="hotRoute">
                New
              </span>

            </div>
          </div>
        </router-link>
      </div>

      <!--Desktop screen size-->
      <div class="hidden space-x-2 font-semibold text-zinc-600 dark:text-zinc-300 xs:flex">
<!--        <router-link :to="{name: 'best'}">-->
<!--          <div-->
<!--              class="flex items-center rounded-lg px-2 py-1 hover:bg-gray-50 hover:text-[#0079d3] dark:hover:bg-[#252524] dark:hover:text-zinc-200"-->
<!--          >-->
<!--            <img-->
<!--                v-if="!isDark"-->
<!--                src="/src/assets/rocket-black.svg" alt="" class="h-5 pr-2" />-->
<!--            <img-->
<!--                v-if="isDark"-->
<!--                src="/src/assets/rocket-light.svg" alt="" class="h-5 pr-2" />-->
<!--            Best-->
<!--          </div>-->
<!--        </router-link>-->

        <router-link :to="{name: 'hot'}">
          <div
              class="flex items-center rounded-lg px-2 py-1 hover:bg-gray-50 hover:text-[#0079d3] dark:hover:bg-[#252524] dark:hover:text-zinc-200"
          >
            <img
                v-if="!isDark"
                src="/src/assets/fire-black.svg" alt="" class="h-5 pr-2" />
            <img
                v-if="isDark"
                src="/src/assets/fire-light.svg" alt="" class="h-5 pr-2" />
            Hot
          </div>
        </router-link>

        <router-link :to="{name: 'new'}">
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
                v-if="isDark"
                src="/src/assets/new-icon-light.svg" alt="" class="h-5 pr-2" />
            New
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import {onClickOutside, useDark} from "@vueuse/core/index";
import {ref, computed} from "vue";
import { useRoute } from "vue-router";

const isDark = useDark();
const route = useRoute();

const hotRoute = computed(() => {
  return route.name === 'hot' || route.name === 'main';
})

const newRoute = computed(() => {
  return route.name === 'new';
})

const isFilterListOpened = ref(false);

function openFilterList() {
  isFilterListOpened.value = !isFilterListOpened.value;
}

const filterList = ref(null);
onClickOutside(filterList, () => (isFilterListOpened.value = false));
</script>