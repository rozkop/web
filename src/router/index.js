import { createRouter, createWebHistory } from "vue-router";
import RegisterPage from "../views/RegisterPage.vue";
import LoginPage from "../views/LoginPage.vue";
import NewPostList from "../components/layout/NewPostList.vue";
import HotPostList from "../components/layout/HotPostList.vue";
import PostPage from "../views/PostPage.vue";
import AdminPage from "../views/AdminPage.vue";
import SubmitPostPage from "../views/SubmitPostPage.vue";
import NotFound from "../views/NotFound.vue";
import CommunityPage from "../views/CommunityPage.vue";
import UserProfilePage from "../views/UserProfilePage.vue";
import SubmitCommunityPage from "../views/SubmitCommunityPage.vue";
import UserStatistics from "../components/layout/UserStatistics.vue";
import UserSettings from "../components/layout/UserSettings.vue";

import { useAuth } from "../composables/auth.js";

const { userData, getUser } = useAuth(); // Call the useAuth function to get the userData object

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/:notFound(.*)",
      name: "not-found",
      component: NotFound,
    },
    {
      path: "/register",
      name: "register",
      component: RegisterPage,
      beforeEnter: async (to, from, next) => {
        await getUser();
        if (!userData.id) {
          next();
        } else {
          next("/");
        }
      },
    },
    {
      path: "/login",
      name: "login",
      component: LoginPage,
      beforeEnter: async (to, from, next) => {
        await getUser();
        if (!userData.id) {
          next();
        } else {
          next("/");
        }
      },
    },
    {
      path: "/profile/:section?",
      name: "profile",
      component: UserProfilePage,
      children: [
        {
          name: "settings",
          path: "settings",
          component: UserSettings,
        },
        {
          name: "statistics",
          path: "statistics",
          component: UserStatistics,
        },
      ],
      beforeEnter: async (to, from, next) => {
        await getUser();
        if (userData.id) {
          next();
        } else {
          next("/");
        }
      },
    },
    {
      path: "/",
      name: "main",
      component: HotPostList,
    },
    {
      path: "/hot",
      name: "hot",
      component: HotPostList,
    },
    {
      path: "/new",
      name: "new",
      component: NewPostList,
    },
    {
      name: "post",
      path: "/c/:community_slug/comments/:id/:slug",
      component: PostPage,
    },
    {
      name: "submit",
      path: "/submit/:community_slug?",
      component: SubmitPostPage,
      beforeEnter: async (to, from, next) => {
        await getUser();
        if (userData.id) {
          next();
        } else {
          next("/");
        }
      },
    },
    {
      name: "submit-community",
      path: "/submit/community",
      component: SubmitCommunityPage,
      beforeEnter: async (to, from, next) => {
        await getUser();
        if (userData.id) {
          next();
        } else {
          next("/");
        }
      },
    },
    {
      name: "community",
      path: "/c/:community_slug/:filter(hot|new)?",
      component: CommunityPage,
    },
    {
      name: "admin",
      path: "/admin",
      component: AdminPage,
      beforeEnter: async (to, from, next) => {
        await getUser();
        if (userData.role === "admin") {
          next();
        } else {
          next("/");
        }
      },
    },
  ],
});

export default router;
