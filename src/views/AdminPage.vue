<template>
  <div class="m-6">
    <UserProfileCard
      class="bg-zinc-100 dark:bg-zinc-900"
      @click="openReportedList"
      :title="'Reported posts'"
    />
    <div v-if="isReportedListOpened" v-for="post in posts" :key="post.id">
      <div
        class="my-1 w-full rounded bg-zinc-100 px-4 py-2 hover:bg-zinc-50 dark:bg-[#1e1e20] dark:text-zinc-300"
      >
        <p
          class="break-words text-xxs font-semibold text-[#0079d3] dark:text-[#ff6542]"
        >
          c/{{ post.community.name }}
        </p>
        <h1 class="break-words font-semibold">{{ post.title }}</h1>
        <p class="break-words text-xxs font-semibold">
          Posted by u/{{ post.user.name }} on
          {{ new Date(post.created_at).toLocaleDateString() }}
        </p>
        <button
          class="mt-1 rounded bg-red-500 px-2 text-xs text-white"
          @click="removeReportedPost(post.id)"
        >
          Delete
        </button>
      </div>
    </div>

    <UserProfileCard
      @click="openGrantUser"
      class="mt-4 bg-zinc-100 dark:bg-zinc-900"
      :title="'Grant users'"
    />

    <div v-if="isGrantUserOpened">
      <UserProfileCard
        @click="openUserList"
        class="mt-4 bg-[#e9e9eb] hover:bg-[#f3f3f4]"
        :title="'User list'"
      />
      <div
        v-if="isUserListOpened"
        class="my-1 w-full rounded bg-zinc-100 px-4 py-2 hover:bg-zinc-50 dark:bg-[#1e1e20] dark:text-zinc-300"
      >
        <div
          class="mt-2 flex flex-wrap justify-between border border-b border-transparent border-b-zinc-300 pb-1 dark:border-b-zinc-600"
          v-for="user in filteredUsers()"
          :key="user.id"
        >
          <div
            class="flex min-w-[16rem] flex-wrap break-all text-xs font-semibold"
          >
            {{ user.name }}
          </div>
          <div class="flex flex-wrap">
            <button
              @click="giveModeratorRole(user.id)"
              class="mt-1 rounded bg-[#4169E1] px-4 text-xs font-semibold text-white"
            >
              Give moderator role
            </button>
          </div>
        </div>
      </div>

      <UserProfileCard
        @click="openModeratorList"
        class="mt-4 bg-[#e9e9eb] hover:bg-[#f3f3f4]"
        :title="'Moderator list'"
      />
      <div
        v-if="isModeratorListOpened"
        class="my-1 w-full rounded bg-zinc-100 px-4 py-2 hover:bg-zinc-50 dark:bg-[#1e1e20] dark:text-zinc-300"
      >
        <div
          class="mt-2 flex flex-wrap justify-between border border-b border-transparent border-b-zinc-300 pb-1 dark:border-b-zinc-600"
          v-for="moderator in filteredMods()"
          :key="moderator.id"
        >
          <div
            class="flex min-w-[16rem] flex-wrap break-all text-xs font-semibold"
          >
            {{ moderator.name }}
          </div>
          <div class="flex flex-wrap">
            <button
              @click="removeModeratorRole(moderator.id)"
              class="mt-1 rounded bg-[#900603] px-4 text-xs font-semibold text-white"
            >
              Remove moderator role
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import UserProfileCard from "/src/components/UI/UserProfileCard.vue";
import axios from "axios";
import { ref, onMounted } from "vue";
import { createToaster } from "@meforma/vue-toaster";

const toaster = createToaster();

const isReportedListOpened = ref(false);

function openReportedList() {
  isReportedListOpened.value = !isReportedListOpened.value;
}

const isGrantUserOpened = ref(false);

function openGrantUser() {
  isGrantUserOpened.value = !isGrantUserOpened.value;
}

const isUserListOpened = ref(false);

function openUserList() {
  isUserListOpened.value = !isUserListOpened.value;
}

const isModeratorListOpened = ref(false);

function openModeratorList() {
  isModeratorListOpened.value = !isModeratorListOpened.value;
}

const users = ref([]);

function fetchUserList() {
  axios.get("/api/user/admin/list").then((response) => {
    users.value = response.data.data;
  });
}

const posts = ref([]);

function fetchReportedPosts() {
  axios.get("/api/post/admin/reported").then((response) => {
    posts.value = response.data.data;
  });
}

function removeReportedPost(id) {
  axios.delete("/api/post/" + id + "/delete").then(() => {
    const postIndex = posts.value.findIndex((c) => c.id === id);
    posts.value.splice(postIndex, 1);
  });
}

function filteredUsers() {
  return this.users.filter(
    (user) =>
      user.roles.includes("user") &&
      !user.roles.includes("admin") &&
      !user.roles.includes("moderator")
  );
}

function filteredMods() {
  return this.users.filter((user) => user.roles.includes("moderator"));
}

function giveModeratorRole(id) {
  axios.put("/api/user/" + id + "/givemod").then((response) => {
    fetchUserList();
    toaster.success(response.data.data.message, {
      position: "top",
    });
  });
}

function removeModeratorRole(id) {
  axios.put("/api/user/" + id + "/removemod").then((response) => {
    fetchUserList();
    toaster.success(response.data.data.message, {
      position: "top",
    });
  });
}

onMounted(() => {
  fetchUserList();
  fetchReportedPosts();
});
</script>
