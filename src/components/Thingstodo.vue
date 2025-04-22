<script setup>
import { onMounted, ref } from 'vue';

const errormsg = ref("")
const thingstodo = ref([])
const loaded = ref(false)

async function fetchThingstodo() {

  const url = 'https://excursions-api-server.azurewebsites.net/things-to-do?limit=5'

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
    thingstodo.value = data.data
    console.log("from server", data);
  }
  else {
    errormsg.value = "Error fetching user data, code: " + response.status
  }
  loaded.value = true
}
onMounted(()=>{
  fetchThingstodo()
})
</script>

<template>
    <div>
    <h2>Things to do</h2>
    <p v-if="errormsg">{{ errormsg }}</p>
    <p v-if="!loaded">Loading things to do...</p>
    <div v-for="things in thingstodo" :key="things.parkCode">
      <h3>{{ things.title }}</h3>
      <p>{{ things.shortDescription }}</p>
      <hr>
    </div>
  </div>
</template>
