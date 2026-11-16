import { ARTWORKS, Artwork } from './artworks';

const SHOPIFY_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || '';
const SHOPIFY_TOKEN = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN || '';

export function isShopifyConfigured(): boolean {
  return Boolean(
    SHOPIFY_DOMAIN &&
      SHOPIFY_TOKEN &&
      !SHOPIFY_DOMAIN.includes('your-gallery-store') &&
      !SHOPIFY_TOKEN.includes('your-shopify-storefront')
  );
}

/**
 * Executes a GraphQL request against the Shopify Storefront API (Single Source of Truth).
 */
async function shopifyFetch<T>(query: string, variables: Record<string, unknown> = {}): Promise<T> {
  const endpoint = `https://${SHOPIFY_DOMAIN}/api/2025-01/graphql.json`;
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': SHOPIFY_TOKEN,
    },
    body: JSON.stringify({ query, variables }),
    next: { revalidate: 30 },
  });

  if (!response.ok) {
    throw new Error(`Shopify Storefront API error: ${response.status} ${response.statusText}`);
  }

  const json = await response.json();
  if (json.errors) {
    throw new Error(json.errors.map((e: { message: string }) => e.message).join(', '));
  }
  return json.data as T;
}

/**
 * Fetches all 1-of-1 artworks, syncing inventory availability (quantity === 1 vs 0 -> "Acquired")
 * from Shopify Storefront GraphQL API when configured, or falling back seamlessly to the studio catalog.
 */
export async function getCatalogArtworks(): Promise<Artwork[]> {
  if (!isShopifyConfigured()) {
    return ARTWORKS;
  }

  try {
    const query = `
      query GetArtworks($first: Int!) {
        products(first: $first) {
          edges {
            node {
              id
              handle
              title
              availableForSale
              totalInventory
              priceRange {
                minVariantPrice {
                  amount
                  currencyCode
                }
              }
              variants(first: 1) {
                edges {
                  node {
                    id
                    availableForSale
                  }
                }
              }
            }
          }
        }
      }
    `;

    interface ShopifyProductsQuery {
      products: {
        edges: Array<{
          node: {
            id: string;
            handle: string;
            availableForSale: boolean;
            totalInventory: number;
            priceRange: { minVariantPrice: { amount: string } };
            variants: { edges: Array<{ node: { id: string; availableForSale: boolean } }> };
          };
        }>;
      };
    }

    const data = await shopifyFetch<ShopifyProductsQuery>(query, { first: 50 });
    const shopifyMap = new Map(
      data.products.edges.map((edge) => [edge.node.handle, edge.node])
    );

    return ARTWORKS.map((art) => {
      const remote = shopifyMap.get(art.slug);
      if (!remote) return art;
      const isSold = !remote.availableForSale || remote.totalInventory <= 0;
      return {
        ...art,
        shopifyProductId: remote.id,
        shopifyVariantId: remote.variants.edges[0]?.node.id || art.shopifyVariantId,
        priceUsd: Number(remote.priceRange.minVariantPrice.amount) || art.priceUsd,
        status: isSold ? 'Acquired' : 'Available',
      };
    });
  } catch {
    return ARTWORKS;
  }
}

export async function getArtworkBySlug(slug: string): Promise<Artwork | undefined> {
  const all = await getCatalogArtworks();
  return all.find((item) => item.slug === slug);
}

/**
 * Creates a 1-of-1 Cart & Checkout session via Shopify Storefront GraphQL API `cartCreate`.
 * When running in local preview without credentials, returns an interactive simulated Shopify Checkout URL.
 */
export async function createOneOfOneCheckout(artwork: Artwork): Promise<{
  checkoutUrl: string;
  mode: 'live-shopify' | 'simulated-shopify';
  cartId: string;
}> {
  if (isShopifyConfigured()) {
    const mutation = `
      mutation CreateOneOfOneCart($variantId: ID!) {
        cartCreate(
          input: {
            lines: [{ quantity: 1, merchandiseId: $variantId }]
            attributes: [
              { key: "Edition_Policy", value: "Strict 1-of-1 Original Artwork" }
              { key: "Certificate_of_Authenticity", value: "Included & Signed by Artist" }
              { key: "Logistics", value: "Museum-Grade Wooden Crating" }
            ]
          }
        ) {
          cart {
            id
            checkoutUrl
          }
          userErrors {
            field
            message
          }
        }
      }
    `;

    interface CartCreateResponse {
      cartCreate: {
        cart: { id: string; checkoutUrl: string } | null;
        userErrors: Array<{ field: string[]; message: string }>;
      };
    }

    const data = await shopifyFetch<CartCreateResponse>(mutation, {
      variantId: artwork.shopifyVariantId,
    });

    if (data.cartCreate.cart?.checkoutUrl) {
      return {
        checkoutUrl: data.cartCreate.cart.checkoutUrl,
        mode: 'live-shopify',
        cartId: data.cartCreate.cart.id,
      };
    }
  }

  return {
    checkoutUrl: `/checkout/${artwork.slug}`,
    mode: 'simulated-shopify',
    cartId: `gid://shopify/Cart/sim-${artwork.id}-${Date.now()}`,
  };
}
