<script setup>
    import Logo from './Logo.vue'
</script>

<template>
    <header>
        <div class="container">
            <Logo />
            <slot></slot>
        </div>
    </header>
</template>

<style scoped>
.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  border: lightgray solid 2px;
  border-radius: 10px;
}

:slotted(*) {
  font-size: 1.5rem;
  text-decoration: none;
  color: black;
  transition: box-shadow 0.3s ease, transform 0.3s ease;
  transition: background-color 0.3s ease-out, background-color 0.3s ease-out;
  padding: 5px 10px;
  margin-left: 20px;
  border-radius: 10px;
}
:slotted(a:hover) {
  background-color: #78C2F1;
  box-shadow: 0 0 5px black;
  transform: translateY(-5px);
}
</style>
