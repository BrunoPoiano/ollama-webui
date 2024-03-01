<template>
  <div class="models-list">
    <select v-model="selectedModel" @change="handleSelectedModel">
      <option v-for="model in models" :key="model.model" :value="model.model">
        {{ model.name }}
      </option>
    </select>
    <button @click="ListModels">List</button>
  </div>
</template>

<script setup>
import ollama from "ollama";
import { onMounted, ref, defineEmits } from "vue";

const emit = defineEmits(["selectedModelEmit"]);
const models = ref([]);
const selectedModel = ref("");

const ListModels = async () => {
  const modelsList = await ollama.list();
  selectedModel.value = modelsList.models[0].model
  models.value = modelsList.models;
};

const handleSelectedModel = () => {
  localStorage.setItem("SELECTED_MODEL", selectedModel.value);
};

onMounted(() => {
  ListModels();
});
</script>

<style>
.models-list {
  width: 100%;
  display: flex;
  justify-content: center;
  place-items: center;
  gap: 20px;
}
</style>