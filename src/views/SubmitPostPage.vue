<template>
  <div class="w-full pt-12">
    <div class="mx-auto px-2 xs:px-4 sm:w-5/6 md:w-2/3 lg:w-5/12">
      <div class="flex w-full flex-col space-y-4 rounded mb-4">
        <h1 class="font-semibold  dark:text-zinc-100 text-black text-xxl">Create a post</h1>
        <hr class="h-px mb-12 bg-white border-0 dark:bg-zinc-700">
      </div>


      <p v-if="!communityName" class="text-xs mb-1 text-red-500">{{ error }}</p>
      <div ref="communitiesList" :class="communities.length ? 'bg-white dark:bg-zinc-800 cursor-pointer dark:hover:border-zinc-700' : 'bg-zinc-100 dark:bg-zinc-900 cursor-default dark:hover:border-transparent'" @click="openCommunitiesList" class="mb-3 relative flex w-full sm:w-1/2 items-center justify-between rounded border border-inherit dark:border-transparent bg-white px-2 text-sm hover:border-zinc-300 dark:text-zinc-200">
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
            class="top-12 xxs:top-10 left-0 w-full ">
          <div class="z-10 border border-zinc-200 dark:border-transparent rounded-b-lg bg-white text-sm shadow dark:bg-[#1a1a1b] dark:text-zinc-300">
            <div class="flex flex-col my-1">
                <div v-for="community in communities" :key="community.id" class="justify-start items-start w-full hover:bg-zinc-100 dark:hover:bg-zinc-800 px-4 py-1 break-words" @click="selectCommunity(community.id, community.name)">{{ community.name }}</div>
            </div>
          </div>
        </div>
      </div>

      <form @submit.prevent="submitPost" class="flex w-full flex-col space-y-4 rounded border border-zinc-200 dark:border-transparent bg-white dark:bg-zinc-900 p-4">
        <input
          v-model="post.title"
          type="text"
          class="rounded border text-sm text-black dark:text-zinc-200 border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-2 outline-none"
          placeholder="Title"
          required
        />
        <textarea
          v-model="post.text"
          class="h-44 rounded text-sm text-black dark:text-zinc-200 border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-2 outline-none"
          placeholder="Text"
          required
        />
        <div class="flex flex-wrap w-full justify-end items-center space-x-6 break-all">
          <p v-if="communityName" class="text-black dark:text-zinc-200 text-sm my-1 ">You're posting to <strong>c/{{ communityName }}</strong></p>
          <button
            type="submit"
            class="flex rounded-xl bg-[#0079d3] dark:bg-[#ff6542] px-8 py-1 my-1 font-semibold text-zinc-50"
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
import {onClickOutside, useDark} from "@vueuse/core/index";
import { useRouter } from "vue-router";
import axios from "axios";

const isDark = useDark();
const router = useRouter();

const post = reactive({
  title: '',
  text: '',
  communityId: ''
})

const communities = ref([]);
const communityName = ref('');

const error = ref('');

const isCommunitiesListOpened = ref(false);

function openCommunitiesList() {
  if (communities.value.length) {
    isCommunitiesListOpened.value = !isCommunitiesListOpened.value;
  }
}

function submitPost() {
  if(post.communityId) {
    axios.post('/api/c/' + post.communityId + '/post/submit', {
      title: post.title,
      text: post.text
    })
        .then(response => {
          console.log(response);
          router.push({name: 'post', params: {
            community_name: response.data.data.community.name,
            id: response.data.data.id,
            slug: response.data.data.slug,
            }})
        }).catch(error => {
      console.log(error)
    })
  } else {
    error.value = "Community field is required!";
  }
}

function selectCommunity(selectedCommunityId, selectedCommunityName) {
  post.communityId = selectedCommunityId;
  communityName.value = selectedCommunityName;
}

function fetchCommunities() {
  axios.get('/api/c')
  .then(response => {
    console.log(response)

    communities.value = response.data;
    console.log(communities.value)
  })
}

const communitiesList = ref(null);
onClickOutside(communitiesList, () => (isCommunitiesListOpened.value = false));

onMounted(() => {
  fetchCommunities();
})
</script>

