<template>
  <div class="app-links">
    <router-link to="/" :checked="router.fullPath === '/'">Chat</router-link>
    <router-link to="/models" :checked="router.fullPath === '/models'"
      >Models</router-link
    >
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
const router = useRouter().currentRoute;
</script>

<style scoped>
.app-links {
  margin-top: 1rem;
  width: 100%;
  display: grid;
  gap: 20px;

  & a {
    border-radius: var(--border-radius);
    padding: 15px 20px;
    display: block;
    text-decoration: none;

    text-transform: uppercase;

    color: var(--background-color-inverted);
    background: light-dark(#f9f9f9, #1b1a22);

    &:hover,
    :focus {
      background: rgba(2, 2, 2, 0.24);
    }
  }
}
</style>
