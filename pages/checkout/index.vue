<template>
  <div>
    <div class="my-5">
      <span class="text-base font-bold">100% Secure checkout.</span>
    </div>
    <div class="flex flex-col lg:flex-row gap-x-7 gap-y-[40px]">
      <div class="flex-[0_0_60%]">
        <CheckoutStepBlock
          class="rounded-t-[5px]"
          :step="1"
          :isPassed="currentStep > 1"
          title="Shipping and billing information"
          :handleEdit="() => (currentStep = 1)"
        >
          <CheckoutCustomerShipping
            :customerInfo="customerInfo"
            :errors="shippingErrors"
            :step="currentStep"
            :onSubmit="handleShippingSubmit"
            :changeShippingField="changeShippingField"
            :handleValidate="handleValidateShipping"
            :errorMessage="shippingErrorMessage"
          />
        </CheckoutStepBlock>
        <CheckoutStepBlock
          :step="2"
          :isPassed="currentStep > 2"
          title="Shipping methods"
          :handleEdit="() => (currentStep = 2)"
        >
          <CheckoutShippingMethods
            :step="currentStep"
            :onSubmit="handleShippingMethodSubmit"
            :shippingMethods="shippingMethods"
            :errorMessage="shippingMethodErrorMessage"
            :selectedShippingMethod="selectedShippingMethod"
            :shippingPrice="shippingPrice"
            :shippingMethodRuleErrors="shippingMethodRuleErrors"
          />
        </CheckoutStepBlock>
        <CheckoutStepBlock
          :step="3"
          :isPassed="currentStep > 3"
          title="Frequency in delivery"
          :handleEdit="() => (currentStep = 3)"
        >
          <CheckoutFrequencyDelivery
            :step="currentStep"
            :onSubmit="handleFrequencySubmit"
            :openAutoshipDialog="() => (openAutoshipDialog = true)"
          />
        </CheckoutStepBlock>
        <CheckoutStepBlock :class="'rounded-b-[5px]'" :step="4" title="Payment">
          <CheckoutPayment
            :step="currentStep"
            :onSubmit="handlePaymentSubmit"
            :openTCDialog="() => (openTCDialog = true)"
            :errorMessage="paymentErrorMessage"
            :grandTotal="cartTotal.grand_total"
          />
        </CheckoutStepBlock>
      </div>
      <div class="flex-[0_0_40%] flex flex-col gap-y-5">
        <div class="flex flex-col p-7 border border-[#E3E3E3] rounded-[3px] text-[#013253] gap-y-3">
          <div class="flex items-center justify-between">
            <h3 class="text-[16px] leading-[18px] font-bold">AUTOSHIP SUMMARY</h3>
            <NuxtLink to="/checkout/cart">
              <span class="text-[11px] leading-[22px]">MODIFY AUTOSHIP</span>
            </NuxtLink>
          </div>
          <div class="flex flex-col mt-5">
            <div @click="autoshipDetail = !autoshipDetail" class="flex items-center justify-between cursor-pointer">
              <span class="text-[12px] leading-[18px] font-bold">AUTOSHIP DETAILS</span>
              <Icon v-if="!autoshipDetail" type="angleDown" width="16" height="16" color="#013253"></Icon>
              <Icon v-else type="angleUp" width="16" height="16" color="#013253"></Icon>
            </div>
            <div class="text-[12px] mt-[10px]" :class="{ hidden: !autoshipDetail }">
              <ul class="list-none max-h-[300px] overflow-y-auto">
                <li v-for="item in cartData" class="flex mb-3">
                  <div v-for="img in renderImage">
                    <img
                      class="w-[75px] mr-[15px]"
                      v-if="img.sku === item.sku"
                      :src="`${config.public.baseMagentoUrl}/${config.public.baseMagentoProductUrl}${img.image}`"
                    />
                  </div>
                  <div class="flex flex-col justify-evenly">
                    <span class="text-[#030304] no-underline hover:underline cursor-pointer">{{ item.name }}</span>
                    <span>Qty: {{ item.qty }}</span>
                    <span class="text-[13px] font-semibold text-[#013253]">{{ item.price }}</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div class="flex items-center justify-between text-[14px] leading-[18px]">
            <span>Products cost:</span>
            <span>${{ cartTotal.subtotal }}</span>
          </div>
          <div v-if="discountOffer.label" class="flex items-center justify-between text-[14px] leading-[18px]">
            <span>Discount ({{ discountOffer.label }})</span>
            <span>${{ totalDiscount }}</span>
          </div>
          <div class="flex items-center justify-between text-[14px] leading-[18px]">
            <div class="flex flex-col">
              <span>Shipping cost:</span>
              <span class="text-[#666666]">{{ shippingPrice.label }}</span>
            </div>
            <span>${{ shippingPrice.price.toFixed(2) }}</span>
          </div>
          <div class="flex items-center justify-between text-[14px] leading-[18px]">
            <div class="flex flex-col">
              <span>Taxes:</span>
            </div>
            <span>${{ cartTotal.tax_amount.toFixed(2) }}</span>
          </div>
          <div class="border-t border-[#D3D6D780] my-4" />
          <div class="flex items-center justify-between text-[16px] leading-[18px] text-[#FF0909]">
            <span>You saved:</span>
            <span>${{ totalYouSaved.toFixed(2) }}</span>
          </div>
          <div class="flex items-center justify-between text-[19px] leading-[24px] font-bold">
            <span>Total:</span>
            <span>${{ total.toFixed(2) }}</span>
          </div>
        </div>
        <div
          v-if="showFreeshipNotification"
          class="relative px-[60px] py-4 text-[#FC642D] border border-[#FC642D] rounded-[3px]"
        >
          <div
            class="absolute rounded-full border border-[#FC642D] flex items-center justify-center top-4 left-3 w-6 h-6"
          >
            <span class="text-[14px] leading-[26px]">i</span>
          </div>
          <div class="flex flex-col gap-y-2">
            <span class="text-[14px] leading-[16px] font-bold">You're $45.01 away from Free Shipping!</span>
            <span class="text-[14px] leading-[16px]">
              &#60;- <NuxtLink to="/category/autoship" class="underline">Go back to autoship Products</NuxtLink>
            </span>
          </div>
          <div
            class="absolute rounded-full flex items-center justify-center top-4 right-3 cursor-pointer"
            @click="showFreeshipNotification = false"
          >
            <Icon type="xmark" width="18" height="18"></Icon>
          </div>
        </div>
        <CheckoutCoupon :setDiscountOffer="setDiscountOffer"></CheckoutCoupon>
        <div class="text-center text-[#7E868A] font-bold">
          <p>Need help?</p>
          <p>orders@drberg.com | Call 703-354-7336</p>
        </div>
      </div>
    </div>
    <CheckoutLoading v-show="loading" />
    <Dialog :open="openAutoshipDialog" :handleClose="() => (openAutoshipDialog = false)">
      <CheckoutAutoshipDiscounts :handleClose="() => (openAutoshipDialog = false)" />
    </Dialog>
    <Dialog :open="openTCDialog" :handleClose="() => (openTCDialog = false)">
      <CheckoutTermsAndConditions :handleClose="() => (openTCDialog = false)" />
    </Dialog>
  </div>
