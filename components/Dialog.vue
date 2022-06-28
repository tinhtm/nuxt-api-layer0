<template>
  <div
    v-if="open"
    class="fixed top-0 left-0 w-screen h-screen bg-[#013253cc] flex items-center justify-center"
    @click.self="handleClose"
  >
    <div class="w-[664px] max-h-[90vh] bg-white border border-[#D3D6D7] shadow-[0_10px_6px_#00000029] rounded-[3px] relative">
      <slot />
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  open: Boolean,
  handleClose: Function
})
</script>