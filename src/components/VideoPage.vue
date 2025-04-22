<script setup>
import { onMounted, defineProps, ref } from 'vue';

const errormsg = ref("")
const loaded = ref(false)

const props = defineProps({
  parkCode:String
})

const list = ref([])

async function getVideos() {

  const url = `https://excursions-api-server.azurewebsites.net/multimedia/videos?limit=5?parkCode=${props.parkCode}`

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
  getVideos()
})
</script>

<template>
  <div>
    <h2>Video</h2>
    <p v-if="errormsg">{{ errormsg }}</p>
    <p v-if="!loaded">Loading video...</p>
    <div v-for="video in list" :key="video.parkCode">
      <h4>{{ video.title }}</h4>
      <video controls :src="video.versions[0].url"></video>
      <p>Credit: {{ video.credit }}</p>
      <hr>
    </div>
  </div>
</template>
