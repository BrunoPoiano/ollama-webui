<template>
  <div class="menu-wrapper" :data-open="menuOpen">
    <div class="menu-toggle">
      <button @click="toggleMenu" :data-open="menuOpen">
        <i class="fa-solid fa-angle-right"></i>
      </button>
    </div>
    <div class="app-menu">
      <ModelsList />
      <CreateModel />
      <ResponseData />
    </div>
  </div>
</template>
  
<script setup>
import { ref } from "vue";
import ModelsList from "./components/ModelsList.vue";
import ResponseData from "./components/ResponseData.vue";
import CreateModel from "./components/CreateModel.vue";

const menuOpen = ref(false);

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value;
};
</script>
  
<style scoped>
.menu-wrapper {
  --max-height: calc(100vh - 30px);
  --max-width: min(100%, 350px);

  position: absolute;
  right: 0;
  width: var(--max-width);
  height: var(--max-height);

  display: flex;
  flex-direction: column;
  gap: 20px;

  border-radius: var(--border-radius);
  background: var(--neutral-color-75);
}

.menu-wrapper[data-open="false"] {
  background: none;
  --max-height: 0vh;

  > .app-menu {
    display: none;
  }
}

.menu-toggle {
  display: flex;
  justify-content: end;
  padding: 20px 20px 0 0;

  & button {
    --width: 2rem;

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
  padding: 20px;
  gap: 20px;
  display: grid;
  place-items: baseline;
  height: 100%;
}
</style>