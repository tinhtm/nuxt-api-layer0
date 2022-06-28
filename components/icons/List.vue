<template>
  <svg xmlns="http://www.w3.org/2000/svg" :width="width" :height="height" viewBox="0 0 16 16">
    <defs></defs>
    <g class="a" transform="translate(-60 -324)">
      <rect class="b" width="16" height="6" transform="translate(60 324)" />
      <rect class="b" width="16" height="6" transform="translate(60 334)" />
    </g>
  </svg>
</template>

<script setup>
const props = defineProps({
  color: String,
  width: String,
  height: String,
});
</script>

<style scoped>
.a {
  opacity: 0.5;
}

.b {
  fill: #013253;
}
</style>
