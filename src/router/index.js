import { createRouter, createWebHistory } from "vue-router";
import RegisterPage from "../views/RegisterPage.vue";
import LoginPage from "../views/LoginPage.vue";
import NewPostList from "../components/layout/NewPostList.vue";
import HotPostList from "../components/layout/HotPostList.vue";
import PostPage from "../views/PostPage.vue";
import SubmitPostPage from "../views/SubmitPostPage.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
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
        }
    ],
});

export default router;