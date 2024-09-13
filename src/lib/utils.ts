import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Converts a category name to a URL-friendly slug.
 * Example: "Men's Clothing" -> "mens-clothing"
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .trim();
}

/**
 * Converts a URL-friendly slug back to a readable category name.
 * Specifically handles apostrophes for category names.
 * Example: "mens-clothing" -> "men's clothing"
 */
export function deslugifyCategory(slug: string): string {
  return slug
    .replace(/-/g, ' ')
    .replace(/(\w)s\s/g, "$1's ");
}
