<template>
  <div class="text-sm text-[#013253]">
    <div class="flex gap-x-1 my-5">
      <div v-if="breadcrumbs" v-for="(item, index) in breadcrumbs" :key="index" class="flex gap-x-1">
        <span v-if="index !== 0" class="text-[#8F8F8F] font-bold">/</span>
        <NuxtLink
          :to="item.link"
          :class="index !== breadcrumbs.length - 1 ? 'text-[#013253] cursor-pointer' : 'text-[#8F8F8F]'"
          >{{ item.label }}</NuxtLink
        >
      </div>
    </div>
    <div class="flex flex-col lg:flex-row gap-x-7">
      <div class="mb-6 lg:hidden">
        <button
          class="border border-[#CCCCCC] rounded-[3px] shadow-[-1px_0_1px_#00000029] bg-[#F0F0F0] p-[7px_7px_3px_7px]"
          @click="showOptions = true"
        >
          <span class="leading-[16px] text-[#333333] font-bold">Shop by</span>
        </button>
      </div>
      <div
        class="flex fixed top-0 left-0 w-screen h-screen bg-white z-[100] p-5 md:p-[30px] overflow-auto lg:overflow-hidden lg:relative lg:w-auto lg:p-0 lg:h-auto lg:flex flex-col gap-y-4 flex-[0_0_258px]"
        :class="{ hidden: !showOptions }"
      >
        <div class="flex justify-between items-center pr-4 mb-5 lg:hidden">
          <span class="text-[20px] leading-[16px] text-[#333333] font-bold">Shopping Options</span>
          <span class="cursor-pointer" @click="showOptions = false">
            <Icon type="xmark" color="#000000" width="24" height="24" />
          </span>
        </div>
        <div class="border rounded-[3px] px-5 py-3 pr-4 border-[#D3D6D780]">
          <div class="flex justify-between items-center text-base font-bold">
            <span class="text-base font-bold text-[#2A363E]">Reset filters</span>
            <span class="cursor-pointer" @click="resetFilter">
              <Icon type="xmark" color="#FF0404" width="24" height="24" />
            </span>
          </div>
        </div>
        <div v-for="option in filterOptions" :key="option.id" class="border rounded px-5 py-3 border-[#D3D6D780]">
          <div
            class="flex justify-between items-center text-base font-bold cursor-pointer"
            @click="option.showChildren = !option.showChildren"
          >
            <span class="text-[#2A363E] text-[16px] leading-[22px]">{{ option.name }}</span>
            <span v-if="option.showChildren">
              <Icon type="chevronDown" color="#2A363E" width="16" height="16" />
            </span>
            <span v-else>
              <Icon type="chevronUp" color="#2A363E" width="16" height="16" />
            </span>
          </div>
          <div v-show="option.showChildren" class="flex flex-col mt-3 gap-y-2">
            <div v-for="child in option.children" :key="child.id">
              <label class="flex items-center gap-x-3 cursor-pointer text-[#8F8F8F] text-xs">
                <input
                  type="checkbox"
                  class="w-[17px] h-[17px] border border-[#D3D6D7] rounded-[3px] checked:bg-[#0091A8] checked:border-0 checked:hover:bg-[#0091A8] checked:hover:border-0 checked:focus:bg-[#0091A8] checked:focus:border-0 cursor-pointer focus:ring-transparent"
                  v-model="child.checked"
                />
                {{ child.name }}
              </label>
            </div>
          </div>
        </div>
      </div>
      <div class="flex-1">
        <h2 class="text-[34px] leading-[36px] mb-3">Autoship</h2>
        <span class="leading-[18px]">Browse Dr.Berg products available to purchase with autoship.</span>
        <div class="flex justify-between lg:items-center bg-[#0132530d] py-4 px-[25px] rounded-[3px] mt-4 mb-10">
          <div class="flex flex-col md:flex-row items-cente gap-3">
            <div class="flex items-center gap-x-2">
              <span class="text-xs text-[#013253]">Display:</span>
              <div
                class="flex justify-between items-center py-2 px-3 gap-x-5 cursor-pointer bg-[#dbe2e6] rounded-[3px]"
              >
                <span class="text-[13px] leading-[15px] text-[#013253de]">20 per page</span>
                <Icon type="angleDown" width="16" height="16" color="#01325380" />
              </div>
            </div>
            <div class="flex items-center gap-x-2">
              <span class="text-xs text-[#013253]">Sort by:</span>
              <div class="flex">
                <div
                  class="flex justify-between items-center py-2 px-3 gap-x-5 cursor-pointer bg-[#dbe2e6] rounded-l-[3px]"
                >
                  <span class="text-[13px] leading-[15px] text-[#013253de]">Popularity</span>
                  <Icon type="angleDown" width="16" height="16" color="#01325380" />
                </div>
                <div
                  class="flex justify-between items-center py-2 px-3 gap-x-5 cursor-pointer bg-white rounded-r-[3px]"
                >
                  <Icon type="arrowUp" width="16" height="16" color="#013253" />
                </div>
              </div>
            </div>
          </div>
          <div class="flex">
            <div
              class="flex justify-center items-center w-8 h-8 rounded-l-[3px] cursor-pointer"
              :class="listingLayout === 'GRID' ? 'bg-[#c2ced7]' : 'bg-white'"
              @click="listingLayout = 'GRID'"
            >
              <Icon type="grid" width="16" height="16" />
            </div>
            <div
              class="flex justify-center items-center w-8 h-8 rounded-r-[3px] cursor-pointer"
              :class="listingLayout === 'LIST' ? 'bg-[#c2ced7]' : 'bg-white'"
              @click="listingLayout = 'LIST'"
            >
              <Icon type="list" width="16" height="16" />
            </div>
          </div>
        </div>
        <div
          class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5"
          :class="listingLayout === 'LIST' && 'grid-cols-1 sm:grid-cols-1 md:grid-cols-1'"
        >
          <div
            v-for="(product, index) in products"
            :key="product.sku + index"
            class="flex gap-y-6 gap-x-5 flex-[0_0_33%] py-5 px-[18px] border-2 rounded-[3px] border-[#D3D6D733] hover:border-[#58BCCC4D]"
            :class="listingLayout === 'GRID' ? 'flex-col' : 'flex-row'"
          >
            <div
              class="flex justify-center relative"
              :class="listingLayout === 'LIST' && 'flex-[0_0_140px] py-[30px] sm:flex-[0_0_200px]'"
            >
              <img
                :src="getProductImage(product)"
                class="h-[230px] sm:h-[142px] md:h-[123px] lg:h-[135px] xl:h-[208px]"
                :class="listingLayout === 'LIST' && 'h-[120px]'"
              />
              <Icon class="absolute top-0 left-0" type="heart" width="24" height="24"></Icon>
            </div>
            <div class="flex flex-col justify-between h-full">
              <div>
                <div class="flex flex-wrap gap-x-1">
                  <div class="flex gap-x-1">
                    <Icon type="star" width="16" height="16" v-for="n in Math.round(product.rating)" :key="product.sku">
                    </Icon>
                    <Icon
                      type="starEmpty"
                      width="16"
                      height="16"
                      v-for="n in 5 - Math.round(product.rating)"
                      :key="product.sku"
                    ></Icon>
                  </div>
                  <span class="text-[#013253] font-bold ml-2">{{ product.rating }}</span>
                  <div class="flex gap-x-1 text-[#0091A8]">
                    <span>|</span>
                    <span>{{ product.reviews }} Reviews</span>
                  </div>
                </div>
                <div class="mt-3 flex flex-col gap-y-3">
                  <span class="text-[#013253] font-bold text-base">{{ product.name }}</span>
                  <span v-if="listingLayout === 'LIST'">{{ product.short_description }}</span>
                </div>
              </div>
              <div>
                <div class="flex flex-col gap-y-1 mt-2">
                  <span v-if="product.special_price" class="text-[11px] leading-[11px] text-[#7E868A]">
                    <span class="line-through">$ {{ product.price.toFixed(2) }}</span>
                    <span> (-{{ ((1 - product.special_price / product.price) * 100).toFixed(2) }}%)</span>
                  </span>
                  <div v-else class="h-[11px]"></div>
                  <span class="text-base text-[#013253] font-bold">
                    $ {{ (product.special_price || product.price).toFixed(2) }}
                  </span>
                </div>
                <button
                  class="text-[#FC642D] text-[14px] leading-[24px] font-bold border-2 border-[#FC642D] py-3 px-[10px] rounded-[3px] w-[100%] mt-4 disabled:opacity-50 max-w-[262px]"
                  @click="addToAutoShip(product)"
                  :disabled="product.isAdding"
                >
                  {{ product.isAdding ? 'ADDING...' : 'ADD TO AUTOSHIP' }}
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="flex flex-wrap gap-3 mt-[30px]" v-if="totalPage > 1">
          <div
            v-if="currentPage !== 1"
            class="border-2 border-[#0091A8] rounded-[3px] py-3 px-5 cursor-pointer h-12"
            @click="handlePreviousPage"
          >
            <span class="font-bold text-[16px] text-[#0091A8]">Previous</span>
          </div>
          <div
            v-for="page in totalPage"
            :key="page"
            class="flex justify-center items-center h-12 w-12 cursor-pointer bg-[#0091A8] rounded-[3px]"
            :class="{ 'bg-[#D3D6D7]': page !== currentPage }"
            @click="handleSelectPage(page)"
          >
            <span class="font-bold text-white" :class="{ 'text-[#2A363E]': page !== currentPage }">
              {{ page }}
            </span>
          </div>
          <div
            v-if="currentPage !== totalPage"
            class="border-2 border-[#0091A8] rounded-[3px] py-3 px-5 cursor-pointer h-12"
            @click="handleNextPage"
          >
            <span class="font-bold text-[16px] text-[#0091A8]">Next</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const config = useRuntimeConfig();
