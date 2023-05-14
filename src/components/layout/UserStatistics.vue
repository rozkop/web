<template>
  <div class="mt-4 w-full">
    <div class="flex justify-center rounded border border-zinc-200 bg-white p-4">
      <div class="flex justify-center flex-wrap">

        <StatisticsCard :rating="statistics.posts" :title="'Your posts'" />
        <StatisticsCard :rating="statistics.communities" :title="'Your communities'" />
        <StatisticsCard :rating="statistics.likedPosts" :title="'Posts you like'" />
        <StatisticsCard :rating="statistics.likedCommunities" :title="'Communities you like'" />

      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";
import StatisticsCard from "../UI/StatisticsCard.vue";

defineProps(["statistics"]);
</script>