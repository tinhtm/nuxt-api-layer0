<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="width"
    :height="height"
    :fill="color"
    viewBox="0 0 21 24.102"
  >
    <g id="user" transform="translate(-590.682 -465.816)">
      <path
        id="Path_3"
        data-name="Path 3"
        d="M19.837,17.886A14.555,14.555,0,0,0,12.5,15.5a14.555,14.555,0,0,0-7.337,2.386A4.46,4.46,0,0,0,3.3,21.3L3,24.385H22L21.7,21.3A4.46,4.46,0,0,0,19.837,17.886Z"
        transform="translate(588.682 464.533)"
        fill="none"
        stroke="#2a363e"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
      ></path>
      <path
        id="Path_4"
        data-name="Path 4"
        d="M12,11A4.5,4.5,0,1,0,7.5,6.5,4.5,4.5,0,0,0,12,11Z"
        transform="translate(589.182 464.816)"
        fill="none"
        stroke="#2a363e"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
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
