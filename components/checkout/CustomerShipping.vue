<template>
  <div v-if="step > 1" class="mt-6 flex flex-col gap-y-2 pl-[42px]">
    <div class="flex flex-col">
      <span class="text-[14px] leading-[30px] text-[#013253] font-bold">SHIP TO:</span>
      <div class="flex flex-col">
        <span class="text-[14px] leading-[22px] text-[#0091A8]"
          >{{ customerInfo.shippingAddress.firstname }} {{ customerInfo.shippingAddress.lastname }},
          {{ customerInfo.shippingAddress.telephone }}</span
        >
        <span class="text-[14px] leading-[22px] text-[#0091A8]"
          >{{ customerInfo.shippingAddress.street }} {{ customerInfo.shippingAddress.city }},
          {{ customerInfo.shippingAddress.region }}, {{ customerInfo.shippingAddress.postcode }}
          {{ selectedCountry.name }}</span
        >
      </div>
    </div>
    <div class="flex flex-col">
      <span class="text-[14px] leading-[30px] text-[#013253] font-bold">BILL TO:</span>
      <div class="flex flex-col">
        <span class="text-[14px] leading-[22px] text-[#0091A8]"
          >{{ customerInfo.shippingAddress.firstname }} {{ customerInfo.shippingAddress.lastname }},
          {{ customerInfo.shippingAddress.telephone }}</span
        >
        <span class="text-[14px] leading-[22px] text-[#0091A8]"
          >{{ customerInfo.shippingAddress.street }} {{ customerInfo.shippingAddress.city }},
          {{ customerInfo.shippingAddress.region }}, {{ customerInfo.shippingAddress.postcode }}
          {{ selectedCountry.name }}</span
        >
      </div>
    </div>
  </div>
  <div v-if="step == 1">
    <div class="form-control-email flex m-[10px_0] justify-between mb-[5px] flex-col p-[0_15px] lg:p-[0_40px]">
      <div class="form-field flex relative flex-col">
        <CheckoutInput v-bind="inputFields['email']" />
      </div>
      <div class="mt-[2px]">
        <span class="email-notification text-[12px]">
          Please login or click on "create an account" to receive updates on your order.
        </span>
      </div>
      <h5 class="text-[12px] mt-[15px] text-[#013253] font-bold">CONTACT PERSON</h5>
      <div class="form-control flex flex-col gap-y-5 lg:flex-row m-[10px_0] justify-between">
        <div class="relative flex flex-col flex-[0_0_32%]">
          <CheckoutInput v-bind="inputFields['firstname']" />
        </div>
        <div class="relative flex flex-col flex-[0_0_32%]">
          <CheckoutInput v-bind="inputFields['lastname']" />
        </div>
        <div class="relative flex flex-col flex-[0_0_32%]">
          <CheckoutInput v-bind="inputFields['telephone']" />
        </div>
      </div>
      <h5 class="text-[12px] mt-[15px] text-[#013253] font-bold">DELIVERY ADDRESS</h5>
      <div class="form-control flex m-[10px_0] justify-between">
        <div class="w-[100%]">
          <CheckoutSelect v-bind="selectFields['country']" />
        </div>
      </div>
      <div class="form-control flex flex-col gap-y-5 lg:flex-row m-[10px_0] justify-between">
        <div class="relative flex flex-col flex-[0_0_29%]">
          <CheckoutInput v-bind="inputFields['street']" />
        </div>
        <div class="relative flex flex-col flex-[0_0_19%]">
          <CheckoutInput v-bind="inputFields['city']" />
        </div>
        <div class="relative flex flex-col flex-[0_0_29%]">
          <CheckoutSelect v-if="stateOptions" v-bind="selectFields['state']" />
          <CheckoutInput v-else v-bind="inputFields['state']" />
        </div>
        <div class="relative flex flex-col flex-[0_0_19%]">
          <CheckoutInput v-bind="inputFields['postcode']" />
        </div>
      </div>
      <h5 class="text-[12px] mt-[15px] text-[#013253] font-bold">ADD A LABEL TO THIS ADDRESS</h5>
      <div class="form-control flex m-[10px_0] justify-between">
        <div class="relative flex flex-col flex-[0_0_100%] lg:flex-[0_0_32%]">
          <CheckoutInput v-bind="inputFields['prefix']" />
        </div>
      </div>
      <div class="mgi-checkout-basasa mt-[20px] gap-2">
        <input name="isBasasaMessageShow" type="checkbox" class="basasa-checkbox mr-[12px] focus:ring-0" />
        <span class="text-[14px]">My billing address is different from shipping address</span>
      </div>
      <div class="mt-2" v-show="!!errorMessage">
        <span class="text-[12px] text-[red]">{{ errorMessage }}</span>
      </div>
      <button
        @click="onSubmit"
        title="SAVE AND CONTINUE"
        class="w-[100%] p-[15px] flex justify-center items-center bg-[#0091a8] cursor-pointer border-none rounded-[3px] text-[16px] font-bold text-[#fff] mt-[15px] mb-[10px]"
      >
        SAVE AND CONTINUE
      </button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  step: Number,
  onSubmit: Function,
  customerInfo: Object,
  errors: Object,
  changeShippingField: Function,
  handleValidate: Function,
  errorMessage: String,
});

