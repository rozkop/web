<template>
  <div class="w-full pt-12">
    <div class="mx-auto px-2 xs:px-4 sm:w-5/6 md:w-2/3 lg:w-5/12">
      <div class="mb-4 flex w-full flex-col space-y-4 rounded">
        <h1 class="text-xxl font-semibold text-black dark:text-zinc-100">
          Create a community
        </h1>
        <hr class="mb-12 h-px border-0 bg-white dark:bg-zinc-700" />
      </div>

      <form
        @submit.prevent="submitCommunity"
        class="flex w-full flex-col space-y-4 rounded border border-zinc-200 bg-white p-4 dark:border-transparent dark:bg-zinc-900"
      >
        <input
          v-model="community.name"
          type="text"
          class="rounded border border-zinc-200 bg-white p-2 text-sm text-black outline-none dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200"
          placeholder="Name"
          required
          pattern="^[^.]*$"
        />
        <textarea
          v-model="community.description"
          class="h-44 rounded border border-zinc-200 bg-white p-2 text-sm text-black outline-none dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200"
          placeholder="Description"
          required
        />
        <div
          class="flex w-full flex-wrap items-center justify-end space-x-6 break-all"
        >
          <button
            type="submit"
            class="my-1 flex rounded-xl bg-[#0079d3] px-8 py-1 font-semibold text-zinc-50 dark:bg-[#ff6542]"
          >
            Post
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { reactive } from "vue";

import { createToaster } from "@meforma/vue-toaster";

const toaster = createToaster();

import { useRouter } from "vue-router";

const router = useRouter();

const community = reactive({
  name: "",
  description: "",
  color: "",
});

function submitCommunity() {
  axios
    .put("/api/c/dupa/edit", {
      name: community.name,
      description: community.description,
      color: community.color
    })
    .then((response) => {
      toaster.success(`Community created!`, {
        position: "top",
        queue: true,
        duration: 1000,
      });
      router.push({
        name: "community",
        params: {
          community_slug: response.data.data.slug,
          filter: "",
        },
      });
      toaster.info(`Create first post!`, {
        position: "top",
        queue: true,
      });
    })
    .catch((error) => {
      if (error.response.status === 500) {
        toaster.error(`Same community already exists!`, {
          position: "top",
        });
      }
    });
}
</script>