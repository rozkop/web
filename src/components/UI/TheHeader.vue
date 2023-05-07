<template>
  <nav>
    <div
      class="flex h-12 overflow-hidden border-[#f6f7f8] bg-white dark:border-[#343536] dark:bg-[#1a1a1b] sm:border-b"
    >
      <router-link :to="{ name: 'main' }" class="shrink-0">
        <img
          v-if="!isDark"
          class="mt-3.5 hidden h-6 justify-center pl-3 pr-4 xs:flex xs:px-5"
          src="/src/assets/logo-black.png"
          alt=""
        />
        <img
          v-if="isDark"
          class="mt-3.5 hidden h-6 justify-center pl-3 pr-4 xs:flex xs:pl-5 xs:pr-3 sm:pr-5"
          src="/src/assets/logo-white.png"
          alt=""
        />
        <img
          class="ml-3 mr-1.5 mt-1.5 flex h-9 xs:hidden"
          src="/src/assets/logoCircle.png"
          alt=""
        />
      </router-link>

      <!-- Menu -->
      <div
        ref="menu"
        v-if="isAuth"
        class="flex shrink-0 flex-col justify-center"
      >
        <div>
          <div
            @click="openMenu"
            class="my-2 flex cursor-pointer items-center justify-between rounded border border-transparent px-2 text-sm hover:border-[#f6f7f8] dark:text-gray-200 dark:hover:border-[#313133] xxs:w-48 xs:w-fit md:w-64"
          >
            <div class="my-1.5 flex max-w-[90%] items-center">
              <img
                class="flex h-6 pr-2 dark:hidden"
                src="/src/assets/house-black.svg"
                alt=""
              />
              <img
                class="hidden h-6 pr-2 dark:flex"
                src="/src/assets/house-light.svg"
                alt=""
              />
              <p
                  v-if="route.params.community_name"
                class="mr-2 hidden truncate xxs:inline-block xs:hidden md:inline-block"
              >
                c/{{ route.params.community_name }}
              </p>
              <p v-else class="mr-2 hidden truncate xxs:inline-block xs:hidden md:inline-block">
                Home
              </p>
            </div>

            <div class="shrink-0 pr-2 xs:pr-0">
              <img
                v-if="!isDark"
                class="flex h-4 pt-1"
                src="/src/assets/down-arrow-black.svg"
                alt=""
              />
              <img
                v-if="isDark"
                class="flex h-4 pt-1"
                src="/src/assets/down-arrow-light.svg"
                alt=""
              />
            </div>
          </div>
        </div>

        <div
          class="left-0 w-full xs:left-auto xs:w-fit"
          :class="isMenuOpened ? 'absolute' : 'hidden'"
        >
          <!-- Dropdown menu -->
          <div
            class="absolute z-10 mt-6 w-full rounded-b-lg bg-white py-2 text-sm shadow dark:bg-[#1a1a1b] dark:text-gray-300 xs:w-64"
          >
            <div class="w-full px-4">
              <input
                class="w-full border px-2 py-1 text-black hover:border-blue-400 focus:border-blue-400 focus:outline-none dark:border-gray-500 dark:bg-transparent dark:text-white dark:placeholder:text-gray-400 dark:hover:border-white dark:focus:border-white"
                type="text"
                placeholder="Filter"
              />
            </div>

            <div class="mt-4 w-full space-y-0.5 px-4">
              <p class="px-2 py-0.5 text-xxs font-semibold text-gray-400">
                YOUR COMMUNITIES
              </p>
              <p
                class="rounded-sm px-2 py-0.5 hover:bg-gray-100 dark:hover:bg-zinc-800"
              >
                Create Community
              </p>
              <p
                class="rounded-sm px-2 py-0.5 hover:bg-gray-100 dark:hover:bg-zinc-800"
              >
                c/poland
              </p>
            </div>
            <div class="mt-4 flex flex-col w-full space-y-0.5 px-4">
              <p class="px-2 py-0.5 text-xxs font-semibold text-gray-400">
                FEEDS
              </p>
              <router-link @click="openMenu" :to="{name: 'new'}"
                class="rounded-sm px-2 py-0.5 hover:bg-gray-100 dark:hover:bg-zinc-800"
              >
                New
              </router-link>
              <router-link @click="openMenu" :to="{name: 'hot'}"
                class="rounded-sm px-2 py-0.5 hover:bg-gray-100 dark:hover:bg-zinc-800"
              >
                Hot
              </router-link>
            </div>
            <div class="mt-4 w-full space-y-0.5 px-4">
              <p class="px-2 py-0.5 text-xxs font-semibold text-gray-400">
                OTHER
              </p>
              <p
                class="rounded-sm px-2 py-0.5 hover:bg-gray-100 dark:hover:bg-zinc-800"
              >
                User Settings
              </p>
              <router-link @click="openMenu" :to="{name: 'submit'}"
                class="flex rounded-sm px-2 py-0.5 hover:bg-gray-100 dark:hover:bg-zinc-800"
              >
                Create Post
              </router-link>
            </div>
          </div>
        </div>
      </div>

      <!-- Searchbar -->
      <div
        class="ml-2 flex w-full justify-end md:ml-0 md:justify-evenly lg:justify-between"
      >
        <div class="hidden w-10/12 flex-col justify-center sm:flex md:w-2/3">
          <div
            @click="openSearchbar"
            class="my-2 cursor-pointer rounded px-2 text-sm font-medium"
          >
            <div class="flex items-center">
              <label class="relative w-full">
                <span class="absolute inset-y-0 left-0 flex items-center pl-3">
                  <img
                    class="flex h-5 pr-2"
                    src="/src/assets/magnifier.svg"
                    alt=""
                  />
                </span>
                <input
                  ref="searchbarDiv"
                  v-model="searchValue"
                  class="w-full rounded-2xl border-[#f6f7f8] bg-gray-100 py-2 pl-11 pr-4 text-xs font-normal text-gray-900 dark:text-gray-300 placeholder:text-xs placeholder:font-normal placeholder:text-zinc-500 hover:border-blue-500 focus:rounded-none focus:rounded-t-2xl focus:border-blue-500 focus:outline-none dark:border-[#343536] dark:bg-[#272729] dark:hover:border-gray-400 dark:focus:border-gray-400"
                  placeholder="Search Rozkop"
                  type="text"
                />
                <button
                  @click="removeSearchValue"
                  :class="searchValue ? 'absolute' : 'hidden'"
                  class="inset-y-0 right-0 flex items-center pr-2"
                >
                  <img
                    class="flex h-5 bg-gray-100 pl-2 dark:bg-[#272729]"
                    src="/src/assets/close-circle.svg"
                    alt=""
                  />
                </button>
              </label>
            </div>
          </div>
        </div>

        <div class="flex shrink-0 space-x-2">
          <div
            :class="
              isAuth
                ? 'hidden xs:flex sm:hidden md:flex'
                : 'hidden xxs:flex sm:hidden md:flex'
            "
          >
            <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley"
              class="flex justify-center items-center my-2 w-20 overflow-hidden rounded-xl border border-blue-400 bg-white text-sm font-semibold text-[#0079d3] hover:bg-gray-50 dark:border-transparent dark:bg-[#272729] dark:text-white dark:hover:bg-[#333336]"
            >
              Get App
            </a>
          </div>
          <div v-if="!isAuth" class="flex pl-2 xxs:pl-0">
            <router-link
              :to="{ name: 'login' }"
              class="my-2 flex w-20 items-center justify-center overflow-hidden rounded-xl bg-[#0079d3] text-sm font-semibold text-white hover:bg-[#006cbd] dark:bg-[#ff6542] dark:hover:bg-[#e55a3b]"
            >
              Log In
            </router-link>
          </div>
          <div
            class="flex items-center pl-0 pr-3 sm:pl-2 sm:pr-4 md:pr-5 lg:pr-8"
          >
            <button v-if="!isAuth" @click="toggleDark()">
              <img
                v-if="!isDark"
                class="flex h-6"
                src="/src/assets/moon.svg"
                alt=""
              />
              <img
                v-if="isDark"
                class="flex h-6"
                src="/src/assets/sun.svg"
                alt=""
              />
            </button>
            <button
              class="relative flex items-center rounded border border-transparent p-1 hover:border-[#f6f7f8] dark:hover:border-[#313133] xs:max-w-[7rem] sm:max-w-[10rem]"
              ref="account"
              @click="openAccount"
              v-if="isAuth"
            >
              <img
                v-if="isDark"
                class="mt-1 flex h-6"
                src="/src/assets/user-account-light.svg"
                alt=""
              />
              <img
                v-if="!isDark"
                class="mt-1 flex h-6"
                src="/src/assets/user-account-black.svg"
                alt=""
              />
              <span
                v-if="!userData.name"
                class="rounded"
                :class="isDark ? 'sm:dark-pulsating-text' : 'sm:pulsating-text'"
              ></span>

              <span
                v-if="userData.name"
                class="hidden truncate pl-2 text-xs font-semibold dark:text-zinc-200 sm:inline-block"
                >{{ userData.name }}</span
              >
            </button>

            <div
              :class="isAccountOpened ? 'absolute' : 'hidden'"
              class="left-0 top-11 z-10 w-full rounded-lg bg-white py-2 text-sm shadow dark:bg-[#1a1a1b] dark:text-zinc-200 xs:left-auto xs:right-2 xs:w-44"
            >
              <div class="flex w-full px-2 xs:px-1 sm:hidden">
                <p
                  v-if="!userData.name"
                  class="mb-2 !w-full rounded py-4"
                  :class="isDark ? 'dark-pulsating-text' : 'pulsating-text'"
                ></p>
              </div>

              <p
                v-if="userData.name"
                class="flex w-full shrink-0 items-center justify-center px-3 py-2 font-semibold hover:bg-gray-100 hover:dark:bg-[#272729] xs:justify-start sm:hidden"
              >
                Hi, {{ userData.name }}!
              </p>

              <hr
                class="mx-2 flex h-px border-0 bg-gray-200 dark:bg-gray-700 sm:hidden"
              />
              <button
                class="flex w-full shrink-0 justify-center px-3 py-2 hover:bg-gray-100 hover:dark:bg-[#272729] xs:justify-start"
              >
                Profile
              </button>
              <button
                class="flex w-full shrink-0 justify-center px-3 py-2 hover:bg-gray-100 hover:dark:bg-[#272729] xs:justify-start"
                @click="toggleDark()"
                v-if="isDark"
              >
                Light mode
              </button>
              <button
                class="flex w-full shrink-0 justify-center px-3 py-2 hover:bg-gray-100 hover:dark:bg-[#272729] xs:justify-start"
                @click="toggleDark()"
                v-if="!isDark"
              >
                Dark mode
              </button>
              <hr class="mx-2 h-px border-0 bg-gray-200 dark:bg-gray-700" />
              <button
                @click="logOut"
                class="flex w-full shrink-0 justify-center px-3 py-2 hover:bg-gray-100 hover:dark:bg-[#272729] xs:justify-start"
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      class="mx-auto flex w-full border-b border-[#f6f7f8] pb-2 pt-1 dark:border-[#343536] dark:bg-[#1a1a1b] sm:hidden"
    >
      <div
        @click="isSearchbarOpened = !isSearchbarOpened"
        class="w-full cursor-pointer rounded px-2 text-sm font-medium"
      >
        <div class="flex items-center">
          <label class="relative w-full">
            <span class="absolute inset-y-0 left-0 flex items-center pl-3">
              <img
                class="flex h-5 pr-2"
                src="/src/assets/magnifier.svg"
                alt=""
              />
            </span>
            <input
              ref="smallSearchbarDiv"
              v-model="searchValue"
              class="w-full rounded-2xl border-[#f6f7f8] bg-gray-100 py-2 pl-11 pr-4 text-xs font-normal text-gray-900 dark:text-gray-300 placeholder:text-xs placeholder:font-normal placeholder:text-zinc-500 hover:border-blue-500 focus:rounded-none focus:rounded-t-2xl focus:border-blue-500 focus:outline-none dark:border-[#343536] dark:bg-[#272729] dark:hover:border-gray-400 dark:focus:border-gray-400"
              placeholder="Search Rozkop"
              type="text"
            />
            <button
              @click="removeSearchValue"
              :class="searchValue ? 'absolute' : 'hidden'"
              class="inset-y-0 right-0 flex items-center pr-2"
            >
              <img
                class="flex h-5 bg-gray-100 pl-2 dark:bg-[#272729]"
                src="/src/assets/close-circle.svg"
                alt=""
              />
            </button>
          </label>
        </div>
      </div>
    </div>

    <!-- Dynamic dropdown searchbar -->
    <div
      ref="searchbar"
      :class="isSearchbarOpened ? 'absolute' : 'hidden'"
      :style="
        windowWidth >= 576
          ? { left: searchbarDivStart + 'px', width: searchbarDivWidth + 'px' }
          : {
              left: smallSearchbarDivStart + 'px',
              width: smallSearchbarDivWidth + 'px',
            }
      "
    >
      <div class="rounded-b-md bg-white py-3 shadow-md dark:bg-[#272729]">
        <div class="w-full space-y-2 px-6">
          <p class="px-2 text-xxs font-semibold text-gray-400">
            TRENDING TODAY
          </p>

          <div
            class="cursor-pointer rounded p-2 hover:bg-gray-50 dark:hover:bg-[#3c3c3e]"
          >
            <h1 class="font-medium dark:text-gray-200">
              Co się stało pod Legnicą?
            </h1>
            <p class="mt-1 text-sm text-gray-400">
              Świadkowie, którzy na własne oczy zobaczyli jakie zdarzenie miało
              tuż pod Legnicą (woj. dolnośląskie) są jednego zdania...
            </p>
            <p class="mt-2 text-xxs dark:text-gray-400">c/poland and more</p>
          </div>

          <div class="border-t border-[#f6f7f8] dark:border-[#343536]"></div>

          <div
            class="cursor-pointer rounded p-2 hover:bg-gray-50 dark:hover:bg-[#3c3c3e]"
          >
            <h1 class="font-medium dark:text-gray-200">
              Zobacz przepis na pasztet!
            </h1>
            <p class="mt-1 text-sm text-gray-400">
              Przepis na wegański pasztet...
            </p>
            <p class="mt-2 text-xxs dark:text-gray-400">c/vegan and more</p>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { useRouter, useRoute } from "vue-router";