const inputFields = computed(() => ({
  email: {
    label: 'EMAIL ADDRESS',
    field: 'email',
    error: props.errors['email'],
    defaultValue: props.customerInfo.shippingAddress['email'],
    handleInputChange: (value) => props.changeShippingField('email', value),
    handleValidate: () => props.handleValidate('email'),
  },
  firstname: {
    label: 'FIRST NAME',
    field: 'firstname',
    error: props.errors['firstname'],
    defaultValue: props.customerInfo.shippingAddress['firstname'],
    handleInputChange: (value) => props.changeShippingField('firstname', value),
    handleValidate: () => props.handleValidate('firstname'),
  },
  lastname: {
    label: 'LAST NAME',
    field: 'lastname',
    error: props.errors['lastname'],
    defaultValue: props.customerInfo.shippingAddress['lastname'],
    handleInputChange: (value) => props.changeShippingField('lastname', value),
    handleValidate: () => props.handleValidate('lastname'),
  },
  telephone: {
    label: 'PHONE NUMBER',
    field: 'telephone',
    error: props.errors['telephone'],
    defaultValue: props.customerInfo.shippingAddress['telephone'],
    handleInputChange: (value) => props.changeShippingField('telephone', value),
    handleValidate: () => props.handleValidate('telephone'),
  },
  street: {
    label: 'ADDRESS',
    field: 'street',
    error: props.errors['street'],
    defaultValue: props.customerInfo.shippingAddress['street'],
    handleInputChange: (value) => props.changeShippingField('street', value),
    handleValidate: () => props.handleValidate('street'),
  },
  city: {
    label: 'CITY',
    field: 'city',
    error: props.errors['city'],
    defaultValue: props.customerInfo.shippingAddress['city'],
    handleInputChange: (value) => props.changeShippingField('city', value),
    handleValidate: () => props.handleValidate('city'),
  },
  state: {
    label: 'STATE',
    field: 'region_code',
    error: props.errors['region_code'],
    defaultValue: props.customerInfo.shippingAddress['region_code'],
    handleInputChange: (value) => {
      props.changeShippingField('region_code', value);
      props.changeShippingField('region', value);
      props.changeShippingField('region_id', 0);
    },
    handleValidate: () => props.handleValidate('region_code'),
  },
  postcode: {
    label: 'ZIP CODE',
    field: 'postcode',
    error: props.errors['postcode'],
    defaultValue: props.customerInfo.shippingAddress['postcode'],
    handleInputChange: (value) => props.changeShippingField('postcode', value),
    handleValidate: () => props.handleValidate('postcode'),
  },
  prefix: {
    label: 'EXT: HOME, OFFICE...',
    field: 'prefix',
    error: props.errors['prefix'],
    defaultValue: props.customerInfo.shippingAddress['prefix'],
    handleInputChange: (value) => props.changeShippingField('prefix', value),
    handleValidate: () => props.handleValidate('prefix'),
  },
}));

const { $fetchDrberg } = useNuxtApp();
const { data: responseCountries } = await $fetchDrberg('directory/countries', {}, false);

const countries = ref([]);

const countriesComputed = computed(() =>
  countries.value.map((country) => ({
    id: country.id,
    name: country.full_name_english,
    available_regions: country.available_regions,
  })),
);

const selectedCountryId = computed(() => props.customerInfo.shippingAddress.country_id);
const selectedCountry = computed(() =>
  countriesComputed.value.find((country) => country.id === selectedCountryId.value),
);
const handleChangeCountry = (option) => {
  props.changeShippingField('country_id', option.id);
  props.changeShippingField('region_code', '');
  props.changeShippingField('region', '');
  props.changeShippingField('region_id', '');
};

const stateOptions = computed(() => selectedCountry.value && selectedCountry.value.available_regions);
const selectedStateCode = computed(() => props.customerInfo.shippingAddress.region_code);
const selectedState = computed(
  () => stateOptions.value && stateOptions.value.find((state) => state.code === selectedStateCode.value),
);

const selectFields = computed(() => ({
  country: {
    options: countriesComputed.value,
    selectedOption: selectedCountry.value,
    changeSelectedOption: handleChangeCountry,
    hasSearch: true,
  },
  state: {
    options: stateOptions.value,
    selectedOption: selectedState.value,
    changeSelectedOption: handleChangeState,
    hasSearch: true,
    defaultName: 'State',
    error: props.errors['region_code'],
    handleValidate: () => props.handleValidate('region_code'),
  },
}));

const handleChangeState = (option) => {
  props.changeShippingField('region', option.name);
  props.changeShippingField('region_id', option.id);
  props.changeShippingField('region_code', option.code);
};

countries.value = responseCountries.value;
</script>
