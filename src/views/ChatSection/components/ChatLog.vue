<template>
  <section>
    <div class="messages" v-for="(chat, index) in content" :key="index">
      <div class="image-wrapper" v-if="selectedImage && index == 0">
        <img :src="selectedImage" alt="" id="uploaded-image" />
      </div>
      <h5 :data-user="chat.role == 'user'">
        {{ chat.role === "user" ? "You" : `Ollama (${selectedModel})` }}
      </h5>
      <p style="white-space: pre-wrap" v-html="filterContent(chat.content)"></p>
    </div>
  </section>
</template>

<script setup>
import { watch } from "vue";
const props = defineProps(["content", "selectedModel", "selectedImage"]);

const code_regex = /```\s*([\s\S]*?)\s*```/g;
const code_replacement =
  '<div style="background: var(--neutral-color-75);padding: 0.75rem;border-radius: 10px;color: var(--neutral-color-15);"><code>$1</code></div>';

const title_regex = /###\s*(.*?)(?:\n|$)/g;
const title_replacement =
  '<span style="color: var(--neutral-color-10);background: var(--neutral-color-80);padding: 0.3em 0.2em 10px .3em;display: block;margin-bottom: -6px;border-radius: 10px 10px 0 0;">$1</span>';

const list_regex = /\*\*(.*?)\*\*/g;
const list_replacement = `<span style="font-weight: bolder;color: var(--neutral-color-15)">$1</span>`;
const filterContent = (msg) => {
  const filteredMsg = msg
    .replace(title_regex, title_replacement)
    .replace(code_regex, code_replacement)
    .replace(list_regex, list_replacement);

  return filteredMsg.replace(/<code>(.*?)<\/code>/gs, (_, codeContent) => {
    return `<code>${codeContent.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</code>`;
  });
};

watch(props.content, async () => {});
</script>

<style scoped>
section {
  width: 100%;
  display: grid;
  place-items: baseline;
  gap: 10px;
}

.messages {
  width: 100%;

  .image-wrapper {
    width: min(100%, 20rem);
    float: left;
    margin-right: 1rem;
  }
  .code {
    background: var(--neutral-color-75);
    padding: 0.75rem;
    border-radius: 10px;
    color: var(--neutral-color-15);
  }

  p {
    margin-left: 20px;
  }
  [data-user="true"] {
    margin-bottom: 15px;
  }
}
</style>
