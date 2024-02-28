<template>
  <section>
    <div v-for="(chat, index) in conversation" :key="index">
      <span style="white-space: pre-wrap">{{ chat.message }}</span>
    </div>
  </section>
</template>

<script setup>
import { ref, watch } from "vue";

const props = defineProps(["conversation"]);

watch(props.conversation, async (newQuestion, oldQuestion) => {});
</script>

<style scoped>
div {
  display: flex;
}


section {
    width: 100%;
    display: grid;
    gap: 30px;
  }
</style>