export const FAKESTORE_API_BASE_URL = "https://fakestoreapi.com";

export const FAKESTORE_API_ENDPOINTS = {
  PRODUCTS: '/products',
  CATEGORIES: '/products/categories',
  PRODUCTS_BY_CATEGORY: (category: string) => `/products/category/${category}`,
  PRODUCT_BY_ID: (id: number) => `/products/${id}`,
  CART: '/carts',
};