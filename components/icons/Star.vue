<template>
  <svg xmlns="http://www.w3.org/2000/svg" :width="width" :height="height" viewBox="0 0 25.113 23.858">
    <defs></defs>
    <path
      class="a"
      d="M19.887,26.5l7.76,4.684L25.588,22.36l6.856-5.939-9.028-.766L19.887,7.33l-3.528,8.325-9.028.766,6.856,5.939-2.059,8.827Z"
      transform="translate(-7.33 -7.33)"
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

<style scoped>
.a {
  fill: #f9c825;
}
</style>
