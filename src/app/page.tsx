import Link from "next/link";
import { productService } from "@/services/product-service";
import { deslugifyCategory } from "@/lib/utils";

export default async function Home() {
  const categories = await productService.getCategories();

  return (
    <div className="space-y-8">
      <header className="text-center">
        <h1 className="text-4xl font-bold text-foreground mb-2">Welcome to Next Store</h1>
        <p className="text-xl text-gray-600">Explore our product categories</p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categories.map((category) => (
          <Link
            key={category.slug}
            href={`/category/${category.slug}`}
            className="group bg-white shadow-sm rounded-lg p-6 hover:shadow-md transition-shadow duration-300 ease-in-out"
          >
            <div className="text-center">
              <h2 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors duration-300 ease-in-out capitalize">
                {deslugifyCategory(category.slug)}
              </h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
