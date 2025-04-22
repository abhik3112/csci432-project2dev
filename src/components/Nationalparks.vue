<script setup>
import router from '@/router';
import { onMounted, ref } from 'vue';

const errormsg = ref("")
const parks = ref([])
const loaded = ref(false)

async function fetchNationalParks() {

  const url = 'https://excursions-api-server.azurewebsites.net/national-parks?limit=10'

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
    console.log("data",data);
    parks.value = data.data
  }
  else {
    errormsg.value = "Error fetching user data, code: " + response.status
  }

  loaded.value = true
}
onMounted(() => {
  fetchNationalParks()
})

function goToMulti(parkCode){
  router.push({
    path:"/multimedia/"+parkCode
  });
}
</script>

<template>
  <div>
    <h2>National Park:</h2>
    <p v-if="errormsg">{{ errormsg }}</p>
    <p v-if="!loaded">Loading national park...</p>
    <div v-for="park in parks" :key="park.parkCode">
       <h3>{{ park.name }}</h3>
       <p>{{ park.description }}</p>
       <button @click="goToMulti(park.parkCode)">Multimedia</button>
       <hr>
    </div>
  </div>
</template>

<style scoped>
button {
  background-color: #78C2F1;
  color: black;
  padding: 5px 10px;
  font-size: 15px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  transition: box-shadow 0.3s ease;
}

button:hover {
  box-shadow: 0 0 5px black;
}
</style>
