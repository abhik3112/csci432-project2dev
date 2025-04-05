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
    <a @click="go('profile')">Profile</a>
    <a @click="go('parkdetails')">Park Details</a>
    <a @click="go('multimedia')">Multimedia</a>
    <a @click="go('excursions')">Excursions</a>
    <a @click="go('trips')">Trips</a>
    <a @click="go('social')">Social</a>
  </div>
</template>

<style scoped>

</style>