</template>

<script setup>
const cartData = useGlobalCart();
const cartTotal = useGlobalCartTotal();
const quoteId = useQuoteId();
const quoteIdCookie = useCookie('quote_id');

if (cartData.value.length === 0) {
  navigateTo('/checkout/cart');
}

const config = useRuntimeConfig();
const { $fetchDrberg, $reloadCartTotal } = useNuxtApp();

const currentStep = ref(1);
const loading = ref(false);
const showLoading = () => {
  loading.value = true;
};
const hideLoading = () => {
  loading.value = false;
};
const autoshipDetail = ref(false);

const discountOffer = ref({
  label: null,
  discount: null,
});
const shippingPrice = reactive({
  price: 0,
  label: '',
});

// Handle Shipping Form
const customerInfo = reactive({
  shippingAddress: {
    region: '',
    region_id: '',
    region_code: '',
    country_id: 'US',
    street: '',
    company: '',
    telephone: '',
    postcode: '',
    city: '',
    firstname: '',
    lastname: '',
    email: '',
    prefix: '',
    sameAsBilling: 1,
  },
  shipping_method_code: '',
  shipping_carrier_code: '',
});

const shippingMethods = ref([]);
const selectedShippingMethod = ref(null);
const shippingMethodErrorMessage = ref('');
const shippingMethodRuleErrors = ref([]);

