export type PriceTier =
  | 'Tier 1: Collector Entry & Study Works'
  | 'Tier 2: Signature Series'
  | 'Tier 3: Masterpiece & Monumental Works';

export type ArtworkStatus = 'Available' | 'Acquired';

export type ArtworkOrientation = 'Portrait' | 'Landscape' | 'Square';

export interface RoomMockupPreset {
  id: 'collector-residence' | 'double-height-villa' | 'executive-lobby';
  label: string;
  personaTag: string;
  wallWidthCm: number;
  ambientDescription: string;
}

export interface Artwork {
  id: string;
  slug: string;
  shopifyProductId: string;
  shopifyVariantId: string;
  catalogueNumber: string;
  title: string;
  series: string;
  year: number;
  medium: string;
  surface: string;
  dimensionsCm: { width: number; height: number; depth: number };
  dimensionsIn: { width: number; height: number; depth: number };
  orientation: ArtworkOrientation;
  priceUsd: number;
  priceTier: PriceTier;
  status: ArtworkStatus;
  acquiredLocation?: string;
  framing: string;
  crating: string;
  weightKg: number;
  imageUrl: string;
  macroImageUrl: string;
  dominantPalette: string[];
  featured: boolean;
  shortExcerpt: string;
  curatorialNarrative: string[];
  materialityNotes: string;
  provenance: string[];
  personaRecommendations: {
    persona: string;
    note: string;
  }[];
}

export const ROOM_MOCKUP_PRESETS: RoomMockupPreset[] = [
  {
    id: 'collector-residence',
    label: 'Collector Penthouse — Zurich / NYC',
    personaTag: 'Private & Emerging Collectors',
    wallWidthCm: 320,
    ambientDescription: 'Warm gallery track lighting (3000K) over travertine console and raw linen seating.',
  },
  {
    id: 'double-height-villa',
    label: 'Architectural Villa — Miami / Bali',
    personaTag: 'Luxury Interior Trade & Architects',
    wallWidthCm: 440,
    ambientDescription: 'Natural diffused daylight across limewash plaster walls and sculptural timber architecture.',
  },
  {
    id: 'executive-lobby',
    label: 'Private Bank & Boutique Hotel Lobby',
    personaTag: 'Corporate & Hospitality Curators',
    wallWidthCm: 520,
    ambientDescription: 'Museum-grade recessed directional wash over dark bronze and monolithic stone reception.',
  },
];

