import React from 'react';

export const metadata = {
  title: 'Testing Warranty & Return/Refund Policy',
  description: '7-day testing warranty policy for displays, batteries, and charging flex sub-boards for mobile repair technicians.',
};

export default function ReturnPolicyPage() {
  return (
    <div className="space-y-6 max-w-3xl mx-auto py-6 text-xs text-content-secondary leading-relaxed">
      <h1 className="text-2xl font-extrabold text-content-primary">7-Day Testing Warranty & Returns Policy</h1>
      <p className="text-[11px] text-content-muted">Last Updated: September 25, 2026</p>

      <section className="space-y-2">
        <h2 className="text-sm font-bold text-content-primary">1. 7-Day Bench Testing Warranty</h2>
        <p>
          We provide a comprehensive 7-day testing replacement warranty on displays, batteries, and
          sub-boards from the date of Delhivery physical delivery.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-sm font-bold text-content-primary">2. Strict Bench-Test Requirement (Dry Testing)</h2>
        <p>
          Technicians must bench-test components before physical frame installation:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>
            <strong>Connect Flex Cables Only:</strong> Check touch response, display resolution, and
            charging current without applying T-7000/B-7000 frame adhesive.
          </li>
          <li>
            <strong>Do Not Remove Protective Films:</strong> Items returned with removed, re-pasted,
            or folded protective plastic films are ineligible for replacement.
          </li>
          <li>
            <strong>Preserve Warranty Stamps:</strong> The Abhay Technicals warranty stamp and QC
            hologram on the component must remain intact.
          </li>
        </ul>
      </section>

      <section className="space-y-2">
        <h2 className="text-sm font-bold text-content-primary">3. Damaged on Arrival (DOA) Procedure</h2>
        <p>
          If your package arrives physically crushed or damaged by the courier, submit an unboxing
          video or photo to our WhatsApp helpline (+91 73950 96715) within 24 hours for immediate
          courier claim filing and replacement dispatch.
        </p>
      </section>
    </div>
  );
}
