<template>
  <header>
    <div class="logo">
      <OllamaLogo class="ollama-icon" @click="CleanChat" />
      <ModelsList />
      <ColorScheme />
    </div>
    <Menu />
  </header>
</template>

<script setup>
import eventBus from "../../EventsBus";
import OllamaLogo from "../icons/OllamaLogo.vue";
import ModelsList from "./components/Menu/components/ModelsList.vue";
import Menu from "./components/Menu/index.vue";
import ColorScheme from "../global/ColorScheme.vue";

const CleanChat = () => {
  eventBus.$emit("cleanChat", "");
};
</script>

<style scoped>
header {
  background: var(--background-color);

  position: sticky;
  top: 0;

  padding: 20px 20px;
  width: 100%;
  display: flex;
  gap: 20px;
  justify-content: space-between;

  .logo {
    width: min(100%, 30rem);

    display: flex;
    gap: 10px;
    align-items: center;
    flex-wrap: wrap;
  }
}

.ollama-icon {
  cursor: pointer;
  height: 2rem;
  width: 2rem;

  transition: scale 200ms;

  &:hover {
    scale: 1.2;
  }
}
</style>
