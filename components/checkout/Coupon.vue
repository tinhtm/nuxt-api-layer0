<template>
  <div
    class="checkout-coupon-code shadow-[5px_5px_5px_#0000000d] border-[1px] border-solid border-[#e3e3e3] rounded-[3px] mb-[20px] text-[#000000CC] text-[14px] flex flex-col"
  >
    <div
      class="checkout-coupon-code-header cursor-pointer flex justify-between items-center w-full p-[20px_25px_20px_20px]"
      @click="openCoupon = !openCoupon"
    >
      <span class="font-semibold">Coupon Code</span>
      <Icon v-if="openCoupon" type="angleDown" width="16" height="16" color="#013253"></Icon>
      <Icon v-else type="angleUp" width="16" height="16" color="#013253"></Icon>
    </div>
    <div v-show="!openCoupon" class="p-[20px] pt-0">
      <form>
        <div
          :class="{ hidden: !showPopupAddCoupon }"
          class="flex bg-[#e5efe5] text-[#006400] border-[1px] border-solid rounded-[3px] p-[13px_14px] font-semibold mb-[12px] relative cursor-pointer items-center"
        >
          <span
            class="bg-[#006400] text-[20px] flex justify-center items-center mr-[5px] w-[25px] h-[25px] rounded-[50%] text-[#fff] flex-[0_0_25]"
          >
            ✔
          </span>
          <span>Your coupon was successfully applied.</span>
        </div>
        <div v-for="coupon in listCoupon" class="checkout-offer-coupon mb-[20px]">
          <label class="flex items-center cursor-pointer">
            <input
              type="radio"
              name="coupon-group"
              :value="coupon.value"
              class="w-5 h-5 accent-[#0091A8]"
              @change="handleSelectOffer"
            />
            <div class="checkout-coupon-code-detail ml-[10px]">
              <p class="checkout-coupon-code-name text-[#013253] font-semibold">
                <span class="text-[14px]">{{ coupon.value }}</span>
                <span
                  class="checkout-coupon-code-rules-modifier ml-[5px] align-middle p-[5px_10px_3px] text-[#969696] text-[9px] bg-[#ededed] bg-clip-padding bg-origin-padding bg-no-repeat inline-block rounded-[0px_0px_0px_6px]"
                  >{{ coupon.policy }}</span
                >
                <span
                  :class="{ hidden: !coupon.applied }"
                  class="text-center tracking-normal font-normal text-[9px] p-[5px_10px_3px] inline-block align-middle rounded-[10px_0px_0px_10px] text-[#fff] ml-[5px] bg-[#0091a8] bg-[length:0%_0%] bg-no-repeat bg-clip-padding"
                >
                  OFFER APPLIED
                </span>
              </p>
              <p class="checkout-coupon-code-description text-[#8F8F8F] mt-[3px]">
                {{ coupon.desc }}
              </p>
            </div>
          </label>
        </div>
        <button
          @click="handleApplyOffer"
          class="text-[#0091A8] mb-[15px] text-[16px] border-2 border-[#0091A8] rounded-[3px] p-[14px_10px] w-full"
        >
          APPLY OFFER
        </button>
      </form>
      <div>
        <span class="text-[14px] leading-[30px] text-[#0091A8] cursor-pointer">I have another coupon code</span>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  setDiscountOffer: Function,
});
const openCoupon = ref(false);
const offerSelected = ref(null);
const showPopupAddCoupon = ref(false);
const discountOffer = ref({
  label: null,
  discount: null,
});

let listCoupon = ref([
  {
    value: 'TEST',
    policy: 'PUBLIC',
    desc: 'Autoship discount 10% off on all products',
    discount: 0.1,
    applied: false,
  },
  {
    value: '$5 OFF',
    policy: 'PRIVATE',
    desc: '',
    discount: 0.15,
    applied: false,
  },
]);

const handleSelectOffer = (e) => {
  offerSelected.value = e.target.value;
};

const handleApplyOffer = (e) => {
  e.preventDefault();
  listCoupon.value = listCoupon.value.map((el) => {
    if (el.value == offerSelected.value) {
      props.setDiscountOffer(el.value, el.discount);
      return {
        ...el,
        applied: true,
      };
    }
    return { ...el, applied: false };
  });
  showPopupAddCoupon.value = true;
};

const handleDeleteCoupon = () => {
  listCoupon.value = listCoupon.value.map((el) => {
    if (el.value == discountOffer.value.label) {
      return {
        ...el,
        applied: false,
      };
    }
    return el;
  });
  discountOffer.value = { ...discountOffer, label: null, discount: null };
};

watch(showPopupAddCoupon, () => {
  setTimeout(() => {
    showPopupAddCoupon.value = false;
  }, 3000);
});
</script>
