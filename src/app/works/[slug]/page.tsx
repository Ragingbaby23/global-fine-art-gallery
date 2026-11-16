import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getArtworkBySlug, getCatalogArtworks } from '@/lib/shopify';
import { formatUsd } from '@/lib/artworks';
import { ArtworkInteractiveViewer } from '@/components/ArtworkInteractiveViewer';
import {
  ArrowLeft,
  ShieldCheck,
  PackageCheck,
  Sparkles,
  Lock,
  FileText,
  ArrowUpRight,
} from 'lucide-react';

export async function generateStaticParams() {
  const artworks = await getCatalogArtworks();
  return artworks.map((art) => ({ slug: art.slug }));
}

export default async function ArtworkDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const artwork = await getArtworkBySlug(slug);

  if (!artwork) {
    notFound();
  }

  const isAvailable = artwork.status === 'Available';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 space-y-16">
      {/* Breadcrumb */}
      <div className="flex items-center justify-between border-b border-[#E5E5E5] pb-4">
        <Link
          href="/works"
          className="inline-flex items-center gap-2 text-xs tracking-[0.16em] uppercase text-[#666666] hover:text-[#111111]"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to Viewing Room</span>
        </Link>
        <span className="text-xs font-mono text-[#666666]">
          Catalogue Ref: {artwork.catalogueNumber} • {artwork.priceTier}
        </span>
      </div>

      {/* Main Split Grid: Interactive Visuals (Left 7 cols) + Acquisition Dossier (Right 5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Multi-Angle Gallery + 3x Impasto Zoom + Higgsfield Room Mockup */}
        <div className="lg:col-span-7 space-y-8">
          <ArtworkInteractiveViewer artwork={artwork} />

          {/* Curatorial Narrative ("Behind the Canvas") */}
          <div className="bg-[#FAFAFA] border border-[#E5E5E5] p-8 space-y-5">
            <div className="flex items-center justify-between border-b border-[#E5E5E5] pb-3">
              <span className="text-xs tracking-[0.2em] uppercase text-[#9A7B4F]">
                Behind the Canvas — Curatorial Monograph
              </span>
              <span className="text-xs text-[#666666]">{artwork.series}</span>
            </div>
            <h2 className="font-serif-editorial text-2xl sm:text-3xl text-[#111111] font-normal">
              {artwork.shortExcerpt}
            </h2>
            <div className="space-y-4 text-sm text-[#666666] leading-relaxed">
              {artwork.curatorialNarrative.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>
            <div className="pt-4 border-t border-[#E5E5E5] text-xs text-[#111111]">
              <strong className="uppercase tracking-[0.14em] text-[#9A7B4F] block mb-1">
                Archival Authentication &amp; Verso Inscription:
              </strong>
              {artwork.materialityNotes}
            </div>
          </div>
        </div>

        {/* Right Column: Specifications & Dual CTA Acquisition Panel */}
        <div className="lg:col-span-5 space-y-8 lg:sticky lg:top-28">
          <div className="border border-[#E5E5E5] bg-[#FFFFFF] p-7 sm:p-8 space-y-6">
            {/* Status Badge */}
            <div className="flex items-center justify-between">
              {isAvailable ? (
                <span className="px-3 py-1 bg-[#FAFAFA] border border-[#E5E5E5] text-[11px] tracking-[0.18em] uppercase text-[#111111] flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#9A7B4F]" />
                  Original 1-of-1 • Available
                </span>
              ) : (
                <span className="px-3 py-1 bg-[#111111] text-[#FFFFFF] text-[11px] tracking-[0.18em] uppercase flex items-center gap-2">
                  <Lock className="w-3.5 h-3.5 text-[#9A7B4F]" />
                  Acquired / Sold
                </span>
              )}
              <span className="text-xs text-[#666666]">{artwork.year}</span>
            </div>

            {/* Title & Open Price */}
            <div className="space-y-2 border-b border-[#E5E5E5] pb-6">
              <h1 className="font-serif-editorial text-3xl sm:text-4xl text-[#111111] font-normal">
                {artwork.title}
              </h1>
              <p className="text-xs text-[#666666]">{artwork.medium}</p>

              <div className="pt-4 flex items-baseline justify-between">
                <div>
                  <span className="block text-[10px] tracking-[0.18em] uppercase text-[#666666]">
                    {isAvailable ? 'Transparent Studio Price' : 'Final Acquisition Value'}
                  </span>
                  <span className="text-2xl sm:text-3xl font-medium text-[#111111]">
                    {formatUsd(artwork.priceUsd)} USD
                  </span>
                </div>
                <span className="text-[11px] tracking-[0.14em] uppercase text-[#9A7B4F]">
                  Quantity = 1 Only
                </span>
              </div>
            </div>

            {/* Dual CTA: [ Acquire Now ] -> Shopify | [ Inquire / Private Viewing ] */}
            <div className="space-y-3">
              {isAvailable ? (
                <Link
                  href={`/checkout/${artwork.slug}`}
                  className="w-full py-4 px-6 bg-[#000000] text-[#FFFFFF] text-xs tracking-[0.2em] uppercase font-medium hover:bg-[#9A7B4F] transition-colors flex items-center justify-center gap-2"
                >
                  <span>Acquire Now — {formatUsd(artwork.priceUsd)} USD</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              ) : (
                <div className="w-full py-4 px-6 bg-[#FAFAFA] border border-[#E5E5E5] text-[#666666] text-xs tracking-[0.18em] uppercase text-center">
                  Permanently Archived ({artwork.acquiredLocation || 'Private Collection'})
                </div>
              )}

              <Link
                href={`/contact?artwork=${encodeURIComponent(artwork.title)}&type=private-viewing`}
                className="w-full py-3.5 px-6 border border-[#111111] text-[#111111] text-xs tracking-[0.18em] uppercase hover:bg-[#FAFAFA] transition-colors flex items-center justify-center gap-2"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#9A7B4F]" />
                <span>Inquire / Request Live Studio Video View</span>
              </Link>

              <Link
                href={`/contact?artwork=${encodeURIComponent(artwork.title)}&persona=trade`}
                className="w-full py-2.5 px-4 border border-[#E5E5E5] text-[#666666] text-[11px] tracking-[0.16em] uppercase hover:text-[#111111] hover:border-[#111111] transition-colors flex items-center justify-center gap-1.5"
              >
                <FileText className="w-3.5 h-3.5 text-[#9A7B4F]" />
                <span>Interior Trade &amp; Architect Spec / Tear Sheet</span>
              </Link>
            </div>

            {/* Technical Specifications Table (Metric & Imperial for Trade Buyers) */}
            <div className="pt-4 border-t border-[#E5E5E5] space-y-3 text-xs">
              <h3 className="text-[11px] tracking-[0.18em] uppercase text-[#111111] font-medium">
                Technical &amp; Spatial Specifications
              </h3>
              <dl className="divide-y divide-[#E5E5E5] border-y border-[#E5E5E5]">
                <div className="py-2.5 flex justify-between gap-4">
                  <dt className="text-[#666666]">Dimensions (Metric)</dt>
                  <dd className="text-[#111111] font-mono">
                    {artwork.dimensionsCm.width} × {artwork.dimensionsCm.height} × {artwork.dimensionsCm.depth} cm
                  </dd>
                </div>
                <div className="py-2.5 flex justify-between gap-4">
                  <dt className="text-[#666666]">Dimensions (Imperial)</dt>
                  <dd className="text-[#111111] font-mono">
                    {artwork.dimensionsIn.width}&quot; × {artwork.dimensionsIn.height}&quot; × {artwork.dimensionsIn.depth}&quot; in
                  </dd>
                </div>
                <div className="py-2.5 flex justify-between gap-4">
                  <dt className="text-[#666666]">Surface Support</dt>
                  <dd className="text-[#111111] text-right">{artwork.surface}</dd>
                </div>
                <div className="py-2.5 flex justify-between gap-4">
                  <dt className="text-[#666666]">Framing &amp; Profile</dt>
                  <dd className="text-[#111111] text-right">{artwork.framing}</dd>
                </div>
                <div className="py-2.5 flex justify-between gap-4">
                  <dt className="text-[#666666]">Crating &amp; Weight</dt>
                  <dd className="text-[#111111] text-right">
                    {artwork.crating} ({artwork.weightKg} kg)
                  </dd>
                </div>
                <div className="py-2.5 flex justify-between gap-4">
                  <dt className="text-[#666666]">Edition Policy</dt>
                  <dd className="text-[#9A7B4F] font-medium text-right">
                    Strict One-of-One (No Prints)
                  </dd>
                </div>
              </dl>
            </div>

            {/* Collector Persona Alignment */}
            <div className="space-y-2.5 pt-2">
              <span className="block text-[10px] tracking-[0.18em] uppercase text-[#666666]">
                Curatorial Fit by Collector Persona
              </span>
              {artwork.personaRecommendations.map((rec, i) => (
                <div key={i} className="p-3 bg-[#FAFAFA] border border-[#E5E5E5] text-xs space-y-1">
                  <span className="font-medium text-[#111111] block">{rec.persona}</span>
                  <p className="text-[#666666]">{rec.note}</p>
                </div>
              ))}
            </div>

            {/* Trust Guarantees */}
            <div className="pt-2 space-y-2 text-xs text-[#666666]">
              <div className="flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-[#9A7B4F] shrink-0 mt-0.5" />
                <span>
                  Includes physical artist-signed &amp; wax-stamped Certificate of Authenticity (CoA).
                </span>
              </div>
              <div className="flex items-start gap-2">
                <PackageCheck className="w-4 h-4 text-[#9A7B4F] shrink-0 mt-0.5" />
                <span>
                  Fully insured global air freight in custom ISPM-15 wooden museum crate.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
