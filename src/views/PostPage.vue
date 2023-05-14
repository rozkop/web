<template>
  <EditPostModal @doCloseModal="openEditModal" v-if="post.id && isEditModalOpened" :post="post"/>
  <CommunityBackground v-if="post.id" :community="post.community" />

  <section
    v-if="post.id"
    class="mx-auto my-6 flex w-full justify-between px-2 xs:px-3 lg:w-11/12"
  >
    <div class="w-full space-y-3">
      <!--Post-->
      <div
        class="flex items-center overflow-x-auto dark:text-zinc-300 sm:justify-center"
      >
        <div
          class="scrollbar dark:dark-scrollbar flex w-full overflow-auto overflow-y-hidden rounded border border-gray-300 bg-white dark:border-[#343536] dark:bg-[#1a1a1b] sm:w-11/12 lg:w-5/6"
        >
          <div
            class="hidden shrink-0 flex-col items-center py-4 xs:flex xs:w-12"
          >
            <button
              @click="voteUp"
              class="rounded hover:bg-blue-200 dark:hover:bg-blue-900"
            >
              <img
                v-if="!isDark"
                src="/src/assets/upvote-black.svg"
                alt=""
                class="h-6"
              />
              <img
                v-if="isDark"
                src="/src/assets/upvote-light.svg"
                alt=""
                class="h-6"
              />
            </button>
            <div class="my-2 font-semibold">
              {{ rating }}
            </div>
            <button
              @click="voteDown"
              class="rounded hover:bg-red-200 dark:hover:bg-red-900"
            >
              <img
                v-if="!isDark"
                src="/src/assets/downvote-black.svg"
                alt=""
                class="h-6"
              />
              <img
                v-if="isDark"
                src="/src/assets/downvote-light.svg"
                alt=""
                class="h-6"
              />
            </button>
          </div>
          <div class="flex w-full flex-col">
            <div class="w-full min-w-[16rem] shrink-0 p-3 dark:bg-[#1a1a1b]">
              <div class="flex flex-col">
                <div class="flex justify-between">
                  <router-link
                    :to="{
                      name: 'community',
                      params: {
                        community_slug: post.community.slug,
                        filter: '',
                      },
                    }"
                    class="w-fit text-xs font-bold hover:underline"
                    >c/{{ post.community.name }}
                  </router-link>
                  <button
                    v-if="post.user.id === userData.id"
                    @click="removePost"
                    class="shrink-0 rounded px-2 py-0.5 text-xs font-semibold hover:bg-zinc-200 dark:hover:bg-zinc-700"
                  >
                    <img
                      v-if="!isDark"
                      class="flex h-4"
                      src="/src/assets/bin-black.svg"
                      alt=""
                    />
                    <img
                      v-if="isDark"
                      class="flex h-4"
                      src="/src/assets/bin-light.svg"
                      alt=""
                    />
                  </button>
                </div>

                <div class="flex items-center space-x-1">
                  <p class="overflow-auto text-xxs">
                    Posted by
                    <span class="dark:text-[#ff6542]">{{
                      post.user.name
                    }}</span>
                  </p>
                  <p class="text-xxs text-zinc-400">• {{ post.created_at }}</p>
                </div>
              </div>

              <h1 class="text-xl font-semibold">{{ post.title }}</h1>
              <p class="mt-4">{{ post.text }}</p>
            </div>

            <div
              class="flex w-full min-w-[16rem] items-center bg-gray-100 px-1 py-1.5 dark:border dark:border-transparent dark:border-t-[#343536] dark:bg-[#161617] xs:bg-white xs:dark:border-t-transparent xs:dark:bg-[#1a1a1b]"
            >
              <div class="mr-3 flex xs:hidden">
                <button
                  @click="voteUp"
                  class="shrink-0 rounded hover:bg-blue-200 dark:hover:bg-blue-900"
                >
                  <img
                    v-if="!isDark"
                    src="/src/assets/upvote-black.svg"
                    alt=""
                    class="h-6"
                  />
                  <img
                    v-if="isDark"
                    src="/src/assets/upvote-light.svg"
                    alt=""
                    class="h-6"
                  />
                </button>

                <p class="mx-2 font-semibold">{{ rating }}</p>

                <button
                  @click="voteDown"
                  class="shrink-0 rounded hover:bg-red-200 dark:hover:bg-red-900"
                >
                  <img
                    v-if="!isDark"
                    src="/src/assets/downvote-black.svg"
                    alt=""
                    class="h-6"
                  />
                  <img
                    v-if="isDark"
                    src="/src/assets/downvote-light.svg"
                    alt=""
                    class="h-6"
                  />
                </button>
              </div>

              <div
                class="ml-4 flex w-full items-center justify-between xs:ml-0"
              >
                <div class="flex rounded p-1 px-2">
                  <img
                    v-if="!isDark"
                    src="/src/assets/comment-black.svg"
                    alt=""
                    class="h-5"
                  />
                  <img
                    v-if="isDark"
                    src="/src/assets/comment-light.svg"
                    alt=""
                    class="h-5"
                  />
                  <span class="ml-1.5 break-all text-xs font-semibold">{{
                    post.count_comments
                  }}</span>
                </div>

                <div
                  v-if="post.user.id !== userData.id"
                  class="flex shrink-0 rounded p-1 px-2"
                >
                  <button
                    @click.once="reportPost"
                    class="rounded px-2 py-0.5 hover:bg-zinc-300 dark:hover:bg-zinc-800"
                  >
                    <img
                      v-if="!isDark"
                      src="/src/assets/flag-black.svg"
                      alt=""
                      class="h-5"
                    />
                    <img
                      v-if="isDark"
                      src="/src/assets/flag-light.svg"
                      alt=""
                      class="h-5"
                    />
                  </button>
                </div>
                <div
                    v-else
                    class="flex shrink-0 rounded p-1 px-2"
                >
                  <button
                      @click="openEditModal"
                      class="rounded px-2 py-0.5 hover:bg-zinc-300 dark:hover:bg-zinc-800"
                  >
                    <img
                        v-if="!isDark"
                        src="/src/assets/edit-black.svg"
                        alt=""
                        class="h-5"
                    />
                    <img
                        v-if="isDark"
                        src="/src/assets/edit-light.svg"
                        alt=""
                        class="h-5"
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        class="flex items-center overflow-x-auto dark:text-zinc-300 sm:justify-center"
      >
        <div
          class="flex w-full overflow-auto overflow-y-hidden rounded border border-gray-300 bg-white dark:border-[#343536] dark:bg-[#1a1a1b] sm:w-11/12 lg:w-5/6"
        >
          <form
            @keydown.enter.exact.prevent="submitComment"
            @submit.prevent="submitComment"
            class="flex w-full flex-col p-6"
          >
            <p class="px-0.5 pb-1 text-xs text-black dark:text-zinc-400">
              Comment it:
            </p>
            <textarea
              v-model="newComment"
              class="scrollbar dark:dark-scrollbar h-28 w-full rounded border border-zinc-200 bg-zinc-50 p-3 focus:border-blue-400 focus:outline-none dark:border-zinc-900 dark:bg-zinc-800 dark:focus:border-zinc-500"
              placeholder="What are your thoughts?"
              required
            />
            <div class="flex justify-end">
              <button
                type="submit"
                class="mt-2 rounded-xl bg-[#0079d3] px-6 py-1.5 text-xs font-semibold text-white dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
              >
                Comment
              </button>
            </div>
          </form>
        </div>
      </div>

      <div
        v-if="comments.length"
        class="flex items-center overflow-x-auto dark:text-zinc-300 sm:justify-center"
      >
        <div
          class="flex w-full overflow-auto overflow-y-hidden rounded border border-gray-300 bg-white dark:border-[#343536] dark:bg-[#1a1a1b] sm:w-11/12 lg:w-5/6"
        >
          <div class="flex w-full flex-col px-3 py-1">
            <div
              class="my-2 rounded-xl border border-zinc-300 bg-gray-50 p-2 dark:border-zinc-700 dark:bg-zinc-800"
              v-for="(comment, index) in comments.slice().reverse()"
              :key="comment.id"
            >
              <div class="flex items-center justify-between">
                <p class="break-words text-xs font-semibold">
                  {{ comment.user.name }}
                </p>
                <button
                  @click="removeComment(comment.id)"
                  v-if="comment.user.id === userData.id"
                  class="shrink-0 rounded px-2 py-0.5 text-xs font-semibold hover:bg-zinc-200 dark:hover:bg-zinc-700"
                >
                  <img
                    v-if="!isDark"
                    class="flex h-4"
                    src="/src/assets/bin-black.svg"
                    alt=""
                  />
                  <img
                    v-if="isDark"
                    class="flex h-4"
                    src="/src/assets/bin-light.svg"
                    alt=""
                  />
                </button>
              </div>

              <p class="break-words text-xxs text-zinc-500">
                {{ comment.created_at }}
              </p>
              <p class="my-2 break-words px-1">{{ comment.text }}</p>

              <div class="flex items-center justify-start">
                <button
                  @click="commentVoteUp(reverseIndex(index))"
                  class="rounded p-1 hover:bg-blue-200 dark:hover:bg-blue-900"
                >
                  <img
                    v-if="!isDark"
                    src="/src/assets/upvote-black.svg"
                    alt=""
                    class="h-5"
                  />
                  <img
                    v-if="isDark"
                    src="/src/assets/upvote-light.svg"
                    alt=""
                    class="h-5"
                  />
                </button>
                <p class="px-1 font-semibold">{{ comment.rating }}</p>
                <button
                  @click="commentVoteDown(reverseIndex(index))"
                  class="rounded p-1 hover:bg-red-200 dark:hover:bg-red-900"
                >
                  <img
                    v-if="!isDark"
                    src="/src/assets/downvote-black.svg"
                    alt=""
                    class="h-5"
                  />
                  <img
                    v-if="isDark"
                    src="/src/assets/downvote-light.svg"
                    alt=""
                    class="h-5"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <CommunityInfoCard v-if="post.id" :community="post.community" />
  </section>
