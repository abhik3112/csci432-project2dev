<script setup>
import { onMounted, ref, useTemplateRef } from 'vue'
import { useRouter } from 'vue-router'
import Modal from './Modal.vue';
import Campgrounds from './Campgrounds.vue';

const name = ref([])
const description = ref("")
const startDate = ref("")
const endDate = ref("")
const trips = ref([])
const errormsg = ref("")
const parks = ref([])
const selectedPark = ref(null)
const campgrounds = ref([])
const selectedCampground = ref(null)
const thingsToDoList = ref([])
const selectedThingsToDo = ref([])

const router = useRouter()
const modal = useTemplateRef('name-modal')
const edittripid = ref(null)
const nm = ref("")
const des = ref("")
const stime = ref("")
const etime = ref("")

async function fetchParks() {
  const token = localStorage.getItem("token")
  const url = 'https://excursions-api-server.azurewebsites.net/national-parks?limit=20'

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      parks.value = (await response.json()).data;
    } else {
      console.error('Failed to fetch parks:', response.status, response.statusText);
      errormsg.value = "Failed to load parks.";
    }
  } catch (error) {
    console.error('Error fetching parks:', error);
    errormsg.value = "Error loading parks.";
  }
}

async function fetchCampgrounds(parkCode) {
  if (!parkCode) {
    campgrounds.value = [];
    selectedCampground.value = null;
    return;
  }
  const token = localStorage.getItem("token")
  const url = `https://excursions-api-server.azurewebsites.net/campgrounds?parkCode=${parkCode}&limit=20`

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      campgrounds.value = (await response.json()).data;
      console.log("campgrounds:",campgrounds.value)
    } else {
      console.error('Failed to fetch campgrounds:', response.status, response.statusText);
      errormsg.value = "Failed to load campgrounds.";
    }
  } catch (error) {
    console.error('Error fetching campgrounds:', error);
    errormsg.value = "Error loading campgrounds.";
  }
}

async function fetchThingsToDo(parkCode) {
  if (!parkCode) {
    thingsToDoList.value = [];
    selectedThingsToDo.value = [];
    return;
  }
  const token = localStorage.getItem("token")
  const url = `https://excursions-api-server.azurewebsites.net/things-to-do?limit=20&parkCode=${parkCode}`

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      thingsToDoList.value = (await response.json()).data;
      console.log("things to do",thingsToDoList.value);
    } else {
      console.error('Failed to fetch things to do:', response.status, response.statusText);
      errormsg.value = "Failed to load things to do.";
    }
  } catch (error) {
    console.error('Error fetching things to do:', error);
    errormsg.value = "Error loading things to do.";
  }
}

function handleParkChange(event) {
  let parkCode = event.target.value;
  fetchCampgrounds(parkCode)
  fetchThingsToDo(parkCode)
  selectedCampground.value = null
  selectedThingsToDo.value = []
}

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
    trips: trips.value,
    campground: selectedCampground.value,
    thingstodo: [...thingsToDoList.value.map(v=>v.id)]
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

    trips.value.push(data.trip)
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
    getTripsByUser();
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
  fetchParks()
})

</script>

<template>
  <main>
    <div>
      <form @submit.prevent="postTrips">
        <h2>Create your trip here..</h2>
        <input type="text" v-model="name" placeholder="Enter your name..." required> <br>
        <input type="text" v-model="description" placeholder="Enter your description..." required> <br>
        <input type="datetime-local" v-model="startDate" required> <br>
        <input type="datetime-local" v-model="endDate" required><br>

        <label for="park">Select a Park:</label>
        <select id="park" v-model="selectedPark" @change="handleParkChange">
          <option value="" disabled>Select a park</option>
          <option :value="park.parkCode" v-for="park in parks" :key="park.id">{{ park.name }}</option>
        </select>
        <br>

        <label for="campground" v-if="campgrounds.length > 0">Select a Campground:</label>
        <select id="campground" v-model="selectedCampground" v-show="campgrounds.length > 0">
          <option value="" disabled>Select a campground</option>
          <option :value="campground.id" v-for="campground in campgrounds" :key="campground.id">{{ campground.name }}
          </option>
        </select>
        <div v-if="campgrounds.length == 0 && selectedPark">No campgrounds available for this park.</div>
        <br>

        <div v-if="thingsToDoList.length > 0">
          <h3>Things to do</h3>
          <div v-for="(todo,i) in thingsToDoList" :key="todo.id" style="display:flex;gap:10px">
            <input type="checkbox" :id="'todo-' + todo.id" :value="todo.id" v-model="selectedThingsToDo[i]">
            <label :for="'todo-' + todo.id">{{ todo.title }}</label>
          </div>
        </div>
        <div v-else-if="selectedPark">No things to do available for this park.</div>
        <br>

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

select {
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 300px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input[type="checkbox"] {
  margin-right: 5px;
}
</style>
