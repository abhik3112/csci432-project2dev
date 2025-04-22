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
    <h2>Options:</h2>
    <a @click="go('profile')">Profile</a> <br>
    <a @click="go('parkdetails')">Park Details</a><br>
    <a @click="go('excursions')">Excursions</a><br>
    <a @click="go('trips')">Trips</a><br>
    <a @click="go('social')">Social</a><br>
  </div>
</template>

<style scoped>
a {
  padding: 10px 10px 10px 10px;
  font-size: 30px;
  color: gray;
  cursor: pointer;
}
a:hover{
  color: black;
}
</style>
