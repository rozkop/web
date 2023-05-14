<template>
  <div class="mt-2 w-full xs:w-5/6 sm:w-2/3 mx-auto h-screen">
    <div class="p-2">
      <div class="flex flex-col items-center space-y-2">
        <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-[#1a1a1b] dark:border-[#343536]">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 class="text-xl font-bold leading-tight tracking-tight text-zinc-900 md:text-2xl dark:text-white">
              Log in
            </h1>
            <form @submit.prevent="logIn" class="space-y-6">
              <div>
                <label for="email" class="block mb-2 text-sm font-medium text-zinc-900 dark:text-white">E-mail</label>
                <input v-model="user.email" type="email" name="email" id="email" class="autofill:!bg-transparent bg-zinc-50 border border-zinc-300 text-zinc-900 sm:text-sm rounded-lg block w-full p-2.5 dark:bg-[#272729] dark:border-[#343536] dark:placeholder-zinc-400 dark:text-zinc-100 outline-0" placeholder="your@email.com" required>
              </div>
              <div>
                <label for="password" class="block mb-2 text-sm font-medium text-zinc-900 dark:text-white">Password</label>
                <input v-model="user.password" type="password" name="password" id="password" placeholder="••••••••••••" class="bg-zinc-50 border border-zinc-300 text-zinc-900 sm:text-sm rounded-lg block w-full p-2.5 dark:bg-[#272729] dark:border-[#343536] dark:placeholder-zinc-400 dark:text-white outline-0" required minlength="8">
              </div>
              <small class="text-red-600">{{ error }}</small>

              <button v-if="!isLoading" type="submit" class="w-full text-white bg-[#0079d3] dark:bg-[#ff6542] focus:outline-none font-medium rounded-lg text-sm px-5 text-center">
                <span class="inline-block py-2.5">Log in</span>
              </button>

              <button v-if="isLoading" class="items-center w-full text-white bg-transparent focus:outline-none font-medium rounded-lg text-sm px-5 py-2 text-center">
                <svg aria-hidden="true" class="inline w-10 h-10 text-zinc-300 animate-spin dark:text-zinc-600 fill-[#0079d3] dark:fill-[#ff6542]" viewBox="0 0 140 140" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                </svg>
              </button>
              <a :href="githubRedirectUrl" v-if="!isLoading" class="flex justify-center items-center w-full text-black dark:text-white bg-zinc-50 dark:bg-transparent dark:hover:bg-zinc-800 border border-zinc-300 dark:border-[#343536] focus:outline-none font-medium rounded-lg text-sm px-5 text-center">
                <span class="flex items-center flex-wrap">
                  <img
                      v-if="!isDark"
                      class="h-6 mr-2 flex justify-center"
                      src="/src/assets/github-mark-black.svg"
                      alt=""
                  />
                  <img
                      v-if="isDark"
                      class="h-6 mr-2 flex justify-center"
                      src="/src/assets/github-mark-white.svg"
                      alt=""
                  />
                  <span class="flex py-2.5">Log in with GitHub</span>
                </span>
              </a>

              <p class="text-sm font-light text-zinc-500 dark:text-zinc-400">
                No account? <router-link :to="{name: 'register'}" class="font-medium text-primary-600 hover:underline dark:text-primary-500">Create it!</router-link>
              </p>
            </form>
          </div>
        </div>
        </div>
      </div>
  </div>

</template>

<script setup>
import { reactive, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

import {useDark } from "@vueuse/core";
const isDark = useDark();

const router = useRouter();

const user = reactive({
  name: 'Gall Anonim',
  email: 'gall@anonim.pl',
  password: 'password'
})

const error = ref('');
const isLoading = ref(false);

const githubRedirectUrl = axios.defaults.baseURL + '/api/login/github'

function logIn() {
  error.value = '';
  isLoading.value = true;

  axios.get('/sanctum/csrf-cookie');
  axios.post('/api/login', user).then(response => {
    if (response.data.data.token) {
      isLoading.value = false;
      $cookies.set('auth_token', response.data.data.token);

      router.push({name: 'main'}).then(() => {
        location.reload();
      })
    } else {
      isLoading.value = false;
      error.value = response.data.data.error;
    }
  })
}

const isAuth = ref(false);

onMounted(() => {
  if ($cookies.get('auth_token')) {
    isAuth.value = true;
  }
})

</script>