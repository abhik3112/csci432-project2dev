<script setup>
import { useRouter } from 'vue-router';

const router = useRouter()

async function go(section) {
  router.push({
    name: section
  })
}
</script>

<template>
  <div>
    <h3>Options:</h3>
    <li><a @click="go('profile')">Profile</a></li>
    <li><a @click="go('parkdetails')">Park Details</a></li>
    <li><a @click="go('multimedia')">Multimedia</a></li>
    <li><a @click="go('excursions')">Excursions</a></li>
    <li><a @click="go('trips')">Trips</a></li>
    <li><a @click="go('social')">Social</a></li>
  </div>
</template>

<style scoped>
a {
  cursor: pointer;
}
</style>
