import { createRouter, createWebHistory } from "vue-router";
import RegisterPage from "../views/RegisterPage.vue";
import LoginPage from "../views/LoginPage.vue";
import NewPostList from "../components/layout/NewPostList.vue";
import HotPostList from "../components/layout/HotPostList.vue";
import PostPage from "../views/PostPage.vue";
import SubmitPostPage from "../views/SubmitPostPage.vue";
import NotFound from "../components/UI/NotFound.vue";
import CommunityPage from "../views/CommunityPage.vue";
import UserSettingsPage from "../views/UserSettingsPage.vue";

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
          path: '/settings',
          name: 'settings',
          component: UserSettingsPage,
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
            path: '/c/:community_name/comments/:id/:slug',
            component: PostPage,
        },
        {
            name: 'submit',
            path: '/submit',
            component: SubmitPostPage,
        },
        {
            name: 'community',
            path: '/c/:community_name/:filter(hot|new)?',
            component: CommunityPage
        }
    ],
});

export default router;