import { createRouter, createWebHistory } from "vue-router";
import RegisterPage from "../views/RegisterPage.vue";
import LoginPage from "../views/LoginPage.vue";
import NewPostList from "../components/layout/NewPostList.vue";
import HotPostList from "../components/layout/HotPostList.vue";
import PostPage from "../views/PostPage.vue";
import EditPostPage from "../components/layout/EditPostModal.vue";
import SubmitPostPage from "../views/SubmitPostPage.vue";
import NotFound from "../components/UI/NotFound.vue";
import CommunityPage from "../views/CommunityPage.vue";
import UserProfilePage from "../views/UserProfilePage.vue";
import SubmitCommunityPage from "../views/SubmitCommunityPage.vue";
import UserStatistics from "../components/layout/UserStatistics.vue";
import UserSettings from "../components/layout/UserSettings.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/:notFound(.*)',
            name: 'not-found',
            component: NotFound,
        },
        {
          path: '/register',
          name: 'register',
          component: RegisterPage,
        },
        {
            path: '/login',
            name: 'login',
            component: LoginPage,
        },
        {
          path: '/profile/:section?',
          name: 'profile',
          component: UserProfilePage,
          children: [
              {
                  name: 'settings',
                  path: 'settings',
                  component: UserSettings
              },
              {
                  name: 'statistics',
                  path: 'statistics',
                  component: UserStatistics
              }
          ]
        },
        {
            path: '/',
            name: 'main',
            component: HotPostList,
        },
        {
            path: '/hot',
            name: 'hot',
            component: HotPostList,
        },
        {
            path: '/new',
            name: 'new',
            component: NewPostList,
        },
        {
            name: 'post',
            path: '/c/:community_slug/comments/:id/:slug',
            component: PostPage,
        },
        {
            name: 'submit',
            path: '/submit/:community_slug?',
            component: SubmitPostPage,
        },
        {
            name: 'submit-community',
            path: '/submit/community',
            component: SubmitCommunityPage,
        },
        {
            name: 'community',
            path: '/c/:community_slug/:filter(hot|new)?',
            component: CommunityPage
        }
    ],
});

export default router;