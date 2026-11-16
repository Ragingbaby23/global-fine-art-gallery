'use client';

import { useState, use } from 'react';
import Link from 'next/link';
import { ARTWORKS, formatUsd } from '@/lib/artworks';
import {
  Lock,
  ShieldCheck,
  CheckCircle2,
  CreditCard,
  Building2,
  ArrowLeft,
  PackageCheck,
} from 'lucide-react';

export default function ShopifyOneOfOneCheckoutPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const artwork = ARTWORKS.find((a) => a.slug === slug) || ARTWORKS[0];

  const [paymentMethod, setPaymentMethod] = useState<'card' | 'apple-pay' | 'wire'>('card');
  const [destinationRegion, setDestinationRegion] = useState<string>('north-america');
  const [collectorName, setCollectorName] = useState('');
  const [collectorEmail, setCollectorEmail] = useState('');
  const [shippingAddress, setShippingAddress] = useState('');
  const [isAcquired, setIsAcquired] = useState(false);

  const cratingAndFreightUsd =
    destinationRegion === 'north-america'
      ? 480
      : destinationRegion === 'europe-uk'
      ? 520
      : 390;

  const transitInsuranceUsd = Math.round(artwork.priceUsd * 0.015);
  const totalUsd = artwork.priceUsd + cratingAndFreightUsd + transitInsuranceUsd;

  const handleCompleteAcquisition = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAcquired(true);
  };

  if (isAcquired) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-8 py-20 space-y-8">
        <div className="border border-[#111111] bg-[#FAFAFA] p-8 sm:p-12 space-y-6">
          <div className="flex items-center gap-3 text-[#9A7B4F]">
            <CheckCircle2 className="w-7 h-7" />
            <span className="text-xs tracking-[0.2em] uppercase font-medium">
              Shopify Storefront Inventory Synced • Status: Acquired (Quantity = 0)
            </span>
          </div>

          <h1 className="font-serif-editorial text-3xl sm:text-5xl text-[#111111] font-normal">
            Acquisition Confirmed: {artwork.title}
          </h1>

          <p className="text-sm text-[#666666] leading-relaxed">
            Thank you{collectorName ? `, ${collectorName}` : ''}. Your acquisition of{' '}
            <strong className="text-[#111111]">{artwork.title}</strong> ({artwork.catalogueNumber}) has been locked in our Shopify 1-of-1 inventory engine. The work is now permanently marked as{' '}
            <span className="text-[#9A7B4F] font-medium">Acquired / Sold</span> in the public Viewing Room.
          </p>

          <div className="bg-[#FFFFFF] border border-[#E5E5E5] p-6 space-y-3 text-xs">
            <div className="flex justify-between py-1 border-b border-[#E5E5E5]">
              <span className="text-[#666666]">Shopify Order &amp; CoA Registry ID</span>
              <span className="font-mono text-[#111111]">SHP-1OF1-{artwork.catalogueNumber}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-[#E5E5E5]">
              <span className="text-[#666666]">Certificate of Authenticity</span>
              <span className="text-[#111111]">Physical Wax-Sealed &amp; Artist-Signed Included</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-[#666666]">Total Settled (USD)</span>
              <span className="font-medium text-[#111111]">{formatUsd(totalUsd)} USD</span>
            </div>
          </div>

          <div className="pt-4 flex flex-wrap gap-4">
            <Link
              href={`/works/${artwork.slug}`}
              className="px-6 py-3.5 bg-[#000000] text-[#FFFFFF] text-xs tracking-[0.18em] uppercase"
            >
              Return to Artwork Dossier
            </Link>
            <Link
              href="/works"
              className="px-6 py-3.5 border border-[#111111] text-[#111111] text-xs tracking-[0.18em] uppercase"
            >
              Return to Viewing Room
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-8 py-12 space-y-10">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#E5E5E5] pb-5">
        <Link
          href={`/works/${artwork.slug}`}
          className="inline-flex items-center gap-2 text-xs tracking-[0.16em] uppercase text-[#666666] hover:text-[#111111]"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Artwork Dossier</span>
        </Link>

        <div className="flex items-center gap-2 text-xs tracking-[0.16em] uppercase text-[#111111]">
          <Lock className="w-3.5 h-3.5 text-[#9A7B4F]" />
          <span>Shopify Headless Encrypted 1-of-1 Checkout (PCI-DSS)</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left: Collector Details & Payment Gateway */}
        <form onSubmit={handleCompleteAcquisition} className="lg:col-span-7 space-y-8">
          <div className="border border-[#E5E5E5] bg-[#FFFFFF] p-7 space-y-6">
            <h2 className="font-serif-editorial text-2xl text-[#111111]">
              1. Collector &amp; Certificate of Authenticity Registration
            </h2>
            <p className="text-xs text-[#666666]">
              The full legal name entered below will be inscribed in the studio provenance ledger and on your signed Certificate of Authenticity.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-[11px] tracking-[0.14em] uppercase text-[#111111]">
                  Collector / Entity Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={collectorName}
                  onChange={(e) => setCollectorName(e.target.value)}
                  placeholder="e.g. Victoria Sterling / Studio Atelier LLC"
                  className="w-full border border-[#E5E5E5] px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#111111]"
                />
              </div>
              <div className="space-y-1.5">
                <label className="block text-[11px] tracking-[0.14em] uppercase text-[#111111]">
                  Email for Dossier &amp; Tracking *
                </label>
                <input
                  type="email"
                  required
                  value={collectorEmail}
                  onChange={(e) => setCollectorEmail(e.target.value)}
                  placeholder="collector@domain.com"
                  className="w-full border border-[#E5E5E5] px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#111111]"
                />
              </div>
            </div>
          </div>

          <div className="border border-[#E5E5E5] bg-[#FFFFFF] p-7 space-y-6">
            <h2 className="font-serif-editorial text-2xl text-[#111111]">
              2. Museum Crating &amp; Global Air Freight Destination
            </h2>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="block text-[11px] tracking-[0.14em] uppercase text-[#111111]">
                  Destination Region (Calculates ISPM-15 Wooden Crate Rate)
                </label>
                <select
                  value={destinationRegion}
                  onChange={(e) => setDestinationRegion(e.target.value)}
                  className="w-full border border-[#E5E5E5] px-3.5 py-2.5 text-sm bg-[#FFFFFF] focus:outline-none focus:border-[#111111]"
                >
                  <option value="north-america">
                    North America (USA / Canada) — Crated DHL/FedEx Priority Air ($480 USD)
                  </option>
                  <option value="europe-uk">
                    Europe, UK &amp; Switzerland — Crated Fine Art Air Courier ($520 USD)
                  </option>
                  <option value="asia-pacific">
                    Asia-Pacific &amp; Middle East (Singapore, HK, Tokyo, Dubai, Sydney) ($390 USD)
                  </option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="block text-[11px] tracking-[0.14em] uppercase text-[#111111]">
                  White-Glove Delivery Address *
                </label>
                <textarea
                  rows={2}
                  required
                  value={shippingAddress}
                  onChange={(e) => setShippingAddress(e.target.value)}
                  placeholder="Street address, suite/penthouse, city, postal code, country"
                  className="w-full border border-[#E5E5E5] px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#111111]"
                />
              </div>
            </div>
          </div>

          <div className="border border-[#E5E5E5] bg-[#FFFFFF] p-7 space-y-6">
            <h2 className="font-serif-editorial text-2xl text-[#111111]">
              3. Global USD Settlement Method (Shopify Payments)
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`p-3.5 border text-left transition-colors ${
                  paymentMethod === 'card'
                    ? 'border-[#111111] bg-[#FAFAFA]'
                    : 'border-[#E5E5E5] bg-[#FFFFFF]'
                }`}
              >
                <CreditCard className="w-4 h-4 text-[#9A7B4F] mb-1.5" />
                <span className="block text-xs font-medium text-[#111111]">
                  Credit / Debit Card
                </span>
                <span className="block text-[10px] text-[#666666]">Visa, Mastercard, Amex</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('apple-pay')}
                className={`p-3.5 border text-left transition-colors ${
                  paymentMethod === 'apple-pay'
                    ? 'border-[#111111] bg-[#FAFAFA]'
                    : 'border-[#E5E5E5] bg-[#FFFFFF]'
                }`}
              >
                <ShieldCheck className="w-4 h-4 text-[#9A7B4F] mb-1.5" />
                <span className="block text-xs font-medium text-[#111111]">
                  Apple Pay / PayPal
                </span>
                <span className="block text-[10px] text-[#666666]">Instant 1-Click Express</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('wire')}
                className={`p-3.5 border text-left transition-colors ${
                  paymentMethod === 'wire'
                    ? 'border-[#111111] bg-[#FAFAFA]'
                    : 'border-[#E5E5E5] bg-[#FFFFFF]'
                }`}
              >
                <Building2 className="w-4 h-4 text-[#9A7B4F] mb-1.5" />
                <span className="block text-xs font-medium text-[#111111]">
                  Private Wire / Invoice
                </span>
                <span className="block text-[10px] text-[#666666]">48h Hold for Tier 3 &amp; Trade</span>
              </button>
            </div>

            <button
              type="submit"
              className="w-full py-4 px-6 bg-[#000000] text-[#FFFFFF] text-xs tracking-[0.2em] uppercase font-medium hover:bg-[#9A7B4F] transition-colors"
            >
              Complete 1-of-1 Acquisition — {formatUsd(totalUsd)} USD
            </button>
          </div>
        </form>

        {/* Right: 1-of-1 Order Summary */}
        <aside className="lg:col-span-5 border border-[#E5E5E5] bg-[#FAFAFA] p-7 space-y-6 lg:sticky lg:top-28">
          <div className="flex items-center justify-between border-b border-[#E5E5E5] pb-4">
            <span className="text-xs tracking-[0.18em] uppercase text-[#111111] font-medium">
              1-of-1 Acquisition Dossier
            </span>
            <span className="text-[11px] font-mono text-[#9A7B4F]">Qty: 1 of 1 Max</span>
          </div>

          <div className="flex gap-4 items-center">
            <img
              src={artwork.imageUrl}
              alt={artwork.title}
              className="w-24 h-28 object-cover border border-[#E5E5E5] bg-[#FFFFFF] p-1.5"
            />
            <div className="space-y-1">
              <p className="font-serif-editorial text-2xl text-[#111111]">{artwork.title}</p>
              <p className="text-xs text-[#666666]">{artwork.medium}</p>
              <p className="text-xs font-mono text-[#666666]">
                {artwork.dimensionsCm.width} × {artwork.dimensionsCm.height} cm ({artwork.dimensionsIn.width}&quot; ×{' '}
                {artwork.dimensionsIn.height}&quot;)
              </p>
            </div>
          </div>

          <div className="border-t border-b border-[#E5E5E5] py-4 space-y-2.5 text-xs">
            <div className="flex justify-between">
              <span className="text-[#666666]">Original 1-of-1 Painting ({artwork.catalogueNumber})</span>
              <span className="text-[#111111] font-medium">{formatUsd(artwork.priceUsd)} USD</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#666666]">Custom ISPM-15 Wooden Crate &amp; Air Freight</span>
              <span className="text-[#111111]">{formatUsd(cratingAndFreightUsd)} USD</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#666666]">All-Risk Fine Art Transit Insurance (1.5%)</span>
              <span className="text-[#111111]">{formatUsd(transitInsuranceUsd)} USD</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#666666]">Signed Certificate of Authenticity (CoA)</span>
              <span className="text-[#9A7B4F] uppercase tracking-wider">Included</span>
            </div>
          </div>

          <div className="flex justify-between items-baseline">
            <span className="text-xs tracking-[0.18em] uppercase text-[#111111] font-medium">
              Total Settlement
            </span>
            <span className="text-2xl font-medium text-[#111111]">{formatUsd(totalUsd)} USD</span>
          </div>

          <div className="p-4 bg-[#FFFFFF] border border-[#E5E5E5] text-xs text-[#666666] flex items-start gap-2.5">
            <PackageCheck className="w-4 h-4 text-[#9A7B4F] shrink-0 mt-0.5" />
            <span>
              Automated Webhook Sync: Immediately upon settlement, Shopify sets inventory count to 0 and transitions this work to <strong>Acquired / Sold</strong> across the global showcase.
            </span>
          </div>
        </aside>
      </div>
    </div>
  );
}
