<template>
  <svg xmlns="http://www.w3.org/2000/svg" width="16.914" height="15.914" viewBox="0 0 16.914 15.914">
    <defs></defs>
    <g transform="translate(-659 -783)">
      <line class="a" x1="4" y1="4" transform="translate(670.5 793.5)" />
      <g class="b" transform="translate(659 783)">
        <circle class="c" cx="6.5" cy="6.5" r="6.5" />
        <circle class="d" cx="6.5" cy="6.5" r="5.5" />
      </g>
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
.a,
.b,
.d {
  fill: none;
}
.a,
.b {
  stroke: #707070;
  stroke-width: 2px;
}
.a {
  stroke-linecap: round;
}
.c {
  stroke: none;
}
</style>
