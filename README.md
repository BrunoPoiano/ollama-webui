
# Ollama WebUi
WebUi to interact with Local LLM ollama written in Vue.js

![Screenshot of the App.](/public/demo.png)

[docker image](https://hub.docker.com/repository/docker/brunopoiano/ollama-webui/general)

## Deployment
### Using image
```bash
docker run --name ollama_chat_app -p 5173:5173 -d brunopoiano/ollama-webui
#or
podman run --name ollama_chat_app -p 5173:5173 -d docker.io/brunopoiano/ollama-webui
```

### from source code
```bash
git clone git@github.com:BrunoPoiano/ollama-webui.git
cd ollama-webui
```

Docker
```bash
docker compose up -d
```

Dev
```bash
npm install
npm run dev
```

## On the browser
`localhost:5173`