</template>

<script setup>
import EditPostModal from "../components/layout/EditPostModal.vue";
import CommunityBackground from "../components/UI/CommunityBackground.vue";
import CommunityInfoCard from "../components/UI/CommunityInfoCard.vue";
import axios from "axios";
import { ref, onMounted } from "vue";

import { useCommunityStore } from "../stores/CommunityStore";

const communityStore = useCommunityStore();

import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

import { useDark } from "@vueuse/core/index";

const isDark = useDark();

import { createToaster } from "@meforma/vue-toaster";

const toaster = createToaster();

import { useAuth } from "../composables/auth.js";

const { userData } = useAuth();

function reverseIndex(index) {
  return comments.value.length - 1 - index;
}

const post = ref([]);
const comments = ref([]);
const isLoading = ref(true);
const newComment = ref("");

function reportPost() {
  axios.put("/api/post/" + post.value.id + "/report").then((response) => {
    toaster.show(response.data.data.message + `!`, {
      position: "top",
    });
  });
}

function removePost() {
  axios.delete("/api/post/" + post.value.id + "/delete").then(() => {
    router.push({ name: "main" });
    toaster.success(`Post deleted!`, {
      position: "top",
    });
  });
}

function removeComment(commentId) {
  axios.delete("/api/post/comments/" + commentId + "/delete").then(() => {
    const commentIndex = comments.value.findIndex((c) => c.id === commentId);
    comments.value.splice(commentIndex, 1);
    post.value.count_comments--;
    toaster.success(`Comment removed!`, {
      position: "top",
    });
  });
}

