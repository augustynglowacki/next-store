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
          <ul className="flex space-x-4 items-center">
            <li>
              <Link href="/" className="text-foreground hover:text-primary transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link href="/cart" className="text-foreground hover:text-primary transition-colors flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <span>Cart ({cartItemsCount})</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
