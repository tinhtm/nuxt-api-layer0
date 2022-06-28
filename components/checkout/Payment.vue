<template>
  <div v-if="step === 4" class="mt-6 flex flex-col gap-y-5 px-[15px] lg:px-[42px]">
    <div
      class="flex flex-col items-center justify-center px-2 py-8 border rounded-[3px] gap-y-2 border-[#013253] w-[50%] lg:w-[33%] cursor-pointer text-[14px] leading-[18px] text-[#013253]"
    >
      <span class="text-[13px] font-bold">Credit/Debit Card</span>
      <span class="text-[11px]">Visa, Mastercard etc.</span>
    </div>
    <span class="text-[12px] leading-[30px] cursor-pointer text-[#013253] font-bold">Use a different card</span>
    <span class="text-[14px] leading-[18px] text-[#013253] font-bold">ADD CARD DETAILS</span>
    <div class="w-full lg:w-2/4 flex flex-col gap-y-5">
      <div class="flex flex-col gap-y-1">
        <label class="text-[12px] leading-[18px] text-[#013253]">Credit number</label>
        <div class="relative">
          <div
            class="bg-[#E4E9EC] flex justify-center items-center w-9 h-9 absolute top-0 left-0 rounded-tl-[3px] rounded-bl-[3px] border border-[#CBD5DC] border-r-0"
          >
            <Icon type="creditNumber" width="14" height="10" color="#013253"></Icon>
          </div>
          <input
            v-model="cardValue.ccNumber"
            placeholder="1234 5678 9012 3456"
            class="border border-[#CBD5DC] rounded-[3px] py-1 pl-[44px] focus:outline-none text-[#013253] leading-[17px] h-9 w-full"
          />
        </div>
        <span v-show="cardValidation.ccNumber" class="text-[12px] text-[red]">This field is required.</span>
      </div>
      <div class="flex gap-x-4">
        <div class="flex flex-col gap-y-1 flex-[0_0_60%]">
          <label class="text-[12px] leading-[18px] text-[#013253]">Name on card</label>
          <div class="relative">
            <div
              class="bg-[#E4E9EC] flex justify-center items-center w-9 h-9 absolute top-0 left-0 rounded-tl-[3px] rounded-bl-[3px] border border-[#CBD5DC] border-r-0"
            >
              <Icon type="nameOnCard" width="12" height="12" color="#013253"></Icon>
            </div>
            <input
              v-model="cardValue.name"
              class="border border-[#CBD5DC] rounded-[3px] py-1 pl-[44px] focus:outline-none text-[#013253] leading-[17px] h-9 w-full"
            />
          </div>
          <span v-show="cardValidation.name" class="text-[12px] text-[red]">This field is required.</span>
        </div>
        <div class="flex flex-col gap-y-1">
          <label class="text-[12px] leading-[18px] text-[#8F8F8F]">Security CVV</label>
          <div class="relative">
            <div
              class="bg-[#E4E9EC] flex justify-center items-center w-9 h-9 absolute top-0 left-0 rounded-tl-[3px] rounded-bl-[3px] border border-[#CBD5DC] border-r-0"
            >
              <Icon type="securityCvv" width="16" height="12" color="#013253"></Icon>
            </div>
            <input
              v-model="cardValue.cvv"
              class="border border-[#CBD5DC] rounded-[3px] py-1 pl-[44px] focus:outline-none text-[#013253] leading-[17px] h-9 w-full"
            />
          </div>
          <span v-show="cardValidation.cvv" class="text-[12px] text-[red]">This field is required.</span>
        </div>
      </div>
      <div class="flex flex-col gap-y-1">
        <label class="text-[12px] leading-[18px] text-[#8F8F8F]">Expiration</label>
        <div class="flex gap-x-3">
          <CheckoutSelect v-for="(select, field) in selectFields" :key="select.id" v-bind="select">
            <div class="flex flex-col gap-y-1 cursor-pointer">
              <div class="relative">
                <div
                  class="flex items-center border border-[#CBD5DC] rounded-[3px] py-1 pl-2 pr-[44px] text-[#013253] leading-[17px] h-9 w-full"
                >
                  <span>{{ cardValue[field] ? cardValue[field] : select.defaultName }}</span>
                </div>
                <div
                  class="flex justify-center items-center w-9 h-9 absolute top-0 right-0 rounded-tr-[3px] rounded-br-[3px] border border-[#CBD5DC] border-r-0"
                >
                  <Icon type="angleDown" width="16" height="16" color="#013253"></Icon>
                </div>
              </div>
              <span v-show="cardValidation[field]" class="text-[12px] text-[red]">This field is required.</span>
            </div>
          </CheckoutSelect>
        </div>
      </div>
    </div>
    <div class="flex flex-col gap-y-2">
      <div class="flex gap-x-2">
        <div>
          <input
            type="checkbox"
            v-model="agreePolicy.tac"
            class="w-5 h-5 border rounded border-[#0091A8] accent-[#0091A8]"
          />
        </div>
        <span class="text-[14px] leading-[24px] text-[#2A363E]">
          <span>Please accept the </span>
          <span class="text-[#0091A8] underline cursor-pointer" @click="openTCDialog">Terms and Conditions</span>
          <span> to place the order</span>
        </span>
      </div>
      <span v-show="policyValidation.tac" class="text-[12px] text-[red]">This field is required.</span>
    </div>
    <div class="flex flex-col gap-y-2">
      <div class="flex gap-x-2">
        <div>
          <input
            type="checkbox"
            v-model="agreePolicy.faq"
            class="w-5 h-5 border rounded border-[#0091A8] accent-[#0091A8]"
          />
        </div>
        <span class="text-[14px] leading-[24px] text-[#2A363E]">
          By placing this order, you are authorizing us to charge your card for future autoship orders at the frequency
          and quantity you selected
        </span>
      </div>
      <span v-show="policyValidation.faq" class="text-[12px] text-[red]">This field is required.</span>
    </div>
    <div v-show="!!errorMessage">
      <span class="text-[12px] text-[red]">{{ errorMessage }}</span>
    </div>
    <button class="rounded-[3px] bg-[#0091A8] py-3" @click="handleSubmit">
      <span class="text-white text-[16px] leading-[18px] font-bold">PLACE ORDER (${{ grandTotal.toFixed(2) }})</span>
    </button>
  </div>
