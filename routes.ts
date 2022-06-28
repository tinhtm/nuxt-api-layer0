import { Router } from '@layer0/core'
import { nuxtRoutes } from '@layer0/nuxt-nitro'

export default new Router()
.get('/category/all-products', ({ cache }) => {
    cache({
      edge: { maxAgeSeconds: 60 * 60, staleWhileRevalidateSeconds: 60 * 60 },
    })    
})
.get('/api/products', ({ cache, proxy }) => {
    cache({
        edge: {
            maxAgeSeconds: 60 * 60 * 24,           // keep entries in the cache for 24 hours
            staleWhileRevalidateSeconds: 60 * 60  // when a cached page is older than 24 hours, serve it one more time
            // for up to 60 minutes while fetching a new version from the origin
        }
    })
    proxy('products_dev',{ path: '/api/products' })
})
.get('/api/products/product-types', ({ cache, proxy }) => {
    cache({
        edge: {
            maxAgeSeconds: 60 * 60 * 24,           // keep entries in the cache for 24 hours
            staleWhileRevalidateSeconds: 60 * 60  // when a cached page is older than 24 hours, serve it one more time
            // for up to 60 minutes while fetching a new version from the origin
        }
    })
    proxy('products_dev')
})
.get('/api/products/health-concerns', ({ cache, proxy }) => {
    cache({
        edge: {
            maxAgeSeconds: 60 * 60 * 24,           // keep entries in the cache for 24 hours
            staleWhileRevalidateSeconds: 60 * 60  // when a cached page is older than 24 hours, serve it one more time
            // for up to 60 minutes while fetching a new version from the origin
        }
    })
    proxy('products_dev')
})
.get('/api/products/diet-types', ({ cache, proxy }) => {
    cache({
        edge: {
            maxAgeSeconds: 60 * 60 * 24,           // keep entries in the cache for 24 hours
            staleWhileRevalidateSeconds: 60 * 60  // when a cached page is older than 24 hours, serve it one more time
            // for up to 60 minutes while fetching a new version from the origin
        }
    })
    proxy('products_dev')
})
.use(nuxtRoutes)