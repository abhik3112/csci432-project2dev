<script setup>
import { ref, computed } from 'vue'

const errormsg = ref("")
const friends = ref([])
const search = ref("")
const friendId = ref("")

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
  if (response.status === 200) {

    const data = await response.json()

    console.log(data)

    friends.value = data.friends || []

  }
  else if (response.status === 400) {
    errormsg.value = "Bad Request"
  }
  else if (response.status === 401) {
    errormsg.value = "Unauthorized"
  }
  else if (response.status === 500) {
    errormsg.value = "Internal Server Error"
  }
}

async function CreatefriendReq() {

errormsg.value = ""

const token = localStorage.getItem("token")

const url = `https://excursions-api-server.azurewebsites.net/friends/requests`

const data = {
  friendId: friendId.value,
}

const response = await fetch(url, {
  method: 'POST',
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json"
  },
  body: JSON.stringify(data)
})
if (response.status === 201) {
  errormsg.value = "Friend Request sent"

  const data = await response.json()

  console.log(data)
}
if (response.status === 400) {
  errormsg.value = "Bad Request"
}
if (response.status === 401) {
  errormsg.value = "Unauthorized"
}
if (response.status === 500) {
  errormsg.value = "Internal Server Error"
}
}
</script>

<template>
  <main>
    <div>
      <h3>Search for Friends here:</h3>
      <input v-model="search" placeholder="Search here..."><br />
      <button @click="getfriends">Search Friends</button> <br />
      <div class="fname">
        <div class="fre" v-for="friend in searchFriends" :key="friend._id" @click="friendId = friend._id">
          {{ friend.userName }}
        </div>
      </div>

      <h4>Send Friend Request:</h4>
      <input v-model="friendId" placeholder="Enter Friend's ID">
      <button @click="CreatefriendReq" :disabled="!friendId">Send Request</button>
    </div>
  </main>
</template>

<style scoped>
main {
  margin-left: 15px;
}

.fname {
  text-decoration: none;
}

button {
  background-color: #78C2F1;
  color: black;
  padding: 5px;
  font-size: 11px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  transition: box-shadow 0.3s ease;
  margin: 10px 10px 10px 0px;
}

button:hover {
  box-shadow: 0 0 5px black;
}
.fre{
  cursor: pointer;
}
</style>
