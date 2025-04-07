<script setup>
import { ref } from 'vue'

const props = defineProps({ userId: String })

const name = ref([])
const description = ref("")
const startDate = ref("")
const endDate = ref("")
const park = ref("")
const campground = ref("")
const thingstodo = ref([])
const mess = ref([])
const errormsg = ref("")

async function postTrip() {
  if (name.value.length > 128) {
    errormsg.value = "Max length exceeded"
    return
  }

  const token = localStorage.getItem("token")

  const dt = {
    name: name.value,
    description: description.value,
    startDate: startDate.value,
    endDate: endDate.value,
    park: park.value,
    campground: campground.value,
    thingstodo: thingstodo.value
  }

  const url = `https://excursions-api-server.azurewebsites.net/trips/${props.userId}`

  const options = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(dt),
  }

  let response = await fetch(url, options)

  if(response.status === 201) {
    errormsg.value = "Created"

    const data = await response.json()

    console.log(data)

    mess.value.push(data)
  }
  if(response.status === 400) {
    errormsg.value = "Bad Request"
  }
  if(response.status === 401) {
    errormsg.value = "Unauthorized"
  }
  if(response.status === 500) {
    errormsg.value = "Internal Server Error"
  }
}
async function getTrips() {
  const token = localStorage.getItem(token)

  const url = `https://excursions-api-server.azurewebsites.net/trips/${props.userId}`

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
</script>

<template>
  <main>
    <form @submit.prevent="postTrip">
      <h2>Create your trip here..</h2>
      <div>
        <input type="text" v-model="name" placeholder="Enter your name..." required>
        <input type="text" v-model="description" placeholder="Enter your description..." required>
        <input type="datetime-local" v-model="start" required>
        <input type="datetime-local" v-model="end" required>
        <input type="text" v-model="parkID" placeholder="Enter your Park..." required>
        <input type="text" v-model="campgroundID" placeholder="Enter your Campground..." required>
        <input type="text" v-model="thingstodo" placeholder="Things to do..." required>
        <button @click="postTrip">Post Trip</button>
      </div>
      <p class= "err" v-if="errormsg">{{ errormsg }}</p>
    </form>

  </main>
</template>
