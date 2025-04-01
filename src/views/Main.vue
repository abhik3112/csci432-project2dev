<script setup>
import Header from '@/components/Header.vue'
import { ref } from 'vue';
import { RouterView, useRouter } from 'vue-router'

const errormsg = ref("")
const router = useRouter()

async function signOut() {

  const token = localStorage.getItem(token)

  const url = 'https://hap-app-api.azurewebsites.net/user/logout'

  const options = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  let response = await fetch(url, options)

  if (response.ok) {
    if (response.status === 200) {
      localStorage.clear()

      router.push({
        name: 'home'
      })
    }
  } else {
    console.log("HTTP-Error: " + response.status)
  }
}

async function dlt() {
  if (!confirm("Are you sure you want to delete your account?")) {
    return;
  }

  const token = localStorage.getItem(token)

  if (!token) {
    errormsg.value = "No token found"
    return
  }

  const url = 'https://hap-app-api.azurewebsites.net/user'

  const options = {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  let response = await fetch(url, options)

  if (response.status === 200) {
    localStorage.clear()

    router.push({
      name: 'home'
    })
  }
  else if (response.status === 401) {
    errormsg.value = "Unauthorized"
    console.log("Unauthorized")
  }
  else if (response.status === 500) {
    errormsg.value = "Internal Server Error"
    console.log("Internal Server Error")
  }
}
</script>

<template>
  <Header>
    <a @click="signOut">Sign out</a>
  </Header>

  <main>
    <RouterView name="LeftSidebar" class="grid-panel line"></RouterView>
    <RouterView name="Middle" class="grid-panel"></RouterView>
    <RouterView name="RightSidebar" class="grid-panel vline"></RouterView>
  </main>
</template>
