"use client";

import { useCartContext } from "@/contexts/cart-context";

export default function CartPage() {
  const { cart, products, loading, error, updateQuantity, removeFromCart, getTotalPrice } = useCartContext();

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (error) return <div className="text-center py-8 text-red-500">Error: {error}</div>;
  if (!cart) return <div className="text-center py-8">No cart found</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-foreground">Shopping Cart</h1>
      {cart.products.length === 0 ? (
        <p className="text-center text-gray-500">Your cart is empty.</p>
      ) : (
        <>
          <ul className="space-y-4">
            {cart.products.map((item) => {
              const product = Object.values(products).find((p) => p.id === item.productId);
              return (
                <li key={item.productId} className="flex items-center bg-white shadow-sm rounded-lg p-4">
                  {product ? (
                    <>
                      <img src={product.image} alt={product.title} className="h-24 w-24 object-contain mr-4" />
                      <div className="flex-1">
                        <h2 className="text-lg font-semibold text-foreground">{product.title}</h2>
                        <p className="text-primary font-medium">${typeof product.price === "number" ? product.price.toFixed(2) : "N/A"}</p>
                        <div className="flex items-center mt-2">
                          <button
                            onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                            className="bg-secondary text-foreground px-2 py-1 rounded"
                          >
                            -
                          </button>
                          <span className="mx-2 text-foreground">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                            className="bg-secondary text-foreground px-2 py-1 rounded"
                          >
                            +
                          </button>
                          <button onClick={() => removeFromCart(item.productId)} className="ml-4 text-red-500 hover:text-red-700">
                            Remove
                          </button>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="text-gray-500">Product not found</div>
                  )}
                </li>
              );
            })}
          </ul>
          <div className="mt-8 text-right">
            <p className="text-xl font-semibold text-foreground">
              Total: <span className="text-primary">${getTotalPrice().toFixed(2)}</span>
            </p>
          </div>
        </>
      )}
    </div>
  );
}
