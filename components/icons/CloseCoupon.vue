<template>
  <svg xmlns="http://www.w3.org/2000/svg" :width="width" :height="height" viewBox="0 0 14.091 14">
    <defs></defs>
    <g transform="translate(0.091)">
      <rect class="a345" width="14" height="14" transform="translate(-0.091)"></rect>
      <path
        class="b345"
        d="M151.389-13.6l-.989.989-2.511-2.511-2.511,2.511-.989-.989,2.511-2.511-2.511-2.511.989-.989,2.511,2.511,2.511-2.511.989.989-2.511,2.511Zm-3.5-9.511a7,7,0,0,0-7,7,7,7,0,0,0,7,7,7,7,0,0,0,7-7,7,7,0,0,0-7-7Z"
        transform="translate(-140.889 23.111)"
      ></path>
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
.a345 {
  fill: none;
}

.b345 {
  fill: #0091a8;
  fill-rule: evenodd;
}
</style>