const { $fetchDrberg, $fetchDrbergAzure, $reloadCart } = useNuxtApp();

let fetchBaseLink = undefined

const hostHeader = useRequestHeaders(['host'])

if (typeof window !== 'undefined') {
  fetchBaseLink = window.location.origin
}
// If on server side (either on Layer0 or on local)
else {
  let hostURL = hostHeader.host || process.env.API_URL
  // Caution: Use process.env.API_URL to get benefits on speeding up responses with Layer0 Caching
  // In case the APIs to be fetched is not cached with Layer0 as per routes.ts, it might run into upstream timeouts
  // You have access to req.headers.host when running npm run dev (or 0 dev)
  // You have access to process.env.API_URL on Layer0 env after deployment, regardless of if req header is present
  // This speeds up responses of the API when cached
  if (hostURL) {
    hostURL = hostURL.replace('http://', '')
    hostURL = hostURL.replace('https://', '')
    if (hostURL.includes('localhost:')) {
      fetchBaseLink = `http://${hostURL}`
    } else {
      fetchBaseLink = `https://${hostURL}`
    }
  }
}

fetchBaseLink= `${fetchBaseLink}/api`

// Listing layout
const listingLayout = ref('GRID');

// Filter mobile
const showOptions = ref(false);

// quote id
const quoteId = useQuoteId();
const quoteIdCookie = useCookie('quote_id');

