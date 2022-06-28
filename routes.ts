import { Router } from '@layer0/core';
import { nuxtRoutes } from '@layer0/nuxt-nitro';

const routesToCache: any = [
  {
    cacheType: {
      edge: {
        maxAgeSeconds: 60 * 60 * 24, // keep entries in the cache for 24 hours
        staleWhileRevalidateSeconds: 60 * 60, // when a cached page is older than 24 hours, serve it one more time
        // for up to 60 minutes while fetching a new version from the origin
      },
      browser: false,
    },
    routesThatShouldFollowThisCache: [
      '/api/products',
      '/api/products/product-types',
      '/api/products/health-concerns',
      '/api/products/diet-types',
    ],
    proxyingTo: 'products_dev',
    removeHeadersFromOrigin: ['set-cookie']
  },
  {
    cacheType: {
      edge: false,
      browser: false,
    },
    routesThatShouldFollowThisCache: ['/api/:path*'],
    proxyingTo: 'products_dev',
  },
  {
    cacheType: {
      edge: {
        maxAgeSeconds: 60 * 60,
        staleWhileRevalidateSeconds: 60 * 60,
      },
    },
    routesThatShouldFollowThisCache: ['/category/all-products'],
  },
];

const router = new Router();

routesToCache.forEach((i) => {
  i.routesThatShouldFollowThisCache.forEach((route) => {
    router.match(route, ({ cache, proxy, removeUpstreamResponseHeader }) => {
      if (i?.removeHeadersFromOrigin) {
          i.removeHeadersFromOrigin.forEach((headerToRemove) => {
            removeUpstreamResponseHeader(headerToRemove) 
          })
      }
      cache(i.cacheType);
      if (i?.proxyingTo) {
        // Falls back to Nuxt if proxy is not set
        proxy(i.proxyingTo);
      }
    });
  });
});

router.get('/category/autoship', ({ cache }) => { cache({ browser: false, edge: { maxAgeSeconds: 60 * 60 } }) })

router.use(nuxtRoutes);

export default router;
