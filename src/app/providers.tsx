"use client";

import { CartProvider } from "@/contexts/cart-context";

export function Providers({ children }: { children: React.ReactNode }) {
  return <CartProvider>{children}</CartProvider>;
}
