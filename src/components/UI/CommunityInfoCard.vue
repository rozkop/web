<template>
    <div class="flex w-full flex-col space-y-2">
      <div class="flex flex-col items-start space-y-2">
        <div class="flex items-center space-x-2">
          <img src="/src/assets/logoCircle.png" alt="" class="h-7" />
          <h1 class="flex justify-start font-semibold">
            c/{{ community.name }}
          </h1>
        </div>

        <p class="w-11/12 text-xs">{{ community.description }}</p>

        <p class="w-11/12 text-xs text-zinc-400">Created: {{ community.created_at }}</p>
      </div>
    </div>
</template>

<script setup>
defineProps(["community"]);
</script>
