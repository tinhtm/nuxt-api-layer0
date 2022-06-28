<template>
  <div class="page-wrapper flex flex-col items-center min-h-screen max-w-[100vw] lg:p-0">
    <div class="checkout-cart w-full max-w-[1280px] mb-[50px] flex-grow">
      <h1 class="cart-title text-[#2A363E] text-[32px] font-bold">My Autoship</h1>
      <div v-if="cartData.length > 0" class="cart-container block lg:flex lg:justify-between lg:mt-[10px]">
        <div class="cart-left flex-[0_0_70%]">
          <div
            class="cart-message flex text-[#FC642D] items-center border-[#FC642D] border-[1px] border-solid rounded-[3px] p-[13px_14px] lg:mt-0 mt-[15px] mb-[15px] text-[14px] relative"
          >
            <div
              class="cart-message-icon flex justify-center border-2 border-solid border-[#F9642E] rounded-[50%] w-[24px] h-[24px] flex-[0_0_24px] mr-[10px] font-semibold"
            >
              i
            </div>
            <div class="cart-message-content block md:flex lg:flex">
              <p class="font-bold">You're $10 away from Free Shipping!</p>
              <NuxtLink to="/category/autoship">
                &nbsp;-
                <span class="cart-back-to-autoship underline"> Go back to Autoship Products </span>
              </NuxtLink>
            </div>
            <div class="absolute top-[20px] right-[15px] lg:top-[12px] lg:right-[15px] md:top-[12px] cursor-pointer">
              <Icon type="close"></Icon>
            </div>
          </div>
          <div class="cart-information bg-transparent lg:bg-[#e3e3e366] lg:p-[25px]">
            <div class="cart-infomation-price-mobile lg:hidden text-[#013253] leading-[35px]">
              <div>Products cost: ${{ totalPrice.toFixed(2) }}</div>
              <div class="font-bold">Subtotal: ${{ (totalPrice - totalDiscount).toFixed(2) }}</div>
            </div>
            <h4 class="hidden font-bold text-[15px] text-[#2A363E] lg:block">
              DrBerg original products. 100% Secure checkout.
            </h4>
            <div class="cart-products bg-[#fff] m-[20px_0] lg:p-[0_28px]">
              <div
                v-for="item in cartData"
                class="cart-products-item p-[20px_0] flex text-[14px] border-t border-dashed border-[#C5C5C5] last:border-b last:border-dashed lg:first:border-none lg:last:border-b-0"
              >
                <div
                  class="cart-products-item-thumbnail flex items-center justify-center flex-[0_0_120px] md:flex-[0_0_150px] lg:flex-[0_0_150px] xl::flex-[0_0_165px]"
                >
                  <a href="#" v-for="img in renderImage">
                    <img
                      class="w-[80px] lg:w-[120px] lg:h-[120px]"
                      v-if="img.sku === item.sku"
                      :src="`${config.public.baseMagentoUrl}/${config.public.baseMagentoProductUrl}${img.image}`"
                    />
                  </a>
                </div>
                <div
                  class="cart-products-item-center gap-[12px] w-full flex flex-col lg:flex-row lg:justify-between text-[14px]"
                >
                  <div class="cart-products-item-center-detail lg:p-[0_20px]">
                    <a href="#" class="font-bold decoration-0 text-[#2A363E] text-[14px]">{{ item.name }} </a>
                  </div>
                  <!-- Show cart item price in mobile view -->
                  <div class="cart-information-products-item-price-mobile flex lg:hidden">
                    <span class="text-[16px] font-semibold mr-[10px]">${{ (item.price * item.qty).toFixed(2) }}</span>
                    <span v-for="(product, key) in item.detailCartItems" class="text-[#013253]">
                      <p class="text-[#2A363E]" v-if="item.sku === item.detailCartItems[key]">
                        You save: ${{ (item.qty * item.detailCartItems['price'] - item.qty * item.price).toFixed(2) }}
                      </p>
                    </span>
                  </div>
                  <!-- Show cart item price in mobile view -->
                  <div class="cart-products-item-qty lg:flex-[0_0_130px]">
                    <select
                      @change="(e) => handleChangeQty(e, item.item_id)"
                      :value="item.qty"
                      class="hover:cursor-pointer rounded-[3px] select-value w-[64px] h-[40px] p-[4px_15px_5px_10px] border-[1px] border-solid border-[#D3D6D7] text-[14px] mr-[5px] focus-visible:outline-none"
                    >
                      <option v-for="n in 10" :value="n" :selected="item.qty == n">
                        {{ n }}
                      </option>
                    </select>
                    <span class="text-[#2A363E]">pcs</span>
                  </div>
                  <span
                    @click="handleDeleteItem(item)"
                    class="text-[#0091a8] hover:cursor-pointer flex justify-end underline md:mr-[20px] lg:hidden"
                  >
                    Delete
                  </span>
                </div>
                <!-- Show cart item price in Laptop and Desktop view -->
                <div
                  class="hidden cart-products-item-right flex-[0_0_50px] lg:flex-[0_0_120px] lg:flex flex-col items-end leading-[1.6rem]"
                >
                  <span class="text-[18px] text-[#2A363E] font-bold">${{ (item.price * item.qty).toFixed(2) }} </span>
                  <span v-for="(product, key) in item.detailCartItems" class="text-[#013253]">
                    <p class="text-[#2A363E]" v-if="item.sku === item.detailCartItems[key]">
                      You save: ${{ (item.qty * item.detailCartItems['price'] - item.qty * item.price).toFixed(2) }}
                    </p>
                  </span>
                  <span @click="handleDeleteItem(item)" class="text-[#0091a8] hover:cursor-pointer"> Delete </span>
                </div>
                <!-- Show cart item price in Laptop and Desktop view -->
              </div>
            </div>
            <div class="cart-totals hidden lg:flex justify-end text-[14px]">
              <div class="cart-totals-block inline-flex relative">
                <div class="cart-totals-title flex flex-col items-end leading-[1.6rem] font-semibold mr-[40px]">
                  <span class="text-[#2A363E]">Products:</span>
                  <span class="text-[#2A363E]" :class="{ hidden: totalDiscount > 0 ? false : true }">Discount:</span>
                  <span class="text-[#2A363E]">Shipping:</span>
                  <span class="text-[#2A363E]">Subtotal:</span>
                </div>
                <div class="cart-totals-amount flex flex-col items-end leading-[1.6rem]">
                  <span class="text-[#2A363E]">${{ totalPrice.toFixed(2) }}</span>
                  <span
                    :class="{
                      hidden: totalDiscount > 0 ? false : true,
                    }"
                    class="flex gap-3 text-[#2A363E]"
                  >
                    - ${{ totalDiscount }}
                    <div
                      class="inline-flex items-center justify-center text-[#0091a8] border-[1px] border-solid border-[#0091a8] rounded-[20px] p-[0_5px_0_15px] relative h-[30px]"
                    >
                      <span class="mr-[10px]">{{ discountOffer.label }}</span>
                      <div @click="handleDeleteCoupon" class="cursor-pointer">
                        <Icon type="closeCoupon" width="14" height="14"></Icon>
                      </div>
                    </div>
                  </span>
                  <div class="cart-totals-amount-child text-[#2A363E]">Not calculated yet</div>
                  <div class="cart-totals-amount-child text-[#2A363E]">
                    <span>${{ (totalPrice - totalDiscount).toFixed(2) }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="cart-right flex flex-col-reverse gap-[40px] lg:block flex-[0_0_30%] text-[14px] lg:pl-[20px]">
          <div
            class="cart-order-summary lg:border-[1px] border-solid border-[#eaeaea] lg:p-[20px] lg:shadow-[5px_5px_5px_#0000000d] rounded-[3px]"
          >
            <span class="text-[#2A363E] text-[16px] font-bold">ORDER SUMMARY</span>
            <div class="cart-order-summary-total leading-[1.8rem] my-[15px] text-[#013253]">
              <div class="text-[#2A363E]">
                <span class="mr-[10px]">Product cost:</span>
                <span>${{ totalPrice.toFixed(2) }}</span>
              </div>
              <div class="flex text-[#2A363E]" :class="{ hidden: totalDiscount > 0 ? false : true }">
                <span class="mr-[10px]">Discount:</span>
                <div>
                  <span class="mr-[10px]">- ${{ totalDiscount }}</span>
                  <div
                    class="inline-flex items-center justify-center text-[#0091a8] border-[1px] border-solid border-[#0091a8] rounded-[20px] p-[0_5px_0_15px] relative h-[30px]"
                  >
                    <span class="mr-[10px]">{{ discountOffer.label }}</span>
                    <div @click="handleDeleteCoupon" class="cursor-pointer">
                      <Icon type="closeCoupon" width="14" height="14"></Icon>
                    </div>
                  </div>
                </div>
              </div>
              <div class="cart-order-summary-shipping text-[#2A363E]">
                <span class="mr-[10px]">Shipping cost:</span>
                <span>Not calculated yet</span>
              </div>
              <div class="cart-order-summary-taxes text-[#2A363E]">
                <span class="mr-[10px]">Taxes:</span>
                <span>Not calculated yet</span>
              </div>
              <div class="cart-order-summary-subtotal font-bold text-[#2A363E]">
                <span class="mr-[10px]">Subtotal:</span>
                <span>${{ (totalPrice - totalDiscount).toFixed(2) }}</span>
              </div>
            </div>
            <h4 class="text-[#2A363E] font-bold">PAY WITH:</h4>
            <div class="cart-payment-method flex my-[15px] lg:my-[10px] gap-1">
              <Icon type="visa" width="51" height="30"></Icon>
              <Icon type="masterCard" width="44" height="30"></Icon>
              <Icon type="americanExpress" width="48" height="30"></Icon>
            </div>
            <NuxtLink
              to="/checkout"
              class="uppercase cart-checkout-button text-[#fff] font-bold flex items-center justify-center bg-[#FBAF25] h-[54px] w-full border-2 border-solid border-[#FBAF25] mt-[15px] text-[16px] decoration-0 rounded-[3px]"
            >
              Checkout
            </NuxtLink>
          </div>
          <div>
            <p class="text-[#2A363E] text-[14px] mb-[20px] lg:my-[20px]">100% Secure checkout.</p>
            <CheckoutCoupon :setDiscountOffer="setDiscountOffer"></CheckoutCoupon>
            <span class="text-[#013253]"> There may be better offers. To make sure you get the best one, </span>
            <a href="" class="text-[#0091A8]">sign in your account</a>
          </div>
        </div>
      </div>
      <div v-else>
        <span>You have no items in your shopping cart.</span>
        <div>
          <span
            >Click
            <NuxtLink class="underline text-[#0091a8]" to="/"> here </NuxtLink>
          </span>
          to continue shopping.
        </div>
      </div>
    </div>
    <CheckoutLoading v-show="isLoading" />
  </div>
</template>

<script setup>
const showPopupAddCoupon = ref(false);
const discountOffer = ref({
  label: null,
  discount: null,
});

// API INTEGRATION

const cartData = useGlobalCart();
const config = useRuntimeConfig();
const isLoading = ref(false);
const globalNotification = useGlobalNotification();
const { $fetchDrberg, $reloadCart } = useNuxtApp();

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

// API INTEGRATION

const totalPrice = computed(() => {
  return cartData.value.reduce((a, b) => {
    a = a + b.price * b.qty;
    return a;
  }, 0);
});

const totalDiscount = computed(() => {
  if (discountOffer.value) {
    const value = discountOffer.value.discount * totalPrice.value;
    return value.toFixed(2);
  }
  return 0;
});

const handleChangeQty = (e, id) => {
  const qty = parseInt(e.target.value);
  cartData.value = cartData.value.map((el) => {
    if (el.item_id === id) {
      return {
        ...el,
        qty,
      };
    }
    return el;
  });
};

const setDiscountOffer = (label, discount) => {
  discountOffer.value = {
    ...discountOffer.value,
    label,
    discount,
  };
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

const handleDeleteItem = async (item) => {
  if (confirm(`Are you sure to remove ${item.name}`)) {
    isLoading.value = true;
    const { error } = await $fetchDrberg(`carts/mine/items/${item.item_id}`, {
      method: 'DELETE',
    });
    if (!error.value) {
      globalNotification.value.push({
        isError: false,
        message: `Product ${item.name} has been deleted`,
      });
      $reloadCart();
    } else {
      globalNotification.value.push({
        isError: true,
        message: error.value.message,
      });
    }
    isLoading.value = false;
  }
};

watch(showPopupAddCoupon, () => {
  setTimeout(() => {
    showPopupAddCoupon.value = false;
  }, 3000);
});
</script>
