<template>
  <div class="w-full pt-6">
    <div class="mx-auto px-2 xs:px-4 sm:w-5/6 lg:w-3/4">
      <div class="mb-4 flex w-full flex-col space-y-4 rounded">
        <h1 class="text-xxl font-semibold text-black dark:text-zinc-100">
          Dashboard
        </h1>
        <hr class="mb-12 h-px border-0 bg-white dark:bg-zinc-700" />
      </div>

      <div
        class="flex w-full flex-col space-y-4 rounded border border-zinc-200 bg-white px-4 pb-4 pt-2 dark:border-transparent dark:bg-zinc-800"
      >
        <div class="border-b border-gray-200 dark:border-gray-700">
          <ul
            class="flex flex-wrap justify-center text-center text-sm font-medium text-zinc-800 dark:text-zinc-300 sm:justify-start"
          >
            <li>
              <router-link
                to="/profile"
                :class="routeName('profile')"
                class="group inline-flex rounded-t-lg border-b-2 p-4 hover:border-zinc-300 hover:text-zinc-600 dark:hover:text-zinc-200"
              >
                <svg
                  aria-hidden="true"
                  class="mr-2 h-5 w-5 text-zinc-800 group-hover:text-zinc-600 dark:text-zinc-300 dark:group-hover:text-zinc-50"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                Profile
              </router-link>
            </li>
            <li class="mx-2">
              <router-link
                to="/profile/settings"
                :class="routeNameMatch('settings')"
                class="group inline-flex rounded-t-lg border-b-2 p-4 hover:border-zinc-300 hover:text-zinc-600 dark:hover:text-zinc-200"
              >
                <svg
                  aria-hidden="true"
                  class="mr-2 h-5 w-5 text-zinc-800 group-hover:text-zinc-600 dark:text-zinc-300 dark:group-hover:text-zinc-50"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16 3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 2 0 010-3.464V4a1 1 0 011-1z"
                  ></path>
                </svg>
                Settings
              </router-link>
            </li>
            <li>
              <router-link
                to="/profile/statistics"
                :class="routeNameMatch('statistics')"
                class="group inline-flex rounded-t-lg border-b-2 p-4 hover:border-zinc-300 hover:text-zinc-600 dark:hover:text-zinc-200"
              >
                <svg
                  aria-hidden="true"
                  class="mr-2 h-5 w-5 text-zinc-800 group-hover:text-zinc-600 dark:text-zinc-300 dark:group-hover:text-zinc-50"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"></path>
                  <path
                    fill-rule="evenodd"
                    d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                Statistics
              </router-link>
            </li>
          </ul>
        </div>
      </div>

      <div v-if="route.name === 'profile'" class="mt-4 w-full space-y-2">
        <UserProfileCard
            @click="openList('posts')"
            :title="'Posts'"
        />
        <UserPostList
            v-if="isPostListOpened"
            :posts="posts"
        />

        <UserProfileCard
          @click="openList('communities')"
          :title="'Your communities'"
        />
        <UserCommunityList
          v-if="isCommunityListOpened"
          :communities="communities"
        />

        <UserProfileCard
          @click="openList('likedPosts')"
          :title="'Posts you like'"
        />
        <UserPostList
          v-if="isLikedPostListOpened"
          :posts="likedPosts"
          :isLiked="true"
        />

        <UserProfileCard
          @click="openList('likedCommunities')"
          :title="'Communities you like'"
        />
        <UserCommunityList
          :isLiked="true"
          v-if="isLikedCommunityList"
          :communities="likedCommunities"
        />
      </div>
      <router-view :user="user" :statistics="statistics" />
    </div>
  </div>
</template>

<script setup>
import UserPostList from "../components/layout/UserPostList.vue";
import UserCommunityList from "../components/layout/UserCommunityList.vue";
import UserProfileCard from "/src/components/UI/UserProfileCard.vue";

import axios from "axios";
import { onMounted, ref, reactive } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const user = ref([]);
const statistics = reactive({
  posts: '',
  communities: '',
  likedPosts: '',
  likedCommunities: '',
});

const posts = ref([]);
const communities = ref([]);
const likedPosts = ref([]);
const likedCommunities = ref([]);

function fetchUserResources() {
  axios.get("/api/user/show").then((response) => {
    console.log(response);

    user.value = response.data.data.user;
    posts.value = response.data.data.user_posts;
    communities.value = response.data.data.user_communities;
    likedPosts.value = response.data.data.user_liked_posts;
    likedCommunities.value = response.data.data.user_liked_communities;

    statistics.posts = posts.value.length;
    statistics.communities = communities.value.length;
    statistics.likedPosts = likedPosts.value.length;
    statistics.likedCommunities = likedCommunities.value.length;
  });
}

onMounted(() => {
  fetchUserResources();
});

const isPostListOpened = ref(false);
const isCommunityListOpened = ref(false);
const isLikedPostListOpened = ref(false);
const isLikedCommunityList = ref(false);

function openList(listName) {
  switch (listName) {
    case "posts":
      isPostListOpened.value = !isPostListOpened.value;
      break;
    case "communities":
      isCommunityListOpened.value = !isCommunityListOpened.value;
      break;
    case "likedPosts":
      isLikedPostListOpened.value = !isLikedPostListOpened.value;
      break;
    case "likedCommunities":
      isLikedCommunityList.value = !isLikedCommunityList.value;
      break;
  }
}

const routeName = (name) => {
  return route.name === name
    ? "border-[#0079d3] dark:border-[#ff6542]"
    : "border-transparent";
};

const routeNameMatch = (name) => {
  return route.matched.some((record) => record.name === name)
    ? "border-[#0079d3] dark:border-[#ff6542]"
    : "border-transparent";
};
</script>
