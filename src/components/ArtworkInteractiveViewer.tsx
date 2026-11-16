'use client';

import { useState } from 'react';
import { Artwork, ROOM_MOCKUP_PRESETS } from '@/lib/artworks';
import { ZoomIn, Home, Layers, Sun, Moon, Maximize2 } from 'lucide-react';

export function ArtworkInteractiveViewer({ artwork }: { artwork: Artwork }) {
  const [activeTab, setActiveTab] = useState<'gallery' | 'macro' | 'room'>('gallery');
  const [roomPresetId, setRoomPresetId] = useState<string>(ROOM_MOCKUP_PRESETS[0].id);
  const [warmLighting, setWarmLighting] = useState(true);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
  const [isHoveringZoom, setIsHoveringZoom] = useState(false);

  const activePreset =
    ROOM_MOCKUP_PRESETS.find((p) => p.id === roomPresetId) || ROOM_MOCKUP_PRESETS[0];

  // Calculate realistic spatial scale ratio based on artwork width in cm vs room wall width in cm
  const widthRatioPercent = Math.min(
    62,
    Math.max(22, Math.round((artwork.dimensionsCm.width / activePreset.wallWidthCm) * 100))
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPos({ x, y });
  };

  return (
    <div className="space-y-4">
      {/* Mode Switcher Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#E5E5E5] pb-3">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setActiveTab('gallery')}
            className={`px-3.5 py-2 text-xs tracking-[0.16em] uppercase flex items-center gap-1.5 border transition-colors ${
              activeTab === 'gallery'
                ? 'bg-[#000000] text-[#FFFFFF] border-[#000000]'
                : 'bg-[#FFFFFF] text-[#666666] border-[#E5E5E5] hover:text-[#111111]'
            }`}
          >
            <Maximize2 className="w-3.5 h-3.5" />
            <span>Museum Frame View</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('macro')}
            className={`px-3.5 py-2 text-xs tracking-[0.16em] uppercase flex items-center gap-1.5 border transition-colors ${
              activeTab === 'macro'
                ? 'bg-[#000000] text-[#FFFFFF] border-[#000000]'
                : 'bg-[#FFFFFF] text-[#666666] border-[#E5E5E5] hover:text-[#111111]'
            }`}
          >
            <ZoomIn className="w-3.5 h-3.5 text-[#9A7B4F]" />
            <span>3× Impasto Texture Zoom</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('room')}
            className={`px-3.5 py-2 text-xs tracking-[0.16em] uppercase flex items-center gap-1.5 border transition-colors ${
              activeTab === 'room'
                ? 'bg-[#000000] text-[#FFFFFF] border-[#000000]'
                : 'bg-[#FFFFFF] text-[#666666] border-[#E5E5E5] hover:text-[#111111]'
            }`}
          >
            <Home className="w-3.5 h-3.5 text-[#9A7B4F]" />
            <span>Higgsfield Spatial Room Mockup</span>
          </button>
        </div>

        <span className="text-[11px] tracking-[0.15em] uppercase text-[#666666]">
          Scale: {artwork.dimensionsCm.width} × {artwork.dimensionsCm.height} cm ({artwork.dimensionsIn.width}&quot; ×{' '}
          {artwork.dimensionsIn.height}&quot;)
        </span>
      </div>

      {/* 1. Standard Museum Frame View (with interactive hover loupe) */}
      {activeTab === 'gallery' && (
        <div
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHoveringZoom(true)}
          onMouseLeave={() => setIsHoveringZoom(false)}
          className="relative aspect-[4/4.3] bg-[#FAFAFA] border border-[#E5E5E5] flex items-center justify-center p-8 sm:p-14 overflow-hidden cursor-crosshair"
        >
          <img
            src={artwork.imageUrl}
            alt={artwork.title}
            className="max-h-full max-w-full object-contain shadow-[0_25px_60px_rgba(0,0,0,0.18)] transition-transform duration-300"
            style={
              isHoveringZoom
                ? {
                    transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
                    transform: 'scale(1.85)',
                  }
                : undefined
            }
          />
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between pointer-events-none text-[11px] tracking-[0.14em] uppercase text-[#666666] bg-[#FFFFFF]/90 backdrop-blur-sm px-3.5 py-2 border border-[#E5E5E5]">
            <span>Hover over canvas to inspect pigment &amp; knife relief at 1.85×</span>
            <span className="text-[#9A7B4F] font-medium">Archival Raw Linen</span>
          </div>
        </div>
      )}

      {/* 2. High-Res Macro Impasto Relief View */}
      {activeTab === 'macro' && (
        <div
          onMouseMove={handleMouseMove}
          className="relative aspect-[4/4.3] bg-[#111111] border border-[#E5E5E5] overflow-hidden cursor-zoom-in"
        >
          <img
            src={artwork.macroImageUrl}
            alt={`${artwork.title} — Macro Brushwork Detail`}
            className="w-full h-full object-cover transition-transform duration-200"
            style={{
              transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
              transform: 'scale(1.45)',
            }}
          />
          <div className="absolute top-4 left-4 bg-[#000000]/85 text-[#FFFFFF] px-3.5 py-2 text-[11px] tracking-[0.16em] uppercase flex items-center gap-2 border border-[#9A7B4F]/50">
            <Layers className="w-3.5 h-3.5 text-[#9A7B4F]" />
            <span>Raking Studio Light (45°) — Physical Paint Elevation up to 9mm</span>
          </div>
          <div className="absolute bottom-4 left-4 right-4 bg-[#000000]/80 text-[#FAFAFA] px-4 py-2.5 text-xs flex items-center justify-between">
            <span>Move cursor across the surface to inspect hand-ground mineral granules and brushwork</span>
            <span className="uppercase tracking-[0.15em] text-[#9A7B4F] text-[10px]">Strict 1-of-1 Proof</span>
          </div>
        </div>
      )}

      {/* 3. Interactive Higgsfield Room Staging Mockup */}
      {activeTab === 'room' && (
        <div className="space-y-4">
          <div
            className={`relative aspect-[16/11] border border-[#E5E5E5] overflow-hidden flex flex-col justify-between transition-colors duration-500 ${
              warmLighting
                ? 'bg-[#EDE8DF]'
                : 'bg-[#E6E8EA]'
            }`}
          >
            {/* Higgsfield Architectural Gallery Interior Background */}
            <img
              src="/artworks/gallery-interior-staging.png"
              alt="Architectural Room Staging Backdrop"
              className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${
                warmLighting ? 'brightness-95 sepia-[0.12]' : 'brightness-100 saturate-75'
              }`}
            />

            {/* Simulated Directional Museum Spot Lighting Effect */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: warmLighting
                  ? 'radial-gradient(circle at 50% 28%, rgba(255,248,231,0.75) 0%, rgba(154,123,79,0.08) 55%, rgba(17,17,17,0.18) 100%)'
                  : 'radial-gradient(circle at 50% 28%, rgba(255,255,255,0.8) 0%, rgba(100,116,139,0.08) 55%, rgba(17,17,17,0.14) 100%)',
              }}
            />

            {/* Top Room Metadata Header */}
            <div className="relative z-10 p-4 flex flex-wrap items-center justify-between gap-2">
              <div className="bg-[#FFFFFF]/90 backdrop-blur-sm border border-[#E5E5E5] px-3 py-1.5 text-[11px] tracking-[0.14em] uppercase text-[#111111]">
                {activePreset.label} • Wall Span: {activePreset.wallWidthCm} cm (
                {Math.round(activePreset.wallWidthCm / 2.54)}&quot;)
              </div>
              <button
                type="button"
                onClick={() => setWarmLighting(!warmLighting)}
                className="bg-[#FFFFFF]/90 backdrop-blur-sm border border-[#E5E5E5] px-3 py-1.5 text-[11px] tracking-[0.14em] uppercase text-[#111111] flex items-center gap-1.5 hover:border-[#111111]"
              >
                {warmLighting ? (
                  <>
                    <Sun className="w-3.5 h-3.5 text-[#9A7B4F]" />
                    <span>3000K Warm Gallery Spot</span>
                  </>
                ) : (
                  <>
                    <Moon className="w-3.5 h-3.5 text-[#666666]" />
                    <span>5000K Architectural Daylight</span>
                  </>
                )}
              </button>
            </div>

            {/* Proportional Artwork Mounted on Architectural Wall */}
            <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-8">
              <div
                style={{ width: `${widthRatioPercent}%` }}
                className="transition-all duration-500 flex flex-col items-center"
              >
                <div className="p-1.5 bg-[#1E1C1A] shadow-[0_28px_50px_rgba(0,0,0,0.32)]">
                  <img
                    src={artwork.imageUrl}
                    alt={`${artwork.title} staged in ${activePreset.label}`}
                    className="w-full h-auto block"
                  />
                </div>
                <span className="mt-2 px-2 py-0.5 bg-[#111111]/80 text-[#FFFFFF] text-[10px] font-mono tracking-wider">
                  {artwork.dimensionsCm.width} × {artwork.dimensionsCm.height} cm ({artwork.dimensionsIn.width}&quot; ×{' '}
                  {artwork.dimensionsIn.height}&quot;)
                </span>
              </div>
            </div>

            {/* Architectural Bench / Console Silhouette for Human Spatial Reference */}
            <div className="relative z-10 px-12 pt-4 pb-6 flex flex-col items-center">
              <div className="w-3/5 h-5 bg-[#2A2623] shadow-lg rounded-xs" />
              <div className="w-1/2 flex justify-between px-6">
                <div className="w-2 h-4 bg-[#1A1816]" />
                <div className="w-2 h-4 bg-[#1A1816]" />
              </div>
              <p className="mt-2 text-[10px] tracking-[0.16em] uppercase text-[#111111]/80">
                Reference Console Width: 200 cm (78.7&quot;) • {activePreset.ambientDescription}
              </p>
            </div>
          </div>

          {/* Preset Selector Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {ROOM_MOCKUP_PRESETS.map((preset) => {
              const selected = preset.id === roomPresetId;
              return (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => setRoomPresetId(preset.id)}
                  className={`p-3 text-left border transition-colors ${
                    selected
                      ? 'border-[#111111] bg-[#FAFAFA]'
                      : 'border-[#E5E5E5] bg-[#FFFFFF] hover:border-[#666666]'
                  }`}
                >
                  <span className="block text-[10px] tracking-[0.16em] uppercase text-[#9A7B4F]">
                    {preset.personaTag}
                  </span>
                  <span className="block text-xs font-medium text-[#111111] mt-0.5">
                    {preset.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
