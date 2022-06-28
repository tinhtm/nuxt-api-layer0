<template>
  <input
    @blur="handleValidate"
    v-model="inputValue"
    :name="field"
    class="p-[27px_13px_10px] bg-transparent h-[54px] w-[100%] text-[14px] rounded-[3px] border-[#ddd] border-solid border-[1px] focus-visible:outline-none focus-visible:shadow-[0px_0px_3px] focus-visible:shadow-[#0091a8]"
    :class="{ 'border-[red]': !!error }"
  />
  <label class="absolute top-[5px] left-[15px] text-[#9b9b9b] duration-200 transition-all text-[12px]">
    {{ label }}
  </label>
  <span class="text-[12px] text-[red]" v-show="!!error">{{ error }}</span>
</template>

<script setup>
const props = defineProps({
  label: String,
  field: String,
  handleInputChange: Function,
  required: Boolean,
  validation: Array,
  error: String,
  handleValidate: Function,
  defaultValue: String,
});

const inputValue = ref(props.defaultValue);

watch(inputValue, (value) => {
  props.handleInputChange(value);
});
</script>
