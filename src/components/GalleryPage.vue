<script setup>
import { onMounted, defineProps, ref } from 'vue';

const errormsg = ref("")

const props = defineProps({
  parkCode:String
})

const galllist = ref([])
const loaded = ref(false)

async function getGallery() {

  const url = `https://excursions-api-server.azurewebsites.net/multimedia/galleries?limit=5?parkCode=${props.parkCode}`

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
    galllist.value = data.data;
  }
  else {
    errormsg.value = "Error fetching user data, code: " + response.status
  }
  loaded.value = true
}

onMounted(()=>{
  getGallery()
})
</script>

<template>
  <div>
    <h2>Gallery</h2>
    <p v-if="errormsg">{{ errormsg }}</p>
    <p v-if="!loaded">Loading gallery...</p>
    <div v-for="pic in galllist" :key="pic.parkCode">
      <h4>{{ pic.title }}</h4>
      <div v-for="img in pic.images" style="position:relative;margin-bottom:40px">
        <img :src="img.url" alt="" style="width:100%;max-width:unset">
      </div>
      <hr>
    </div>
  </div>
</template>
