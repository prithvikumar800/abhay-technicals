'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Phone,
  Mail,
  Clock,
  MessageCircle,
  Truck,
  ShoppingCart,
  User,
  Heart,
  Search,
  Home,
  Grid,
  ShieldCheck,
} from 'lucide-react';
import { useCart } from '../../providers/cart-provider';
import { useAuth } from '../../providers/auth-provider';

export function Footer() {
  const pathname = usePathname();
  const { itemCount } = useCart();
  const { user } = useAuth();

  return (
    <>
      <footer className="bg-[#0D0E11] text-slate-300 text-xs sm:text-[13px] border-t border-zinc-800 mt-auto">
        {/* Main Footer Container */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 lg:py-14">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10">
            {/* ── Column 1: Company Profile (4 cols) ────────────────────── */}
            <div className="lg:col-span-4 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-lg overflow-hidden bg-white p-1 border border-zinc-700 flex items-center justify-center shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/logo.png"
                    alt="Abhay Technicals Logo"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <span className="text-base sm:text-lg font-black text-white tracking-tight leading-tight block">
                    ABHAY <span className="text-[#E52521]">TECHNICALS</span>
                  </span>
                  <span className="text-[10px] sm:text-[11px] text-slate-400 font-bold tracking-wider block uppercase mt-0.5">
                    Mobile Spare Parts &amp; Tools
                  </span>
                </div>
              </div>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-sm">
                India&apos;s trusted direct supplier of smartphone spare parts, displays, OEM batteries,
                charging flex sub-boards, OCA glass, and repair tools for mobile repair technicians and retailers.
              </p>
              {/* Direct Support Badges */}
              <div className="pt-2 space-y-2.5">
                <div className="flex items-center gap-2.5 text-slate-200 text-xs sm:text-sm">
                  <Phone className="w-4 h-4 text-[#E52521] shrink-0" />
                  <a href="tel:+917295096715" className="hover:text-white font-bold transition-colors">
                    +91 72950 96715
                  </a>
                </div>
                <div className="flex items-center gap-2.5 text-slate-200 text-xs sm:text-sm">
                  <Mail className="w-4 h-4 text-[#E52521] shrink-0" />
                  <a href="mailto:support@abhaytechnicals.in" className="hover:text-white transition-colors">
                    support@abhaytechnicals.in
                  </a>
                </div>
                <div className="flex items-center gap-2.5 text-slate-400 text-xs">
                  <Clock className="w-4 h-4 text-zinc-500 shrink-0" />
                  <span>Mon - Sat: 9:00 AM - 7:00 PM IST</span>
                </div>
              </div>
            </div>

            {/* ── Column 2: Shop (3 cols) ──────────────────────────────── */}
            <div className="lg:col-span-3 space-y-3">
              <h4 className="font-bold text-white text-xs sm:text-sm uppercase tracking-wider border-b border-zinc-800 pb-2">
                Shop
              </h4>
              <ul className="space-y-2.5 text-slate-400 text-xs sm:text-sm">
                <li>
                  <Link href="/shop" className="hover:text-[#E52521] transition-colors">
                    All Products
                  </Link>
                </li>
                <li>
                  <Link href="/categories" className="hover:text-[#E52521] transition-colors">
                    Categories
                  </Link>
                </li>
                <li>
                  <Link href="/brands" className="hover:text-[#E52521] transition-colors">
                    Brands
                  </Link>
                </li>
                <li>
                  <Link href="/model-explorer" className="hover:text-[#E52521] transition-colors">
                    Models
                  </Link>
                </li>
                <li>
                  <Link href="/shop?sort=newest" className="hover:text-[#E52521] transition-colors">
                    New Arrivals
                  </Link>
                </li>
              </ul>
            </div>

            {/* ── Column 3: Customer Support (2 cols) ──────────────────── */}
            <div className="lg:col-span-2 space-y-3">
              <h4 className="font-bold text-white text-xs sm:text-sm uppercase tracking-wider border-b border-zinc-800 pb-2">
                Customer Support
              </h4>
              <ul className="space-y-2.5 text-slate-400 text-xs sm:text-sm">
                <li>
                  <Link href="/contact" className="hover:text-[#E52521] transition-colors">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/track-order" className="hover:text-[#E52521] transition-colors">
                    Track Order
                  </Link>
                </li>
                <li>
                  <Link href="/shipping-policy" className="hover:text-[#E52521] transition-colors">
                    Shipping
                  </Link>
                </li>
                <li>
                  <Link href="/return-refund-policy" className="hover:text-[#E52521] transition-colors">
                    Returns
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-[#E52521] transition-colors">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>

            {/* ── Column 4: Business (3 cols) ──────────────────────────── */}
            <div className="lg:col-span-3 space-y-3">
              <h4 className="font-bold text-white text-xs sm:text-sm uppercase tracking-wider border-b border-zinc-800 pb-2">
                Business
              </h4>
              <ul className="space-y-2.5 text-slate-400 text-xs sm:text-sm">
                <li>
                  <Link href="/wholesale" className="hover:text-white transition-colors font-medium text-[#E52521]">
                    Wholesale
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-[#E52521] transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/privacy-policy" className="hover:text-[#E52521] transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms-and-conditions" className="hover:text-[#E52521] transition-colors">
                    Terms &amp; Conditions
                  </Link>
                </li>
              </ul>

              {/* Direct WhatsApp CTA Button */}
              <div className="pt-2">
                <Link
                  href="https://wa.me/917295096715?text=Hello%20Abhay%20Technicals,%20I%20have%20an%20enquiry."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded bg-[#25D366] hover:bg-[#20BD5A] text-white font-bold text-xs sm:text-sm transition-all shadow-xs min-h-[44px]"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>Chat on WhatsApp</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* ── Bottom Sub-Footer Bar ────────────────────────────────────────── */}
        <div className="border-t border-zinc-800 bg-[#000000] py-4 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-xs sm:text-[13px] text-slate-400">
            <div>
              &copy; {new Date().getFullYear()} ABHAY TECHNICALS. All rights reserved.
            </div>

            {/* Payment Trust Badges */}
            <div className="flex items-center gap-3 text-slate-400">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>100% Secure Checkout</span>
              </span>
              <span>•</span>
              <span>UPI, Cards, Net Banking</span>
            </div>
          </div>
        </div>
      </footer>

      {/* ── Mobile Sticky Bottom Navigation (Touch target >= 44px) ─────────── */}
      <nav
        aria-label="Mobile Navigation"
        className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-[#E2E8F0] px-2 py-1.5 flex items-center justify-around shadow-lg"
      >
        <Link
          href="/"
          className={`flex flex-col items-center justify-center p-1 min-h-[44px] min-w-[44px] transition-colors ${
            pathname === '/' ? 'text-[#E52521] font-bold' : 'text-slate-600 hover:text-[#E52521]'
          }`}
        >
          <Home className="w-5 h-5" />
          <span className="text-[11px] font-semibold mt-0.5">Home</span>
        </Link>

        <Link
          href="/categories"
          className={`flex flex-col items-center justify-center p-1 min-h-[44px] min-w-[44px] transition-colors ${
            pathname.startsWith('/categories') ? 'text-[#E52521] font-bold' : 'text-slate-600 hover:text-[#E52521]'
          }`}
        >
          <Grid className="w-5 h-5" />
          <span className="text-[11px] font-semibold mt-0.5">Categories</span>
        </Link>

        <Link
          href="/model-explorer"
          className="flex flex-col items-center justify-center p-1 min-h-[44px] min-w-[44px] text-[#E52521]"
        >
          <div className="w-9 h-9 rounded-full bg-[#E52521] text-white flex items-center justify-center -mt-4 shadow-md border-2 border-white">
            <Search className="w-4 h-4" />
          </div>
          <span className="text-[11px] font-bold mt-0.5">Search</span>
        </Link>

        <Link
          href="/wishlist"
          className={`flex flex-col items-center justify-center p-1 min-h-[44px] min-w-[44px] transition-colors ${
            pathname.startsWith('/wishlist') ? 'text-[#E52521] font-bold' : 'text-slate-600 hover:text-[#E52521]'
          }`}
        >
          <Heart className="w-5 h-5" />
          <span className="text-[11px] font-semibold mt-0.5">Wishlist</span>
        </Link>

        <Link
          href={user ? '/account' : '/login'}
          className={`flex flex-col items-center justify-center p-1 min-h-[44px] min-w-[44px] transition-colors ${
            pathname.startsWith('/account') || pathname.startsWith('/login')
              ? 'text-[#E52521] font-bold'
              : 'text-slate-600 hover:text-[#E52521]'
          }`}
        >
          <User className="w-5 h-5" />
          <span className="text-[11px] font-semibold mt-0.5">{user ? 'Account' : 'Sign In'}</span>
        </Link>
      </nav>
    </>
  );
}
