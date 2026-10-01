import React from 'react';

export const metadata = {
  title: 'Privacy Policy',
  description: 'Abhay Technicals privacy policy: WhatsApp authentication, address data usage, and zero data brokering guarantees.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="space-y-6 max-w-3xl mx-auto py-6 text-xs text-content-secondary leading-relaxed">
      <h1 className="text-2xl font-extrabold text-content-primary">Privacy Policy</h1>
      <p className="text-[11px] text-content-muted">Last Updated: September 25, 2026</p>

      <section className="space-y-2">
        <h2 className="text-sm font-bold text-content-primary">1. Information We Collect</h2>
        <p>
          Abhay Technicals collects minimal customer information strictly necessary to process wholesale
          orders and dispatch replacement hardware:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>
            <strong>Mobile Phone Number:</strong> Used exclusively for passwordless WhatsApp OTP
            authentication and shipment delivery updates.
          </li>
          <li>
            <strong>Delivery Address & Pincode:</strong> Used to calculate Delhivery surface freight
            rates and hand over parcels to couriers.
          </li>
          <li>
            <strong>Business Name & GSTIN:</strong> Provided voluntarily by mobile repair technicians
            seeking B2B commercial tax invoice credit.
          </li>
        </ul>
      </section>

      <section className="space-y-2">
        <h2 className="text-sm font-bold text-content-primary">2. Token Storage & Security</h2>
        <p>
          We employ split-token authentication. Refresh tokens are stored strictly in secure,
          HttpOnly cookies that cannot be accessed by client-side browser scripts. Short-lived access
          tokens reside only in application memory.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-sm font-bold text-content-primary">3. Zero Third-Party Data Sale</h2>
        <p>
          We do not sell, rent, or lease customer contact lists or repair shop technician data to any
          third parties or advertising broker networks.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-sm font-bold text-content-primary">4. Contacting Data Protection</h2>
        <p>
          For privacy inquiries, contact our privacy desk at{' '}
          <strong className="text-content-primary">support@abhaytechnicals.com</strong> or WhatsApp{' '}
          <strong className="text-content-primary">+91 73950 96715</strong>.
        </p>
      </section>
    </div>
  );
}
