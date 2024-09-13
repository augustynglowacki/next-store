export interface CartService {
  getCart(cartId: number): Promise<Cart>;
  addToCart(cartId: number, productId: number, quantity: number): Promise<Cart>;
  updateCartItem(cartId: number, productId: number, quantity: number): Promise<Cart>;
  removeFromCart(cartId: number, productId: number): Promise<Cart>;
}

export interface ProductService {
  getProducts(): Promise<Product[]>;
  getCategories(): Promise<Category[]>;
  getProductsByCategory(categorySlug: string): Promise<Product[]>;
  getProductsByIds(productIds: number[]): Promise<Product[]>;
}

export interface StoreService {
  cartService: CartService;
  productService: ProductService;
}

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

export interface Category {
  name: string;
  slug: string;
}

export interface CartItem {
  productId: number;
  quantity: number;
}

export interface Cart {
  id: number;
  cartId: number;
  date: string;
  products: CartItem[];
}
