<script setup>
import { onMounted, ref } from 'vue';

const errormsg = ref("")
const nationalParkSummary = ref([])
const loaded = ref(false)

async function fetchNationalParksSum() {

  const url = 'https://excursions-api-server.azurewebsites.net/national-parks/summary?limit=10'

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

    console.log("summary", data);

    nationalParkSummary.value = data.data;

  }
  else {
    errormsg.value = "Error fetching user data, code: " + response.status
  }

  loaded.value = true
}
onMounted(() => {
  fetchNationalParksSum();
});
</script>

<template>
  <div>
    <h2>National Park Summary</h2>
    <p v-if="errormsg">{{ errormsg }}</p>
    <p v-if="!loaded">Loading national park summary...</p>
    <div v-for="sum in nationalParkSummary" :key="sum.parkCode">
      <h3> {{ sum.fullName }}</h3>
      <p> {{ sum.description }}</p>
      <hr>
    </div>

    </div>
</template>
