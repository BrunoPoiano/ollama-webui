<template>
  <button @click="openModal">Create Model</button>

  <Teleport to="body">
    <dialog id="createModelModal">
      <button @click="closeModal">X</button>
      Aqui conteudo
    </dialog>
  </Teleport>
</template>

<script setup>
const openModal = () => {
  const createModelModal = document.getElementById("createModelModal");
  createModelModal.showModal();
};

const closeModal = () => {
  const createModelModal = document.getElementById("createModelModal");
  createModelModal.close();
};
</script>

<style scoped>
dialog {

}
</style>