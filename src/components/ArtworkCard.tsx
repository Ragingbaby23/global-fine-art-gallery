import Link from 'next/link';
import { Artwork, formatUsd } from '@/lib/artworks';
import { ArrowUpRight, Lock } from 'lucide-react';

export function ArtworkCard({ artwork }: { artwork: Artwork }) {
  const isAvailable = artwork.status === 'Available';

  return (
    <article className="group flex flex-col bg-[#FFFFFF] border border-[#E5E5E5] hover:border-[#111111] transition-colors">
      <Link
        href={`/works/${artwork.slug}`}
        className="relative aspect-[4/5] bg-[#FAFAFA] overflow-hidden flex items-center justify-center p-6 sm:p-10"
      >
        {/* Subtle museum frame shadow */}
        <div className="relative w-full h-full flex items-center justify-center">
          <img
            src={artwork.imageUrl}
            alt={artwork.title}
            className="max-h-full max-w-full object-contain shadow-[0_18px_40px_rgba(0,0,0,0.14)] transition-transform duration-700 group-hover:scale-[1.03]"
          />
        </div>

        {/* Status Pill */}
        <div className="absolute top-4 left-4 flex items-center gap-2">
          {isAvailable ? (
            <span className="px-2.5 py-1 bg-[#FFFFFF]/95 border border-[#E5E5E5] text-[10px] tracking-[0.18em] uppercase text-[#111111] flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#9A7B4F]" />
              1-of-1 Available
            </span>
          ) : (
            <span className="px-2.5 py-1 bg-[#111111] text-[#FFFFFF] text-[10px] tracking-[0.18em] uppercase flex items-center gap-1.5">
              <Lock className="w-3 h-3 text-[#9A7B4F]" />
              Acquired / Sold
            </span>
          )}
        </div>

        {/* Catalogue Number */}
        <span className="absolute bottom-3 right-4 text-[10px] tracking-[0.18em] uppercase text-[#666666]">
          {artwork.catalogueNumber}
        </span>
      </Link>

      <div className="p-6 flex-1 flex flex-col justify-between space-y-5 border-t border-[#E5E5E5]">
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-[11px] tracking-[0.16em] uppercase text-[#666666]">
            <span>{artwork.series}</span>
            <span>{artwork.year}</span>
          </div>
          <Link href={`/works/${artwork.slug}`} className="block">
            <h3 className="font-serif-editorial text-2xl text-[#111111] group-hover:text-[#9A7B4F] transition-colors">
              {artwork.title}
            </h3>
          </Link>
          <p className="text-xs text-[#666666] line-clamp-1">{artwork.medium}</p>
          <p className="text-xs text-[#666666] font-mono">
            {artwork.dimensionsCm.width} × {artwork.dimensionsCm.height} × {artwork.dimensionsCm.depth} cm
            <span className="mx-1.5 text-[#E5E5E5]">|</span>
            {artwork.dimensionsIn.width}&quot; × {artwork.dimensionsIn.height}&quot;
          </p>
        </div>

        <div className="pt-4 border-t border-[#E5E5E5] flex items-center justify-between">
          <div>
            <span className="block text-[10px] tracking-[0.16em] uppercase text-[#666666]">
              {isAvailable ? 'Open Studio Price' : 'Archive Valuation'}
            </span>
            <span className="text-base font-medium text-[#111111]">
              {formatUsd(artwork.priceUsd)} USD
            </span>
          </div>

          <Link
            href={`/works/${artwork.slug}`}
            className={`text-xs tracking-[0.16em] uppercase px-4 py-2.5 flex items-center gap-1.5 transition-colors ${
              isAvailable
                ? 'bg-[#000000] text-[#FFFFFF] hover:bg-[#9A7B4F]'
                : 'border border-[#E5E5E5] text-[#666666] hover:border-[#111111] hover:text-[#111111]'
            }`}
          >
            <span>{isAvailable ? 'View / Acquire' : 'View Provenance'}</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}
