<template>
  <div
    class="flex h-16 w-full items-end justify-end sm:h-20"
    :style="{ backgroundColor: community.color }"
  >
    <button @click="addToFavorites" class="m-2 p-1 rounded-3xl bg-white bg-opacity-0 hover:bg-opacity-20">
      <img
          src="/src/assets/star.svg"
          alt=""
          class="h-8 "
      />
    </button>

  </div>
</template>

<script setup>
const props = defineProps(["community"]);
import axios from "axios";

function addToFavorites() {
  axios.put('/api/c/' + props.community.slug + '/react').then(response => {
    console.log(response)
  })
}



</script>