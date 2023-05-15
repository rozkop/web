<template>
  <div class="w-full pt-12">
    <div class="mx-auto px-2 xs:px-4 sm:w-5/6 md:w-2/3 lg:w-5/12">
      <div class="mb-4 flex w-full flex-col space-y-4 rounded">
        <h1 class="text-xxl font-semibold text-black dark:text-zinc-100">
          Create a post
        </h1>
        <hr class="mb-12 h-px border-0 bg-white dark:bg-zinc-700" />
      </div>

      <p v-if="!post.communityId" class="mb-1 text-xs text-red-500">
        {{ error }}
      </p>
      <div
        ref="communitiesList"
        :class="
          communities.length
            ? 'cursor-pointer bg-white dark:bg-zinc-800 dark:hover:border-zinc-700'
            : 'cursor-default bg-zinc-100 dark:bg-zinc-900 dark:hover:border-transparent'
        "
        @click="openCommunitiesList"
        class="relative mb-3 flex w-full items-center justify-between rounded border border-inherit bg-white px-2 text-sm hover:border-zinc-300 dark:border-transparent dark:text-zinc-200 sm:w-1/2"
      >
        <div class="p-2">
          <p class="font-semibold">Choose a community</p>
        </div>

        <div class="shrink-0 px-1 xs:pr-0">
          <img
            v-if="isDark"
            class="flex h-4 pt-1"
            src="/src/assets/down-arrow-light.svg"
            alt=""
          />
          <img
            v-if="!isDark"
            class="flex h-4 pt-1"
            src="/src/assets/down-arrow-black.svg"
            alt=""
          />
        </div>

        <div
          :class="isCommunitiesListOpened ? 'absolute' : 'hidden'"
          class="left-0 top-12 w-full xxs:top-10"
        >
          <div
            class="z-10 rounded-b-lg border border-zinc-200 bg-white text-sm shadow dark:border-transparent dark:bg-[#1a1a1b] dark:text-zinc-300"
          >
            <div class="my-1 flex flex-col">
              <div
                v-for="community in communities"
                :key="community.id"
                class="w-full items-start justify-start break-words px-4 py-1 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                @click="selectCommunity(community.name, community.slug)"
              >
                {{ community.name }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <form
        @submit.prevent.once="submitPost"
        class="flex w-full flex-col space-y-4 rounded border border-zinc-200 bg-white p-4 dark:border-transparent dark:bg-zinc-900"
      >
        <input
          v-model="post.title"
          type="text"
          class="rounded border border-zinc-200 bg-white p-2 text-sm text-black outline-none dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200"
          placeholder="Title"
          required
        />
        <textarea
          v-model="post.text"
          class="h-44 rounded border border-zinc-200 bg-white p-2 text-sm text-black outline-none dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200"
          placeholder="Text"
          required
        />
        <div
          class="flex w-full flex-wrap items-center justify-end space-x-6 break-all"
        >
          <p
            v-if="communityName"
            class="my-1 text-sm text-black dark:text-zinc-200"
          >
            You're posting to <strong>c/{{ communityName }}</strong>
          </p>
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
import { ref, reactive, onMounted } from "vue";
import { onClickOutside, useDark } from "@vueuse/core/index";
import { useRouter, useRoute } from "vue-router";
import axios from "axios";

import { useCommunityStore } from "../stores/CommunityStore";

const communityStore = useCommunityStore();

import { createToaster } from "@meforma/vue-toaster";

const toaster = createToaster();

const isDark = useDark();
const router = useRouter();
const route = useRoute();

const post = reactive({
  title: "",
  text: "",
  communitySlug: "",
});

const communities = ref([]);
const communityName = ref("");

const error = ref("");

const isCommunitiesListOpened = ref(false);

function openCommunitiesList() {
  if (communities.value.length) {
    isCommunitiesListOpened.value = !isCommunitiesListOpened.value;
  }
}

function submitPost() {
  if (post.communitySlug) {
    axios
      .post("/api/c/" + post.communitySlug + "/post/submit", {
        title: post.title,
        text: post.text,
      })
      .then((response) => {
        toaster.success(`Post created!`, {
          position: "top",
        });

        router.push({
          name: "post",
          params: {
            community_slug: response.data.data.community.slug,
            id: response.data.data.id,
            slug: response.data.data.slug,
          },
        });
      });
  } else {
    error.value = "Community field is required!";
  }
}

function selectCommunity(selectedCommunityName, selectedCommunitySlug) {
  communityStore.changeCommunityName(selectedCommunityName);
  post.communitySlug = selectedCommunitySlug;
  communityName.value = selectedCommunityName;

  router.push({
    name: "submit",
    params: {
      community_slug: selectedCommunitySlug,
    },
  });
}

async function fetchCommunities() {
  await axios.get("/api/c").then((response) => {
    communities.value = response.data;
  });
}

const communitiesList = ref(null);
onClickOutside(communitiesList, () => (isCommunitiesListOpened.value = false));

onMounted(async () => {
  await fetchCommunities();

  const community = communities.value.find(
    (c) => c.slug === route.params.community_slug
  );

  if (community) {
    post.communitySlug = community.slug;
    communityName.value = community.name;
    communityStore.changeCommunityName(community.name);
  } else {
    router.push({ name: "submit" });
  }
});
</script>
