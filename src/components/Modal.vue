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
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: red;
  backdrop-filter: blur(50px);
}

.modal {
  background-color: white;
  padding: 30px;
}

.modal-button:hover {
  background-color: black;
  color: white;
  border-radius: 0;
}
</style>
