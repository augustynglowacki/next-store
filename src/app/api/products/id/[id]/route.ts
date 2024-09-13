import { NextResponse } from 'next/server';
import { createFakestoreApiAdapter } from "@/base/api/fakestore-api/adapter";

const apiAdapter = createFakestoreApiAdapter();

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  try {
    const product = await apiAdapter.productService.getProductsByIds([Number(id)]);
    return NextResponse.json(product);
  } catch (error) {
    console.error(`Error fetching product with id ${id}:`, error);
    return NextResponse.json({ error: `Failed to fetch product with id: ${id}` }, { status: 500 });
  }
}