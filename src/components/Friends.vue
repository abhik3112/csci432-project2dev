<script setup>
import { onMounted, ref } from 'vue';

const friendId = ref([])
const errormsg = ref("")
const mess = ref("")

async function CreatefriendReq() {
  const token = localStorage.get(token)

  const url = `https://excursions-api-server.azurewebsites.net/friends/requests`

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      text: friendId.value
    })
  })
  if (response.status === 201) {
    errormsg.value = "Created"

    const data = await response.json()

    console.log(data)

    mess.value.push(data)
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
  const token = localStorage.get(token)

  const url = `https://hap-app-api.azurewebsites.net/messages/${props.userId}`

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  if (response.status === 200) {
    errormsg.value = "OK"

    const data = await response.json()
    data.reverse()

    console.log(data)

    mess.value = data
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
    <p v-for="request in mess">{{ request.text }}</p>
    <img @click="$router.back()" class="close" />
    <label class="secondary-heading label" for="request">Friend Requests:</label>
    <input type="text" @keyup.enter="CreatefriendReq" v-model="friendId" id="req" />

  </div>
</template>
