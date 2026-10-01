import React from 'react';
import Link from 'next/link';
import { HelpCircle, ChevronRight } from 'lucide-react';

export const metadata = {
  title: 'Frequently Asked Questions (FAQ) — Technician & Order Help',
  description: 'Common questions on ordering spare parts, wholesale volume slabs, Delhivery shipping timelines, and our 7-day testing warranty.',
};

export default function FaqPage() {
  const faqs = [
    {
      q: 'How does wholesale tier pricing work on Abhay Technicals?',
      a: 'We operate under a LOGIN_GATED wholesale policy. As soon as you sign in using your mobile number with the 6-digit OTP code sent to your WhatsApp, applicable tier discount slabs (e.g. 5+ pcs, 10+ pcs, 50+ pcs) unlock automatically on product cards and cart calculations.',
    },
    {
      q: 'What is your testing warranty policy for displays and batteries?',
      a: 'We provide a 7-day testing warranty. Technicians must dry-test components (connecting flex ribbons without peeling pre-installed adhesive or protective films). Once adhesive is pasted or warranty stickers are broken, items are non-returnable.',
    },
    {
      q: 'Which courier service delivers my orders?',
      a: 'All orders are manifested and shipped via Delhivery Surface Express across India. Every order receives an authentic tracking AWB waybill with live tracking milestones.',
    },
    {
      q: 'Can I claim GST tax credit on wholesale orders?',
      a: 'Yes. During checkout, provide your 15-character GSTIN. Your packing slip and digital invoice will include full B2B tax details for monthly input tax credit (ITC) filing.',
    },
    {
      q: 'How do I know if a part will fit my customer’s phone?',
      a: 'Use our Model Explorer part finder tool or check the "Guaranteed Handset Compatibility" badge on any product card. You can also send a photo of your logic board to our WhatsApp helpline.',
    },
  ];

  return (
    <div className="space-y-8 max-w-3xl mx-auto py-6">
      <div className="space-y-2">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-content-primary">
          Frequently Asked Questions
        </h1>
        <p className="text-xs sm:text-sm text-content-secondary">
          Clear answers regarding ordering, wholesale tier slabs, testing warranties, and dispatch.
        </p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, idx) => (
          <div
            key={idx}
            className="p-5 rounded-2xl bg-surface-card border border-border-subtle shadow-xs space-y-2 text-xs"
          >
            <h3 className="font-bold text-sm text-content-primary flex items-start gap-2">
              <span className="text-brand-accent">Q:</span>
              <span>{faq.q}</span>
            </h3>
            <p className="text-content-secondary pl-5 leading-relaxed">{faq.a}</p>
          </div>
        ))}
      </div>

      <div className="p-6 rounded-2xl bg-surface-subtle border border-border-subtle text-xs text-center space-y-2">
        <p className="font-semibold text-content-primary">Still have a question not listed here?</p>
        <p className="text-content-secondary">
          Contact our team directly on WhatsApp (+91 73950 96715) for immediate technical guidance.
        </p>
      </div>
    </div>
  );
}
