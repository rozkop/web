<template>
  <CommunityBackground
    v-if="post.id"
    :color="post.community.color"
  />

  <section
    v-if="post.id"
    class="mx-auto mb-6 flex w-full justify-between px-2 xs:px-3 lg:w-11/12"
  >
    <div class="w-full space-y-3">
      <!--Post-->
      <div
        class="mt-6 flex items-center overflow-x-auto dark:text-zinc-300 sm:justify-center"
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
              {{ post.rating }}
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

          <div class="flex flex-col">
            <div class="w-full min-w-[16rem] shrink-0 p-3 dark:bg-[#1a1a1b]">
              <div class="flex flex-col">
                <router-link
                  :to="{
                    name: 'community',
                    params: {
                      community_name: post.community.name,
                      filter: '',
                    },
                  }"
                  class="text-xs font-bold hover:underline"
                  >u/{{ post.community.name }}
                </router-link>
                <div class="flex items-center space-x-1">
                  <p class="overflow-auto text-xxs">
                    Posted by {{ post.user }}
                  </p>
                  <p class="text-xxs text-zinc-400">• {{ post.created_at }}</p>
                </div>
              </div>

              <h1 class="text-xl font-semibold">{{ post.title }}</h1>
              <p class="mt-4">{{ post.text }}</p>
            </div>
            <div
              class="flex w-full items-center bg-gray-100 px-1 py-1.5 dark:border dark:border-transparent dark:border-t-[#343536] dark:bg-[#161617] xs:bg-white xs:dark:border-t-transparent xs:dark:bg-[#1a1a1b]"
            >
              <div class="mr-3 flex xs:hidden">
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

                <p class="mx-2 font-semibold">{{ post.rating }}</p>

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

              <div v-if="!isLoading" class="flex rounded p-1 px-2">
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

                <span
                  v-if="comments.length === 1"
                  class="ml-1.5 text-xs font-semibold"
                  >{{ comments.length }} Comment</span
                >
                <span v-else class="ml-1.5 text-xs font-semibold"
                  >{{ comments.length }} Comments</span
                >
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
              class="h-28 w-full rounded border border-zinc-200 bg-zinc-50 p-3 focus:border-blue-400 focus:outline-none dark:border-zinc-900 dark:bg-zinc-800 dark:focus:border-zinc-500"
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
                  @click="commentVoteUp(index)"
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
                  @click="commentVoteDown(index)"
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

    <div
        class="hidden mt-6 h-full w-1/4 shrink-0 rounded border border-gray-300 bg-white p-3 dark:border-[#343536] dark:bg-[#1a1a1b] dark:text-zinc-200 md:flex"
    >
      <CommunityInfoCard v-if="post.id" :community="post.community" />
    </div>
  </section>
</template>

<script setup>
import axios from "axios";
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useDark } from "@vueuse/core/index";
import CommunityBackground from "../components/UI/CommunityBackground.vue";
import CommunityInfoCard from "../components/UI/CommunityInfoCard.vue";

import { useAuth } from "../composables/auth.js";

const { userData } = useAuth();

const isDark = useDark();

const route = useRoute();
const router = useRouter();

const post = ref([]);
const comments = ref([]);

const isLoading = ref(true);

const newComment = ref("");

function removeComment(commentId) {
  axios.delete("/api/post/comments/" + commentId + "/delete").then(() => {
    const commentIndex = comments.value.findIndex((c) => c.id === commentId);
    comments.value.splice(commentIndex, 1);
  });
}

function submitComment() {
  axios
    .post("/api/post/" + post.value.id + "/comments/submit", {
      text: newComment.value,
    })
    .then(() => {
      newComment.value = "";
      comments.value = [];
      fetchData();
    });
}

function fetchData() {
  console.log("here");
  axios
    .get("/api/post/" + route.params.id)
    .then((response) => {
      console.log(response);
      post.value = response.data.data.Post;

      console.warn(post.value);

      post.value.created_at = new Date(post.value.created_at).toLocaleString();
      post.value.community.created_at = new Date(
        post.value.community.created_at
      ).toLocaleDateString();

      comments.value = response.data.data.Comments;
      comments.value.forEach((comment) => {
        comment.created_at = new Date(comment.created_at).toLocaleString();
      });

      router.push({
        name: "post",
        params: {
          community_name: response.data.data.Post.community.name,
          slug: response.data.data.Post.slug,
        },
      });

      isLoading.value = false;
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error);
      isLoading.value = false;

      if (error.response.status === 404) {
        router.push("/not-found");
      }
    });
}

function voteUp() {
  post.value.rating++;
}

function voteDown() {
  post.value.rating--;
}

function commentVoteUp(id) {
  comments.value[id].rating++;
}

function commentVoteDown(id) {
  comments.value[id].rating--;
}

onMounted(async () => {
  fetchData();
});
</script>
