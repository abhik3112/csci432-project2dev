<script setup>
import router from '@/router';
import { onMounted, ref } from 'vue';

const errormsg = ref("")

const props = defineProps({
  parkCode: String
});

function getAudio() {
  router.push({
    path: "/audio/" + props.parkCode
  });
}

function getGallery() {
  router.push({
    path: "/galleries/" + props.parkCode
  });
}
function getGalleryAssets() {
  router.push({
    path: "/galleriesassets/" + props.parkCode
  });
}
function getVideos() {
  router.push({
    path: "/videos/" + props.parkCode
  });
}
async function goback() {
  router.push({
    name: 'nationalparks'
  })
}
onMounted(() => {
  console.log("current parkCode:", props.parkCode)
})

</script>

<template>
  <div>
    <h2>Select the options:</h2>
    <a @click="getAudio">Audio</a><br>
    <a @click="getGallery">Gallery</a><br>
    <a @click="getGalleryAssets">Gallery Assets</a><br>
    <a @click="getVideos">Videos</a><br>
    <br>
    <button @click="goback">Go back</button>
  </div>
</template>

<style scoped>
a {
  padding: 10px 10px 10px 10px;
  font-size: 30px;
  color: gray;
  cursor: pointer;
  transition: color 0.2s ease;
}

a:hover {
  color: black;
}

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
