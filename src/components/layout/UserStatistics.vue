<template>
  <div class="mt-4 w-full">
    <div
      class="flex justify-center rounded border border-zinc-200 bg-white p-4 dark:border-transparent dark:bg-zinc-800"
    >
      <div class="flex flex-wrap justify-center">
        <StatisticsCard :rating="statistics.posts" :title="'Your posts'" />
        <StatisticsCard
          :rating="statistics.communities"
          :title="'Your communities'"
        />
        <StatisticsCard
          :rating="statistics.likedPosts"
          :title="'Posts you like'"
        />
        <StatisticsCard
          :rating="statistics.likedCommunities"
          :title="'Communities you like'"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";
import StatisticsCard from "../UI/StatisticsCard.vue";

defineProps(["statistics"]);
</script>
