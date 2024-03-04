<template>
  <div class="responde-data">
    <h5>
      Last prompt data
    </h5>
    <p>Tokens per second: {{ tokenSecond }}s </p>
    <p>Loading the model: {{ loadDuration }}s</p>
    <p>Evaluating the prompt: {{ promptEvalDuration }}s</p>
    <p>Generating the response: {{ totalDuration }}s</p>
  </div>

</template>

<script>
import { ref, watch, inject } from "vue";

export default {
  setup() {
    const responseStatus = inject('responseStatus')


    const tokenSecond = ref(0);
    const totalDuration = ref(0);
    const loadDuration = ref(0);
    const promptEvalDuration = ref(0);

    const convertNanoToSeconds = (nano) => {
      return (nano / 1000000000).toFixed(2);
    };

    watch(
      () => responseStatus,
      (newValue) => {

        const content = newValue.value

        tokenSecond.value =
          (parseInt(content.eval_count) / parseInt(content.eval_duration)).toExponential(2);

        totalDuration.value = convertNanoToSeconds(content.total_duration);
        loadDuration.value = convertNanoToSeconds(content.load_duration);
        promptEvalDuration.value = convertNanoToSeconds(content.prompt_eval_duration);
      },
      { deep: true }
    );


    return {
      location,
      tokenSecond,
      totalDuration,
      loadDuration,
      promptEvalDuration,
    }
  }
}
</script>

<style scoped>
.responde-data{
  margin-top: auto;
  & h5 {
    margin-bottom: 4px;
  }
}
</style>