<template>
  <section class="chat-box">
    <ChatLog
      :content="conversation"
      :selectedModel="selectedModel"
      :selectedImage="selectedImage"
    />
    <div v-if="waitingResponse">Waiting response</div>
    <div class="ui-elements">
      <textarea
        rows="10"
        id="myTextarea"
        type="text"
        placeholder="Ask something!"
        v-model="prompt"
      />
      <input type="file" accept="image/*" @change="handleFileChange" />
      <button v-if="generating" class="send-button" @click="abort()">
        Abort
      </button>
      <button
        v-else
        class="send-button"
        @click="chat"
        :disabled="selectedModel == ''"
      >
        Send
      </button>
    </div>
  </section>
</template>

<script setup>
import { onMounted, ref, provide, onBeforeUnmount } from "vue";
import ChatLog from "./components/ChatLog.vue";
import eventBus from "../../EventsBus";
const ollama_end_point = localStorage.getItem("OLLAMA_ENDPOINT");

const emit = defineEmits(["responseStatus"]);
const generating = ref(false);
const waitingResponse = ref(false);
const selectedModel = ref(localStorage.getItem("SELECTED_MODEL"));
const prompt = ref("write a joke");
const context = ref([]);
const conversation = ref([]);
const controller = ref(null);
const currentReader = ref(null);
const imageBase64 = ref(null);
const selectedImage = ref(null);

const cleatChatLog = () => {
  abort();
  prompt.value = "";
  context.value = [];
  conversation.value = [];
  imageBase64.value = null;
};

const handleFileChange = (event) => {
  const file = event.target.files[0];

  if (file) {
    const reader = new FileReader();
    reader.onloadend = () => {
      selectedImage.value = reader.result;

      imageBase64.value = reader.result
        .replace("data:image/", "")
        .replace("jpeg;base64,", "")
        .replace("png;base64,", "");
    };

    reader.readAsDataURL(file);
  } else {
    alert("Please select an image file.");
  }
};

const chat = async () => {
  selectedModel.value = localStorage.getItem("SELECTED_MODEL");
  if (!selectedModel.value) return;
  controller.value = new AbortController();

  const msg = {
    role: "user",
    content: prompt.value,
  };

  if (imageBase64.value != null) {
    msg.images = [imageBase64.value];
  }

  conversation.value.push(msg);

  const params = {
    model: selectedModel.value,
    messages: conversation.value,
    stream: true,
    context: context.value,
    keep_alive: "10m",
  };

  prompt.value = "";

  try {
    waitingResponse.value = true;
    const response = await fetch(`${ollama_end_point}/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
      signal: controller.value.signal,
    });

    conversation.value.push({
      role: "assistant",
      content: "",
    });

    waitingResponse.value = false;

    const reader = response.body.getReader();
    const index = conversation.value.length - 1;
    generating.value = true;

    await processStreamingResponse(reader, index);
  } catch (error) {
    if (error.name !== "AbortError") {
      console.error("Chat error:", error);
      conversation.value.push({
        role: "System",
        message: "An error occurred while getting the response.",
      });
    }
  } finally {
    generating.value = false;
    waitingResponse.value = false;
    if (!generating.value) {
      controller.value = null;
    }
  }
};

const processStreamingResponse = async (reader, index) => {
  const decoder = new TextDecoder();
  let buffer = "";

  try {
    while (true) {
      const { value, done } = await reader.read();

      if (done) {
        generating.value = false;
        break;
      }

      buffer += decoder.decode(value, { stream: true });

      let newlineIndex;
      while ((newlineIndex = buffer.indexOf("\n")) !== -1) {
        const line = buffer.slice(0, newlineIndex);
        buffer = buffer.slice(newlineIndex + 1);

        if (line.trim()) {
          try {
            const part = JSON.parse(line);
            conversation.value[index].content += part.message.content;

            if (part.done) {
              emit("responseStatus", part);
              generating.value = false;
              context.value = part.context;
              return;
            }
          } catch (e) {
            console.error("JSON parse error:", e);
          }
        }
      }
    }
  } catch (error) {
    if (error.name === "AbortError") {
      console.log("Request aborted");
    } else {
      console.error("Stream error:", error);
    }
  } finally {
    generating.value = false;
    waitingResponse.value = false;
  }
};

const abort = async () => {
  if (generating.value) {
    try {
      if (controller.value) {
        controller.value.abort();
        controller.value = null;
      }

      if (currentReader.value) {
        await currentReader.value.cancel();
        currentReader.value = null;
      }
    } catch (error) {
      console.error("Error during abort:", error);
    } finally {
      generating.value = false;
      waitingResponse.value = false;
    }
  }
};

onMounted(() => {
  const textarea = document.getElementById("myTextarea");

  textarea.addEventListener("input", function () {
    this.style.height = "auto";
    this.style.height = `${this.scrollHeight}px`;
  });
  eventBus.$on("modelChanged", cleatChatLog);
  eventBus.$on("cleanChat", cleatChatLog);
});

onBeforeUnmount(() => {
  eventBus.$off("modelChanged", cleatChatLog);
  eventBus.$off("cleanChat", cleatChatLog);
});
</script>

<style scoped>
.chat-box {
  --chat-box-gap: 50px;
  --ui-elements-gap: 20px;

  --min-height: calc(95vh - var(--chat-box-gap) - var(--ui-elements-gap));

  min-height: var(--min-height);
  display: grid;
  grid-template-rows: 1fr auto;
  place-items: baseline;
  gap: var(--chat-box-gap);
  width: 100%;

  .ui-elements {
    width: 100%;
    display: grid;
    gap: var(--ui-elements-gap);
    place-items: center;

    textarea {
      font-size: 0.9rem;
      max-height: 250px;
    }
  }

  .models-list {
    width: 100%;
    display: flex;
    justify-content: center;
    gap: 20px;
  }
}
</style>
