import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-[#FAFAFA] border-t border-[#E5E5E5] text-[#111111]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-16 grid grid-cols-1 md:grid-cols-12 gap-12">
        <div className="md:col-span-5 space-y-4">
          <p className="font-serif-editorial text-2xl tracking-[0.14em] uppercase">
            ATELIER VANCE
          </p>
          <p className="text-sm text-[#666666] leading-relaxed max-w-md">
            Direct-from-studio flagship viewing room presenting strictly one-of-one original oil and mineral pigment works on linen. Blending Christie&apos;s Private Sales curatorial depth with transparent global acquisition via Shopify Storefront architecture.
          </p>
          <div className="pt-2 flex flex-wrap gap-3 text-[11px] tracking-[0.15em] uppercase text-[#9A7B4F]">
            <span>• 100% Original 1-of-1</span>
            <span>• Open USD Pricing</span>
            <span>• Global Crated Air Freight</span>
          </div>
        </div>

        <div className="md:col-span-3 space-y-3">
          <h3 className="text-xs tracking-[0.2em] uppercase text-[#111111] font-medium">
            Collector Pathways
          </h3>
          <ul className="space-y-2.5 text-sm text-[#666666]">
            <li>
              <Link href="/works?tier=Masterpiece" className="hover:text-[#111111] transition-colors">
                Seasoned Collectors ($10k – $50k+)
              </Link>
            </li>
            <li>
              <Link href="/works?tier=Entry" className="hover:text-[#111111] transition-colors">
                Emerging Collectors ($1k – $7.5k)
              </Link>
            </li>
            <li>
              <Link href="/contact?persona=trade" className="hover:text-[#111111] transition-colors">
                Interior Designers &amp; Architects Trade
              </Link>
            </li>
            <li>
              <Link href="/contact?persona=corporate" className="hover:text-[#111111] transition-colors">
                Corporate &amp; 5-Star Hospitality Curation
              </Link>
            </li>
          </ul>
        </div>

        <div className="md:col-span-4 space-y-3">
          <h3 className="text-xs tracking-[0.2em] uppercase text-[#111111] font-medium">
            Architecture &amp; Provenance Guarantee
          </h3>
          <p className="text-xs text-[#666666] leading-relaxed">
            Every work ships in a custom ISPM-15 certified wooden museum crate accompanied by a physically stamped and artist-signed Certificate of Authenticity (CoA). Inventory is synchronized in real time (Quantity = 1) with encrypted PCI-DSS checkout powered by Shopify.
          </p>
          <div className="pt-3 flex items-center gap-3 text-[11px] uppercase tracking-[0.14em] text-[#111111]">
            <span className="px-2.5 py-1 border border-[#E5E5E5] bg-[#FFFFFF]">USD Checkout</span>
            <span className="px-2.5 py-1 border border-[#E5E5E5] bg-[#FFFFFF]">Apple Pay</span>
            <span className="px-2.5 py-1 border border-[#E5E5E5] bg-[#FFFFFF]">Wire / Draft Invoice</span>
          </div>
        </div>
      </div>

      <div className="border-t border-[#E5E5E5] px-4 sm:px-8 py-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between text-xs text-[#666666] gap-4">
          <p>© {new Date().getFullYear()} Atelier Vance Fine Art Monograph. All Works Strictly 1-of-1.</p>
          <p>Next.js Global Edge Showcase • Shopify Headless GraphQL Engine • Higgsfield Spatial Staging</p>
        </div>
      </div>
    </footer>
  );
}
