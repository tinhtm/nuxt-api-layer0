<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="width"
    :height="height"
    :fill="color"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    version="1.1"
    id="Layer_1"
    x="0px"
    y="0px"
    viewBox="0 0 24 24"
    style="enable-background: new 0 0 24 24"
    xml:space="preserve"
  >
    <path
      class="st0"
      d="M12,0C5.4,0,0,5.4,0,12c0,6.6,5.4,12,12,12s12-5.4,12-12C24,5.4,18.6,0,12,0z M12,22C6.5,22,2,17.5,2,12  C2,6.5,6.5,2,12,2s10,4.5,10,10C22,17.5,17.5,22,12,22z M16,7.9c0.3,1.6-0.5,3.1-1.9,3.9c-0.6,0.3-1,0.9-1.1,1.5V14c0,0.6-0.4,1-1,1  s-1-0.4-1-1v-0.8c0,0,0-0.1,0-0.1c0.1-1.4,0.9-2.5,2.2-3.1c0.6-0.3,1-1.1,0.8-1.8c-0.1-0.6-0.3-0.8-0.5-0.9  c-0.7-0.4-2.2-0.1-2.7,0.1c-0.5,0.2-1.1-0.1-1.3-0.6c-0.2-0.5,0.1-1.1,0.6-1.3c0.3-0.1,2.7-1,4.4,0.1C15.1,5.9,15.8,6.6,16,7.9z   M13,17v0.5c0,0.6-0.4,1-1,1s-1-0.4-1-1V17c0-0.6,0.4-1,1-1S13,16.4,13,17z"
    ></path>
  </svg>
</template>

<script setup>
const props = defineProps({
  color: String,
  width: String,
  height: String,
});
</script>
