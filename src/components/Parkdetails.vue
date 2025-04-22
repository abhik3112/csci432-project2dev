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
    <h2>Select the options:</h2>
    <a @click="go('nationalparks')">National Parks</a><br>
    <a @click="go('nationalparkssum')">National Parks Summary</a><br>
    <a @click="go('campgrounds')">Campgrounds</a><br>
    <a @click="go('thingstodo')">Things to do</a><br>
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
a:hover{
  color: black;
}
</style>
