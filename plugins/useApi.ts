interface RequestInterface {
  endpoint: string;
  body: any;
}

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();
  const customerToken = useCookie('customer_token');
  const quoteId = useQuoteId();
  const defaultRequestArgs = {
    body: null,
    method: 'GET',
    contentType: 'application/json',
    key: null,
  };

  return {
    provide: {
      fetchDrberg: (
        endpoint,
        { body = null, method = 'GET', contentType = 'application/json', key } = defaultRequestArgs,
        useToken = true,
      ) => {
        const newEndpoint = endpoint.replace(/^carts\/mine/, (point) =>
          customerToken.value ? point : `guest-carts/${quoteId.value || ''}`,
        );
        return useFetch(`${config.public.baseMagentoUrl}/${config.public.baseRestUrl}/${newEndpoint}`, {
          headers: {
            ...(useToken && customerToken.value ? { Authorization: `Bearer ${customerToken.value}` } : {}),
            'Content-Type': contentType,
          },
          body,
          method,
          ...(key ? { key } : {}),
        });
      },
      fetchDrbergAzure(
        endpoint,
        fetchBaseLink,
        { body = null, method = 'GET', contentType = 'application/json' } = defaultRequestArgs,
      ) {
        return useFetch(`${fetchBaseLink || config.public.baseDrbergAzureUrl}/${endpoint}`, {
          headers: {
            'Content-Type': contentType,
          },
          body,
          method,
        });
      },
      fetchDrberg1: (
        endpoint,
        { body = null, method = 'GET', contentType = 'application/json', key } = defaultRequestArgs,
        useToken = true,
      ) => {
        const newEndpoint = endpoint.replace(/^carts\/mine/, (point) =>
          customerToken.value ? point : `guest-carts/${quoteId.value || ''}`,
        );
        const endpoinTotal = endpoint.replace(/^carts\/mine\/items/, (point) =>
          customerToken.value ? point : `guest-carts/${quoteId.value || ''}`,
        );
        return Promise.all([
          useFetch(`${config.public.baseMagentoUrl}/${config.public.baseRestUrl}/${newEndpoint}`, {
            headers: {
              ...(useToken && customerToken.value ? { Authorization: `Bearer ${customerToken.value}` } : {}),
              'Content-Type': contentType,
            },
            body,
            method,
            ...(key ? { key } : {}),
          }),
          useFetch(`${config.public.baseMagentoUrl}/${config.public.baseRestUrl}/${endpoinTotal}/totals`, {
            method: 'GET',
            ...(key ? { key } : {}),
          }),
        ]);
      },
    },
  };
});
