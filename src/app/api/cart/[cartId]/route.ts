import { NextResponse } from 'next/server';
import { createFakestoreApiAdapter } from "@/base/api/fakestore-api/adapter";

const apiAdapter = createFakestoreApiAdapter();

export async function GET(
  request: Request,
  { params }: { params: { cartId: string } }
) {
  const cartId = params.cartId;

  if (!cartId) {
    return NextResponse.json({ error: 'Cart ID is required' }, { status: 400 });
  }

  try {
    const cart = await apiAdapter.getCart(Number(cartId));
    return NextResponse.json(cart);
  } catch (error) {
    console.error('Error fetching cart:', error);
    return NextResponse.json({ error: 'Failed to fetch cart' }, { status: 500 });
  }
}

export async function POST(
  request: Request,
  { params }: { params: { cartId: string } }
) {
  const cartId = params.cartId;
  const { productId, quantity } = await request.json();

  if (!cartId || !productId || quantity === undefined) {
    return NextResponse.json({ error: 'Cart ID, product ID, and quantity are required' }, { status: 400 });
  }

  try {
    const cart = await apiAdapter.cartService.addToCart(Number(cartId), productId, quantity);
    return NextResponse.json(cart);
  } catch (error) {
    console.error('Error adding to cart:', error);
    return NextResponse.json({ error: 'Failed to add to cart' }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { cartId: string } }
) {
  const cartId = params.cartId;
  const { productId, quantity } = await request.json();

  if (!cartId || !productId || quantity === undefined) {
    return NextResponse.json({ error: 'Cart ID, product ID, and quantity are required' }, { status: 400 });
  }

  try {
    const cart = await apiAdapter.cartService.updateCartItem(Number(cartId), productId, quantity);
    return NextResponse.json(cart);
  } catch (error) {
    console.error('Error updating cart:', error);
    return NextResponse.json({ error: 'Failed to update cart' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { cartId: string } }
) {
  const cartId = params.cartId;
  const { productId } = await request.json();

  if (!cartId || !productId) {
    return NextResponse.json({ error: 'Cart ID and product ID are required' }, { status: 400 });
  }

  try {
    const cart = await apiAdapter.removeFromCart(Number(cartId), productId);
    return NextResponse.json(cart);
  } catch (error) {
    console.error('Error removing from cart:', error);
    return NextResponse.json({ error: 'Failed to remove from cart' }, { status: 500 });
  }
}