import { ref, onMounted } from "vue";
import {
  onClickOutside,
  useElementBounding,
  useWindowSize,
  useDark,
  useToggle,
} from "@vueuse/core";

const router = useRouter();
const route = useRoute();
import { useAuth } from "../../composables/auth.js";
import axios from "axios";

const { userData } = useAuth();

const isAuth = ref(false);

onMounted(() => {
  if ($cookies.get("auth_token")) {
    isAuth.value = true;
    openMenu();
  }
});


function logOut() {
  axios
    .post("http://localhost:8000/api/logout", "", {
      headers: {
        Authorization: `Bearer ${$cookies.get("auth_token")}`,
      },
    }).then(() => {
    $cookies.remove("auth_token")
    location.reload()
  })
}

function openAccount() {
  if (userData.name) {
    isAccountOpened.value = !isAccountOpened.value;
  }
}

const isAccountOpened = ref(false);
const account = ref(null);
onClickOutside(account, () => (isAccountOpened.value = false));

function openMenu() {
  isMenuOpened.value = !isMenuOpened.value;
}

const isMenuOpened = ref(true);
const menu = ref(null);
onClickOutside(menu, () => (isMenuOpened.value = false));

function openSearchbar() {
  isSearchbarOpened.value = !isSearchbarOpened.value;
}

const isSearchbarOpened = ref(false);
const searchbar = ref(null);
onClickOutside(searchbar, () => (isSearchbarOpened.value = false));

const searchValue = ref("");

function removeSearchValue() {
  searchValue.value = "";
  isSearchbarOpened.value = !isSearchbarOpened.value;
}

const isDark = useDark();
const toggleDark = useToggle(isDark);
const { width: windowWidth } = useWindowSize();

const searchbarDiv = ref(null);
const { left: searchbarDivStart, width: searchbarDivWidth } =
  useElementBounding(searchbarDiv);

const smallSearchbarDiv = ref(null);
const { left: smallSearchbarDivStart, width: smallSearchbarDivWidth } =
  useElementBounding(smallSearchbarDiv);
</script>