// Route handler
const route = useRoute();
const router = useRouter();

const queryParams = {
  pageSize: 20,
  allowAutoShip: true,
  page: +route.query.page || 1,
};

const filterQueryParams = ['healthConcernIds', 'productTypeIds', 'dietTypeIds']
  .reduce((a, b) => {
    if (!route.query[b]) return a;
    return [...a, ...route.query[b].split(',').map((el) => `${b}=${el}`)];
  }, [])
  .join('&');

const [{ data: productTypesMenu }, { data: healthConcernsMenu }, { data: dietTypesMenu }, { data: productResponse }] =
  await Promise.all([
    $fetchDrbergAzure(`products/product-types`, fetchBaseLink),
    $fetchDrbergAzure(`products/health-concerns`, fetchBaseLink),
    $fetchDrbergAzure(`products/diet-types`, fetchBaseLink),
    $fetchDrbergAzure(
      `products?${new URLSearchParams(queryParams).toString()}${filterQueryParams ? '&' + filterQueryParams : ''}`,
      fetchBaseLink
    ),
  ]);

// Product list handler
const products = ref(productResponse.value.data.map((el) => ({ ...el, isAdding: false })));

const getProductImage = (product) => {
  const baseImageUrl = `${config.public.baseMagentoUrl}/${config.public.baseMagentoProductUrl}`;
  const iamgeUrl = product.thumbnail || product.image || product.small_image;
  return iamgeUrl ? `${baseImageUrl}/${iamgeUrl}` : 'https://i.stack.imgur.com/PS3l5.jpg';
};

// Pagination handler
const totalPage = ref(Math.ceil(productResponse.value.total / productResponse.value.pageSize));
const currentPage = ref(queryParams.page);

