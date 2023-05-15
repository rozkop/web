<template>
  <div
    class="flex h-16 w-full items-end justify-end sm:h-20"
    :style="{ backgroundColor: community.color }"
  >
    <button
      @click="addToFavorites"
      class="m-2 rounded-3xl bg-white bg-opacity-0 p-1 hover:bg-opacity-20"
    >
      <img src="/src/assets/star.svg" alt="" class="h-8" />
    </button>
  </div>
</template>

<script setup>
const props = defineProps(["community"]);
import axios from "axios";
import { createToaster } from "@meforma/vue-toaster";

const toaster = createToaster();

function addToFavorites() {
  axios.put("/api/c/" + props.community.slug + "/react").then((response) => {
    toaster.info(`Liked!`, {
      position: "top",
    });
  });
}
</script>
