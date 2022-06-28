<template>
  <svg
    class="svg-icon"
    :width="width"
    :height="height"
    :fill="color"
    style="vertical-align: middle; overflow: hidden"
    viewBox="0 0 1024 1024"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M527.36 762.88L230.4 460.8 307.2 399.36l174.08 133.12c71.68-81.92 230.4-250.88 445.44-384l20.48 40.96c-199.68 184.32-363.52 445.44-419.84 573.44m0 0"
      fill=""
    />
  </svg>
</template>

<script setup>
const props = defineProps({
  color: String,
  width: String,
  height: String,
});
</script>
