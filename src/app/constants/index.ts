export const API_BASE_URL = typeof window !== 'undefined' 
  ? `${window.location.origin}/api`
  : `http://localhost:${process.env.PORT || 3000}/api`;

export const API_ENDPOINTS = {
  PRODUCTS: '/products',
  CATEGORIES: '/categories',
  PRODUCTS_BY_CATEGORY: (category: string) => `/products/category/${category}`,
  PRODUCT_BY_ID: (id: number) => `/products/id/${id}`,
  CART: '/cart',
};