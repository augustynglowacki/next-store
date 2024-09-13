import { FAKESTORE_API_BASE_URL, FAKESTORE_API_ENDPOINTS } from "@/base/api/fakestore-api/constants";
import { FakestoreApiCart, FakestoreApiCategory, FakestoreApiProduct, FakestoreApiService } from "@/base/api/fakestore-api/types";
import { CartItem } from "@/types";

class FakeStoreApiService implements FakestoreApiService {
  private baseUrl = FAKESTORE_API_BASE_URL;

  async getProducts(): Promise<FakestoreApiProduct[]> {
    const response = await fetch(`${this.baseUrl}${FAKESTORE_API_ENDPOINTS.PRODUCTS}`);
    if (!response.ok) throw new Error("Failed to fetch products");
    return response.json();
  }

  async getCategories(): Promise<FakestoreApiCategory[]> {
    const response = await fetch(`${this.baseUrl}${FAKESTORE_API_ENDPOINTS.CATEGORIES}`);
    if (!response.ok) throw new Error("Failed to fetch categories");
    return response.json();
  }

  async getProductsByCategory(category: FakestoreApiCategory): Promise<FakestoreApiProduct[]> {
    const response = await fetch(`${this.baseUrl}${FAKESTORE_API_ENDPOINTS.PRODUCTS_BY_CATEGORY(category)}`);
    if (!response.ok) throw new Error(`Failed to fetch products for category: ${category}`);
    return response.json();
  }

  async getProductById(productId: number): Promise<FakestoreApiProduct> {
    const response = await fetch(`${this.baseUrl}${FAKESTORE_API_ENDPOINTS.PRODUCT_BY_ID(productId)}`);
    if (!response.ok) throw new Error(`Failed to fetch product with id: ${productId}`);
    return response.json();
  }

  async getCart(cartId: number): Promise<FakestoreApiCart> {
    const response = await fetch(`${this.baseUrl}${FAKESTORE_API_ENDPOINTS.CART}/${cartId}`);
    if (!response.ok) throw new Error("Failed to fetch cart");
    return response.json();
  }
  
  async addToCart(cartId: number, products: CartItem[]): Promise<FakestoreApiCart> {
    const response = await fetch(`${this.baseUrl}${FAKESTORE_API_ENDPOINTS.CART}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ cartId, products }),
    });
    if (!response.ok) throw new Error("Failed to add item to cart");
    return response.json();
  }
  
  async updateCart(cartId: number, products: CartItem[]): Promise<FakestoreApiCart> {
    const response = await fetch(`${this.baseUrl}${FAKESTORE_API_ENDPOINTS.CART}/${cartId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ cartId, products }),
    });
    if (!response.ok) throw new Error("Failed to update cart");
    return response.json();
  }
  
  async removeFromCart(cartId: number, productId: number): Promise<FakestoreApiCart> {
    const response = await fetch(`${this.baseUrl}${FAKESTORE_API_ENDPOINTS.CART}/${cartId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ cartId, productId }),
    });
    if (!response.ok) throw new Error("Failed to remove item from cart");
    return response.json();
  }
}

export const apiService = new FakeStoreApiService();
