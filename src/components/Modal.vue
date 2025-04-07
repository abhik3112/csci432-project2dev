<script setup>
import { ref } from 'vue';

const showModal = ref(false)

defineExpose({
  open, close
})

function open() {
  showModal.value = true
}

function close(e) {
  console.log('on close')
  console.log('t: ', e.target, ' ct: ', e.currentTarget)
  showModal.value = false
}
</script>

<template>
  <div v-show="showModal" class="modal-backdrop" @click.self="close">
    <div class="modal">
      <slot name="header"></slot>
      <slot name="main"></slot>
      <slot name="footer">
      </slot>
    </div>
  </div>
</template>

<style scoped>
.modal-backdrop {
  position:absolute;
  backdrop-filter: blur(30px);
}

.modal {
  background-color: lightgray;
  padding: 30px;
  border: 3px solid black;
}

.modal-button:hover {
  background-color: black;
  color: white;
  border-radius: 0;
}
</style>
