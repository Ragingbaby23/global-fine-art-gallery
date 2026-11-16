import Link from 'next/link';
import { ArrowRight, Award, Globe2, Layers, ShieldCheck } from 'lucide-react';
import { BASE_PATH } from '@/lib/artworks';

export default function AboutArtistPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-16 space-y-20">
      {/* Header Monograph */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center border-b border-[#E5E5E5] pb-16">
        <div className="lg:col-span-7 space-y-6">
          <span className="text-xs tracking-[0.2em] uppercase text-[#9A7B4F]">
            Artist Story, Heritage &amp; Global Positioning
          </span>
          <h1 className="font-serif-editorial text-4xl sm:text-6xl text-[#111111] font-normal leading-tight">
            The Unrepeatable Hand: Why Every Canvas Remains Strictly One-of-One.
          </h1>
          <p className="text-base text-[#666666] leading-relaxed">
            Atelier Vance was founded as a digital flagship monograph—recording an ongoing dialogue between raw geological minerals, heavy-body oil impasto, and architectural silence. Rather than treating the website as a mass-market store, this viewing room serves as an open archive of singular physical works.
          </p>
        </div>

        <div className="lg:col-span-5 bg-[#FAFAFA] border border-[#E5E5E5] p-6 space-y-3">
          <img
            src={`${BASE_PATH}/artworks/hero-impasto-macro.png`}
            alt="Raking light macro view of studio oil impasto"
            className="w-full aspect-[16/10] object-cover"
          />
          <p className="text-[11px] tracking-[0.15em] uppercase text-[#666666]">
            Studio Macro Documentation — 17 Strata of Oil, Travertine &amp; 23k Bronze Leaf
          </p>
        </div>
      </section>

      {/* Deep Context: Artist Narrative & Unique Positioning (From PRD Section 1.1 & 1.2) */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="p-8 border border-[#E5E5E5] bg-[#FFFFFF] space-y-4">
          <Layers className="w-6 h-6 text-[#9A7B4F]" />
          <h2 className="font-serif-editorial text-2xl text-[#111111]">
            1. Philosophy of the Unrepeatable Moment
          </h2>
          <p className="text-xs text-[#666666] leading-relaxed">
            Each painting is constructed over weeks or months using raw Belgian flax linen, hand-milled mineral earths, and custom steel trowels. Because every ridge of paint is carved while wet in response to studio light, no work can ever be duplicated—and no print edition is ever authorized.
          </p>
        </div>

        <div className="p-8 border border-[#E5E5E5] bg-[#FFFFFF] space-y-4">
          <Globe2 className="w-6 h-6 text-[#9A7B4F]" />
          <h2 className="font-serif-editorial text-2xl text-[#111111]">
            2. Breaking Traditional Gallery Gatekeeping
          </h2>
          <p className="text-xs text-[#666666] leading-relaxed">
            Traditional physical galleries charge 40%–60% commissions and conceal prices behind intimidating &ldquo;Price on Request&rdquo; barriers. Our direct-to-collector flagship model pairs Christie&apos;s Private Sales curatorial depth with complete USD price transparency across all tiers ($1,000 to $50,000+).
          </p>
        </div>

        <div className="p-8 border border-[#E5E5E5] bg-[#FFFFFF] space-y-4">
          <ShieldCheck className="w-6 h-6 text-[#9A7B4F]" />
          <h2 className="font-serif-editorial text-2xl text-[#111111]">
            3. Institutional Provenance &amp; Crating
          </h2>
          <p className="text-xs text-[#666666] leading-relaxed">
            Every work is inscribed on the verso, catalogued in our permanent digital archive, and dispatched globally in custom ISPM-15 heat-treated wooden crates with a wax-sealed, artist-signed Certificate of Authenticity.
          </p>
        </div>
      </section>

      {/* Selected Exhibition History & Provenance Milestones */}
      <section className="bg-[#FAFAFA] border border-[#E5E5E5] p-8 sm:p-12 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#E5E5E5] pb-6">
          <div>
            <span className="text-xs tracking-[0.2em] uppercase text-[#9A7B4F]">
              Curriculum Vitae &amp; Provenance
            </span>
            <h2 className="font-serif-editorial text-3xl sm:text-4xl text-[#111111] font-normal mt-1">
              Selected Exhibitions &amp; Private Collections
            </h2>
          </div>
          <Award className="w-6 h-6 text-[#9A7B4F]" />
        </div>

        <div className="divide-y divide-[#E5E5E5] text-sm">
          <div className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <span className="font-mono text-xs text-[#9A7B4F]">2026</span>
            <span className="font-medium text-[#111111]">
              Tectonic Memory: Annual Private Viewing Monograph
            </span>
            <span className="text-xs text-[#666666]">Flagship Global Viewing Room &amp; Studio Salon</span>
          </div>
          <div className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <span className="font-mono text-xs text-[#9A7B4F]">2025</span>
            <span className="font-medium text-[#111111]">
              Material Silence — Contemporary Mineral &amp; Linen Works
            </span>
            <span className="text-xs text-[#666666]">Private Collector Showcase, Zurich &amp; Singapore</span>
          </div>
          <div className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <span className="font-mono text-xs text-[#9A7B4F]">2024</span>
            <span className="font-medium text-[#111111]">
              Architectural Monoliths &amp; Spatial Scale
            </span>
            <span className="text-xs text-[#666666]">Curated Trade Presentation, London &amp; New York</span>
          </div>
        </div>

        <div className="pt-4 flex flex-wrap gap-4">
          <Link
            href="/works"
            className="px-6 py-3.5 bg-[#000000] text-[#FFFFFF] text-xs tracking-[0.18em] uppercase inline-flex items-center gap-2"
          >
            <span>Explore Available Works</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <Link
            href="/contact"
            className="px-6 py-3.5 border border-[#111111] text-[#111111] text-xs tracking-[0.18em] uppercase"
          >
            Contact Studio Curatorial Desk
          </Link>
        </div>
      </section>
    </div>
  );
}
