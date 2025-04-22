<script setup>
import { onMounted, defineProps, ref } from 'vue';

const errormsg = ref("")

const props = defineProps({
  parkCode:String
})

const list = ref([])
const loaded = ref("")

async function getAudio() {

  const url = `https://excursions-api-server.azurewebsites.net/multimedia/audio?limit=5?parkCode=${props.parkCode}`

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
    console.log(data)
    list.value = data.data;
  }
  else {
    errormsg.value = "Error fetching user data, code: " + response.status
  }
  loaded.value = true
}

onMounted(()=>{
  getAudio()
})
</script>

<template>
  <div>
    <h2>Audio</h2>
    <p v-if="errormsg">{{ errormsg }}</p>
    <p v-if="!loaded">Loading audio...</p>
    <div v-for="audio in list" :key="audio.parkCode">
      <h4>{{ audio.title }}</h4>
      <audio controls :src="audio.versions[0].url">Audio</audio>
      <hr>
    </div>
  </div>
</template>
