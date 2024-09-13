import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { cartService } from "@/services/cart-service";
import { productService } from "@/services/product-service";
import { Cart, CartItem, Product } from "@/types";

interface CartContextType {
  cart: Cart | null;
  products: Record<number, Product>;
  cartItemsCount: number;
  loading: boolean;
  error: string | null;
  addToCart: (productId: number, quantity: number) => Promise<void>;
  updateQuantity: (productId: number, quantity: number) => Promise<void>;
  removeFromCart: (productId: number) => Promise<void>;
  getTotalPrice: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<Cart | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const cartId = 1;

  const fetchCartAndProducts = useCallback(async () => {
    try {
      setLoading(true);
      const fetchedCart = await cartService.getCart(cartId);
      setCart(fetchedCart || { id: 0, cartId, date: new Date().toISOString(), products: [] });

      if (fetchedCart && fetchedCart.products.length > 0) {
        const productIds = fetchedCart.products.map((item) => item.productId);
        const fetchedProducts = await productService.getProductsByIds(productIds);
        setProducts(fetchedProducts);
      } else {
        setProducts([]);
      }

      setError(null);
    } catch (err) {
      setError("Failed to fetch cart and products");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [cartId]);

  useEffect(() => {
    fetchCartAndProducts();
  }, [fetchCartAndProducts]);

  const addToCart = useCallback(
    async (productId: number, quantity: number) => {
      try {
        await cartService.addToCart(cartId, productId, quantity);
        await fetchCartAndProducts();
      } catch (err) {
        setError("Failed to add item to cart");
        console.error(err);
      }
    },
    [cartId, fetchCartAndProducts]
  );

  const updateQuantity = useCallback(
    async (productId: number, quantity: number) => {
      try {
        await cartService.updateCartItem(cartId, productId, quantity);
        await fetchCartAndProducts();
      } catch (err) {
        setError("Failed to update cart item");
        console.error(err);
      }
    },
    [cartId, fetchCartAndProducts]
  );

  const removeFromCart = useCallback(
    async (productId: number) => {
      try {
        await cartService.removeFromCart(cartId, productId);
        await fetchCartAndProducts();
      } catch (err) {
        setError("Failed to remove item from cart");
        console.error(err);
      }
    },
    [cartId, fetchCartAndProducts]
  );

  const getTotalPrice = useCallback(() => {
    if (!cart || !cart.products || !products.length) return 0;
    return cart.products.reduce((total, item) => {
      const product = products.find((p) => p.id === item.productId);
      return product && typeof product.price === "number" ? total + product.price * item.quantity : total;
    }, 0);
  }, [cart, products]);

  const cartItemsCount = cart ? cart.products.reduce((total, item) => total + item.quantity, 0) : 0;

  const value: CartContextType = {
    cart,
    products,
    cartItemsCount,
    loading,
    error,
    addToCart,
    updateQuantity,
    removeFromCart,
    getTotalPrice,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCartContext = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCartContext must be used within a CartProvider");
  }
  return context;
};