export const ARTWORKS: Artwork[] = [
  {
    id: 'art-001',
    slug: 'silence-in-ochre-no-4',
    shopifyProductId: 'gid://shopify/Product/9010000001',
    shopifyVariantId: 'gid://shopify/ProductVariant/9010000001',
    catalogueNumber: 'ARC-2026-014',
    title: 'Silence in Ochre No. IV',
    series: 'Tectonic Memory Series',
    year: 2026,
    medium: 'Heavy-body oil, raw mineral ochre pigment, and 23k warm bronze leaf',
    surface: 'Belgian archival raw linen over museum cedar stretcher',
    dimensionsCm: { width: 150, height: 190, depth: 5.2 },
    dimensionsIn: { width: 59.1, height: 74.8, depth: 2.0 },
    orientation: 'Portrait',
    priceUsd: 24500,
    priceTier: 'Tier 3: Masterpiece & Monumental Works',
    status: 'Available',
    framing: 'Hand-rubbed darkened bronze shadow-gap floater frame included',
    crating: 'Custom ISPM-15 museum wooden crate with climate barrier',
    weightKg: 26,
    imageUrl: '/artworks/silence-in-ochre.png',
    macroImageUrl: '/artworks/hero-impasto-macro.png',
    dominantPalette: ['#9A7B4F', '#2B2623', '#EAE3D5', '#6E5233'],
    featured: true,
    shortExcerpt:
      'A monumental meditation on geological time, built from seventeen strata of carved oil impasto and raw mineral earth.',
    curatorialNarrative: [
      'Conceived over seven months in the studio, "Silence in Ochre No. IV" investigates the quiet tension between permanence and erosion. Using custom steel palette knives and broad masonry trowels, the artist builds dense ridges of raw sienna, burnt umber, and bone white before scraping back into the wet strata to expose buried histories beneath the surface.',
      'As natural daylight shifts across a room, the physical relief—reaching up to 9mm in peak elevation—casts evolving micro-shadows across the linen. Subtle veins of muted warm bronze catch low evening light, offering an intimate dialogue that transforms between morning stillness and nocturnal contemplation.',
    ],
    materialityNotes:
      'Signed, titled, and dated in oil on verso. Accompanied by a wax-sealed physical Certificate of Authenticity with holographic archival registry number.',
    provenance: [
      'Direct from the Artist Studio Archive (2026)',
      'Featured in Private Autumn Viewing Room Monograph, 2026',
    ],
    personaRecommendations: [
      {
        persona: 'Seasoned Private Collectors',
        note: 'Anchor masterpiece from the 2026 Tectonic Memory cycle with full studio provenance.',
      },
      {
        persona: 'Corporate & Hospitality Curators',
        note: 'Commanding 190 cm vertical scale engineered for double-height foyers and boardrooms.',
      },
    ],
  },
  {
    id: 'art-002',
    slug: 'nocturne-monolith-ii',
    shopifyProductId: 'gid://shopify/Product/9010000002',
    shopifyVariantId: 'gid://shopify/ProductVariant/9010000002',
    catalogueNumber: 'ARC-2026-019',
    title: 'Nocturne Monolith II',
    series: 'Architectural Silence Series',
    year: 2026,
    medium: 'Oil, cold wax medium, charred bone black, and Prussian pigment',
    surface: 'Heavyweight 620gsm Italian cotton duck canvas',
    dimensionsCm: { width: 140, height: 140, depth: 4.5 },
    dimensionsIn: { width: 55.1, height: 55.1, depth: 1.8 },
    orientation: 'Square',
    priceUsd: 11800,
    priceTier: 'Tier 2: Signature Series',
    status: 'Available',
    framing: 'Unframed museum gallery wrap with painted charcoal edges (custom framing available on inquiry)',
    crating: 'Custom museum wooden crate included',
    weightKg: 19,
    imageUrl: '/artworks/nocturne-monolith.png',
    macroImageUrl: '/artworks/hero-impasto-macro.png',
    dominantPalette: ['#15171A', '#2B333E', '#DFDCD4', '#5A5852'],
    featured: true,
    shortExcerpt:
      'Architectural equilibrium between matte bone-black velocity and warm chalk-white silence.',
    curatorialNarrative: [
      '"Nocturne Monolith II" distills architectural mass into pure tactile rhythm. Working with cold wax mixed into linseed oil, the surface achieves a velvety matte skin punctuated by deep horizontal incisions that reveal pale limestone priming underneath.',
      'Designed to anchor contemporary minimalist interiors without visual clutter, its square 140 × 140 cm geometry brings immediate gravity and meditative poise to monochrome, concrete, or warm timber spaces.',
    ],
    materialityNotes:
      'UV-varnished archival finish. Ready to hang with heavy-duty French cleat hardware installed.',
    provenance: ['Direct from the Artist Studio (2026)'],
    personaRecommendations: [
      {
        persona: 'Luxury Interior Trade & Architects',
        note: 'Balanced 140×140 cm square proportion ideal for minimalist living rooms and architectural alcoves.',
      },
      {
        persona: 'Seasoned Private Collectors',
        note: 'Signature mid-to-large format work representing the core cold-wax nocturnal period.',
      },
    ],
  },
  {
    id: 'art-003',
    slug: 'ephemeral-horizon-study-ix',
    shopifyProductId: 'gid://shopify/Product/9010000003',
    shopifyVariantId: 'gid://shopify/ProductVariant/9010000003',
    catalogueNumber: 'ARC-2026-022',
    title: 'Ephemeral Horizon IX',
    series: 'Atmospheric Drift Series',
    year: 2026,
    medium: 'Oil glazes, marble dust impasto, and raw umber',
    surface: 'Triple-primed Belgian linen',
    dimensionsCm: { width: 120, height: 100, depth: 4.0 },
    dimensionsIn: { width: 47.2, height: 39.4, depth: 1.6 },
    orientation: 'Landscape',
    priceUsd: 6400,
    priceTier: 'Tier 2: Signature Series',
    status: 'Available',
    framing: 'Solid European oak minimalist floater frame',
    crating: 'Reinforced wooden art box with high-density foam suspension',
    weightKg: 14,
    imageUrl: '/artworks/ephemeral-horizon.png',
    macroImageUrl: '/artworks/hero-impasto-macro.png',
    dominantPalette: ['#E8E4DC', '#7D827B', '#9A7B4F', '#3A3B37'],
    featured: true,
    shortExcerpt:
      'Luminous mist and mineral horizon lines suspended between memory and physical landscape.',
    curatorialNarrative: [
      'Inspired by coastal fog lifting over volcanic plateaus at dawn, "Ephemeral Horizon IX" balances translucent oil glazes against a central ridge of marble-dust impasto. Up close, the viewer discovers intricate micro-fissures and hand-ground mineral granules; from across a room, the work resolves into a tranquil horizon.',
      'Its versatile 120 × 100 cm landscape format makes it effortlessly adaptable above consoles, dining spaces, or private studies.',
    ],
    materialityNotes:
      'Signed on lower right margin and verso. Includes signed Certificate of Authenticity.',
    provenance: ['Direct from the Artist Studio (2026)'],
    personaRecommendations: [
      {
        persona: 'Emerging & Aspiring Collectors',
        note: 'Accessible signature-tier original with versatile residential dimensions and instant checkout.',
      },
      {
        persona: 'Luxury Interior Trade & Architects',
        note: 'Soft neutral mineral palette harmonizes effortlessly with warm minimalist interiors.',
      },
    ],
  },
  {
    id: 'art-004',
    slug: 'study-in-mineral-vii',
    shopifyProductId: 'gid://shopify/Product/9010000004',
    shopifyVariantId: 'gid://shopify/ProductVariant/9010000004',
    catalogueNumber: 'ARC-2026-027',
    title: 'Study in Mineral VII',
    series: 'Lithic Studies',
    year: 2026,
    medium: 'Oil stick, crushed travertine, and terracotta earth pigment',
    surface: 'Stretched fine-grain Belgian linen',
    dimensionsCm: { width: 75, height: 95, depth: 3.8 },
    dimensionsIn: { width: 29.5, height: 37.4, depth: 1.5 },
    orientation: 'Portrait',
    priceUsd: 2200,
    priceTier: 'Tier 1: Collector Entry & Study Works',
    status: 'Available',
    framing: 'Warm brushed blackened aluminum gallery frame',
    crating: 'Museum-grade reinforced flight box',
    weightKg: 8.5,
    imageUrl: '/artworks/study-in-mineral-vii.png',
    macroImageUrl: '/artworks/hero-impasto-macro.png',
    dominantPalette: ['#C27D5A', '#F1ECE1', '#22201E', '#8E735B'],
    featured: true,
    shortExcerpt:
      'An intimate, expressive one-of-one study capturing the spontaneous gesture of raw mineral pigment on linen.',
    curatorialNarrative: [
      'Created as an intimate exploration of terracotta and travertine earth pigments, "Study in Mineral VII" preserves the immediacy of the artist’s hand. Spontaneous oil-stick calligraphy cuts across warm, chalky mineral fields, offering first-time and seasoned collectors alike an entry point into the studio’s core vocabulary.',
      'Like every work in the gallery, this study is strictly 1-of-1 with zero print editions ever produced.',
    ],
    materialityNotes:
      'Signed and numbered in the studio archive. Ships within 5 business days with signed CoA.',
    provenance: ['Direct from the Artist Studio (2026)'],
    personaRecommendations: [
      {
        persona: 'Emerging & Aspiring Collectors',
        note: 'Ideal first original acquisition ($2,200 USD) sized for apartments, studies, and intimate walls.',
      },
    ],
  },
  {
    id: 'art-005',
    slug: 'sovereign-void-triptych-i',
    shopifyProductId: 'gid://shopify/Product/9010000005',
    shopifyVariantId: 'gid://shopify/ProductVariant/9010000005',
    catalogueNumber: 'ARC-2026-003',
    title: 'Sovereign Void (Diptych)',
    series: 'Monumental Commissions & Institutional Works',
    year: 2026,
    medium: 'Sculptural oil impasto, volcanic ash, and 24k gold leaf patina',
    surface: 'Twin custom architectural linen panels',
    dimensionsCm: { width: 260, height: 180, depth: 6.0 },
    dimensionsIn: { width: 102.4, height: 70.9, depth: 2.4 },
    orientation: 'Landscape',
    priceUsd: 46000,
    priceTier: 'Tier 3: Masterpiece & Monumental Works',
    status: 'Available',
    framing: 'Bespoke architectural bronze reveal frame',
    crating: 'Dual-chamber international air-freight museum crate with white-glove installation guide',
    weightKg: 48,
    imageUrl: '/artworks/silence-in-ochre.png',
    macroImageUrl: '/artworks/hero-impasto-macro.png',
    dominantPalette: ['#1A1918', '#9A7B4F', '#DCD6CA', '#4A3F35'],
    featured: false,
    shortExcerpt:
      'A 2.6-meter institutional-scale diptych uniting volcanic texture with luminous metallic warmth.',
    curatorialNarrative: [
      '"Sovereign Void" is the largest work released from the studio in 2026. Spanning 260 × 180 cm across two seamlessly calibrated panels, it was engineered to command large architectural volumes—from private residences with expansive glass facades to flagship executive lobbies.',
      'Acquisition includes complimentary live video studio inspection, bespoke crating, and dedicated white-glove air freight coordination.',
    ],
    materialityNotes:
      'Includes comprehensive Conservation Dossier, signed CoA, and custom brass plaque upon request for institutional spaces.',
    provenance: [
      'Direct from the Artist Studio (2026)',
      'Selected for the Annual Monograph Exhibition, 2026',
    ],
    personaRecommendations: [
      {
        persona: 'Corporate & Hospitality Curators',
        note: 'Monumental 260 cm span tailored for 5-star hotel lobbies, private banks, and executive suites.',
      },
      {
        persona: 'Seasoned Private Collectors',
        note: 'Museum-scale centerpiece with white-glove international logistics included.',
      },
    ],
  },
  {
    id: 'art-006',
    slug: 'elegy-in-raw-linen-iii',
    shopifyProductId: 'gid://shopify/Product/9010000006',
    shopifyVariantId: 'gid://shopify/ProductVariant/9010000006',
    catalogueNumber: 'ARC-2025-088',
    title: 'Elegy in Raw Linen III',
    series: 'Tectonic Memory Series',
    year: 2025,
    medium: 'Oil, beeswax, and raw umber on unprimed linen',
    surface: 'Belgian raw flax linen',
    dimensionsCm: { width: 130, height: 160, depth: 4.5 },
    dimensionsIn: { width: 51.2, height: 63.0, depth: 1.8 },
    orientation: 'Portrait',
    priceUsd: 16500,
    priceTier: 'Tier 3: Masterpiece & Monumental Works',
    status: 'Acquired',
    acquiredLocation: 'Private Collection — Zurich, Switzerland',
    framing: 'Aged bronze floater frame',
    crating: 'Custom ISPM-15 museum wooden crate',
    weightKg: 21,
    imageUrl: '/artworks/nocturne-monolith.png',
    macroImageUrl: '/artworks/hero-impasto-macro.png',
    dominantPalette: ['#2C2A29', '#C8BFA8', '#786856'],
    featured: false,
    shortExcerpt:
      'Archived in a private Zurich collection. Preserved in the digital catalogue raisonné to document studio provenance.',
    curatorialNarrative: [
      '"Elegy in Raw Linen III" leaves strategic expanses of raw Belgian flax exposed so the organic weave of the cloth converses directly with thick, architectural slabs of oil and beeswax.',
      'Now residing in a private collection in Zurich, this work remains visible in the Viewing Room archive as part of the artist’s permanent provenance record.',
    ],
    materialityNotes: 'Permanently archived — Acquired via Private Sale.',
    provenance: [
      'Direct from the Artist Studio (2025)',
      'Acquired by Private Collector, Zurich, Switzerland (2025)',
    ],
    personaRecommendations: [
      {
        persona: 'Seasoned Private Collectors',
        note: 'Demonstrates strong secondary provenance and international collector demand.',
      },
    ],
  },
];

export function formatUsd(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(amount);
}
