<script setup>
import { ref, computed } from 'vue'
import { RouterLink } from 'vue-router'

const errormsg = ref("")
const friends = ref([])
const search = ref("")

const searchFriends = computed(() => {
  if (!search.value) {
    return friends.value;
  }
  return friends.value.filter(friend =>
    friend.userName.toLowerCase().includes(search.value.toLowerCase())
  );
});

async function getfriends() {
  const token = localStorage.getItem("token")

  console.log("Token:", token)

  const url = `https://excursions-api-server.azurewebsites.net/friends`

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  console.log("Status:", response.status)
  if(response.status === 200) {
    errormsg.value = "Ok"

    const data = await response.json()

    console.log(data)

    friends.value = data.friends || []

  }
  else if (response.status === 400) {
    errormsg.value = "Bad Request"
  }
  else if(response.status === 401) {
    errormsg.value = "Unauthorized"
  }
  else if(response.status === 500) {
    errormsg.value = "Internal Server Error"
  }
}
</script>

<template>
  <main>
    <div>
      <p class="Searchfriends">Search for Friends here:</p>
      <input v-model="search" placeholder="Search here..."><br />
      <button @click="getfriends">Search Friends</button> <br />
      <RouterLink v-for="friend in searchFriends" :key="friend._id" :to="`social/${friend._id}?name=${friend.userName}`">
        {{ friend.userName }} <br />
      </RouterLink>
    </div>
  </main>
</template>
