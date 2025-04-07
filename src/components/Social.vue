<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

const errormsg = ref("")
const users = ref([])
const search = ref("")

async function getusers() {
  const token = localStorage.getItem(token)

  const url = `https://hap-app-api.azurewebsites.net/users?search=userName:${search.value}&sortBy=userName:asc`

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  if(response.status === 200) {
    errormsg.value = "Ok"

    const data = await response.json()

    console.log(data)

    users.value = data
  }
  if(response.status === 401) {
    errormsg.value = "Unauthorized"
  }
  if(response.status === 500) {
    errormsg.value = "Internal Server Error"
  }
}
</script>

<template>
  <main>
    <div>
      <p class="Searchp">Search for usernames here:</p>
      <input v-model="search" placeholder="Search here..."><br>
      <button @click="getusers">Search</button> <br>
      <RouterLink class = "names"v-for="user in users" :to="`/user/${user._id}?name=${user.userName}`">
        {{ user.userName }} <br>
      </RouterLink>
    </div>
  </main>
</template>
