import React from 'react';

export const metadata = {
  title: 'Terms & Conditions',
  description: 'Terms of sale, wholesale tier pricing rules, and technical disclaimer for Abhay Technicals.',
};

export default function TermsPage() {
  return (
    <div className="space-y-6 max-w-3xl mx-auto py-6 text-xs text-content-secondary leading-relaxed">
      <h1 className="text-2xl font-extrabold text-content-primary">Terms & Conditions of Sale</h1>
      <p className="text-[11px] text-content-muted">Last Updated: September 25, 2026</p>

      <section className="space-y-2">
        <h2 className="text-sm font-bold text-content-primary">1. Wholesale Pricing & Minimum Order Quantities</h2>
        <p>
          Wholesale volume discount slabs operate under a LOGIN_GATED architecture. Applicable discounts
          depend on meeting the minimum piece quantity for each specific SKU. Minimum Order Quantities
          (MOQs) are strictly enforced at checkout.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-sm font-bold text-content-primary">2. Trademark & OEM Compatibility Disclaimer</h2>
        <p>
          All product names, brand references (Apple, Vivo, Realme, Oppo, Xiaomi, Samsung, etc.), and
          handset identifiers belong exclusively to their respective registered trademark holders. Abhay
          Technicals supplies compatible replacement spare parts designed to meet original hardware
          specifications.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-sm font-bold text-content-primary">3. Testing Responsibility Before Installation</h2>
        <p>
          Mobile technicians are required to perform a bench test on replacement displays, batteries,
          and charging flexes before applying frame glue or breaking protective warranty seals.
        </p>
      </section>
    </div>
  );
}
