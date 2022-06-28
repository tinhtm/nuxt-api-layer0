<template>
  <div class="fixed top-[110px] right-7 flex flex-col gap-y-5 max-w-[300px] z-[100]">
    <div 
      v-if="globalMessage.length > 0"
      v-for="(message, index) in globalMessage"
      :key="index"
      class="shadow-[0px_2px_5px_#00000042] py-5 px-7 rounded-[3px] flex gap-x-5 bg-white relative"
    >
      <img src="~assets/svg/mini-cart-icon.svg" class="w-7 h-7" />
      <div class="flex flex-col">
        <span class="text-[18px] font-bold text-[#030304]">{{ message.isError ? 'Error' : 'Success' }}</span>
        <span class="text-sm text-[#030304]">{{ message.message }}</span>
        <span v-if="message.type === 'add_to_cart'" class="text-sm text-[#0091A8] mt-3">
          <NuxtLink to="/checkout/cart">View your autoship</NuxtLink>
        </span>
      </div>
      <img
        src="~assets/svg/xmark-solid.svg"
        class="w-4 h-4 absolute top-3 right-3 cursor-pointer"
        @click="globalMessage.splice(index, 1)"
      />
    </div>
  </div>
</template>

<script setup>
const globalMessage = useGlobalMessage()

watch(globalMessage.value, () => {
  setTimeout(() => {
    globalMessage.value.splice(0, 1)
  }, 5000);
})
</script>