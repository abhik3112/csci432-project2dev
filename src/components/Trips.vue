<script setup>
import { onMounted, ref, useTemplateRef } from 'vue'
import { useRouter } from 'vue-router'
import Modal from './Modal.vue';

const name = ref([])
const description = ref("")
const startDate = ref("")
const endDate = ref("")
const trips = ref([])
const errormsg = ref("")

const router = useRouter()
const modal = useTemplateRef('name-modal')
const edittripid = ref(null)
const nm = ref("")
const des = ref("")
const stime = ref("")
const etime = ref("")

function open(e) {
  edittripid.value = e._id
  nm.value = e.name
  des.value = e.description
  stime.value = e.startDate
  etime.value = e.endDate
  modal.value.open();
}

function cancel(e) {
  errormsg.value = 'Cancelled'
  nm.value = ''
  des.value = ''
  modal.value.close(e)
}

async function save(e) {
  e.preventDefault()
  errormsg.value = ""
  const token = localStorage.getItem("token")

  const data = {
    name: nm.value || undefined,
    description: des.value || undefined,
  }

  const url = `https://excursions-api-server.azurewebsites.net/trip/${edittripid.value}`

  const options = {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }

  let response = await fetch(url, options)

  console.log("status:", response.status)

  if (response.status === 200) {

    console.log("success");

    errormsg.value = "Saved Successfully"

    modal.value.close(e)

    getTripsByUser()

    router.push({
      name: 'trips'
    })
  }
  else if (response.status === 400) {
    errormsg.value = "Invalid email or password"
    console.log("bad request");
  }
  else if (response.status === 500) {
    errormsg.value = "Internal Server Error"
  }
}

async function postTrips() {
  errormsg.value = ""

  if (name.value.length > 128) {
    errormsg.value = "Max length exceeded"
    return
  }

  const token = localStorage.getItem("token")

  const dt = {
    name: name.value,
    description: description.value,
    startDate: new Date(startDate.value).toISOString(),
    endDate: new Date(endDate.value).toISOString(),
    trips: trips.value
  }

  console.log("posting:", dt)

  const url = 'https://excursions-api-server.azurewebsites.net/trip'

  const options = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(dt),
  }

  let response = await fetch(url, options)

  if (response.status === 201) {
    errormsg.value = "Created"
    const data = await response.json()
    console.log(data)
    localStorage.setItem("name", data.user.name)
    localStorage.setItem("description", data.user.description)
    localStorage.setItem("startDate", data.user.startDate)
    localStorage.setItem("endDate", data.user.endDate)
    localStorage.setItem("park", data.user.park)
    localStorage.setItem("campground", data.user.campground)
    localStorage.setItem("thingstodo", data.user.thingstodo)
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

async function getTripsByUser() {
  const token = localStorage.getItem("token")

  const url = `https://excursions-api-server.azurewebsites.net/trips`

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    }
  })
  if (response.ok) {
    errormsg.value = "OK"

    const data = await response.json()

    console.log(data)

    trips.value = data.trips
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
  else {
    console.log("other error", response.statusText)
  }
}

async function dltTrip(id) {

  if (!confirm("Are you sure you want to delete this Trip?")) {
    return;
  }

  const token = localStorage.getItem("token")

  const url = `https://excursions-api-server.azurewebsites.net/trip/${id}`

  const options = {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  let response = await fetch(url, options)

  if (response.status === 200) {
    errormsg.value = "Excursion was deleted Successfully. No going back. Its done"
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

onMounted(() => {
  getTripsByUser()
})

</script>

<template>
  <main>
    <div>
    <form @submit.prevent="postTrips">
      <h2>Create your trip here..</h2>
      <input type="text" v-model="name" placeholder="Enter your name..." required> <br>
      <input type="text" v-model="description" placeholder="Enter your description..." required>  <br>
      <input type="datetime-local" v-model="startDate" required> <br>
      <input type="datetime-local" v-model="endDate" required><br>
      <button type="submit">Post Trip</button>
    </form>
    <hr />
    <h2>Your Trips</h2>
    <button @click="getTripsByUser">Load My Trips</button>
    <div>
      <div v-for="trip in trips" :key="trip._id">
        Trip Name: {{ trip.name }}<br>
        Description: {{ trip.description }} <br>
        Start Time: {{ trip.startDate }} <br>
        End Time: {{ trip.endDate }}

        <br>
        <button @click="open(trip)">Edit Trip</button>
        <button @click="dltTrip(trip._id)">Delete Trip</button>
      </div>
    </div>
    <hr />
  </div>
  </main>
  <Modal ref="name-modal">
    <template #header>
      <h2>Edit your Informations:</h2>
    </template>
    <template #main>
      Excursion Name:
      <input v-model="nm" type="text">
      Description:
      <input v-model="des" type="text">
      Start Time:
      <input v-model="stime" type="datetime-local">
      End Time:
      <input v-model="etime" type="datetime-local">

    </template>
    <template #footer>
      <button @click.stop="cancel">Cancel</button>
      <button @click="save">Save</button>
    </template>
  </Modal>
</template>

<style scoped>
main {
  grid-template-columns: 1fr 1fr;
}

main {
  margin-left: 20px;
}

button {
  background-color: #78C2F1;
  color: black;
  padding: 5px 10px;
  font-size: 15px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  transition: box-shadow 0.3s ease;
  margin: 10px 10px 10px 0px;
}

button:hover {
  box-shadow: 0 0 5px black;
}
</style>
