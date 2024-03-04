<template>
  <div class="app-links">
    <router-link to="/" :checked="router.fullPath === '/'">Chat</router-link>
    <router-link to="/models" :checked="router.fullPath === '/models'" >Models</router-link>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
const router = useRouter().currentRoute;
</script>

<style scoped>
.app-links {
  width: 100%;
  display: grid;
  gap: 20px;

  & a {
    border-radius: var(--border-radius);
    padding: 15px 20px;
    display: block;
    text-decoration: none;
    color: var(--neutral-color-15);

    text-transform: uppercase;


    &[checked="true"] {
      background: var(--neutral-color-70);
    }

    &:hover,
    :focus {
      background: var(--neutral-color-65);
    }

  }
}
</style>