'use client';

import React from 'react';
import Link from 'next/link';
import { Phone, MessageCircle } from 'lucide-react';

interface WhatsAppCTAProps {
  phone?: string;
  presetText?: string;
  className?: string;
  isFloating?: boolean;
}

export function WhatsAppCTA({
  phone = '917395096715',
  presetText = 'Hello Abhay Technicals, I have a query regarding spare parts / wholesale availability.',
  className = '',
  isFloating = false,
}: WhatsAppCTAProps) {
  const encodedText = encodeURIComponent(presetText);
  const waUrl = `https://wa.me/${phone}?text=${encodedText}`;

  if (isFloating) {
    return (
      <Link
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-20 lg:bottom-6 right-6 z-40 flex items-center gap-2 py-3 px-4 rounded-full bg-brand-whatsapp hover:bg-brand-whatsapp-dark text-white font-bold text-xs shadow-xl shadow-emerald-500/30 transition-all hover:scale-105 active:scale-95 select-none"
        aria-label="Direct WhatsApp Enquiry"
      >
        <MessageCircle className="w-5 h-5 fill-white" />
        <span className="hidden sm:inline">WhatsApp Enquiry</span>
      </Link>
    );
  }

  return (
    <Link
      href={waUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-brand-whatsapp hover:bg-brand-whatsapp-dark text-white font-bold text-xs transition-all shadow-xs min-h-[44px] ${className}`}
    >
      <MessageCircle className="w-4 h-4 fill-white" />
      <span>Chat on WhatsApp</span>
    </Link>
  );
}
