
<template>
  <header>
    <div>
      Ollama chat app
    </div>
    <div class="menu">
      <Menu />
    </div>
  </header>
</template>

<script setup>
import Menu from './components/Menu/index.vue';
</script>


<style scoped>
header {
  position: relative;
  padding: 20px 20px 0;
  width: 100%;
  display: flex;
  gap: 20px;
  justify-content: space-between;
}
</style>
