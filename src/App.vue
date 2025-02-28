<template>
  <HeaderSection />
  <main>
    <RouterView @responseStatus="handleResponseStatus" />
  </main>
  <OllamaEndPointModal />
</template>

<script setup>
import HeaderSection from "./components/HeaderSection/index.vue";
import OllamaEndPointModal from "./components/OllamaEndPointModal/index.vue";
import { provide, ref } from "vue";

const responseStatus = ref("");
provide("responseStatus", responseStatus);

const handleResponseStatus = (event) => {
  responseStatus.value = event;
};
</script>

<style scoped></style>
