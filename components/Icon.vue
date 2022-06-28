<template>
  <component :is="Icon" :color="color" :width="width" :height="height" />
</template>

<script setup>
import Icons from "./icons/index.vue";

const props = defineProps({
  type: String,
  color: String,
  width: String,
  height: String,
});

const Icon = computed(() => Icons[props.type]);
</script>
