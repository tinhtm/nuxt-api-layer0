<template>
  <svg xmlns="http://www.w3.org/2000/svg" :width="width" :height="height" viewBox="0 0 14 10" :fill="color">
    <g transform="translate(-97.9 -342)">
      <path d="M16.25,7.75a1,1,0,0,0-1-1h-12a1,1,0,0,0-1,1v1.5h14Z" transform="translate(95.65 335.25)" class="a">
      </path>
      <path
        d="M2.25,20.75a1,1,0,0,0,1,1h12a1,1,0,0,0,1-1v-5h-14Zm4.438-1.5h5.125a.439.439,0,0,1,.438.438h0a.439.439,0,0,1-.437.438H6.688a.439.439,0,0,1-.437-.437h0A.439.439,0,0,1,6.688,19.25Zm-2.25,0h.375a.439.439,0,0,1,.438.438h0a.439.439,0,0,1-.437.438H4.438A.439.439,0,0,1,4,19.688H4A.439.439,0,0,1,4.438,19.25Z"
        transform="translate(95.65 330.25)" class="a"></path>
    </g>
  </svg>
</template>

<script setup>
const props = defineProps({
  color: String,
  width: String,
  height: String
})
</script>