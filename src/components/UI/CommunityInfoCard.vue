<template>
  <div class="mt-6 hidden md:flex h-full w-1/4 shrink-0 p-3 bg-white dark:bg-[#1a1a1b] dark:border-[#343536] dark:text-zinc-200 border border-gray-300 rounded my-3">
    <div class="w-full flex flex-col space-y-2">
      <div class="flex flex-col space-y-2 items-start ">
        <div class="flex space-x-2 items-center">
          <img
              src="/src/assets/logoCircle.png"
              alt=""
              class="h-7"
          />
          <h1 class="flex justify-start font-semibold">c/{{ community_name }}</h1>
        </div>

        <p class="text-xs w-11/12">
          Description of community.
        </p>

        <p class="text-xs text-zinc-400 w-11/12">
          Created:
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps(['community_name'])
</script>