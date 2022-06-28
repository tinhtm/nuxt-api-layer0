<template>
  <header class="hidden lg:block page-header shadow-none bg-[#fff] border-0 mb-0">
    <div class="header content box-border flex items-center p-[15px_20px] m-0 w-auto gap-[15px] max-w-none">
      <span
        class="action bg-no-repeat nav-toggle ml-[24px] mr-[20px] before:bg-[length:24px] before:bg-no-repeat before:bg-center before:content-[''] before:inline before:w-[44px] before:h-[44px] before:p-[10px] before:box-border bg-[url('https://shop.drberg.com/static/version1653540790/frontend/Drberg/Shop/en_US/images/hamburger-menu.svg')]"
      >
        <span class="border-0 h-[1px] m-[-1px] overflow-hidden p-0 absolute w-[1px]" style="clip: rect(0, 0, 0, 0)"
          >Toggle Nav</span
        >
      </span>
      <a class="logo" href="https://shop.drberg.com/" title="">
        <img
          class="full"
          src="https://drberg-dam.imgix.net/dr-berg-images/logo-48-full.svg"
          title=""
          alt="Dr.Berg Logo"
          width="263"
          height="43"
        />
      </a>
      <div class="block block-search">
        <div class="block block-content relative">
          <div class="field search">
            <div class="control border-t-0 m-0 p-0">
              <input
                id="search"
                type="text"
                name="q"
                value=""
                placeholder="Search for Dr. Berg health products"
                class="input-text rounded-[24px] pl-[48px] bg-[#f4f4f4] text-[16px/14px] font-normal border-0 w-[640px] pt-[9px] pb-[9px] leading-[30px] color-[#2a363e]"
                maxlength="128"
                role="combobox"
                aria-haspopup="false"
                aria-autocomplete="both"
                autocomplete="off"
                aria-expanded="false"
              />
            </div>
          </div>
          <div class="actions absolute left-0 top-[100%]">
            <button
              type="submit"
              title="Search"
              class="action search bg-no-repeat left-[10px] w-[30px] top-[-40px] h-[48px] relative p-0 inline-block border-none shadow-none opacity-100 mr-[8px] before:content-[''] before:w-[44p] before:h-[44px] bg-[url('https://shop.drberg.com/static/version1653540790/frontend/Drberg/Shop/en_US/images/btn-search.svg')] before:bg-no-repeat before:bg-[length:24px] before:bg-center before:block"
              disabled=""
            ></button>
          </div>
        </div>
      </div>
      <ul class="header links m-0 ml-auto flex items-center pl-0 gap-[25px] h-[44px]">
        <div class="inline-block mb-0 mr-[12px] relative" data-content-type="html">
          <a class="website-toggle" href="#">
            <span class="icon">
              <Icon type="menu"></Icon>
            </span>
            <span class="ripple" style="height: 44px; width: 44px; left: -2.9375px; top: 2.00347px"></span
          ></a>
        </div>
        <li class="help-link inline-block mb-0 mr-[12px] relative">
          <a href="#">
            <span class="icon">
              <Icon type="question" width="24" height="24"></Icon>
            </span>
          </a>
        </li>
        <li class="wishlist-link">
          <a href="#" class="ajaxlogin">
            <span class="icon">
              <Icon type="heart" width="24" height="24"></Icon>
            </span>
          </a>
        </li>
        <li class="greet welcome">
          <a href="#">
            <span class="icon">
              <Icon type="login" width="24" height="24"></Icon>
            </span>
          </a>
        </li>
        <li @click="showMiniCart = !showMiniCart" data-block="minicart" class="minicart-wrapper relative">
          <a href="#">
            <span class="icon">
              <Icon type="miniCart" width="24" height="24"></Icon>
            </span>
          </a>
          <div
            ref="miniCartRef"
            v-show="showMiniCart"
            class="absolute top-[44px] rounded-[5px] p-0 border-none w-[384px] right-0 bg-[#fff] z-10 shadow-[0_3px_6px] shadow-[#00000029]"
          >
            <div class="p-[17px_17px]">
              <h2 class="text-[#2a363e] text-[18px] font-bold">Your cart</h2>
            </div>
            <div class="p-[0_17px]">
              <ul class="list-none max-h-[300px] overflow-y-auto border-b-[1px] border-solid border-[#d3d6d7]">
                <li v-for="item in cartItems" class="flex mb-3 text-[#2a363e] pb-[10px]">
                  <div v-for="img in renderImage">
                    <img
                      class="w-[60px] h-[60px] mr-[25px]"
                      v-if="img.sku === item.sku"
                      :src="`${config.public.baseMagentoUrl}/${config.public.baseMagentoProductUrl}${img.image}`"
                    />
                  </div>
                  <div class="flex flex-row mt-[10px] justify-between w-[100%]">
                    <div class="flex flex-[0_0_60%]">
                      <span class="text-[14px]">{{ item.qty }}x</span>
                      <span class="no-underline cursor-pointer text-[14px]">{{ item.name }}</span>
                    </div>
                    <span class="text-[16px] font-bold">${{ item.price.toFixed(2) }}</span>
                  </div>
                </li>
              </ul>
            </div>
            <div class="p-[11px_20px_5px]">
              <div class="flex justify-between">
                <div class="flex">
                  <span class="text-[#2a363e] font-[500] text-[16px]">Total: &nbsp;</span>
                  <span> {{ cartItems.length }} products</span>
                </div>
                <span class="font-bold text-[16px]">${{ totalPrice.toFixed(2) }}</span>
              </div>
              <NuxtLink
                to="/checkout/cart"
                class="my-[15px] inline-block text-center p-[11px_20px] bg-[#0091a8] rounded-[2px] text-[14px] text-[#fff] font-normal"
              >
                View Cart
              </NuxtLink>
            </div>
          </div>
        </li>
        <li class="help-link inline-block mb-0 mr-[12px] relative">
          <NuxtLink to="/checkout/cart" class="action showcart" rel="nofollow">
            <span class="icon">
              <Icon type="truck" width="25" height="25"></Icon>
            </span>
            <span
              v-if="cartItems.length > 0"
              class="rounded-[50%] bg-[#fc642d] p-0 absolute left-[20px] h-auto top-[-7px] min-w-[16px] text-[10px] text-[#fff] inline-block m-[3px_0_0] overflow-hidden text-center"
            >
              <span>{{ countTotalCart() }}</span>
            </span>
          </NuxtLink>
        </li>
      </ul>
    </div>
    <div class="sections nav-sections bg-[#fff] pl-[90px] h-auto">
      <div class="section-items nav-sections-items m-[0_16px]">
        <div class="section-item-content nav-sections-item-content">
          <nav class="navigation left-auto p-0 relative top-0 w-full" style="height: inherit; overflow: inherit">
            <ul class="ui-menu ui-widget ui-widget-content ui-corner-all flex items-center flex-wrap mt-0 mb-0">
              <li v-for="category in listCategories" class="level0 nav-4 level-top parent ui-menu-item">
                <NuxtLink
                  :to="`/category/${category.url}`"
                  class="level-top ui-corner-all cursor-pointer flex items-center p-[0_16px] color-[#2a363e] text-[18px/40px] font-bold"
                >
                  <div :class="$route.params.id === category.url ? 'text-[#0091A8] border-b-2 border-[#0091A8]' : ''">
                    <span>{{ category.title }}</span>
                  </div>
                  <span
                    v-if="category.badge"
                    class="menu_label bg-[#fc642d] p-[3px_5px] ml-[8px] rounded-[9px] text-[#fff] text-[14px] leading-[1.2] relative top-[-3px]"
                  >
                    {{ category.badge }}
                  </span>
                </NuxtLink>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { onClickOutside } from '@vueuse/core';

