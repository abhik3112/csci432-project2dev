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
    <h3>Select the options:</h3>
    <a @click="go('nationalparks')">National Parks</a>
    <a @click="go('nationalparkssum')">National Parks Summary</a>
    <a @click="go('campgrounds')">Campgrounds</a>
    <a @click="go('thingstodo')">Things to do</a>
  </div>
</template>

<style scoped>

</style>
