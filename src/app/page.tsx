import Link from 'next/link';
import { getCatalogArtworks } from '@/lib/shopify';
import { formatUsd, BASE_PATH } from '@/lib/artworks';
import { ArtworkCard } from '@/components/ArtworkCard';
import {
  ArrowRight,
  ArrowUpRight,
  ShieldCheck,
  Sparkles,
  Compass,
  Building2,
  Award,
  Layers,
} from 'lucide-react';

export default async function HomePage() {
  const artworks = await getCatalogArtworks();
  const featuredArtworks = artworks.filter((a) => a.featured);

  return (
    <div className="space-y-24 pb-24">
      {/* 1. HERO SECTION (Higgsfield Camera Pan/Zoom Macro Loop) */}
      <section className="relative bg-[#111111] text-[#FFFFFF] overflow-hidden border-b border-[#E5E5E5]">
        <div className="absolute inset-0 overflow-hidden opacity-55">
          <img
            src={`${BASE_PATH}/artworks/hero-impasto-macro.png`}
            alt="Macro Oil Impasto and 23k Bronze Leaf Brushwork"
            className="w-full h-full object-cover animate-higgsfield-camera"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#000000]/90 via-[#000000]/65 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 py-24 sm:py-32 lg:py-40 grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
          <div className="lg:col-span-8 space-y-6">
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 bg-[#000000]/70 border border-[#9A7B4F]/60 text-[11px] tracking-[0.2em] uppercase text-[#FAFAFA]">
              <span className="w-2 h-2 rounded-full bg-[#9A7B4F]" />
              <span>2026 Private Viewing Room • Direct From Studio</span>
            </div>

            <h1 className="font-serif-editorial text-4xl sm:text-6xl lg:text-[68px] font-normal leading-[1.06] tracking-tight text-[#FFFFFF]">
              Unrepeatable Moments in Oil, Mineral &amp; Raw Linen.
            </h1>

            <p className="text-base sm:text-lg text-[#E5E5E5] max-w-2xl leading-relaxed font-light">
              Every canvas is a strictly <strong className="font-medium text-[#FFFFFF]">One-of-One</strong> physical artifact—never reproduced as prints or editions. Experience museum-grade curation with transparent global pricing ($1,000 – $50,000+ USD) and encrypted Shopify acquisition.
            </p>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <Link
                href="/works"
                className="px-7 py-4 bg-[#FFFFFF] text-[#111111] text-xs tracking-[0.2em] uppercase font-medium hover:bg-[#9A7B4F] hover:text-[#FFFFFF] transition-colors flex items-center gap-2"
              >
                <span>Enter Viewing Room</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/contact?type=live-viewing"
                className="px-7 py-4 border border-[#FFFFFF]/40 text-[#FFFFFF] text-xs tracking-[0.2em] uppercase hover:border-[#FFFFFF] bg-[#000000]/40 backdrop-blur-xs transition-colors flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-[#9A7B4F]" />
                <span>Request Private Video Viewing</span>
              </Link>
            </div>
          </div>

          {/* Highlighted Masterpiece Card in Hero */}
          <div className="lg:col-span-4 bg-[#000000]/80 backdrop-blur-md border border-[#E5E5E5]/20 p-6 space-y-4">
            <div className="flex items-center justify-between text-[10px] tracking-[0.2em] uppercase text-[#9A7B4F]">
              <span>Featured Monograph Work</span>
              <span>ARC-2026-014</span>
            </div>
            <p className="font-serif-editorial text-2xl text-[#FFFFFF]">
              Silence in Ochre No. IV
            </p>
            <p className="text-xs text-[#E5E5E5]/80 leading-relaxed">
              Heavy-body oil, raw mineral ochre, and 23k warm bronze leaf on Belgian raw linen • 150 × 190 cm (59.1&quot; × 74.8&quot;)
            </p>
            <div className="pt-3 border-t border-[#E5E5E5]/20 flex items-center justify-between">
              <span className="text-sm font-medium text-[#FFFFFF]">
                {formatUsd(24500)} USD
              </span>
              <Link
                href="/works/silence-in-ochre-no-4"
                className="text-xs tracking-[0.16em] uppercase text-[#9A7B4F] hover:text-[#FFFFFF] flex items-center gap-1"
              >
                <span>Inspect Work</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CURATED HIGHLIGHTS (Across Tiers $1,000 – $50,000+ USD) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#E5E5E5] pb-6">
          <div className="space-y-2">
            <span className="text-xs tracking-[0.2em] uppercase text-[#9A7B4F]">
              Curated Viewing Room Highlights
            </span>
            <h2 className="font-serif-editorial text-3xl sm:text-5xl text-[#111111] font-normal">
              Current One-of-One Acquisitions
            </h2>
          </div>
          <div className="flex items-center gap-6">
            <p className="text-xs text-[#666666] max-w-xs">
              Inventory is synchronized in real time via Shopify Storefront GraphQL API (Quantity = 1 per work).
            </p>
            <Link
              href="/works"
              className="text-xs tracking-[0.18em] uppercase text-[#111111] border-b border-[#111111] pb-1 hover:text-[#9A7B4F] hover:border-[#9A7B4F] transition-colors whitespace-nowrap"
            >
              View Full Catalogue ({artworks.length})
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredArtworks.map((artwork) => (
            <ArtworkCard key={artwork.id} artwork={artwork} />
          ))}
        </div>
      </section>

      {/* 3. ARTIST CONTEXT & UNIQUE GLOBAL POSITIONING (Section 1.1 & 1.2 of PRD) */}
      <section className="bg-[#FAFAFA] border-y border-[#E5E5E5] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 space-y-5">
            <div className="relative aspect-[4/5] border border-[#E5E5E5] bg-[#FFFFFF] p-6 shadow-xs">
              <img
                src={`${BASE_PATH}/artworks/silence-in-ochre.png`}
                alt="Atelier Vance Studio Monograph"
                className="w-full h-full object-cover"
              />
              <div className="mt-3 flex items-center justify-between text-[10px] tracking-[0.16em] uppercase text-[#666666]">
                <span>Studio Archive — Tectonic Memory Cycle</span>
                <span className="text-[#9A7B4F]">Strict 1-of-1</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-3">
              <span className="text-xs tracking-[0.2em] uppercase text-[#9A7B4F]">
                Artist Heritage &amp; Global Positioning
              </span>
              <h2 className="font-serif-editorial text-3xl sm:text-5xl text-[#111111] font-normal leading-tight">
                Christie&apos;s Private Sales Depth. Direct-from-Studio Transparency.
              </h2>
            </div>

            <div className="space-y-4 text-sm sm:text-base text-[#666666] leading-relaxed">
              <p>
                In an era saturated with mass digital reproductions, true fine art resides in the physical topography of the canvas—the weight of raw Belgian flax, hand-ground mineral ochre, and sculptural knife ridges that shift with every hour of natural light.
              </p>
              <p>
                Traditional brick-and-mortar galleries impose 50% commissions and opaque <em className="text-[#111111]">&ldquo;Price on Request&rdquo;</em> gatekeeping, while mass online marketplaces dilute brand equity alongside factory prints. <strong className="text-[#111111] font-medium">Atelier Vance bridges this divide</strong>: offering museum-level provenance and curatorial storytelling with open USD pricing directly from the artist&apos;s studio to collectors worldwide.
              </p>
            </div>

            {/* 3 Tier Pricing Architecture Table */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-5 bg-[#FFFFFF] border border-[#E5E5E5] space-y-1.5">
                <span className="text-[10px] tracking-[0.18em] uppercase text-[#9A7B4F]">
                  Tier 1 • Study &amp; Entry
                </span>
                <p className="font-serif-editorial text-2xl text-[#111111]">$1,000 – $4,500</p>
                <p className="text-xs text-[#666666]">
                  Intimate mineral studies on linen. Instant Shopify &amp; Apple Pay acquisition.
                </p>
              </div>
              <div className="p-5 bg-[#FFFFFF] border border-[#E5E5E5] space-y-1.5">
                <span className="text-[10px] tracking-[0.18em] uppercase text-[#9A7B4F]">
                  Tier 2 • Signature Series
                </span>
                <p className="font-serif-editorial text-2xl text-[#111111]">$4,500 – $15,000</p>
                <p className="text-xs text-[#666666]">
                  Mid-to-large architectural works. Direct checkout or private consultation.
                </p>
              </div>
              <div className="p-5 bg-[#FFFFFF] border border-[#E5E5E5] space-y-1.5">
                <span className="text-[10px] tracking-[0.18em] uppercase text-[#9A7B4F]">
                  Tier 3 • Masterworks
                </span>
                <p className="font-serif-editorial text-2xl text-[#111111]">$15,000 – $50,000+</p>
                <p className="text-xs text-[#666666]">
                  Monumental museum-scale works with bespoke crating &amp; live studio viewing.
                </p>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-xs tracking-[0.18em] uppercase text-[#111111] border-b border-[#111111] pb-1 hover:text-[#9A7B4F] hover:border-[#9A7B4F]"
              >
                <span>Read the Full Artist Monograph &amp; Studio Philosophy</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4. TAILORED PATHWAYS FOR THE 4 COLLECTOR PERSONAS (Section 2 of PRD) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 space-y-10">
        <div className="space-y-2 max-w-2xl">
          <span className="text-xs tracking-[0.2em] uppercase text-[#9A7B4F]">
            Bespoke Acquisition Experiences
          </span>
          <h2 className="font-serif-editorial text-3xl sm:text-5xl text-[#111111] font-normal">
            Designed Around Four Global Buyer Personas
          </h2>
          <p className="text-sm text-[#666666]">
            Whether acquiring an intimate first study via instant checkout or curating a monumental diptych for a five-star lobby, our platform adapts to your decision workflow.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 border border-[#E5E5E5] bg-[#FFFFFF] flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <Award className="w-6 h-6 text-[#9A7B4F]" />
              <span className="block text-[10px] tracking-[0.18em] uppercase text-[#666666]">
                Persona 01 • $10k – $50k+ USD
              </span>
              <h3 className="font-serif-editorial text-2xl text-[#111111]">
                Seasoned Private Collectors
              </h3>
              <p className="text-xs text-[#666666] leading-relaxed">
                Full provenance dossier, 3× raking-light impasto inspection, wax-sealed CoA, and private live studio video viewings before crated air dispatch.
              </p>
            </div>
            <Link
              href="/works?tier=Masterpiece"
              className="text-xs tracking-[0.16em] uppercase text-[#111111] flex items-center justify-between pt-4 border-t border-[#E5E5E5] hover:text-[#9A7B4F]"
            >
              <span>Explore Masterworks</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="p-6 border border-[#E5E5E5] bg-[#FFFFFF] flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <Layers className="w-6 h-6 text-[#9A7B4F]" />
              <span className="block text-[10px] tracking-[0.18em] uppercase text-[#666666]">
                Persona 02 • $1k – $7.5k USD
              </span>
              <h3 className="font-serif-editorial text-2xl text-[#111111]">
                Emerging &amp; Aspiring Collectors
              </h3>
              <p className="text-xs text-[#666666] leading-relaxed">
                Zero &ldquo;Price on Request&rdquo; intimidation. Transparent USD pricing, residential room staging mockups, and instant 1-of-1 checkout via Apple Pay or Card.
              </p>
            </div>
            <Link
              href="/works?tier=Entry"
              className="text-xs tracking-[0.16em] uppercase text-[#111111] flex items-center justify-between pt-4 border-t border-[#E5E5E5] hover:text-[#9A7B4F]"
            >
              <span>Browse Study &amp; Signature Works</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="p-6 border border-[#E5E5E5] bg-[#FFFFFF] flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <Compass className="w-6 h-6 text-[#9A7B4F]" />
              <span className="block text-[10px] tracking-[0.18em] uppercase text-[#666666]">
                Persona 03 • $3.5k – $25k+ USD
              </span>
              <h3 className="font-serif-editorial text-2xl text-[#111111]">
                Luxury Interior Trade &amp; Architects
              </h3>
              <p className="text-xs text-[#666666] leading-relaxed">
                Dual metric/imperial specs (cm &amp; inches), framing depth, downloadable client presentation tear sheets, and guaranteed project delivery windows.
              </p>
            </div>
            <Link
              href="/contact?persona=trade"
              className="text-xs tracking-[0.16em] uppercase text-[#111111] flex items-center justify-between pt-4 border-t border-[#E5E5E5] hover:text-[#9A7B4F]"
            >
              <span>Request Trade Tear Sheet</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="p-6 border border-[#E5E5E5] bg-[#FFFFFF] flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <Building2 className="w-6 h-6 text-[#9A7B4F]" />
              <span className="block text-[10px] tracking-[0.18em] uppercase text-[#666666]">
                Persona 04 • $10k – $50k+ USD
              </span>
              <h3 className="font-serif-editorial text-2xl text-[#111111]">
                Corporate &amp; Hospitality Curators
              </h3>
              <p className="text-xs text-[#666666] leading-relaxed">
                Monumental works and cohesive multi-work series for executive lobbies and 5-star hotels, complete with formal corporate invoicing and crated logistics.
              </p>
            </div>
            <Link
              href="/contact?persona=corporate"
              className="text-xs tracking-[0.16em] uppercase text-[#111111] flex items-center justify-between pt-4 border-t border-[#E5E5E5] hover:text-[#9A7B4F]"
            >
              <span>Corporate Curation Desk</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
