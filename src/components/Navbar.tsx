'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShieldCheck, Sparkles, ArrowUpRight, Menu, X } from 'lucide-react';
import { useState } from 'react';

const NAV_LINKS = [
  { href: '/works', label: 'Viewing Room' },
  { href: '/about', label: 'Artist & Heritage' },
  { href: '/works?tier=Masterpiece', label: 'Masterworks ($15k+)' },
  { href: '/contact', label: 'Private & Trade Inquiry' },
];

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[#FFFFFF]/95 backdrop-blur-md border-b border-[#E5E5E5]">
      {/* Top Curatorial Announcement Bar */}
      <div className="bg-[#FAFAFA] border-b border-[#E5E5E5] px-4 sm:px-8 py-2 text-[11px] tracking-[0.18em] uppercase text-[#666666] flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#9A7B4F]" />
          <span>Strict One-of-One Policy — Zero Prints or Reproductions</span>
        </div>
        <div className="hidden md:flex items-center gap-6">
          <span className="flex items-center gap-1.5 text-[#111111]">
            <ShieldCheck className="w-3.5 h-3.5 text-[#9A7B4F]" />
            Signed Certificate of Authenticity &amp; ISPM-15 Museum Crating
          </span>
          <span className="text-[#9A7B4F] font-medium">Open Global Pricing ($1,000 – $50,000+ USD)</span>
        </div>
      </div>

      {/* Main Museum Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 h-20 flex items-center justify-between">
        <Link href="/" className="group flex flex-col">
          <span className="font-serif-editorial text-2xl sm:text-[28px] tracking-[0.14em] uppercase text-[#111111] font-normal leading-none">
            ATELIER VANCE
          </span>
          <span className="text-[10px] tracking-[0.26em] uppercase text-[#666666] mt-1">
            Global Fine Art Monograph &amp; Viewing Room
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-9">
          {NAV_LINKS.map((link) => {
            const isActive =
              pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href.split('?')[0]));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-xs tracking-[0.18em] uppercase transition-colors pb-1 border-b ${
                  isActive
                    ? 'text-[#111111] border-[#9A7B4F] font-medium'
                    : 'text-[#666666] border-transparent hover:text-[#111111]'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden sm:flex items-center gap-4">
          <Link
            href="/contact?type=live-viewing"
            className="text-xs tracking-[0.16em] uppercase px-4 py-2.5 border border-[#E5E5E5] text-[#111111] hover:border-[#111111] transition-colors flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#9A7B4F]" />
            <span>Book Studio Live View</span>
          </Link>
          <Link
            href="/works"
            className="text-xs tracking-[0.16em] uppercase px-5 py-2.5 bg-[#000000] text-[#FFFFFF] hover:bg-[#111111]/90 transition-colors flex items-center gap-1.5"
          >
            <span>Acquire 1-of-1</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden p-2 text-[#111111]"
          aria-label="Toggle Menu"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-[#E5E5E5] bg-[#FFFFFF] px-6 py-6 space-y-4">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block text-sm tracking-[0.16em] uppercase text-[#111111] py-2 border-b border-[#FAFAFA]"
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-2 flex flex-col gap-3">
            <Link
              href="/contact?type=live-viewing"
              onClick={() => setMobileOpen(false)}
              className="text-center text-xs tracking-[0.16em] uppercase px-4 py-3 border border-[#111111] text-[#111111]"
            >
              Book Studio Live Viewing
            </Link>
            <Link
              href="/works"
              onClick={() => setMobileOpen(false)}
              className="text-center text-xs tracking-[0.16em] uppercase px-4 py-3 bg-[#000000] text-[#FFFFFF]"
            >
              Enter Viewing Room
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
