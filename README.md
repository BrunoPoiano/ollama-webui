# OllamaChatApp
WebUi to interact with Local LLM ollama


Setup ollama as a docker or global

  # ollama:
  #   image: ollama/ollama
  #   container_name: ollama
  #   ports:
  #     - "11434:11434"
  #   runtime: nvidia
  #   environment:
  #     - NVIDIA_VISIBLE_DEVICES=all
  #   volumes:
  #     - /ollama:/root/.ollama
  #   restart: unless-stopped



https://ollama.com/blog/ollama-is-now-available-as-an-official-docker-image