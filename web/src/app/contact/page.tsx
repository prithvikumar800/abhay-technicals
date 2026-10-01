import React from 'react';
import { Phone, Mail, Clock, MapPin, MessageCircle } from 'lucide-react';
import { WhatsAppCTA } from '../../components/common/WhatsAppCTA';

export const metadata = {
  title: 'Contact Abhay Technicals — Support & Logistics Desk',
  description: 'Reach Abhay Technicals for order queries, Delhivery dispatch updates, part compatibility checks, and wholesale orders via WhatsApp or Email.',
};

export default function ContactPage() {
  return (
    <div className="space-y-10 max-w-4xl mx-auto py-6">
      <div className="space-y-2">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-content-primary">
          Contact Customer Care & Technical Desk
        </h1>
        <p className="text-xs sm:text-sm text-content-secondary">
          Need help locating a rare replacement IC, checking Delhivery pincode serviceability, or
          verifying compatibility? Get in touch with our team.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
        {/* Contact Information Cards */}
        <div className="space-y-4">
          <div className="p-6 rounded-2xl bg-surface-card border border-border-subtle shadow-xs space-y-4">
            <h2 className="text-sm font-bold text-content-primary border-b border-border-subtle pb-3">
              Official Contact Channels
            </h2>

            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-semibold text-content-primary block">Official WhatsApp Helpline:</span>
                  <span className="font-mono text-brand-primary font-bold">+91 73950 96715</span>
                  <p className="text-[11px] text-content-muted mt-0.5">
                    Fastest response for order tracking & compatibility confirmations.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-sky-50 text-brand-accent flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-semibold text-content-primary block">Official Support Email:</span>
                  <span className="font-mono text-content-primary">support@abhaytechnicals.com</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-semibold text-content-primary block">Support Working Hours:</span>
                  <p className="text-content-secondary">Monday to Saturday: 10:00 AM – 8:00 PM IST</p>
                  <p className="text-[11px] text-content-muted">Sunday: Closed / Dispatch Processing</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* WhatsApp Direct Contact Block */}
        <div className="p-6 rounded-2xl bg-gradient-to-br from-brand-primary to-slate-900 text-white flex flex-col justify-between space-y-6">
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-brand-whatsapp text-white flex items-center justify-center">
              <MessageCircle className="w-6 h-6 fill-white" />
            </div>
            <h3 className="text-lg font-bold">Instant Technician WhatsApp Support</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Message us directly with photo snapshots of your damaged phone logic board or battery label
              to confirm exact pinout compatibility before placing your order.
            </p>
          </div>

          <WhatsAppCTA
            presetText="Hello Abhay Technicals, I need help confirming compatibility for a replacement part."
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
}
