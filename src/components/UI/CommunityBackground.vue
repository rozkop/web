<template>
  <div
    class="flex h-16 w-full items-center justify-start sm:h-20"
    :style="{ backgroundColor: color }"
  ></div>
</template>

<script setup>
defineProps(["color"]);
</script>