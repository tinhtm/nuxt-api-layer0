<template>
  <svg class="icon-close" xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25">
    <defs></defs>
    <g transform="translate(-3835 23564.5)">
      <rect class="a48" width="24" height="24" transform="translate(3859.5 -23540) rotate(180)"></rect>
      <line class="b48" x2="11" transform="translate(3843.5 -23555.5) rotate(45)"></line>
      <line class="b48" x2="11" transform="translate(3843.5 -23547.723) rotate(-45)"></line>
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
.a48 {
  fill: #fff;
  stroke: #000;
  opacity: 0;
}
.b48 {
  fill: none;
  stroke: #fc642d;
  stroke-linecap: round;
  stroke-width: 2px;
}
</style>
