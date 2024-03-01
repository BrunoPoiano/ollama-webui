<template>
    <div class="menu-wrapper" :data-closed="menuOpen">
        <div class="menu-toggle">
            <button @click="toggleMenu">
                Menu
            </button>
        </div>
        <div class="app-menu">
            <ModelsList />
            <ResponseData />
        </div>
    </div>
</template>
  
<script setup>
import { ref } from 'vue';
import ResponseData from './components/ResponseData.vue';
import ModelsList from './components/ModelsList.vue';

const menuOpen = ref(false)

const toggleMenu = () => {
    menuOpen.value = !menuOpen.value
}

</script>
  
<style scoped>
.menu-wrapper {
    --max-height: calc(100vh - 30px - 20px);
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

.menu-wrapper[data-closed='true'] {
    background: none;

    >.app-menu {
        display: none;
    }
}

.menu-toggle {
    display: flex;
    justify-content: end;
    padding: 20px 20px 0 0;
}

.app-menu {
    padding: 20px;
    gap: 20px;
    display: grid;
    place-items: baseline;
}
</style>