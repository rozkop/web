<template>
  <div class="mt-4 w-full">
    <div class="rounded border border-zinc-200 bg-white p-4">
      <div class="flex w-full flex-col md:w-2/3 lg:w-1/2">
        <div class="flex flex-col">
          <h1 class="font-semibold">Gender</h1>
          <input
            v-model="userData.gender"
            :placeholder="user.gender"
            class="peer block w-full appearance-none border-0 border-b-2 border-zinc-200 bg-transparent px-0 px-4 py-2.5 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-gray-200 focus:outline-none focus:ring-0 dark:border-gray-700 dark:text-gray-400"
          />
        </div>
        <div class="flex w-full justify-end md:justify-start">
          <button
            @click="submitGender"
            class="mt-6 rounded-xl bg-[#0079d3] px-4 py-2 font-semibold text-white text-xs"
          >
            Change gender
          </button>
        </div>

        <div class="flex flex-col">
          <h1 class="mt-8 mb-2 font-semibold">Country</h1>
          <select
            v-model="userData.country"
            class="w-full rounded border border-gray-300 px-3 py-2 pr-8 leading-tight focus:border-gray-500 focus:outline-none"
          >
            <option value="" selected>{{ user.country }}</option>
            <option v-for="country in sortedCountries">{{ country }}</option>
          </select>
        </div>
        <div class="flex w-full justify-end md:justify-start">
          <button
            @click="submitCountry"
            class="mt-6 rounded-xl bg-[#0079d3] px-4 py-2 font-semibold text-white text-xs"
          >
            Change country
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { createToaster } from "@meforma/vue-toaster";

const toaster = createToaster();

import { defineProps, onMounted } from "vue";

const props = defineProps(["user"]);

import { ref, reactive, computed } from "vue";
import axios from "axios";

const countries = ref([]);
const userData = reactive({
  gender: "",
  country: "",
});

const sortedCountries = computed(() => {
  return countries.value.map((country) => country.name.common).sort();
});

function fetchCountries() {
  axios
    .get("https://restcountries.com/v3.1/all?fields=name")
    .then((response) => {
      console.log(response);
      countries.value = response.data;
    });
}

function submitCountry() {
  if (userData.country !== "") {
    axios
      .put("/api/user/update", {
        country: userData.country,
      })
      .then(() => {
        toaster.success(`Country updated!`, {
          position: "top",
        });
        userData.country = "";
      });
  } else {
    toaster.error(`Select country!`, {
      position: "top",
    });
  }
}

function submitGender() {
  if (userData.gender !== "") {
    axios
      .put("/api/user/update", {
        gender: userData.gender,
      })
      .then(() => {
        toaster.success(`Gender updated!`, {
          position: "top",
        });
        props.user.gender = userData.gender;
        userData.gender = "";
      });
  } else {
    toaster.error(`Type gender!`, {
      position: "top",
    });
  }
}

onMounted(() => {
  fetchCountries();
});
</script>
