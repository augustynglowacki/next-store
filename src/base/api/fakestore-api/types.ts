import { Cart, CartItem, Category, Product } from "@/types";

export interface FakestoreApiCartService {
  getCart(cartId: number): Promise<Cart>;
  addToCart(cartId: number, cartItem: CartItem): Promise<Cart>;
  updateCartItem(cartId: number, cartItem: CartItem): Promise<Cart>;
  removeFromCart(cartId: number, productId: number): Promise<Cart>;
}

export interface FakestoreApiProductService {
  getProducts(): Promise<Product[]>;
  getCategories(): Promise<Category[]>;
  getProductsByCategory(categorySlug: string): Promise<Product[]>;
  getProductsByIds(productIds: number[]): Promise<Product[]>;
}


export interface FakestoreApiService {
  getProducts(): Promise<FakestoreApiProduct[]>;
  getCategories(): Promise<FakestoreApiCategory[]>;
  getProductsByCategory(category: FakestoreApiCategory): Promise<FakestoreApiProduct[]>;
  getProductById(productId: number): Promise<FakestoreApiProduct>;
  getCart(cartId: number): Promise<FakestoreApiCart>;
  addToCart(cartId: number, products: CartItem[]): Promise<FakestoreApiCart>;
  updateCart(cartId: number, products: CartItem[]): Promise<FakestoreApiCart>;
  removeFromCart(cartId: number, productId: number): Promise<FakestoreApiCart>;
}

export interface FakestoreApiProduct extends Product {}

export type FakestoreApiCategory = string;

export interface FakestoreApiCart extends Cart {}
