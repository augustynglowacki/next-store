import { Cart } from "@/types";
import { API_BASE_URL, API_ENDPOINTS } from "@/app/constants";

export class CartService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = API_BASE_URL;
  }

  async getCart(cartId: number): Promise<Cart> {
    const response = await fetch(`${this.baseUrl}${API_ENDPOINTS.CART}/${cartId}`);
    if (!response.ok) throw new Error("Failed to fetch cart");
    return response.json();
  }
  
  async addToCart(cartId: number, productId: number, quantity: number): Promise<Cart> {
    const response = await fetch(`${this.baseUrl}${API_ENDPOINTS.CART}/${cartId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        cartId,
        productId,
        quantity
      }),
    });
    if (!response.ok) throw new Error("Failed to add item to cart");
    return response.json();
  }
  
  async updateCartItem(cartId: number, productId: number, quantity: number): Promise<Cart> {
    const response = await fetch(`${this.baseUrl}${API_ENDPOINTS.CART}/${cartId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        productId,
        quantity
      }),
    });
    if (!response.ok) throw new Error("Failed to update cart item");
    return response.json();
  }
  
  async removeFromCart(cartId: number, productId: number): Promise<Cart> {
    const response = await fetch(`${this.baseUrl}${API_ENDPOINTS.CART}/${cartId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        productId
      }),
    });
    if (!response.ok) throw new Error("Failed to remove item from cart");
    return response.json();
  }
}

export const cartService = new CartService();