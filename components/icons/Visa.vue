<template>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 41 24" :width="width" :height="height">
    <defs></defs>
    <g transform="translate(-1130 -256)">
      <g class="a78" transform="translate(1130 256)">
        <rect class="c78" width="41" height="24" rx="3"></rect>
        <rect class="d" x="0.5" y="0.5" width="40" height="23" rx="2.5"></rect>
      </g>
      <g transform="translate(1133.891 263.055)">
        <path
          class="b78"
          d="M11.746.185l-4.051,10H5.045l-1.987-8a1.1,1.1,0,0,0-.586-.871A9.8,9.8,0,0,0,0,.475L.051.185H4.306A1.178,1.178,0,0,1,5.453,1.214L6.5,6.993,9.1.185Zm10.37,6.729c0-2.639-3.516-2.8-3.491-3.958,0-.369.331-.739,1.07-.844a4.619,4.619,0,0,1,2.472.449L22.6.449A6.319,6.319,0,0,0,20.257,0c-2.472,0-4.2,1.372-4.23,3.3C16,4.75,17.275,5.542,18.218,6.017s1.3.818,1.3,1.24c0,.66-.79.976-1.5.976A4.985,4.985,0,0,1,15.441,7.6l-.459,2.19a6.882,6.882,0,0,0,2.777.528c2.624.026,4.332-1.319,4.357-3.4Zm6.523,3.272h2.319l-2.013-10h-2.14a1.139,1.139,0,0,0-1.07.739l-3.771,9.263h2.624l.51-1.5h3.21Zm-2.8-3.536L27.162,2.9l.764,3.747ZM15.314.185l-2.064,10h-2.5l2.064-10Z"
          transform="translate(0 0)"
        ></path>
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
.a78 {
  fill: #fff;
  stroke: #e3e3e3;
}

.b78 {
  fill: #1a1f71;
}

.c78 {
  stroke: none;
}

.d {
  fill: none;
}
</style>
