<script setup>
import { onMounted } from 'vue';

async function getAudio() {

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

async function getGallery() {

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
async function getGalleryAssets() {

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
async function getVideos() {

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
  getAudio()
  getGallery()
  getGalleryAssets()
  getVideos()
})

</script>
