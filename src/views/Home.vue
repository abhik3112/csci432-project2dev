<script setup>
import Header from '@/components/Header.vue';
import { RouterLink } from 'vue-router';
</script>

<template>
  <Header>
    <nav>
      <RouterLink to="/signin">Sign In</RouterLink>
      <RouterLink to="/join">Join</RouterLink>
    </nav>
  </Header>
  <main class="main-container">
    <h1>USA National Park Excursion</h1>
    <h2>Where a great journey begins...</h2>
    <div class="button-container">
      <RouterLink to="/join">
        <button>Join</button>
      </RouterLink>
    </div>
    <img class="background-image" src="../components/Background-image.jpeg" alt="USA National Park">
  </main>
</template>

<style scoped>
.main-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
}

h1 {
  color: #543D1B;
  margin-bottom: 0px;
}

h2 {
  color: #85B853;
  margin-bottom: 20px;
}

.button-container {
  margin: 20px 0;
}

button {
  background-color: #78C2F1;
  color: black;
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  transition: box-shadow 0.3s ease;
}

button:hover {
  box-shadow: 0 0 5px black;
}

.background-image {
  width: 60%;
  height: auto;
  max-width: 1000px;
  margin-top: 20px;
}
</style>
