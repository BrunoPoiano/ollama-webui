<template>
  <table border="1">
    <thead>
      <tr>
        <th>Name</th>
        <th>Size</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="model in models" :key="model.model">
        <td data-label="Name">{{ model.model }}</td>
        <td data-label="Size">{{ formatSize(model.size) }}</td>
        <td>
          <DeleteModel :content="model" @refreshContent="listModels()" />
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import { onMounted, ref } from "vue";
import DeleteModel from "./components/DeleteModel.vue";
const ollama_end_point = localStorage.getItem("OLLAMA_ENDPOINT");

const models = ref([]);

const listModels = async () => {
  try {
    const response = await fetch(`${ollama_end_point}/tags`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const modelsList = await response.json();
    models.value = modelsList.models;
  } catch (error) {
    console.error("List error:", error);
  }
};

const formatSize = (size) => {
  const units = ["B", "KB", "MB", "GB"];
  let unitIndex = 0;
  while (unitIndex < units.length - 1 && size > 1024) {
    size /= 1024;
    unitIndex++;
  }
  return `${size.toFixed(2)}${units[unitIndex]}`;
};

onMounted(() => {
  listModels();
});
</script>

<style scoped>
table {
  border: 1px solid light-dart(#373737, #f0f0f0);
  color: light-dark(#000, #f0f0f0);

  th,
  td {
    border-color: light-dart(#373737, #f0f0f0);
  }
  & th:not(:last-child) {
    min-width: 20ch;
    padding: 10px;
  }

  & th:last-child {
    min-width: 5ch;
    padding: 10px;
  }

  & td {
    padding: 5px;
  }

  & td:last-child {
    display: flex;
    justify-content: center;
  }
}

@media screen and (max-width: 600px) {
  table {
    & thead {
      border: none;
      clip: rect(0 0 0 0);
      height: 1px;
      margin: -1px;
      overflow: hidden;
      padding: 0;
      position: absolute;
      width: 1px;
    }

    & tr {
      display: block;
      margin-bottom: 0.4em;
    }

    & td,
    td:last-child {
      display: block;
      text-align: right;
    }

    & td::before {
      content: attr(data-label);
      float: left;
      font-weight: bold;
    }
  }
}
</style>