const cartItems = useGlobalCart();
const showMiniCart = ref(false);
const miniCartRef = ref(null);
const config = useRuntimeConfig();
const countTotalCart = () => {
  const total = cartItems.value.reduce((a, b) => {
    a += b.qty;
    return a;
  }, 0);
  return total;
};

onClickOutside(miniCartRef, (event) => {
  showMiniCart.value = false;
});

const listCategories = [
  {
    title: 'All products',
    url: 'all-products',
  },
  {
    title: 'Supplements',
    url: 'supplements',
  },
  {
    title: 'Powders',
    url: 'powders',
  },
  {
    title: 'Bundles',
    url: 'bundles',
  },
  {
    title: 'Books',
    url: 'books',
  },
  {
    title: 'Immune',
    url: 'immune',
  },
  {
    title: 'Beauty',
    url: 'beauty',
    badge: 'NEW',
  },
  {
    title: 'Deals',
    url: 'deals',
    badge: 'HOT',
  },
  {
    title: 'Autoship',
    url: 'autoship',
    badge: 'NEW',
  },
];

//Render Image
const renderImage = computed(() =>
  cartItems.value.reduce((a, b) => {
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

//Total price
const totalPrice = computed(() => {
  return cartItems.value.reduce((a, b) => {
    a = a + b.price * b.qty;
    return a;
  }, 0);
});
</script>
