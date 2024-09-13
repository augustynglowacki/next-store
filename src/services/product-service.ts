import { Category, Product } from "@/types";
import { API_BASE_URL, API_ENDPOINTS } from "@/app/constants";
import { deslugifyCategory } from "@/lib/utils";

export class ProductService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = API_BASE_URL;
  }

  async getProducts(): Promise<Product[]> {
    const response = await fetch(`${this.baseUrl}${API_ENDPOINTS.PRODUCTS}`);
    if (!response.ok) throw new Error("Failed to fetch products");
    return response.json();
  }

  async getCategories(): Promise<Category[]> {
    const response = await fetch(`${this.baseUrl}${API_ENDPOINTS.CATEGORIES}`);
    if (!response.ok) throw new Error("Failed to fetch categories");
    const categories: Category[] = await response.json();
    return categories;
  }

  async getProductsByCategory(categorySlug: string): Promise<Product[]> {
    const category = deslugifyCategory(categorySlug);
    const response = await fetch(`${this.baseUrl}${API_ENDPOINTS.PRODUCTS_BY_CATEGORY(encodeURIComponent(category))}`);
    if (!response.ok) throw new Error(`Failed to fetch products for category: ${category}`);
    return response.json();
  }

  async getProductsByIds(productIds: number[]): Promise<Product[]> {
    const promises = productIds.map((id) => fetch(`${this.baseUrl}${API_ENDPOINTS.PRODUCT_BY_ID(id)}`).then((res) => res.json()));
    const products = await Promise.all(promises);
    return products.flat();
  }
}

export const productService = new ProductService();
