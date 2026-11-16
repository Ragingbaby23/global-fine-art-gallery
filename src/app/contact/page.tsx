'use client';

import { useState } from 'react';
import { ARTWORKS, formatUsd } from '@/lib/artworks';
import { CheckCircle2, Sparkles, ShieldCheck, Video, Building2, Compass } from 'lucide-react';

export default function PrivateInquiryPage() {
  const [personaType, setPersonaType] = useState<string>('Seasoned Private Collector');
  const [selectedArtwork, setSelectedArtwork] = useState<string>(ARTWORKS[0].title);
  const [requestLiveVideo, setRequestLiveVideo] = useState<boolean>(true);
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-8 py-14 space-y-12">
      <div className="border-b border-[#E5E5E5] pb-8 space-y-3">
        <span className="text-xs tracking-[0.2em] uppercase text-[#9A7B4F]">
          Private Sales, Interior Trade &amp; Institutional Desk
        </span>
        <h1 className="font-serif-editorial text-4xl sm:text-6xl text-[#111111] font-normal">
          Inquire or Schedule a Live Studio Viewing
        </h1>
        <p className="text-sm text-[#666666] max-w-2xl leading-relaxed">
          Speak directly with the studio curatorial desk to request a live 4K video inspection under raking light, download architectural tear sheets, or arrange custom invoicing and crated air freight.
        </p>
      </div>

      {submitted ? (
        <div className="border border-[#111111] bg-[#FAFAFA] p-10 space-y-5">
          <div className="flex items-center gap-2.5 text-[#9A7B4F]">
            <CheckCircle2 className="w-6 h-6" />
            <span className="text-xs tracking-[0.2em] uppercase font-medium">
              Direct Studio Inquiry Logged • Priority Response Within 12 Hours
            </span>
          </div>
          <h2 className="font-serif-editorial text-3xl text-[#111111]">
            Thank You. Our Curatorial Desk Has Received Your Dossier Request.
          </h2>
          <p className="text-sm text-[#666666] max-w-xl leading-relaxed">
            We have prepared the high-resolution raking-light portfolio and crated shipping quotation for{' '}
            <strong className="text-[#111111]">{selectedArtwork}</strong> tailored to your profile ({personaType}).
          </p>
          <button
            type="button"
            onClick={() => setSubmitted(false)}
            className="px-6 py-3 bg-[#000000] text-[#FFFFFF] text-xs tracking-[0.18em] uppercase"
          >
            Submit Another Inquiry
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <form onSubmit={handleSubmit} className="lg:col-span-7 border border-[#E5E5E5] bg-[#FFFFFF] p-8 space-y-6">
            {/* Step 1: Buyer Persona Selector */}
            <div className="space-y-2">
              <label className="block text-[11px] tracking-[0.16em] uppercase text-[#111111] font-medium">
                1. Select Your Collector / Professional Profile
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {[
                  'Seasoned Private Collector ($10k–$50k+)',
                  'Emerging Collector ($1k–$7.5k)',
                  'Luxury Interior Designer / Architect Trade',
                  'Corporate / 5-Star Hospitality Art Curator',
                ].map((role) => (
                  <button
                    key={role}
                    type="button"
                    onClick={() => setPersonaType(role)}
                    className={`p-3 text-left text-xs border transition-colors ${
                      personaType === role
                        ? 'border-[#111111] bg-[#FAFAFA] font-medium text-[#111111]'
                        : 'border-[#E5E5E5] text-[#666666] hover:border-[#111111]'
                    }`}
                  >
                    {role}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Artwork of Interest */}
            <div className="space-y-1.5">
              <label className="block text-[11px] tracking-[0.16em] uppercase text-[#111111] font-medium">
                2. Artwork or Series of Interest
              </label>
              <select
                value={selectedArtwork}
                onChange={(e) => setSelectedArtwork(e.target.value)}
                className="w-full border border-[#E5E5E5] px-3.5 py-2.5 text-sm bg-[#FFFFFF] focus:outline-none focus:border-[#111111]"
              >
                {ARTWORKS.map((art) => (
                  <option key={art.id} value={art.title}>
                    {art.title} ({art.dimensionsCm.width}×{art.dimensionsCm.height} cm — {formatUsd(art.priceUsd)} USD —{' '}
                    {art.status})
                  </option>
                ))}
                <option value="Multi-Work Portfolio / Corporate Curation">
                  Multi-Work Portfolio / Corporate Lobby Curation ($15,000 – $50,000+ USD)
                </option>
              </select>
            </div>

            {/* Step 3: Contact Credentials */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-[11px] tracking-[0.14em] uppercase text-[#111111]">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Your Name or Principal Studio"
                  className="w-full border border-[#E5E5E5] px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#111111]"
                />
              </div>
              <div className="space-y-1.5">
                <label className="block text-[11px] tracking-[0.14em] uppercase text-[#111111]">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="name@domain.com"
                  className="w-full border border-[#E5E5E5] px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#111111]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-[11px] tracking-[0.14em] uppercase text-[#111111]">
                  City &amp; Country (For Crating Estimate) *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. New York, London, Zurich, Singapore"
                  className="w-full border border-[#E5E5E5] px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#111111]"
                />
              </div>
              <div className="space-y-1.5">
                <label className="block text-[11px] tracking-[0.14em] uppercase text-[#111111]">
                  Target Project / Acquisition Timeline
                </label>
                <input
                  type="text"
                  placeholder="e.g. Immediate / Q4 Project Handover"
                  className="w-full border border-[#E5E5E5] px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#111111]"
                />
              </div>
            </div>

            {/* Live Video Inspection Checkbox */}
            <label className="flex items-start gap-3 p-4 bg-[#FAFAFA] border border-[#E5E5E5] cursor-pointer">
              <input
                type="checkbox"
                checked={requestLiveVideo}
                onChange={(e) => setRequestLiveVideo(e.target.checked)}
                className="mt-1 accent-[#000000]"
              />
              <span className="text-xs text-[#111111] leading-relaxed">
                <strong className="block uppercase tracking-[0.12em] text-[#9A7B4F]">
                  Schedule Private Live Studio Video Viewing
                </strong>
                Inspect the physical canvas texture, edge profile, and natural light response via live 4K video call from the studio before dispatch.
              </span>
            </label>

            <div className="space-y-1.5">
              <label className="block text-[11px] tracking-[0.14em] uppercase text-[#111111]">
                Curatorial Notes, Wall Dimensions, or Trade Requirements
              </label>
              <textarea
                rows={3}
                placeholder="Share wall dimensions (cm/inches), room photos for custom Higgsfield staging, or corporate invoicing requirements..."
                className="w-full border border-[#E5E5E5] px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#111111]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 px-6 bg-[#000000] text-[#FFFFFF] text-xs tracking-[0.2em] uppercase font-medium hover:bg-[#9A7B4F] transition-colors"
            >
              Transmit Private Inquiry to Studio
            </button>
          </form>

          {/* Right Sidebar: Services by Persona */}
          <aside className="lg:col-span-5 space-y-6">
            <div className="border border-[#E5E5E5] bg-[#FAFAFA] p-6 space-y-4">
              <div className="flex items-center gap-2 text-xs tracking-[0.16em] uppercase text-[#111111] font-medium">
                <Video className="w-4 h-4 text-[#9A7B4F]" />
                <span>Private Collector Concierge</span>
              </div>
              <p className="text-xs text-[#666666] leading-relaxed">
                For works in Tier 2 and Tier 3 ($10,000 – $50,000+ USD), collectors may request a 48-hour courtesy reservation while reviewing live studio video footage or arranging wire settlement via Shopify Draft Order.
              </p>
            </div>

            <div className="border border-[#E5E5E5] bg-[#FAFAFA] p-6 space-y-4">
              <div className="flex items-center gap-2 text-xs tracking-[0.16em] uppercase text-[#111111] font-medium">
                <Compass className="w-4 h-4 text-[#9A7B4F]" />
                <span>Interior Trade &amp; Architect Program</span>
              </div>
              <p className="text-xs text-[#666666] leading-relaxed">
                Send us a photo of your client&apos;s interior wall along with exact room dimensions. We generate custom high-resolution Higgsfield spatial mockups and formatted PDF tear sheets within 24 hours.
              </p>
            </div>

            <div className="border border-[#E5E5E5] bg-[#FAFAFA] p-6 space-y-4">
              <div className="flex items-center gap-2 text-xs tracking-[0.16em] uppercase text-[#111111] font-medium">
                <Building2 className="w-4 h-4 text-[#9A7B4F]" />
                <span>Corporate &amp; Hospitality Curation</span>
              </div>
              <p className="text-xs text-[#666666] leading-relaxed">
                Acquiring multiple works for a boutique hotel, private bank, or executive suite? We provide cohesive series curation, custom brass exhibition plaques, and synchronized international crated freight.
              </p>
            </div>

            <div className="p-5 border border-[#E5E5E5] bg-[#FFFFFF] flex items-center gap-3 text-xs text-[#666666]">
              <ShieldCheck className="w-5 h-5 text-[#9A7B4F] shrink-0" />
              <span>Protected by Automated Anti-Spam Shield &amp; Shopify PCI-DSS Global Settlement Infrastructure.</span>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}
