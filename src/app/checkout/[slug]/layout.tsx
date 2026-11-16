import { ARTWORKS } from '@/lib/artworks';

export function generateStaticParams() {
  return ARTWORKS.map((art) => ({ slug: art.slug }));
}

export default function CheckoutSlugLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
