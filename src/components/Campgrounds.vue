<script setup>
import { onMounted, ref } from 'vue';

const errormsg = ref("")
const campgrounds = ref([])
const loaded = ref(false)

async function fetchCampgrounds() {

  const url = 'https://excursions-api-server.azurewebsites.net/campgrounds?limit=10'

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

    campgrounds.value = data.data;

    console.log("from server", data);
  }
  else {
    errormsg.value = "Error fetching user data, code: " + response.status
  }
  loaded.value = true
}

onMounted(()=>{
  fetchCampgrounds()
})
</script>

<template>
  <div>
    <h2>Campgrounds</h2>
    <p v-if="errormsg">{{ errormsg }}</p>
    <p v-if="!loaded">Loading campgrounds...</p>
    <div v-for="camp in campgrounds" :key="camp.parkCode">
      <h3>{{ camp.name }}</h3>
      <p>{{ camp.description }}</p>
      <hr>
    </div>
  </div>
</template>
