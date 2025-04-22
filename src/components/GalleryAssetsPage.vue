<script setup>
import { onMounted, defineProps, ref } from 'vue';

const errormsg = ref("")
const loaded = ref(false)

const props = defineProps({
  parkCode:String
})

const list = ref([])

async function getGalleryAssets() {

  const url = `https://excursions-api-server.azurewebsites.net/multimedia/galleries/assets?limit=5?parkCode=${props.parkCode}`

  const token = localStorage.getItem("token");

  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  let response = await fetch(url, options)

  if (response.ok) {
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
  getGalleryAssets()
})
</script>

<template>
  <div>
    <h2>Gallery Assets</h2>
    <p v-if="errormsg">{{ errormsg }}</p>
    <p v-if="!loaded">Loading gallery assets...</p>
    <div v-for="assets in list" :key="assets.parkCode" style="position:relative;margin-bottom:40px">
      <!-- <h4>{{ assets.title }}</h4> -->
      <img :src="assets.fileInfo.url" alt="" style="width:100%;max-width:unset">
      <hr>
    </div>
  </div>
</template>