const handleShippingMethodSubmit = async (shippingMethod) => {
  if (shippingMethod) {
    const dataRequest = {
      ...customerInfo.shippingAddress,
      sameAsBilling: undefined,
      company: undefined,
      street: [customerInfo.shippingAddress.street],
    };
    showLoading();
    try {
      const { data: shippingInformationResponse, error } = await $fetchDrberg('carts/mine/shipping-information', {
        method: 'POST',
        body: {
          addressInformation: {
            billing_address: dataRequest,
            shipping_address: dataRequest,
            shipping_carrier_code: shippingMethod.carrier_code,
            shipping_method_code: shippingMethod.method_code,
          },
        },
        key: new Date().getTime(),
      });
      if (error.value) {
        shippingMethodErrorMessage.value = error.value.data.message;
      } else {
        selectedShippingMethod.value = shippingMethod;
        $reloadCartTotal();
        currentStep.value = 3;
      }
    } catch (e) {
      shippingMethodErrorMessage.value = 'Something went wrong, please try again.';
    }
    hideLoading();
  }
};

const shippingErrorMessage = ref('');

const shippingErrors = reactive({});

const shippingValidations = {
  email: {
    required: true,
    validation: [
      {
        errorMessage: 'Please enter a valid email address (Ex: johndoe@domain.com).',
        regex:
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      },
    ],
  },
  firstname: {
    required: true,
    validation: [
      {
        errorMessage: 'Please enter more or equal than 2 symbols.',
        regex: /^.{2,}$/,
      },
    ],
  },
  lastname: {
    required: true,
    validation: [
      {
        errorMessage: 'Please enter more or equal than 2 symbols.',
        regex: /^.{2,}$/,
      },
    ],
  },
  region_code: {
    required: true,
  },
  telephone: {
    required: true,
  },
  street: {
    required: true,
  },
  city: {
    required: true,
  },
  postcode: {
    required: true,
  },
  prefix: {
    required: false,
  },
};

const handleValidateShipping = (field) => {
  if (field) {
    if (!shippingValidations[field]) shippingErrors[field] = '';
    else if (shippingValidations[field].required && !customerInfo.shippingAddress[field]) {
      shippingErrors[field] = 'This field is required.';
    } else if (
      shippingValidations[field].validation &&
      shippingValidations[field].validation.some((el) => !el.regex.test(customerInfo.shippingAddress[field]))
    ) {
      shippingErrors[field] = shippingValidations[field].validation.find(
        (el) => !el.regex.test(customerInfo.shippingAddress[field]),
      ).errorMessage;
    } else {
      shippingErrors[field] = '';
    }
  } else {
    Object.keys(customerInfo.shippingAddress).forEach((key) => {
      if (!shippingValidations[key]) shippingErrors[key] = '';
      else if (shippingValidations[key].required && !customerInfo.shippingAddress[key]) {
        shippingErrors[key] = 'This field is required.';
      } else if (
        shippingValidations[key].validation &&
        shippingValidations[key].validation.some((el) => !el.regex.test(customerInfo.shippingAddress[key]))
      ) {
        shippingErrors[key] = shippingValidations[key].validation.find(
          (el) => !el.regex.test(customerInfo.shippingAddress[key]),
        ).errorMessage;
      } else {
        shippingErrors[key] = '';
      }
    });
  }
};

const changeShippingField = (field, value) => {
  customerInfo.shippingAddress[field] = value;
};

