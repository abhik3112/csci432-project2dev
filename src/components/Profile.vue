<script setup>
import { useRouter } from 'vue-router'
import Modal from './Modal.vue';
import { onMounted, ref, useTemplateRef } from 'vue';

const router = useRouter()
const errormsg = ref("")
const userName = ref("")
const firstName = ref("")
const lastName = ref("")
const email = ref("")

const usrnm = ref("")
const frstnm = ref("")
const lstnm = ref("")
const eml = ref("")
const psswrd = ref("")

const modal = useTemplateRef('name-modal')

function cancel(e) {
  errormsg.value = 'Cancelled'
  usrnm.value = ''
  frstnm.value = ''
  lstnm.value = ''
  eml.value = ''
  psswrd.value = ''
  modal.value.close(e)
}

async function save(e) {
  e.preventDefault()
  errormsg.value = ""
  const token = localStorage.getItem("token")

  const data = {
    email: eml.value || undefined,
    userName: usrnm.value || undefined,
    password: psswrd.value || undefined,
    firstName: frstnm.value || undefined,
    lastName: lstnm.value || undefined
  }

  const url = 'https://excursions-api-server.azurewebsites.net/user'

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
    localStorage.setItem("userName", usrnm.value)
    localStorage.setItem('lastName', lstnm.value)
    localStorage.setItem('firstName', frstnm.value)
    localStorage.setItem('email', eml.value)

    console.log("success");

    errormsg.value = "Saved Successfully"

    modal.value.close(e)

    fetchUser();

    router.push({
      name: 'user'
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

async function fetchUser() {
  const url = 'https://excursions-api-server.azurewebsites.net/user'
  const token = localStorage.getItem("token");

  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  let response = await fetch(url, options)

  if (response.status == 200) {
    let data = await response.json();

    console.log("from server", data);

    localStorage.setItem("email", data.email);
    localStorage.setItem("userName", data.userName);
    localStorage.setItem("firstName", data.firstName);
    localStorage.setItem("lastName", data.lastName);

    email.value = data.email;
    userName.value = data.userName;
    firstName.value = data.firstName;
    lastName.value = data.lastName;
  }
  else {
    errormsg.value = "Error fetching user data, code: " + response.status
  }
}

async function dlt() {
  if (!confirm("Are you sure you want to delete your account?")) {
    return;
  }

  const token = localStorage.getItem(token)

  if (!token) {
    errormsg.value = "No token found"
    return
  }

  const url = 'https://excursions-api-server.azurewebsites.net/user'

  const options = {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  let response = await fetch(url, options)

  if (response.status === 200) {
    localStorage.clear()

    router.push({
      name: 'home'
    })
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
  fetchUser();
});
</script>

<template>
  <main>
    <ul>
      <li>Username: {{ userName }}</li>
      <li>First Name: {{ firstName }}</li>
      <li>Last Name: {{ lastName }}</li>
      <li>Email: {{ email }}</li>
      <button @click="modal.open()">Edit</button>
      <button @click="dlt">Delete Profile</button>
    </ul>
  </main>

  <Modal ref="name-modal">
    <template #header>
      <h2>Edit your Informations:</h2>
    </template>
    <template #main>
      Username:
      <input v-model="usrnm" type="text">
      First name:
      <input v-model="frstnm" type="text">
      Last name:
      <input v-model="lstnm" type="text">
      Email:
      <input v-model="eml" type="email">
      Password:
      <input v-model="psswrd" type="password">
    </template>
    <template #footer>
      <button @click.stop="cancel">Cancel</button>
      <button @click="save">Save</button>
    </template>
  </Modal>

</template>
