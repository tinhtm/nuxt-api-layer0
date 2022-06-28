<template>
  <div class="relative" @click.self="open = !open" :class="class">
    <div v-if="$slots.default" @click="open = !open">
      <slot />
    </div>
    <div
      v-else
      @click="open = !open"
      class="flex justify-between items-center border px-4 rounded-[3px] cursor-pointer h-[54px]"
      :class="error ? 'border-[red]' : 'border-[#E3E3E3]'"
    >
      <span class="text-[14px] leading-[18px] text-[#333333]">
        {{ selectedOption ? selectedOption.name : defaultName }}
      </span>
      <Icon type="angleDown" width="16" height="16" color="#013253"></Icon>
    </div>
    <div
      v-if="open"
      class="absolute left-0 bg-white shadow-[0_2px_3px_#00000029] py-2 rounded-[3px] z-10 w-full"
      :class="[minWidth ? minWidth : 'min-w-[250px]', !removeTop && 'top-[calc(100%+1px)]']"
    >
      <div v-if="hasSearch" class="relative px-2">
        <input
          v-model="searchValue"
          class="w-full py-[10px] pl-2 pr-8 text-[14px] leading-[15px] border border-[#ddd] rounded-[3px] focus-visible:outline-none focus-visible:shadow-[0px_0px_3px] focus-visible:shadow-[#0091a8]"
        />
        <span class="absolute top-1/2 right-4 translate-y-[-50%]">
          <Icon type="search" width="16" height="16" />
        </span>
      </div>
      <ul class="max-h-[50vh] overflow-auto mr-2 mt-2 scrollbar">
        <li
          v-for="option in filteredOptions"
          :key="option.id"
          class="pl-4 pr-2 py-1 cursor-pointer"
          @click="() => handleSelect(option)"
        >
          {{ option.name }}
        </li>
      </ul>
      <div class="fixed top-0 left-0 w-screen h-screen bg-red z-[-1] cursor-default" @click="open = !open"></div>
    </div>
  </div>
  <span class="text-[12px] text-[red]" v-show="!!error">{{ error }}</span>
</template>

<script setup>
const props = defineProps({
  options: Array,
  selectedOption: Object,
  changeSelectedOption: Function,
  defaultName: String,
  hasSearch: Boolean,
  error: String,
  handleValidate: Function,
  class: String,
  minWidth: String,
  removeTop: Boolean,
});

const open = ref(false);
const searchValue = ref('');

const filteredOptions = computed(() =>
  props.options.filter(
    (option) => !props.hasSearch || option.name.toLowerCase().includes(searchValue.value.toLowerCase()),
  ),
);

const handleSelect = (option) => {
  props.changeSelectedOption(option);
  if (props.handleValidate) props.handleValidate();
  open.value = false;
};
</script>

<style lang="scss" scoped>
.scrollbar::-webkit-scrollbar {
  width: 4px;
}
.scrollbar::-webkit-scrollbar-track {
  border-radius: 10px;
  background-color: #efefef;
}
.scrollbar::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background-color: #8f8f8f;
}
</style>
