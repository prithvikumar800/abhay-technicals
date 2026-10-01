'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { MapPin, ArrowLeft, Plus, Trash2, CheckCircle2 } from 'lucide-react';
import { mockSavedAddresses } from '../../../lib/mock-data';
import { DeliveryAddress } from '../../../types';

export default function SavedAddressesPage() {
  const [addresses, setAddresses] = useState<DeliveryAddress[]>(mockSavedAddresses);

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between">
        <Link
          href="/account"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-content-secondary hover:text-brand-primary"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Account</span>
        </Link>
      </div>

      <div>
        <h1 className="text-2xl font-extrabold text-content-primary">Saved Delivery Addresses</h1>
        <p className="text-xs text-content-secondary mt-0.5">
          Manage your workshop locations and store delivery addresses.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {addresses.map((addr) => (
          <div
            key={addr.id}
            className="p-5 rounded-2xl bg-surface-card border border-border-subtle shadow-xs space-y-3 text-xs"
          >
            <div className="flex items-center justify-between">
              <span className="font-bold text-sm text-content-primary">{addr.name}</span>
              {addr.isDefault && (
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-sky-50 text-brand-accent border border-sky-200">
                  Default Address
                </span>
              )}
            </div>

            <div className="text-content-secondary space-y-0.5">
              <p>{addr.addressLine1}</p>
              <p>
                {addr.city}, {addr.state} —{' '}
                <strong className="font-mono font-bold text-content-primary">{addr.pincode}</strong>
              </p>
              <p className="font-mono text-content-muted pt-1">Contact: {addr.phone}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
