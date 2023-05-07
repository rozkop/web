<template>
  <div class="mt-4 hidden md:flex h-60 lg:h-56 w-1/4 shrink-0 p-3 bg-white dark:bg-[#1a1a1b] dark:border-[#343536] dark:text-zinc-200 border border-gray-300 rounded my-3">
    <div class="w-full flex flex-col space-y-2">

      <div class="flex flex-col space-y-2 items-start ">

        <div class="flex space-x-2 items-center">
          <img
              src="/src/assets/logoCircle.png"
              alt=""
              class="h-7"
          />
          <h1 class="flex justify-start font-semibold">Home</h1>
        </div>


        <p class="text-xs w-11/12">
          Your personal Rozkop frontpage. Come here to check in with your favorite communities.
        </p>
      </div>


      <div class="flex flex-col space-y-2 pt-4 items-center">
        <router-link :to="{name: 'submit'}" class="flex justify-center items-center font-semibold bg-[#0079d3] hover:bg-[#006cbd] text-white w-full rounded-3xl shrink-0 py-1 dark:bg-zinc-500 dark:text-zinc-100">
          Create Post
        </router-link>
        <button class="font-semibold bg-white hover:bg-gray-50 border border-[#0079d3] text-[#0079d3] w-full rounded-3xl shrink-0 py-1 dark:bg-transparent">
          Create Community
        </button>
      </div>

    </div>
  </div>
</template>