watch(currentPage, (current) => {
  const filterParams = filterOptions.reduce((a, b) => {
    const ids = b.children
      .filter((el) => el.checked)
      .map((el) => el.id)
      .join(',');
    if (ids) return { ...a, [b.id]: ids };
    return a;
  }, {});

  router.push({
    path: route.path,
    query: {
      page: current,
      ...filterParams,
    },
  });

  const newQueryParams = {
    ...queryParams,
    page: current,
  };

  const filterQueryParams = ['healthConcernIds', 'productTypeIds', 'dietTypeIds']
    .reduce((a, b) => {
      if (!filterParams[b]) return a;
      return [...a, ...filterParams[b].split(',').map((el) => `${b}=${el}`)];
    }, [])
    .join('&');

  $fetchDrbergAzure(
    `products?${new URLSearchParams(newQueryParams).toString()}${filterQueryParams ? '&' + filterQueryParams : ''}`,
  ).then(({ data: productResponse }) => {
    products.value = productResponse.value.data.map((el) => ({
      ...el,
      isAdding: false,
    }));
    totalPage.value = Math.ceil(productResponse.value.total / productResponse.value.pageSize);
  });
});

const handlePreviousPage = () => {
  if (currentPage.value > 1) currentPage.value--;
};
const handleNextPage = () => {
  if (currentPage.value < totalPage.value) currentPage.value++;
};
const handleSelectPage = (page) => {
  currentPage.value = page;
};

// Filter options handler
const filterOptions = reactive([
  {
    name: 'Health concerns',
    id: 'healthConcernIds',
    showChildren: true,
    children: healthConcernsMenu.value.data.map((el) => ({
      ...el,
      checked: route.query.healthConcernIds
        ? route.query.healthConcernIds.split(',').includes(el.id.toString())
        : false,
    })),
  },
  {
    name: 'Product Type',
    id: 'productTypeIds',
    showChildren: true,
    children: productTypesMenu.value.data.map((el) => ({
      ...el,
      checked: route.query.productTypeIds ? route.query.productTypeIds.split(',').includes(el.id.toString()) : false,
    })),
  },
  {
    name: 'Dietary Restrictions',
    id: 'dietTypeIds',
    showChildren: true,
    children: dietTypesMenu.value.data.map((el) => ({
      ...el,
      checked: route.query.dietTypeIds ? route.query.dietTypeIds.split(',').includes(el.id.toString()) : false,
    })),
  },
]);

const resetFilter = () => {
  filterOptions.forEach((el) => {
    el.children.forEach((ele) => {
      ele.checked = false;
    });
  });
};

watch(filterOptions, async (current) => {
  const filterParams = current.reduce((a, b) => {
    const ids = b.children
      .filter((el) => el.checked)
      .map((el) => el.id)
      .join(',');
    if (ids) return { ...a, [b.id]: ids };
    return a;
  }, {});

  router.push({
    path: route.path,
    query: {
      page: 1,
      ...filterParams,
    },
  });

  if (currentPage.value === 1) {
    const newQueryParams = {
      ...queryParams,
      page: 1,
    };

    const filterQueryParams = ['healthConcernIds', 'productTypeIds', 'dietTypeIds']
      .reduce((a, b) => {
        if (!filterParams[b]) return a;
        return [...a, ...filterParams[b].split(',').map((el) => `${b}=${el}`)];
      }, [])
      .join('&');

    $fetchDrbergAzure(
      `products?${new URLSearchParams(newQueryParams).toString()}${filterQueryParams ? '&' + filterQueryParams : ''}`,
    ).then(({ data: productResponse }) => {
      products.value = productResponse.value.data.map((el) => ({
        ...el,
        isAdding: false,
      }));
      totalPage.value = Math.ceil(productResponse.value.total / productResponse.value.pageSize);
    });
  } else {
    currentPage.value = 1;
  }
});

// Global message handler
const globalMessage = useGlobalMessage();

// Breadcrumbs handler
const breadcrumbs = [
  {
    link: '/',
    label: 'Home',
  },
  {
    label: 'Autoship',
  },
];

// Add to autoship
const addToAutoShip = async (product) => {
  if (quoteIdCookie.value && !quoteId.value) {
    quoteId.value = quoteIdCookie.value;
  } else if (!quoteIdCookie.value && !quoteId.value) {
    const { data } = await $fetchDrberg('carts/mine', {
      method: 'POST',
      key: new Date().getTime(),
    });
    quoteIdCookie.value = data.value;
    quoteId.value = data.value;
  }
  product.isAdding = true;
  const body = {
    cartItem: {
      sku: product.sku,
      qty: 1,
      quoteId: quoteId.value,
    },
  };
  const { error } = await $fetchDrberg('carts/mine/items', {
    body,
    method: 'POST',
    key: new Date().getTime(),
  });
  if (error.value) {
    globalMessage.value.push({
      isError: true,
      message: error.value.data.message,
    });
  } else {
    globalMessage.value.push({
      isError: false,
      message: 'Add to Autoship successfully',
      type: 'add_to_cart',
    });
    $reloadCart();
  }
  product.isAdding = false;
};
</script>