</template>

<script setup>
const props = defineProps({
  step: Number,
  onSubmit: Function,
  openTCDialog: Function,
  errorMessage: String,
  grandTotal: Number,
});

const cardValue = reactive({
  ccNumber: '',
  cvv: '',
  name: '',
  month: '',
  year: '',
});

const cardValidation = reactive({
  ccNumber: false,
  cvv: false,
  name: false,
  month: false,
  year: false,
});

watch(cardValue, (value) => {
  if (value.ccNumber) {
    const cardNumber = (value.ccNumber.match(/\d/g) || []).join('').slice(0, 16);
    cardValue.ccNumber = (cardNumber.match(/\d{1,4}/g) || []).join(' ');
  }
  cardValue.cvv = (value.cvv.match(/\d/g) || []).join('');
  Object.keys(value).forEach((el) => {
    if (value[el]) {
      cardValidation[el] = false;
    }
  });
});

const agreePolicy = reactive({
  tac: false,
  faq: false,
});

watch(agreePolicy, (value) => {
  Object.keys(value).forEach((el) => {
    if (value[el]) {
      policyValidation[el] = false;
    }
  });
});

const policyValidation = reactive({
  tac: false,
  faq: false,
});

const handleSubmit = () => {
  Object.keys(cardValue).forEach((el) => (cardValidation[el] = !cardValue[el]));
  Object.keys(agreePolicy).forEach((el) => (policyValidation[el] = !agreePolicy[el]));
  if (Object.values(cardValidation).every((el) => !el) && Object.values(policyValidation).every((el) => !el)) {
    props.onSubmit(cardValue);
  }
};

const selectFields = computed(() => ({
  month: {
    options: Array.from({ length: 12 }, (_, index) => `0${index + 1}`.slice(-2)).map((el) => ({ name: el, id: el })),
    selectedOption: null,
    changeSelectedOption: (value) => (cardValue.month = value.id),
    defaultName: 'Month',
    class: 'w-full',
    minWidth: '100%',
    removeTop: true,
  },
  year: {
    options: Array.from({ length: 20 }, (_, index) => index + new Date().getFullYear()).map((el) => ({
      name: el,
      id: el,
    })),
    selectedOption: null,
    changeSelectedOption: (value) => (cardValue.year = value.id),
    defaultName: 'Year',
    class: 'w-full',
    minWidth: '100%',
    removeTop: true,
  },
}));
</script>
