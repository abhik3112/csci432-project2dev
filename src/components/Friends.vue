<script setup>
import { onMounted, ref } from 'vue';

const friendId = ref("")
const errormsg = ref("")
const requests = ref([])

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

async function getFriendReq() {
  const token = localStorage.getItem("token")

  const url = `https://excursions-api-server.azurewebsites.net/friends/requests`

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  if (response.status === 200) {
    // errormsg.value = "OK"

    const data = await response.json()
    data.reverse()

    console.log("Recieved Friend Request:", data)

    requests.value = data
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

onMounted(() => {
  getFriendReq()
})

</script>


<template>
  <div class="card">
    <h3>Friend Requests</h3>
    <p v-if="errormsg" class="error">{{ errormsg }}</p>
    <div v-for="request in requests" :key="request._id">
      <p>Sender: {{ request.sender }}</p>
      <p>Reciever: {{ request.reciever }}</p>
      <p>Status: {{ request.isAccepted? 'Accepted' : 'Pending' }}</p>
    </div>
    <h4>Send Friend Request:</h4>
    <input v-model="friendId" placeholder="Enter Friend's ID">
    <button @click="CreatefriendReq" :disabled="!friendId">Send Request</button>
  </div>
</template>
