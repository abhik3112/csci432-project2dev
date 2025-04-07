<script setup>
import Header from '@/components/Header.vue'
import { RouterView, useRouter } from 'vue-router'

const router = useRouter()

async function signOut() {
  const token = localStorage.getItem(token)

  const url = 'https://excursions-api-server.azurewebsites.net/user/sign-out'

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

<style scoped>
a {
  cursor: pointer;
}

.grid-panel {
  padding-left: 10px;
}

.view {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto 1fr auto;
  height: 100%;
}


@media (min-width: 50em) {
  main {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr;
  }

  .line {
    border-right: 3px black solid;
  }

  .vline {
    border-left: 3px black solid;
  }
}

</style>
