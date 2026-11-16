import { NextResponse } from 'next/server';
import { getArtworkBySlug, createOneOfOneCheckout } from '@/lib/shopify';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { slug } = body as { slug?: string };

    if (!slug) {
      return NextResponse.json({ error: 'Missing artwork slug' }, { status: 400 });
    }

    const artwork = await getArtworkBySlug(slug);
    if (!artwork) {
      return NextResponse.json({ error: 'Artwork not found' }, { status: 404 });
    }

    if (artwork.status !== 'Available') {
      return NextResponse.json(
        { error: 'This 1-of-1 artwork has already been acquired.' },
        { status: 409 }
      );
    }

    const session = await createOneOfOneCheckout(artwork);
    return NextResponse.json(session);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Checkout initialization failed' },
      { status: 500 }
    );
  }
}
