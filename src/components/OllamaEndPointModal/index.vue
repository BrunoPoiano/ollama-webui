<template>
  <dialog id="ollama-endpoint-modal">
    <form @submit.prevent="saveEndpoint">
      <div>
        <label for="endpoint">Endpoint:</label>
        <input
          type="text"
          id="endpoint"
          name="endpoint"
          placeholder="http://localhost:11434"
          required
        />
      </div>
      <div class="action">
        <button type="submit">Save</button>
        <button type="reset">Reset</button>
      </div>
    </form>
  </dialog>
</template>

<script setup>
import { nextTick } from "vue";
import { onMounted, ref } from "vue";

function saveEndpoint(event) {
  const formData = new FormData(event.target);
  const formObject = Object.fromEntries(formData.entries());
  const regex =
    /^(https?:\/\/)?(?:[a-zA-Z0-9.-]+|\[?[a-fA-F0-9:]+\]?):\d{1,5}$/;

  console.log(regex.test(formObject.endpoint));
  if (!regex.test(formObject.endpoint)) {
    alert("Invalid endpoint");
  }
  localStorage.setItem("OLLAMA_ENDPOINT", `${formObject.endpoint}/api`);
  const ollamaModal = document.getElementById("ollama-endpoint-modal");
  ollamaModal.close();
}

onMounted(() => {
  const ollamaEndPoint = localStorage.getItem("OLLAMA_ENDPOINT");
  const ollamaModal = document.getElementById("ollama-endpoint-modal");

  if (!ollamaEndPoint) {
    ollamaModal.showModal();
  }
});
</script>

<style scoped>
#ollama-endpoint-modal::backdrop {
  background: rgba(0, 0, 0, 0.14);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(11.3px);
  -webkit-backdrop-filter: blur(11.3px);
  border: 1px solid rgba(0, 0, 0, 0.3);
}

form {
  input:not(:placeholder-shown):valid {
    outline-color: transparent;
  }
  input:not(:placeholder-shown):invalid {
    outline-color: transparent;
  }

  input:focus:invalid {
    outline-color: transparent;
  }
}
</style>
