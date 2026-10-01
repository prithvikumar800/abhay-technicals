'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ShieldCheck,
  Truck,
  CreditCard,
  MapPin,
  Phone,
  Building,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  Clock,
  Package,
} from 'lucide-react';
import { useCart } from '../../providers/cart-provider';
import { useAuth } from '../../providers/auth-provider';
import { Button } from '../../components/ui/Button';

function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, shippingFee, clearCart } = useCart();
  const { user } = useAuth();

  // Customer Contact State
  const [name, setName] = useState(user?.name || 'Suresh Kumar');
  const [phone, setPhone] = useState(user?.phone || '9876543210');
  const [businessName, setBusinessName] = useState(user?.businessName || '');
  const [gstin, setGstin] = useState(user?.gstin || '');

  // Shipping Address State
  const [addressLine1, setAddressLine1] = useState('Shop #14, Nehru Place Cell Market');
  const [city, setCity] = useState('New Delhi');
  const [state, setState] = useState('Delhi');
  const [pincode, setPincode] = useState('110019');

  // Delhivery Mock Serviceability Check
  const [isPincodeChecked, setIsPincodeChecked] = useState(true);
  const [isServiceable, setIsServiceable] = useState(true);

  // Payment Selection
  const [paymentMethod, setPaymentMethod] = useState<'RAZORPAY_UPI' | 'CASHFREE_CARD'>('RAZORPAY_UPI');
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePincodeChange = (val: string) => {
    const clean = val.replace(/\D/g, '').slice(0, 6);
    setPincode(clean);
    if (clean.length === 6) {
      if (clean.startsWith('0') || clean === '999999') {
        setIsServiceable(false);
      } else {
        setIsServiceable(true);
      }
      setIsPincodeChecked(true);
    } else {
      setIsPincodeChecked(false);
    }
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (items.length === 0) {
      setError('Your shopping cart is empty.');
      return;
    }

    if (!isServiceable) {
      setError('Delivery address pincode is currently unserviceable by Delhivery.');
      return;
    }

    setIsPlacingOrder(true);

    // Simulate backend order creation & prepaid sandbox transaction
    setTimeout(() => {
      const generatedOrderId = `ord-${Date.now().toString().slice(-4)}`;
      clearCart();
      setIsPlacingOrder(false);
      router.push(`/account/orders/AT-2026-${Date.now().toString().slice(-5)}?placed=true`);
    }, 1200);
  };

  const grandTotal = subtotal + shippingFee;

  if (items.length === 0) {
    return (
      <div className="py-16 text-center max-w-md mx-auto space-y-4">
        <h1 className="text-xl font-bold text-content-primary">No Items to Checkout</h1>
        <p className="text-xs text-content-secondary">
          Your cart has no components. Add items from the catalogue before proceeding.
        </p>
        <Link
          href="/shop"
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-brand-primary text-white text-xs font-bold rounded-lg"
        >
          <span>Return to Shop</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-content-primary">Direct Technician Checkout</h1>
        <p className="text-xs text-content-secondary mt-0.5">
          Prepaid order dispatch via Delhivery Surface Logistics.
        </p>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left Column (2 cols): Contact, Delivery & Payment */}
        <div className="lg:col-span-2 space-y-6">
          {/* Section 1: Customer Contact & Wholesale Details */}
          <div className="bg-surface-card p-6 rounded-2xl border border-border-subtle shadow-xs space-y-4">
            <h2 className="text-sm font-bold text-content-primary flex items-center gap-2 border-b border-border-subtle pb-3">
              <Phone className="w-4 h-4 text-brand-accent" />
              <span>1. Contact & Business Information</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-semibold text-content-primary mb-1">
                  Full Name / Contact Person <span className="text-status-error">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Suresh Kumar"
                  className="w-full px-3 py-2 bg-surface-subtle border border-border-subtle rounded-lg text-content-primary focus:outline-none focus:ring-2 focus:ring-brand-accent min-h-[44px]"
                />
              </div>

              <div>
                <label className="block font-semibold text-content-primary mb-1">
                  Mobile Number (WhatsApp) <span className="text-status-error">*</span>
                </label>
                <input
                  type="tel"
                  required
                  maxLength={10}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                  placeholder="9876543210"
                  className="w-full px-3 py-2 bg-surface-subtle border border-border-subtle rounded-lg font-mono text-content-primary focus:outline-none focus:ring-2 focus:ring-brand-accent min-h-[44px]"
                />
              </div>

              <div>
                <label className="block font-semibold text-content-primary mb-1">
                  Mobile Repair Shop / Business Name (Optional)
                </label>
                <input
                  type="text"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  placeholder="e.g. Suresh Cell Care"
                  className="w-full px-3 py-2 bg-surface-subtle border border-border-subtle rounded-lg text-content-primary focus:outline-none focus:ring-2 focus:ring-brand-accent min-h-[44px]"
                />
              </div>

              <div>
                <label className="block font-semibold text-content-primary mb-1">
                  B2B GSTIN (For Wholesale Tax Invoice Credit)
                </label>
                <input
                  type="text"
                  maxLength={15}
                  value={gstin}
                  onChange={(e) => setGstin(e.target.value.toUpperCase())}
                  placeholder="e.g. 07AAAAA0000A1Z5"
                  className="w-full px-3 py-2 bg-surface-subtle border border-border-subtle rounded-lg font-mono uppercase text-content-primary focus:outline-none focus:ring-2 focus:ring-brand-accent min-h-[44px]"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Delivery Address & Delhivery Verification */}
          <div className="bg-surface-card p-6 rounded-2xl border border-border-subtle shadow-xs space-y-4">
            <h2 className="text-sm font-bold text-content-primary flex items-center gap-2 border-b border-border-subtle pb-3">
              <MapPin className="w-4 h-4 text-brand-accent" />
              <span>2. Delivery Destination Address</span>
            </h2>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-content-primary mb-1">
                  Workshop / Shop Street Address <span className="text-status-error">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={addressLine1}
                  onChange={(e) => setAddressLine1(e.target.value)}
                  placeholder="Shop number, floor, market complex name..."
                  className="w-full px-3 py-2 bg-surface-subtle border border-border-subtle rounded-lg text-content-primary focus:outline-none focus:ring-2 focus:ring-brand-accent min-h-[44px]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold text-content-primary mb-1">
                    City <span className="text-status-error">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-3 py-2 bg-surface-subtle border border-border-subtle rounded-lg text-content-primary focus:outline-none focus:ring-2 focus:ring-brand-accent min-h-[44px]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-content-primary mb-1">
                    State <span className="text-status-error">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="w-full px-3 py-2 bg-surface-subtle border border-border-subtle rounded-lg text-content-primary focus:outline-none focus:ring-2 focus:ring-brand-accent min-h-[44px]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-content-primary mb-1">
                    Pincode <span className="text-status-error">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={6}
                    value={pincode}
                    onChange={(e) => handlePincodeChange(e.target.value)}
                    placeholder="110019"
                    className="w-full px-3 py-2 bg-surface-subtle border border-border-subtle rounded-lg font-mono font-bold text-content-primary focus:outline-none focus:ring-2 focus:ring-brand-accent min-h-[44px]"
                  />
                </div>
              </div>

              {/* Delhivery Pincode Status */}
              {isPincodeChecked && (
                <div
                  className={`p-3 rounded-xl border text-xs flex items-center gap-2 ${
                    isServiceable
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                      : 'bg-rose-50 text-rose-800 border-rose-200'
                  }`}
                >
                  {isServiceable ? (
                    <>
                      <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>
                        <strong>Delhivery Verified:</strong> Pincode {pincode} is serviceable for Surface Express.
                      </span>
                    </>
                  ) : (
                    <>
                      <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                      <span>
                        <strong>Courier Unserviceable:</strong> Delhivery does not currently service pincode {pincode}.
                      </span>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Section 3: Payment Method Selection */}
          <div className="bg-surface-card p-6 rounded-2xl border border-border-subtle shadow-xs space-y-4">
            <h2 className="text-sm font-bold text-content-primary flex items-center gap-2 border-b border-border-subtle pb-3">
              <CreditCard className="w-4 h-4 text-brand-accent" />
              <span>3. Prepaid Payment Gateway (Sandbox Mode)</span>
            </h2>

            <div className="space-y-3 text-xs">
              <label
                className={`p-4 rounded-xl border flex items-center gap-3 cursor-pointer transition-all ${
                  paymentMethod === 'RAZORPAY_UPI'
                    ? 'border-brand-primary bg-red-50/40'
                    : 'border-border-subtle bg-surface-subtle'
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  value="RAZORPAY_UPI"
                  checked={paymentMethod === 'RAZORPAY_UPI'}
                  onChange={() => setPaymentMethod('RAZORPAY_UPI')}
                  className="text-brand-accent focus:ring-brand-accent"
                />
                <div>
                  <span className="font-bold text-content-primary block">
                    Instant UPI & QR Code (Razorpay Mock Sandbox)
                  </span>
                  <span className="text-content-secondary text-[11px]">
                    Pay using Google Pay, PhonePe, Paytm, or BHIM. Zero payment gateway surcharge.
                  </span>
                </div>
              </label>

              <label
                className={`p-4 rounded-xl border flex items-center gap-3 cursor-pointer transition-all ${
                  paymentMethod === 'CASHFREE_CARD'
                    ? 'border-brand-primary bg-red-50/40'
                    : 'border-border-subtle bg-surface-subtle'
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  value="CASHFREE_CARD"
                  checked={paymentMethod === 'CASHFREE_CARD'}
                  onChange={() => setPaymentMethod('CASHFREE_CARD')}
                  className="text-brand-accent focus:ring-brand-accent"
                />
                <div>
                  <span className="font-bold text-content-primary block">
                    Debit / Credit Card / Net Banking (Cashfree Mock Sandbox)
                  </span>
                  <span className="text-content-secondary text-[11px]">
                    Visa, MasterCard, RuPay, and major Indian banking portals supported.
                  </span>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Right Column: Order Review & Place Order */}
        <div className="space-y-4">
          <div className="bg-surface-card rounded-2xl border border-border-subtle p-6 shadow-xs space-y-4">
            <h2 className="text-sm font-bold text-content-primary border-b border-border-subtle pb-3">
              Order Review ({items.length} items)
            </h2>

            {/* Compact Items List */}
            <div className="space-y-3 max-h-60 overflow-y-auto divide-y divide-border-subtle pr-1 text-xs">
              {items.map((i) => (
                <div key={i.product.id} className="pt-2 first:pt-0 flex justify-between gap-2">
                  <div className="truncate">
                    <span className="font-semibold text-content-primary truncate block">
                      {i.product.title}
                    </span>
                    <span className="text-[10px] text-content-muted font-mono">
                      {i.quantity} pcs × ₹{i.unitPrice.toFixed(2)}
                    </span>
                  </div>
                  <span className="font-mono font-bold text-content-primary shrink-0">
                    ₹{i.lineTotal.toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            {/* Calculations */}
            <div className="pt-3 border-t border-border-subtle space-y-2 text-xs">
              <div className="flex justify-between text-content-secondary">
                <span>Subtotal</span>
                <span className="font-mono">₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-content-secondary">
                <span>Delhivery Surface Express</span>
                <span className="font-mono font-medium">
                  {shippingFee === 0 ? <span className="text-emerald-700">FREE</span> : `₹${shippingFee.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between text-content-secondary">
                <span>GST (18% inclusive)</span>
                <span className="font-mono text-content-muted">Included</span>
              </div>

              <div className="pt-3 border-t border-border-subtle flex justify-between items-baseline text-sm font-extrabold text-content-primary">
                <span>Amount to Pay</span>
                <span className="text-xl font-mono text-brand-primary">
                  ₹{grandTotal.toFixed(2)}
                </span>
              </div>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              isLoading={isPlacingOrder}
              disabled={!isServiceable || isPlacingOrder}
              className="w-full font-bold"
            >
              <span>Authorize & Place Order</span>
              <ArrowRight className="w-4 h-4 ml-1.5" />
            </Button>

            <div className="text-[11px] text-content-muted text-center pt-2 space-y-1">
              <p>🔒 256-bit encrypted checkout transmission.</p>
              <p>Tracking AWB generated automatically upon dispatch.</p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default CheckoutPage;
