<template>
  <div>
    <h5>
      Last prompt data
    </h5>
    <p>token/s: {{ tokenSecond }}s </p>
    <p>generating the response: {{ totalDuration }}s</p>
    <p>loading the model: {{ loadDuration }}s</p>
    <p>evaluating the prompt: {{ promptEvalDuration }}s</p>
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

<style></style>