export const useGlobalMessage = () => useState('globalMessage', () => []);

export const useGlobalCart = () => useState('globalCart', () => []);

export const useGlobalCartTotal = () => useState('globalCartTotal', () => {});

export const useCustomerToken = () => useState('customerToken', () => null);

export const useQuoteId = () => useState('quoteId', () => null);

export const useGlobalNotification = () => useState('globalNotification', () => []);
