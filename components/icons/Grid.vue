<template>
  <svg xmlns="http://www.w3.org/2000/svg" :width="width" :height="height" viewBox="0 0 16 16">
    <defs></defs>
    <g class="a">
      <rect class="b" width="6" height="6" />
      <rect class="b" width="6" height="6" transform="translate(0 10)" />
      <rect class="b" width="6" height="6" transform="translate(10)" />
      <rect class="b" width="6" height="6" transform="translate(10 10)" />
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
