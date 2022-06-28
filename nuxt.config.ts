import { defineNuxtConfig } from 'nuxt';

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  typescript: {
    shim: false,
  },
  css: ['~/assets/css/tailwind.css'],
  build: {
    postcss: {
      postcssOptions: require('./postcss.config.js'),
    },
  },
  runtimeConfig: {
    public: {
      baseUrl: process.env.BASE_URL || 'http://localhost:3000',
      baseMagentoUrl: process.env.BASE_MAGENTO_URL || 'https://uat.drberg-aws2.com',
      baseRestUrl: process.env.BASE_REST_URL || 'rest/V1',
      baseMagentoProductUrl: process.env.BASE_MAGENTO_PRODUCT_URL || 'media/catalog/product',
      baseDrbergAzureUrl: process.env.BASE_DRBERG_AZURE_URL || '/api',
    },
  },
  modules: ['@vueuse/nuxt'],
});
