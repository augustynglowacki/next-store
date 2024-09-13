"use client";

import { Product } from "@/types";
import { useCartContext } from "@/contexts/cart-context";
import { useState } from "react";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isAdding, setIsAdding] = useState(false);
  const { addToCart } = useCartContext();

  const handleAddToCart = async () => {
    setIsAdding(true);
    await addToCart(product.id, 1);
    setIsAdding(false);
  };

  return (
    <div className="bg-white shadow-sm rounded-lg p-4 transition-shadow hover:shadow-md min-h-full flex flex-col">
      <img src={product.image} alt={product.title} className="w-full h-48 object-contain mb-4" />
      <h2 className="text-lg font-semibold mb-2 text-foreground">{product.title}</h2>
      <p className="text-primary font-medium mb-4">${product.price.toFixed(2)}</p>
      <button
        onClick={handleAddToCart}
        className="w-full bg-primary text-white self-end mt-auto px-4 py-2 rounded hover:bg-primary/90 disabled:bg-primary/50 transition-colors"
        disabled={isAdding}
      >
        {isAdding ? "Adding..." : "Add to Cart"}
      </button>
    </div>
  );
}
