
<template>
  <HeaderSection />
  <main>
    <ChatSection @responseStatus="handleResponseStatus" />
  </main>
</template>

<script setup>
import ChatSection from './pages/ChatSection/index.vue';
import HeaderSection from './components/HeaderSection/index.vue';
import { provide, ref } from 'vue';

const responseStatus = ref('')
provide('responseStatus', responseStatus);

const handleResponseStatus = (event) => {
  responseStatus.value = event
}
</script>


<style scoped></style>
