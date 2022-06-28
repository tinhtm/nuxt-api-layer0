<template>
  <div>
    <NuxtLayout name="main">
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup>
import '@/assets/css/tailwind.css';

const { $fetchDrberg } = useNuxtApp();

const globalCart = useGlobalCart();
const globalCartTotal = useGlobalCartTotal();

// Assign quoteId value
const quoteId = useQuoteId();
const quoteIdCookie = useCookie('quote_id');
if (quoteIdCookie.value && !quoteId.value) {
  quoteId.value = quoteIdCookie.value;
} else if (!quoteIdCookie.value && !quoteId.value) {
  const { data } = await $fetchDrberg('carts/mine', {
    method: 'POST',
  });
  quoteIdCookie.value = data.value;
  quoteId.value = data.value;
}

// Fetch cart data
const [{ data: cartItemsResponse, error: cartItemsError }, { data: cartTotalResponse, error: cartTotalError }] =
  await Promise.all([$fetchDrberg('carts/mine/items'), $fetchDrberg('carts/mine/totals')]);
if (!cartItemsError.value || !cartTotalError.value) {
  const skus = cartItemsResponse.value.map((el) => el.sku);
  const { data: productDataResponse } = await $fetchDrberg(
    `products?searchCriteria[filter_groups][0][filters][0][field]=sku&searchCriteria[filter_groups][0][filters][0][value]=${skus}&searchCriteria[filter_groups][0][filters][0][condition_type]=in`,
    {},
    false,
  );
  if (cartItemsResponse.value && productDataResponse.value) {
    globalCart.value = cartItemsResponse.value.map((el) => {
      const detailCartItems = productDataResponse.value.items.find((product) => product.sku === el.sku);
      return { ...el, detailCartItems };
    });
  }
  globalCartTotal.value = cartTotalResponse.value;
}
</script>
