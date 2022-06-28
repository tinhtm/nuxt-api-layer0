interface RequestInterface {
  endpoint: string;
  body: any;
}

export default defineNuxtPlugin((nuxtApp) => {
  const { $fetchDrberg } = nuxtApp;
  const globalCart = useGlobalCart();
  const globalCartTotal = useGlobalCartTotal();

  return {
    provide: {
      async reloadCart() {
        const [{ data: cartItemsResponse, error: cartItemsError }, { data: cartTotalResponse, error: cartTotalError }] =
          await Promise.all([
            $fetchDrberg('carts/mine/items', { key: new Date().getTime() }),
            $fetchDrberg('carts/mine/totals', { key: new Date().getTime() }),
          ]);
        if (!cartItemsError.value || !cartTotalError.value) {
          const skus = cartItemsResponse.value.map((el) => el.sku);
          const { data: productDataResponse } = await $fetchDrberg(
            `products?searchCriteria[filter_groups][0][filters][0][field]=sku&searchCriteria[filter_groups][0][filters][0][value]=${skus}&searchCriteria[filter_groups][0][filters][0][condition_type]=in`,
            {
              key: new Date().getTime(),
            },
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
      },
      async reloadCartTotal() {
        const { data: cartTotalResponse, error: cartTotalError } = await $fetchDrberg('carts/mine/totals', {
          key: new Date().getTime(),
        });

        if (!cartTotalError.value) {
          globalCartTotal.value = cartTotalResponse.value;
        }
      },
    },
  };
});
