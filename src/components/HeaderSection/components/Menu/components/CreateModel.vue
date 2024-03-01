<template>
  <button @click="openModal">Create Model</button>

  <Teleport to="body">
    <dialog id="createModelModal">
      <button @click="closeModal">X</button>
      <div class="form">
        <input type="text" placeholder="Model name" v-model="form.name">
        <select v-model="form.model" @change="handleSelectedModel" placeholder="Base model">
          <option v-for="model in models" :key="model.model" :value="model.model">
            {{ model.name }}
          </option>
        </select>

        <textarea placeholder="Personality" id="" cols="30" rows="10" v-model="form.personality">
        </textarea>

        <button @click="createModel"> Create Model</button>

      </div>
    </dialog>
  </Teleport>
</template>

<script setup>
import ollama from "ollama";
import { onMounted, ref } from 'vue';

const form = ref({});
const models = ref([]);
const ollama_end_point = import.meta.env.VITE_OLLAMA_END_POINT

const openModal = () => {
  const createModelModal = document.getElementById("createModelModal");
  createModelModal.showModal();
};

const closeModal = () => {
  const createModelModal = document.getElementById("createModelModal");
  createModelModal.close();
};

const createModel = async () => {
  const model = {
    "name": form.value.name,
    "modelfile": `FROM ${form.value.model}\nSYSTEM ${form.value.personality}`
  }

  try {
    const response = await fetch(`${ollama_end_point}/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(model)
    });

    const data = await response.json();
  } catch (error) {
    console.error('Error:', error);
  }

}

const ListModels = async () => {
  const modelsList = await ollama.list();
  models.value = modelsList.models;
};

onMounted(() => {
  ListModels();
});
</script>

<style scoped>
.form {
  display: grid;
  gap: 10px;
}
</style>