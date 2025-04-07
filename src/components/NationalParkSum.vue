<script setup>
import { onMounted, ref } from 'vue';

const errormsg = ref("")
const parkCode = ref("")
const stateCode = ref("")
const limit = ref(10)
const start = ref(0)
const nationalParkSummary = ref("")

async function fetchNationalParksSum() {

  const url = 'https://excursions-api-server.azurewebsites.net/national-parks/summary'

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

    nationalParkSummary.value = data;
    parkCode.value = data.parkCode;
    stateCode.value = data.stateCode;

  }
  else {
    errormsg.value = "Error fetching user data, code: " + response.status
  }
}
onMounted(() => {
  fetchNationalParksSum();
});
</script>

<template>
  <div>
    <h2>National Park Summary</h2>
    <p v-if="errormsg">{{ errormsg }}</p>
    <div v-if="nationalParkSummary">
      <p><strong>Park Code:</strong> {{ nationalParkSummary.parkCode }}</p>
      <p><strong>State Code:</strong> {{ nationalParkSummary.stateCode }}</p>
      </div>
    <p v-else-if="!errormsg">Loading national park summary...</p>

    </div>
</template>
