import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import SignIn from '@/views/Signin.vue'
import Join from '@/views/Join.vue'
import Main from '@/views/Main.vue'
import Left from '@/components/Left.vue'
import Profile from '@/components/Profile.vue'
import Parkdetails from '@/components/Parkdetails.vue'
import Multimedia from '@/components/Multimedia.vue'
import Excursions from '@/components/Excursions.vue'
import Trips from '@/components/Trips.vue'
import Social from '@/components/Social.vue'
import Nationalparks from '@/components/Nationalparks.vue'
import NationalParkSum from '@/components/NationalParkSum.vue'
import Campgrounds from '@/components/Campgrounds.vue'
import Thingstodo from '@/components/Thingstodo.vue'
import Friends from '@/components/Friends.vue'

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
    {
      path: '/main',
      component: Main,
      children: [
        {
          path: '',
          name: 'normal',
          components: {
            LeftSidebar: Left,
          },
        },
        {
          path: 'profile',
          name: 'profile',
          components: {
            LeftSidebar: Left,
            Middle: Profile,
          }
        },
        {
          path: 'parkdetails',
          components: Parkdetails,
          children: [
            {
              path: '',
              name: 'park',
              components: {
                LeftSidebar: Left,
                Middle: Parkdetails,
              }
            },
            {
              path: 'nationalpark',
              name: 'nationalpark',
              components: {
                LeftSidebar: Left,
                Middle: Parkdetails,
                RightSidebar: Nationalparks,
              }
            },
            {
              path: 'nationalparkssum',
              name: 'nationalparkssum',
              components: {
                LeftSidebar: Left,
                Middle: Parkdetails,
                RightSidebar: NationalParkSum,
              }
            },
            {
              path: 'campground',
              name: 'campground',
              components: {
                LeftSidebar: Left,
                Middle: Parkdetails,
                RightSidebar: Campgrounds,
              }
            },
            {
              path: 'thingstodo',
              name: 'thingstodo',
              components: {
                LeftSidebar: Left,
                Middle: Parkdetails,
                RightSidebar: Thingstodo,
              }
            },
          ]
        },
        {
          path: 'multimedia',
          name: 'multimedia',
          components: {
            LeftSidebar: Left,
            Middle: Multimedia,
          }
        },
        {
          path: 'excursions',
          name: 'excursions',
          components: {
            LeftSidebar: Left,
            Middle: Excursions,
          }
        },
        {
          path: 'trips',
          name: 'trips',
          components: {
            LeftSidebar: Left,
            Middle: Trips,
          }
        },
        {
          path: 'Social',
          name: 'Social',
          components: {
            LeftSidebar: Left,
            Middle: Social,
            RightSidebar: Friends,
          }
        }
      ]
    }
  ],
})

export default router