function submitComment() {
  axios
    .post("/api/post/" + post.value.id + "/comments/submit", {
      text: newComment.value,
    })
    .then(() => {
      newComment.value = "";
      toaster.success(`Comment added!`, {
        position: "top",
      });
      fetchData();
    });
}

const rating = ref(0);
const isCommentsChanged = ref(false);

function fetchData() {
  axios
    .get("/api/post/" + route.params.id)
    .then((response) => {
      console.log(response);

      communityStore.changeCommunityName(
        response.data.data.Post.community.name
      );

      post.value = response.data.data.Post;
      post.value.rating = JSON.parse(post.value.rating);

      const like = post.value.rating.like || 0;
      const dislike = post.value.rating.dislike || 0;
      rating.value = like - dislike;

      post.value.created_at = new Date(post.value.created_at).toLocaleString();
      post.value.community.created_at = new Date(
        post.value.community.created_at
      ).toLocaleDateString();

      comments.value = response.data.data.Comments;

      comments.value.forEach((comment) => {
        comment.created_at = new Date(comment.created_at).toLocaleString();
        comment.rating = JSON.parse(comment.rating);
        comment.rating = (comment.rating.like || 0) - (comment.rating.dislike || 0);
      });

      router.push({
        name: "post",
        params: {
          community_slug: response.data.data.Post.community.slug,
          slug: response.data.data.Post.slug,
        },
      });
      isLoading.value = false;
    })
    .finally(() => {
      isCommentsChanged.value = !isCommentsChanged.value;
      console.log("zmieniono na tru");
    })
    .catch((error) => {
      isLoading.value = false;

      if (error.status === 404) {
        router.push("/not-found");
      }
    });
}

function voteUp() {
  axios.put("/api/post/" + post.value.id + "/react/like").then(() => {
    fetchData();
  });
}

function voteDown() {
  axios.put("/api/post/" + post.value.id + "/react/dislike").then(() => {
    fetchData();
  });
}

function commentVoteUp(id) {
  axios
    .put(
      "/api/post/" +
        post.value.id +
        "/comments/" +
        comments.value[id].id +
        "/react/like"
    )
    .then((response) => {
      fetchData();
      console.log(response);
    });
}

function commentVoteDown(id) {
  axios
    .put(
      "/api/post/" +
        post.value.id +
        "/comments/" +
        comments.value[id].id +
        "/react/dislike"
    )
    .then((response) => {
      fetchData();
      console.log(response);
    });
}

const isEditModalOpened = ref(false);
function openEditModal() {
  isEditModalOpened.value = !isEditModalOpened.value;
  fetchData();
}

onMounted(() => {
  fetchData();
});
</script>