const handleShippingSubmit = async () => {
  handleValidateShipping();
  if (Object.values(shippingErrors).every((error) => !error)) {
    const dataRequest = {
      ...customerInfo.shippingAddress,
      sameAsBilling: undefined,
      company: undefined,
      street: [customerInfo.shippingAddress.street],
    };
    showLoading();
    try {
      const { data: shippingMethodsResponse, error } = await $fetchDrberg('carts/mine/estimate-shipping-methods', {
        method: 'POST',
        body: {
          address: dataRequest,
        },
        key: new Date().getTime(),
      });
      if (error.value) {
        shippingErrorMessage.value = [error.value.data.message];
      } else {
        shippingMethods.value = shippingMethodsResponse.value
          .filter((method) => method.method_code && method.method_code !== 'flatrate')
          .sort((a, b) => a.amount - b.amount);
        if (shippingMethods.value.length === 0) {
          shippingMethodRuleErrors.value = [
            ...new Set(
              shippingMethodsResponse.value
                .filter((method) => method.error_message)
                .map((method) => method.error_message),
            ),
          ];
        }
        currentStep.value = 2;
      }
    } catch (e) {
      shippingErrorMessage.value = 'Something went wrong, please try again.';
    }
    hideLoading();
  }
};

//Total Price after apply Discount
const totalDiscount = computed(() => {
  if (discountOffer.value) {
    const value = discountOffer.value.discount * cartTotal.value.subtotal;
    return value.toFixed(2);
  }
  return 0;
});

//Total you saved
const totalYouSaved = cartData.value.reduce((a, b) => {
  const price = b.qty * b.detailCartItems['price'] - b.qty * b.price;
  a += +price;
  return a;
}, 0);

//Total Price
const total = computed(() => {
  let price = 0;
  if (totalDiscount) {
    price = cartTotal.value.subtotal + +totalDiscount.value + +shippingPrice.price;
    return price;
  }
  price = cartTotal.value.subtotal + +shippingPrice.price;
  return price;
});

// Freeship notification
const showFreeshipNotification = ref(true);

// Terms & Conditions Dialog
const openTCDialog = ref(false);

// Autoship Dialog
const openAutoshipDialog = ref(false);

// Autoship select
const handleFrequencySubmit = () => {
  currentStep.value++;
};

// Handle place order
const paymentErrorMessage = ref('');
const handlePaymentSubmit = async (cardValue) => {
  showLoading();
  try {
    const bluesnapTokenResponse = await $fetch(`${config.public.baseMagentoUrl}/bluesnap/hostedfields/token`);
    const { data: sendCardDataResponse, error: errorSendCard } = await $fetchDrberg('bluesnap/send-card-data', {
      method: 'POST',
      body: {
        ccNumber: cardValue.ccNumber,
        cvv: cardValue.cvv,
        expDate: `${cardValue.month}/${cardValue.year}`,
        token: bluesnapTokenResponse.token,
      },
      key: new Date().getTime(),
    });

    if (errorSendCard.value) {
      paymentErrorMessage.value = errorSendCard.value.data.message;
    } else {
      const { error: errorPaymentMethod } = await $fetchDrberg('carts/mine/payment-information', {
        method: 'POST',
        body: {
          paymentMethod: {
            additional_data: {
              cc_expiry: `${cardValue.month}/${cardValue.year}`,
              cc_last_4_digits: sendCardDataResponse.value.last4_digits,
              cc_type: sendCardDataResponse.value.cc_type,
              token: bluesnapTokenResponse.token,
            },
            extension_attributes: {
              agreement_ids: [1],
            },
            method: 'bluesnap_hostedfields',
          },
          email: customerInfo.shippingAddress.email,
        },
        key: new Date().getTime(),
      });

      if (errorPaymentMethod.value) {
        paymentErrorMessage.value = errorPaymentMethod.value.data.message;
      } else {
        cartData.value = [];
        quoteId.value = null;
        quoteIdCookie.value = null;
        navigateTo('/checkout/cart');
      }
    }
  } catch (e) {
    paymentErrorMessage.value = 'Something went wrong, please try again.';
  }
  hideLoading();
};

//Handle Apply Discount
const setDiscountOffer = (label, discount) => {
  discountOffer.value = {
    ...discountOffer.value,
    label,
    discount,
  };
};

//Render Image
const renderImage = computed(() =>
  cartData.value.reduce((a, b) => {
    Object.keys(b.detailCartItems).forEach((item) => {
      if (b.sku === b.detailCartItems[item]) {
        const img = b.detailCartItems.custom_attributes.filter((i) => i.attribute_code === 'image');
        a.push({
          sku: b.sku,
          image: img[0].value,
        });
      }
    });
    return a;
  }, []),
);
</script>
