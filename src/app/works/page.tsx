'use client';

import { useState, useMemo } from 'react';
import { ARTWORKS, ArtworkOrientation, ArtworkStatus } from '@/lib/artworks';
import { ArtworkCard } from '@/components/ArtworkCard';
import { SlidersHorizontal, RotateCcw } from 'lucide-react';

export default function ViewingRoomPage() {
  const [selectedTier, setSelectedTier] = useState<string>('ALL');
  const [selectedOrientation, setSelectedOrientation] = useState<ArtworkOrientation | 'ALL'>('ALL');
  const [selectedStatus, setSelectedStatus] = useState<ArtworkStatus | 'ALL'>('ALL');

  const filteredArtworks = useMemo(() => {
    return ARTWORKS.filter((art) => {
      if (selectedTier === 'ENTRY' && !art.priceTier.startsWith('Tier 1')) return false;
      if (selectedTier === 'SIGNATURE' && !art.priceTier.startsWith('Tier 2')) return false;
      if (selectedTier === 'MASTERPIECE' && !art.priceTier.startsWith('Tier 3')) return false;
      if (selectedOrientation !== 'ALL' && art.orientation !== selectedOrientation) return false;
      if (selectedStatus !== 'ALL' && art.status !== selectedStatus) return false;
      return true;
    });
  }, [selectedTier, selectedOrientation, selectedStatus]);

  const resetFilters = () => {
    setSelectedTier('ALL');
    setSelectedOrientation('ALL');
    setSelectedStatus('ALL');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-14 space-y-10">
      {/* Header */}
      <div className="border-b border-[#E5E5E5] pb-8 space-y-3">
        <div className="flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-[#9A7B4F]">
          <span>Flagship Viewing Room</span>
          <span>•</span>
          <span>Open Global Pricing (USD)</span>
        </div>
        <h1 className="font-serif-editorial text-4xl sm:text-6xl text-[#111111] font-normal">
          Catalogue of One-of-One Works
        </h1>
        <p className="text-sm text-[#666666] max-w-2xl leading-relaxed">
          Every work below is a singular physical painting on archival linen or cotton canvas (Quantity = 1). Once acquired via Shopify Storefront checkout, works transition permanently to our Provenance Archive.
        </p>
      </div>

      {/* Filter Bar (Medium / Price Tier / Orientation / Status) */}
      <div className="bg-[#FAFAFA] border border-[#E5E5E5] p-5 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-xs tracking-[0.16em] uppercase text-[#111111] font-medium">
          <SlidersHorizontal className="w-4 h-4 text-[#9A7B4F]" />
          <span>Curatorial Filters</span>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Price Tier Filter */}
          <select
            value={selectedTier}
            onChange={(e) => setSelectedTier(e.target.value)}
            aria-label="Filter by Price Tier"
            className="bg-[#FFFFFF] border border-[#E5E5E5] px-3.5 py-2 text-xs tracking-[0.12em] uppercase text-[#111111] focus:outline-none focus:border-[#111111]"
          >
            <option value="ALL">All Price Tiers ($1,000 – $50,000+)</option>
            <option value="ENTRY">Tier 1: Collector Entry ($1,000 – $4,500)</option>
            <option value="SIGNATURE">Tier 2: Signature Series ($4,500 – $15,000)</option>
            <option value="MASTERPIECE">Tier 3: Masterworks ($15,000 – $50,000+)</option>
          </select>

          {/* Orientation / Spatial Scale Filter */}
          <select
            value={selectedOrientation}
            onChange={(e) => setSelectedOrientation(e.target.value as ArtworkOrientation | 'ALL')}
            aria-label="Filter by Orientation"
            className="bg-[#FFFFFF] border border-[#E5E5E5] px-3.5 py-2 text-xs tracking-[0.12em] uppercase text-[#111111] focus:outline-none focus:border-[#111111]"
          >
            <option value="ALL">All Orientations (Portrait / Landscape / Square)</option>
            <option value="Portrait">Portrait (Vertical Wall)</option>
            <option value="Landscape">Landscape (Horizontal Span)</option>
            <option value="Square">Square (Architectural Balance)</option>
          </select>

          {/* Availability Status Filter */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value as ArtworkStatus | 'ALL')}
            aria-label="Filter by Status"
            className="bg-[#FFFFFF] border border-[#E5E5E5] px-3.5 py-2 text-xs tracking-[0.12em] uppercase text-[#111111] focus:outline-none focus:border-[#111111]"
          >
            <option value="ALL">All Status (Available &amp; Sold Archive)</option>
            <option value="Available">Available for Acquisition (1-of-1)</option>
            <option value="Acquired">Acquired / Provenance Archive</option>
          </select>

          <button
            type="button"
            onClick={resetFilters}
            className="px-3 py-2 text-xs tracking-[0.14em] uppercase text-[#666666] hover:text-[#111111] flex items-center gap-1"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Results Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredArtworks.map((artwork) => (
          <ArtworkCard key={artwork.id} artwork={artwork} />
        ))}
      </div>
    </div>
  );
}
