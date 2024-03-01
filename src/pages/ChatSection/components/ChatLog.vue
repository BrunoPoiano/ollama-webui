<template>
  <section>
    <div class="messages" v-for="(chat, index) in content" :key="index">
      <h5 :data-user="chat.role == 'user'">
        {{ chat.role == "user" ? "You:" : "Ollama:" }}
      </h5>
      <p style="white-space: pre-wrap">{{ chat.message }}</p>
    </div>
  </section>
</template>

<script setup>
import { watch } from "vue";

const props = defineProps(["content"]);

watch(props.content, async () => {});
</script>

<style scoped>
section {
  width: 100%;
  display: grid;
  place-items: baseline;
  gap: 10px;
}

.messages{
  & p {
    margin-left: 20px;
  }
  & [data-user="true"]{
    margin-bottom: 15px;
  } 
}
</style>