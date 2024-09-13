"use client";

import Link from "next/link";
import { useCartContext } from "@/contexts/cart-context";

export default function Header() {
  const { cartItemsCount } = useCartContext();

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-primary">
          Next Store
        </Link>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link href="/" className="text-foreground hover:text-primary transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link href="/cart" className="text-foreground hover:text-primary transition-colors">
                Cart ({cartItemsCount})
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
