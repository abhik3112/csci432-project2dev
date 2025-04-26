<script setup>
import { useRouter } from 'vue-router'
import Modal from './Modal.vue';
import { onMounted, ref, useTemplateRef } from 'vue';

const router = useRouter()
const errormsg = ref("")
const name = ref("")
const description = ref("")
const exc = ref([])
const friendId = ref("")
const excursionid = ref("")
const friends = ref([])

const modal = useTemplateRef('name-modal')
const editexcid = ref(null)
const nm = ref("")
const des = ref("")

function open(e) {
  editexcid.value = e._id
  nm.value = e.name;
  des.value = e.description;
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

  const url = `https://excursions-api-server.azurewebsites.net/excursion/${editexcid.value}`

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

    getExcursions()

    router.push({
      name: 'excursions'
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

async function postExcursions() {
  errormsg.value = ""

  const token = localStorage.getItem("token")

  const dt = {
    name: name.value,
    description: description.value,
    exc: exc.value
  }

  console.log("posting:", dt)

  const url = 'https://excursions-api-server.azurewebsites.net/excursion'

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

async function getExcursions() {

  errormsg.value = ""

  const token = localStorage.getItem("token")

  const url = 'https://excursions-api-server.azurewebsites.net/excursions'

  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  let response = await fetch(url, options)

  if (response.ok) {
    let data = await response.json()
    console.log(data)

    exc.value = data.excursions

  }
  else {
    errormsg.value = "Error fetching user excursions: " + response.status
  }
}

onMounted(() => {
  getExcursions()
})

async function dltExc(id) {

  if (!confirm("Are you sure you want to delete this excursion?")) {
    return;
  }

  const token = localStorage.getItem("token")

  const url = `https://excursions-api-server.azurewebsites.net/excursion/${id}`

  const options = {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  let response = await fetch(url, options)

  if (response.status === 200) {
    getExcursions()
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

async function CreateExcReq() {

  errormsg.value = ""

  const token = localStorage.getItem("token")

  const url = `https://excursions-api-server.azurewebsites.net/share/excursion/${excursionid.value}`

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

</script>

<template>
  <main>
    <div>
      <form @submit.prevent="postExcursions">
        <h2>Create your excursion here..</h2>
        <input type="text" v-model="name" placeholder="Enter your excursion name..." required> <br>
        <input type="text" v-model="description" placeholder="Enter your description..." required> <br>
        <button type="submit">Post Excursion</button>
      </form>
      <hr />
      <h2>Your Excursions</h2>
      <button @click="getExcursions">Load My Excursions</button>
      <div>
        <div class="excu" v-for="excs in exc" :key="excs._id" @click="excursionid = excs._id">
          Excursion Name: {{ excs.name }}<br>
          Description: {{ excs.description }}
          <br>
          <button @click="open(excs)">Edit</button>
          <button @click="dltExc(excs._id)">Delete Excursion</button>
        </div>

        <h3>Search for Friends here:</h3>
        <input v-model="search" placeholder="Search here..."><br />
        <button @click="getfriends">Search Friends</button> <br />
        <div class="fname">
          <div class="fre" v-for="friend in searchFriends" :key="friend._id" @click="friendId = friend._id">
            {{ friend.userName }}
          </div>
        </div>

        <h4>Send Excursion invite</h4>
        <input v-model="excursionid" placeholder="Enter your excursion id">
        <input v-model="friendId" placeholder="Enter your friends id">
        <button @click="CreateExcReq" :disabled="!excursionid">Send Excursion Invite</button>
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
    </template>
    <template #footer>
      <button @click.stop="cancel">Cancel</button>
      <button @click="save">Save</button>
    </template>
  </Modal>
</template>

<style scoped>
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
.excu{
  cursor: pointer;
}

.fre{
  cursor: pointer;
}
</style>
