import { NextResponse } from 'next/server';
import { createFakestoreApiAdapter } from "@/base/api/fakestore-api/adapter";

const apiAdapter = createFakestoreApiAdapter();

export async function GET() {
  try {
    const products = await apiAdapter.productService.getProducts();
    return NextResponse.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}