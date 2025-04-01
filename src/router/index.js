import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import SignIn from '@/views/Signin.vue'
import Join from '@/views/Join.vue'
import Main from '@/views/Main.vue'
import Left from '@/components/Left.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/signin',
      name: 'signin',
      component: SignIn,
    },
    {
      path: '/join',
      name: 'join',
      component: Join,
    },
    // {
    //   path: '/main',
    //   component: Main,
    //   children: [
    //     {
    //       path: '',
    //       name: 'normal',
    //       components: {
    //         default: Main,
    //         LeftSidebar: Left,
    //         Middle: message,
    //         RightSidebar: Right,
    //       },
    //     }
    //   ]
    // }
  ],
})

export default router
