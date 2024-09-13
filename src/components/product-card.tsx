"use client";

import { Product } from "@/types";
import { useCartContext } from "@/contexts/cart-context";
import { useState } from "react";
import ImageWithPlaceholder from "./image-with-placeholder";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { addToCart } = useCartContext();

  const handleAddToCart = async () => {
    setIsAdding(true);
    await addToCart(product.id, 1);
    setIsAdding(false);
  };

  return (
    <div
      className={`bg-white shadow-sm rounded-lg p-4 transition-all duration-300 hover:shadow-md min-h-full flex flex-col ${
        isLoading ? "opacity-50" : "opacity-100"
      }`}
      onLoad={() => setIsLoading(false)}
    >
      <ImageWithPlaceholder
        src={product.image}
        alt={product.title}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        aspectRatio={1}
      />
      {isLoading ? (
        <>
          <div className="h-6 bg-gray-200 rounded w-3/4 mt-4 mb-2 animate-pulse" />
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-4 animate-pulse" />
        </>
      ) : (
        <>
          <h2 className="text-lg font-semibold mb-2 text-foreground mt-4">{product.title}</h2>
          <p className="text-primary font-medium mb-4">${product.price.toFixed(2)}</p>
        </>
      )}
      <button
        onClick={handleAddToCart}
        className="w-full bg-primary text-white self-end mt-auto px-4 py-2 rounded hover:bg-primary/90 disabled:bg-primary/50 transition-colors"
        disabled={isAdding || isLoading}
      >
        {isAdding ? "Adding..." : "Add to Cart"}
      </button>
    </div>
  );
}
