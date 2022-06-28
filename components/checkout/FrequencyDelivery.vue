<template>
  <div v-if="step === 3" class="mt-6 flex flex-col gap-y-5 px-[15px] lg:px-[42px]">
    <div
      class="flex flex-col relative p-2 border border-[#E3E3E3] rounded-[3px] cursor-pointer"
      :class="{ 'border-[#0091A8]': openAutoshipSelect }"
      @click.self="openAutoshipSelect = !openAutoshipSelect"
    >
      <span @click.self="openAutoshipSelect = !openAutoshipSelect" class="text-[10px] leading-[18px] text-[#8F8F8F]"
        >FREQUENCY OF BILLING AND SHIPPING</span
      >
      <div @click="openAutoshipSelect = !openAutoshipSelect" class="flex justify-between">
        <span class="text-[14px] leading-[18px] text-[#333333] font-bold">
          Every{{ selectedAutoship > 1 ? ` ${selectedAutoship}` : '' }} week{{ selectedAutoship > 1 ? 's' : '' }}
        </span>
        <Icon type="angleDown" width="16" height="16" color="#013253"></Icon>
      </div>
      <div
        v-if="openAutoshipSelect"
        class="absolute top-[calc(100%+1px)] left-0 bg-white shadow-[0_2px_3px_#00000029] py-2 min-w-[250px] rounded-[3px] z-10"
      >
        <div v-for="n in 8" :key="n">
          <label
            class="flex items-center gap-x-2 leading-[19px] cursor-pointer px-4 py-2"
            @click="handleSelectAutoship(n)"
          >
            <input
              type="radio"
              class="accent-[#0091A8]"
              name="frequency_in_delivery"
              :value="n"
              :checked="n === selectedAutoship"
            />
            <span :class="{ 'font-bold': n === selectedAutoship }">
              Every{{ n > 1 ? ` ${n}` : '' }} week{{ n > 1 ? 's' : '' }}
            </span>
          </label>
        </div>
        <div
          class="fixed top-0 left-0 w-screen h-screen bg-red z-[-1] cursor-default"
          @click="openAutoshipSelect = !openAutoshipSelect"
        ></div>
      </div>
    </div>
    <span class="text-[14px] leading-[20px] text-[#013253]">
      You have full control and can easily <strong>change</strong>, <strong>cancel</strong>, or
      <strong>reschedule</strong> shipments at any time from your account.
    </span>
    <button class="rounded-[3px] bg-[#0091A8] py-3" @click="onSubmit">
      <span class="text-white text-[16px] leading-[18px] font-bold">CONTINUE TO PAYMENT</span>
    </button>
    <span class="text-[14px] leading-[20px] text-[#013253]">
      <strong>Note</strong>: For this delivery, we will charge you the full amount. But starting from the next autoship
      renewal, you are authorized for
      <span class="text-[#0091A8] text-[14px] leading-[24px] cursor-pointer underline" @click="openAutoshipDialog">
        the autoship discount
      </span>
    </span>
  </div>
  <div v-if="step > 3" class="mt-6 flex flex-col gap-y-2 px-[15px] lg:px-[42px]">
    <span class="text-[14px] leading-[22px] text-[#0091A8]">
      Every{{ selectedAutoship > 1 ? ` ${selectedAutoship}` : '' }} week{{ selectedAutoship > 1 ? 's' : '' }}
    </span>
  </div>
</template>

<script setup>
const props = defineProps({
  step: Number,
  onSubmit: Function,
  openAutoshipDialog: Function,
});

// Autoship select
const openAutoshipSelect = ref(false);
const selectedAutoship = ref(1);

const handleSelectAutoship = (value) => {
  selectedAutoship.value = value;
  openAutoshipSelect.value = false;
};
</script>
