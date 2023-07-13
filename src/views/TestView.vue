<template>
  <div>
    <button @click="openModal">Open Modal</button>
    <ModalComponent
      :showConfirmButton="false"
      :showCancelButton="false"
      :showContainer="false"
      :isOpen="isModalOpen"
      :title="title"
      :message="message"
      @confirm="onConfirm"
      @cancel="onCancel"
      @close="onClose"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ModalComponent from '../components/ModalComponent.vue'

const isModalOpen = ref(false)
const title = ref('Modal Title')
const message = ref('Modal Message')

const openModal = () => {
  isModalOpen.value = true
}

const onConfirm = () => {
  console.log('Confirm button clicked')
  isModalOpen.value = false
}

const onCancel = () => {
  console.log('Cancel button clicked')
  isModalOpen.value = false
}

const onClose = () => {
  console.log('Close button clicked')
  isModalOpen.value = false
}
</script>
