import { Cart, Category, Product } from "@/types";
import { FakestoreApiCategory, FakestoreApiProduct, FakestoreApiService } from "@/base/api/fakestore-api/types";
import { apiService } from "@/base/api/fakestore-api/service";
import { StoreService, CartService, ProductService } from "@/types";
import { slugify } from "@/lib/utils";

export class FakestoreApiAdapter implements StoreService {
  cartService: CartService;
  productService: ProductService;

  constructor(private apiService: FakestoreApiService) {
    this.cartService = {
      getCart: this.getCart.bind(this),
      addToCart: this.addToCart.bind(this),
      updateCartItem: this.updateCartItem.bind(this),
      removeFromCart: this.removeFromCart.bind(this),
    };

    this.productService = {
      getProducts: this.getProducts.bind(this),
      getCategories: this.getCategories.bind(this),
      getProductsByCategory: this.getProductsByCategory.bind(this),
      getProductsByIds: this.getProductsByIds.bind(this),
    };
  }

  private mapProduct(product: FakestoreApiProduct): Product {
    return {
      id: product.id,
      title: product.title,
      price: product.price,
      category: product.category,
      description: product.description,
      image: product.image,
    };
  }

  private mapCategory(category: FakestoreApiCategory): Category {
    return {
      name: category,
      slug: slugify(category),
    };
  }

  async getProducts(): Promise<Product[]> {
    const products = await this.apiService.getProducts();
    return products.map(this.mapProduct);
  }

  async getProductById(productId: number): Promise<Product> {
    const product = await this.apiService.getProductById(productId);
    return this.mapProduct(product);
  }

  async getCategories(): Promise<Category[]> {
    const categories = await this.apiService.getCategories();
    return categories.map(this.mapCategory);
  }

  async getProductsByCategory(category: string): Promise<Product[]> {
    const products = await this.apiService.getProductsByCategory(category);
    return products.map(this.mapProduct);
  }

  async getProductsByIds(productIds: number[]): Promise<Product[]> {
    const products = await Promise.all(productIds.map(id => this.getProductById(id)));
    return products;
  }

  async getCart(cartId: number): Promise<Cart> {
    const apiCart = await this.apiService.getCart(cartId);
    return apiCart as Cart;
  }
  
  async addToCart(cartId: number, productId: number, quantity: number): Promise<Cart> {
    const apiCart = await this.apiService.addToCart(cartId, [{ productId, quantity }]);
    return apiCart as Cart;
  }
  
  async updateCartItem(cartId: number, productId: number, quantity: number): Promise<Cart> {
    const apiCart = await this.apiService.updateCart(cartId, [{ productId, quantity }]);
    return apiCart as Cart;
  }
  
  async removeFromCart(cartId: number, productId: number): Promise<Cart> {
    const apiCart = await this.apiService.removeFromCart(cartId, productId);
    return apiCart as Cart;
  }
}

export function createFakestoreApiAdapter(): FakestoreApiAdapter {
  return new FakestoreApiAdapter(apiService);
}