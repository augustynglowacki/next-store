import { NextResponse } from 'next/server';
import { createFakestoreApiAdapter } from "@/base/api/fakestore-api/adapter";

const apiAdapter = createFakestoreApiAdapter();

export async function GET() {
  try {
    const categories = await apiAdapter.productService.getCategories();
    return NextResponse.json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 });
  }
}