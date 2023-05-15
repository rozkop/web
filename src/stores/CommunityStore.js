import { defineStore } from "pinia";

export const useCommunityStore = defineStore("CommunityStore", {
  state: () => ({
    communityName: "",
  }),
  actions: {
    changeCommunityName(name) {
      this.communityName = name;
    },
  },
});
