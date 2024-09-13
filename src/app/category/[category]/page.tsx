import { productService } from "@/services/product-service";
import ProductCard from "@/components/product-card";

export default async function CategoryPage({ params }: { params: { category: string } }) {
  const products = await productService.getProductsByCategory(params.category);
  const categories = await productService.getCategories();
  const categoryName = categories.find((c) => c.slug === params.category)?.name || params.category;

  return (
    <div className="space-y-8">
      <header className="text-center">
        <h1 className="text-4xl font-bold text-foreground mb-2 capitalize">{categoryName}</h1>
        <p className="text-lg text-gray-600">
          Explore our collection of {products.length} {categoryName} products
        </p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {products.length === 0 && <p className="text-center text-gray-500 mt-8">No products found in this category.</p>}
    </div>
  );
}
