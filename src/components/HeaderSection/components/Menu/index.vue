<template>
  <div class="menu-wrapper" :data-open="menuOpen">
    <div class="menu-toggle">
      <button @click="toggleMenu" data-icon :data-open="menuOpen">
        <i class="fa-solid fa-angle-right"></i>
      </button>
    </div>
    <div class="app-menu">
      <ModelsList v-if="menuOpen == true" />
      <AppLinks />
      <ResponseData />
    </div>
  </div>
</template>
  
<script setup>
import { ref } from "vue";
import ModelsList from "./components/ModelsList.vue";
import ResponseData from "./components/ResponseData.vue";
import AppLinks from "./components/AppLinks.vue";

const menuOpen = ref(false);

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value;
};
</script>
  
<style scoped>
.menu-wrapper {
  --max-width: min(100%, 350px);
  
  position: absolute;
  top: 0;
  right: 0;
  width: var(--max-width);
  height: 100vh;
  padding: 20px;

  display: flex;
  flex-direction: column;
  gap: 20px;

  border-radius: var(--border-radius);
  background: var(--neutral-color-75);
}

.menu-wrapper[data-open="false"] {
  background: none;

  >.app-menu {
    display: none;
  }
}

.menu-toggle {
  display: flex;
  justify-content: end;

  & button {
    --width: 2rem;
    background: none;
    font-size: 1.2rem;
    padding: 0px;
    width: var(--width);
    min-width: var(--width);
    aspect-ratio: 1;

    & i {
      transition: all 500ms ease;
    }
  }

  & button[data-open="false"] i {
    rotate: 180deg;
  }
}

.app-menu {
  gap: 20px;
  display: grid;
  place-items: baseline;

  grid-template-rows: auto auto 1fr;

  height: 100%;
}
</style>