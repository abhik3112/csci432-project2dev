<script setup>
import { onMounted, ref } from 'vue';

const errormsg = ref("")
const parks = ref([])

async function fetchNationalParks() {

  const url = 'https://excursions-api-server.azurewebsites.net/national-parks'

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

    parks.value = data

    localStorage.setItem("parkcode", data[0].parkCode);
    localStorage.setItem("stateCode", data[0].stateCode);
  }
  else {
    errormsg.value = "Error fetching user data, code: " + response.status
  }
}
onMounted(() => {
  fetchNationalParks()
})
</script>

<template>
  <div>
    <li v-for="park in parks" :key="park.parkCode">
      <strong>{{ park.name }} ({{ park.parkCode }})</strong><br>
    </li>
  </div>
</template>
