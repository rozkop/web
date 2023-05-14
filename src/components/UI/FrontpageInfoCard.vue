<template>
  <div
    class="hidden h-60 w-1/4 shrink-0 rounded border border-gray-300 bg-white p-3 dark:border-[#343536] dark:bg-[#1a1a1b] dark:text-zinc-200 md:flex lg:h-56"
  >
    <div class="flex w-full flex-col space-y-2">
      <div class="flex flex-col items-start space-y-2">
        <div class="flex items-center space-x-2">
          <img src="/src/assets/logoCircle.png" alt="" class="h-7" />
          <h1 class="flex justify-start font-semibold">Home</h1>
        </div>

        <p class="w-11/12 text-xs">
          Your personal Rozkop frontpage. Come here to check in with your
          favorite communities.
        </p>
      </div>

      <div class="flex flex-col items-center space-y-2 pt-4">
        <router-link
          :to="{ name: 'submit' }"
          class="flex w-full shrink-0 items-center justify-center rounded-3xl bg-[#0079d3] py-1 font-semibold text-white hover:bg-[#006cbd] dark:bg-zinc-500 dark:text-zinc-100"
        >
          Create Post
        </router-link>
        <router-link :to="{ name: 'submit-community'}"
          class="flex items-center justify-center w-full shrink-0 rounded-3xl border border-[#0079d3] bg-white py-1 font-semibold text-[#0079d3] hover:bg-gray-50 dark:bg-transparent"
        >
          Create Community
        </router-link>
      </div>
    </div>
  </div>
</template>