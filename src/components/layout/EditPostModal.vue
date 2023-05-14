<template>
  <teleport to="body">
    <div class="modal-container">
      <div class="w-full bg-transparent pt-12">
        <div class="mx-auto px-2 xs:px-4 sm:w-5/6 md:w-2/3 lg:w-5/12">
          <div class="flex w-full justify-end">
            <button @click="closeModal">X</button>
          </div>
          <form
            @submit.prevent.once="editPost"
            class="flex w-full flex-col space-y-4 rounded border border-zinc-200 bg-white p-4 dark:border-transparent dark:bg-zinc-900"
          >
            <input
              v-model="post.title"
              type="text"
              class="rounded border border-zinc-200 bg-white p-2 text-sm text-black outline-none dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200"
              required
            />
            <textarea
              v-model="post.text"
              class="scrollbar dark:dark-scrollbar h-44 rounded border border-zinc-200 bg-white p-2 text-sm text-black outline-none dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200"
              placeholder="Text"
              required
            />
            <div
              class="flex w-full flex-wrap items-center justify-end space-x-6 break-all"
            >
              <button
                type="submit"
                class="my-1 flex rounded-xl bg-[#0079d3] px-8 py-1 font-semibold text-zinc-50 dark:bg-[#ff6542]"
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script setup>
import { useDark } from "@vueuse/core/index";
import { useRouter, useRoute } from "vue-router";
import axios from "axios";

import { defineProps, defineEmits } from "vue";

const props = defineProps(["post"]);
const emit = defineEmits('doCloseModal')

import { createToaster } from "@meforma/vue-toaster";
const toaster = createToaster();

const isDark = useDark();
const router = useRouter();
const route = useRoute();

function closeModal() {
  emit('doCloseModal');
}

function editPost() {
  axios
    .put("/api/post/" + props.post.id + "/edit", {
      title: props.post.title,
      text: props.post.text,
    })
    .then((response) => {
      console.log(response);
      emit('doCloseModal');
      toaster.success(`Post updated!`, {
        position: "top",
      });
    });
}
</script>

<style>
.modal-container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
}
</style>
