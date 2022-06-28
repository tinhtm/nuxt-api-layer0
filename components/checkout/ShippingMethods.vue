<template>
  <div>
    <div v-if="step > 2" class="mt-6 flex gap-x-2 pl-[42px]">
      <span class="text-[14px] leading-[22px] text-[#0091A8]">${{ shippingSelected.amount.toFixed(2) }}</span>
      <span class="text-[14px] leading-[22px] text-[#0091A8]"
        >{{ shippingSelected.carrier_title }} - {{ shippingSelected.method_title }}</span
      >
    </div>
    <div v-if="step == 2">
      <div v-if="shippingMethods.length > 0" class="p-[20px_15px_0] lg:p-[20px_40px_0_40px]">
        <div
          v-for="shippingMethod in shippingMethods"
          :key="`${shippingMethods.carrier_code}_${shippingMethods.method_code}`"
          class="bg-[#F8F8F8] rounded-[5px] p-[14px_22px] h-[75px] flex justify-between items-center cursor-pointer transition-all duration-[0.2s] relative mb-[13px] overflow-hidden text-[#707070]"
          @click="handleSelectShipping(shippingMethod)"
          :class="
            shippingMethod.carrier_code === shippingSelected.carrier_code &&
            shippingMethod.method_code === shippingSelected.method_code
              ? 'border-[2px] border-solid border-[#013253]'
              : ''
          "
        >
          <div
            class="text-[#013253] text-[10px] items-center bg-[#0091a817] rounded-[3px_0px_0px_3px] left-0 absolute flex justify-center top-0 border-none shadow-none p-[0] h-[100%] w-[62px] font-semibold text-center transition-all duration-500"
            :class="{
              'left-[-100px]':
                shippingMethod.carrier_code !== shippingSelected.carrier_code ||
                shippingMethod.method_code !== shippingSelected.method_code,
            }"
          >
            SHIPPING WITH
          </div>
          <div
            class="flex flex-col transition-all duration-500"
            :class="
              shippingMethod.carrier_code === shippingSelected.carrier_code &&
              shippingMethod.method_code === shippingSelected.method_code
                ? 'pl-[50px] lg:pl-[72px]'
                : ''
            "
          >
            <span class="text-[#013253] font-semibold text-[13px]">{{ shippingMethod.method_title }}</span>
            <span class="text-[12px]">{{ shippingMethod.carrier_title }}</span>
          </div>
          <span class="text-[#013253] font-semibold text-[13px]">${{ shippingMethod.amount.toFixed(2) }}</span>
        </div>
        <span class="text-[14px] text-[#707070] mt-[20px]">
          For more shipping related info please view
          <NuxtLink to="#" class="underline text-[#0091a8]">Shipping and refund policy</NuxtLink>
        </span>
        <div class="mt-2" v-show="!!errorMessage">
          <span class="text-[12px] text-[red]">{{ errorMessage }}</span>
        </div>
        <button
          @click="onSubmit(shippingSelected)"
          title="SAVE AND CONTINUE"
          class="w-[100%] p-[15px] flex justify-center items-center bg-[#0091a8] cursor-pointer border-none rounded-[3px] text-[16px] font-bold text-[#fff] mt-[15px] mb-[10px]"
        >
          SAVE AND CONTINUE
        </button>
      </div>
      <div v-else-if="shippingMethodRuleErrors.length > 0" class="p-[20px_15px_0] lg:p-[20px_40px_0_40px]">
        <ul v-for="error in shippingMethodRuleErrors" :key="shippingMethodRuleErrors">
          <li class="text-[14px] text-[red]">- {{ error }}</li>
        </ul>
      </div>
      <div v-else class="p-[20px_15px_0] lg:p-[20px_40px_0_40px]">
        <span class="text-[14px]">Sorry, no quotes are available for this order at this time</span>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  step: Number,
  onSubmit: Function,
  shippingMethods: Array,
  errorMessage: String,
  selectedShippingMethod: Object,
  shippingPrice: Object,
  shippingMethodRuleErrors: Array,
});
const shippingSelected = ref({});
const handleSelectShipping = (shippingMethod) => {
  shippingSelected.value = shippingMethod;
  props.shippingPrice.price = shippingMethod.amount;
  props.shippingPrice.label = `${shippingMethod.carrier_title}-${shippingMethod.method_title}`;
};

watch(
  () => props.shippingMethods,
  (value) => {
    console.log(12345, value);
    if (value.length > 0) {
      const shippingMethod = value.selectedShippingMethod || value[0];
      shippingSelected.value = shippingMethod;
      props.shippingPrice.price = shippingMethod.amount;
      props.shippingPrice.label = `${shippingMethod.carrier_title}-${shippingMethod.method_title}`;
    }
  },
);
</script>
