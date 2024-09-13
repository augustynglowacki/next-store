import { NextResponse } from 'next/server';
import { createFakestoreApiAdapter } from "@/base/api/fakestore-api/adapter";

const apiAdapter = createFakestoreApiAdapter();

export async function GET(
  request: Request,
  { params }: { params: { category: string } }
) {
  const category = params.category;
  try {
    const products = await apiAdapter.productService.getProductsByCategory(category);
    return NextResponse.json(products);
  } catch (error) {
    console.error(`Error fetching products for category ${category}:`, error);
    return NextResponse.json({ error: `Failed to fetch products for category: ${category}` }, { status: 500 });
  }
}