<template>
  <section class="chat-box">
    <ModelsList
      @selectedModelEmit="
        (model) => {
          selectedModel = model;
        }
      "
    />

    <textarea type="text" v-model="prompt" />

    <button @click="Chat()" :disabled="selectedModel == ''">Enviar</button>

      <ChatLog :conversation="conversation" />
  </section>
</template>
  
  <script setup>
import { onMounted, ref } from "vue";
import ollama from "ollama";
import ModelsList from "./components/ModelsList.vue";
import ChatLog from "./components/ChatLog.vue";

const selectedModel = ref("");
const conversation = ref([]);
const prompt = ref("write a joke");

const Chat = async () => {
  const form = [
    {
      role: "user",
      message: prompt.value,
    },
    {
      role: "ia",
      message: "",
    },
  ];

  conversation.value.push(...form);

  const params = {
    model: selectedModel.value,
    messages: [{ role: "user", content: prompt.value }],
    stream: true,
    keep_alive: true,
  };

  const response = await ollama.chat(params);

  for await (const part of response) {

    const index = conversation.value.length -1

    conversation.value[index].message = conversation.value[index].message + part.message.content;
  }
};
</script>
   
  
  <style scoped>
.chat-box {
  display: grid;
  place-items: center;
  gap: 20px;
  width: 100%;
}

.models-list {
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 20px;
}

</style>