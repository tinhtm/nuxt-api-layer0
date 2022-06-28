<template>
  <div class="border border-[#E3E3E3] p-[25px_15px] lg:p-7" :class="class">
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-x-3">
        <div
          v-if="isPassed"
          class="border rounded-full bg-[#65BCCA] border-[#65BCCA] w-[30px] h-[30px] flex justify-center items-center"
        >
          <img src="~assets/svg/check-solid.svg" class="w-4 h-4" />
        </div>
        <div v-else class="border rounded-full border-[#013253] w-[30px] h-[30px] flex justify-center items-center">
          <span class="text-[#013253] text-[15px] leading-[22px]">{{ step }}</span>
        </div>
        <div>
          <span class="text-[20px] leading-[30px] font-bold text-[#013253]">{{ title }}</span>
        </div>
      </div>
      <div>
        <span v-if="isPassed" class="text-[12px] leading-[14px] cursor-pointer text-[#013253]" @click="handleEdit">
          Edit
        </span>
      </div>
    </div>
    <slot />
  </div>
</template>

<script setup>
const props = defineProps({
  class: String,
  isPassed: Boolean,
  step: Number,
  title: String,
  handleEdit: Function,
});
</script>
