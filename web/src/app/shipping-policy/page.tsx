import React from 'react';

export const metadata = {
  title: 'Shipping & Delivery Policy — Delhivery Logistics',
  description: 'Shipping timelines, Delhivery surface courier details, packaging standards, and tracking procedures.',
};

export default function ShippingPolicyPage() {
  return (
    <div className="space-y-6 max-w-3xl mx-auto py-6 text-xs text-content-secondary leading-relaxed">
      <h1 className="text-2xl font-extrabold text-content-primary">Shipping & Delivery Policy</h1>
      <p className="text-[11px] text-content-muted">Last Updated: September 25, 2026</p>

      <section className="space-y-2">
        <h2 className="text-sm font-bold text-content-primary">1. Logistics Carrier: Delhivery Surface Express</h2>
        <p>
          All customer and technician wholesale orders are manifested and dispatched exclusively via{' '}
          <strong>Delhivery Surface Logistics</strong>. Automated waybills (AWBs) are generated upon
          manifest completion.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-sm font-bold text-content-primary">2. Dispatch & Transit Timelines</h2>
        <p>
          Orders verified before 3:00 PM IST on working days are manifested and handed over to
          Delhivery the same day. Typical surface delivery timelines:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Delhi NCR & North Hubs: 1 – 2 Business Days</li>
          <li>Metro Cities (Mumbai, Bengaluru, Kolkata, Chennai): 3 – 5 Business Days</li>
          <li>Rest of India & Remote Districts: 4 – 7 Business Days</li>
        </ul>
      </section>

      <section className="space-y-2">
        <h2 className="text-sm font-bold text-content-primary">3. Freight Charges & Free Shipping</h2>
        <p>
          Orders with items subtotaling ₹999 or more qualify for <strong>FREE Delhivery Shipping</strong>.
          Orders below ₹999 incur a flat surface courier fee of ₹49.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-sm font-bold text-content-primary">4. Packaging Safety</h2>
        <p>
          Fragile parts (touch glass, LCD modules, camera lenses, and batteries) are packaged in
          anti-static shielding and multi-layer bubble wrap to prevent damage during transit.
        </p>
      </section>
    </div>
  );
}
