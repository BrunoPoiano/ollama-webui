<template>
  <div class="models-list">
    <select v-model="selectedModel" @change="handleSelectedModel">
      <option v-for="model in models" :key="model.model" :value="model.model">
        {{ model.name }}
      </option>
    </select>
    <button @click="ListModels" :data-loading="loading">
      <i class="fa fa-refresh" aria-hidden="true"></i>
    </button>
  </div>
</template>

<script setup>
import ollama from "ollama";
import { onMounted, ref, defineEmits } from "vue";

const emit = defineEmits(["selectedModelEmit"]);
const models = ref([]);
const selectedModel = ref(localStorage.getItem("SELECTED_MODEL"));
const loading = ref(false);

const ListModels = async () => {
  loading.value = true;
  const modelsList = await ollama.list();
  models.value = modelsList.models;
  loading.value = false;
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

  & button {
    --width: 2rem;
    font-size: 1.2rem;
    padding: 0px;
    width: var(--width);
    min-width: var(--width);
    aspect-ratio: 1;
  }

  & button[data-loading="false"] > i {
    animation: 500ms fadeOut ease-out forwards;
  }
}

@keyframes fadeOut {
  to {
    rotate: 180deg;
  }
}
</style>