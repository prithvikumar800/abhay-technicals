'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  ShieldCheck,
  Phone,
  KeyRound,
  AlertCircle,
  ArrowRight,
  RefreshCw,
  User,
  Building2,
  FileText,
  Wrench,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { useAuth } from '../../providers/auth-provider';

function RegisterContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialType = searchParams.get('type') === 'retail' ? 'RETAIL' : 'TECHNICIAN';

  const { requestOtp, createAccount } = useAuth();

  // Step state
  const [step, setStep] = useState<'DETAILS' | 'OTP'>('DETAILS');

  // Form fields
  const [accountType, setAccountType] = useState<'TECHNICIAN' | 'RETAIL'>(initialType);
  const [fullName, setFullName] = useState('');
  const [shopName, setShopName] = useState('');
  const [phone, setPhone] = useState('');
  const [gstin, setGstin] = useState('');
  const [agreeWhatsApp, setAgreeWhatsApp] = useState(true);

  // OTP field
  const [otp, setOtp] = useState('');

  // UI state
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Handle Step 1: Send WhatsApp OTP
  const handleRequestOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);

    const cleanName = fullName.trim();
    if (!cleanName) {
      setError('Please enter your full name.');
      return;
    }

    if (accountType === 'TECHNICIAN' && !shopName.trim()) {
      setError('Please enter your repair workshop or shop name.');
      return;
    }

    const cleanPhone = phone.trim().replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      setError('Please enter a valid 10-digit Indian mobile number.');
      return;
    }

    if (!agreeWhatsApp) {
      setError('Please allow verification OTP via WhatsApp to continue.');
      return;
    }

    setIsLoading(true);
    try {
      const res = await requestOtp(cleanPhone);
      setSuccessMsg(res?.message || `6-digit verification code sent to WhatsApp +91 ${cleanPhone}.`);
      setStep('OTP');
    } catch (err: any) {
      // Offline fallback guidance during development
      if (err.message?.includes('fetch') || err.message?.includes('API Error') || err.message?.includes('Network')) {
        setSuccessMsg('Development Mode: OTP simulated. Enter any 6-digit code (e.g. 123456) to complete registration.');
        setStep('OTP');
      } else {
        setError(err.message || 'Unable to dispatch verification OTP. Please verify your phone number.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Step 2: Verify OTP and Register
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const cleanOtp = otp.trim().replace(/\D/g, '');
    if (cleanOtp.length !== 6) {
      setError('Please enter the 6-digit OTP code received on WhatsApp.');
      return;
    }

    setIsLoading(true);
    try {
      const cleanPhone = phone.trim().replace(/\D/g, '');
      const business = accountType === 'TECHNICIAN' ? shopName.trim() : undefined;

      await createAccount({
        phone: cleanPhone,
        otp: cleanOtp,
        name: fullName.trim(),
        businessName: business,
        gstin: gstin.trim() ? gstin.trim().toUpperCase() : undefined,
      });

      router.push('/account');
    } catch (err: any) {
      setError(err.message || 'Invalid or expired verification code. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="py-8 sm:py-12 px-4 max-w-lg mx-auto space-y-6">
      {/* Brand Header */}
      <div className="text-center space-y-2 animate-fade-in-down">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-[#E52521] text-white shadow-xs">
          <User className="w-6 h-6 stroke-[2.5]" />
        </div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
          Create Abhay Technicals Account
        </h1>
        <p className="text-xs text-slate-600 max-w-sm mx-auto leading-relaxed">
          Join India&apos;s trusted mobile spare parts platform. Get wholesale rates, order tracking, and GST invoices.
        </p>
      </div>

      {/* Main Registration Card */}
      <div className="bg-white border border-[#CBD5E1] rounded-md p-6 sm:p-8 shadow-xs space-y-5 animate-fade-in-up delay-75 hover-lift">
        {/* Error Alert */}
        {error && (
          <div className="p-3 rounded bg-red-50 border border-red-200 text-xs text-[#E52521] font-medium flex items-start gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-[#E52521]" />
            <span>{error}</span>
          </div>
        )}

        {/* Success Alert */}
        {successMsg && (
          <div className="p-3 rounded bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 font-medium flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-emerald-600" />
            <span>{successMsg}</span>
          </div>
        )}

        {step === 'DETAILS' ? (
          <form onSubmit={handleRequestOtp} className="space-y-4 text-xs">
            {/* Account Type Selector */}
            <div>
              <label className="block font-bold text-slate-800 mb-1.5">
                Select Account Type <span className="text-[#E52521]">*</span>
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setAccountType('TECHNICIAN')}
                  className={`p-3 rounded-md border text-left transition-all min-h-[56px] flex flex-col justify-center ${
                    accountType === 'TECHNICIAN'
                      ? 'border-[#E52521] bg-red-50/60 ring-1 ring-[#E52521]'
                      : 'border-[#CBD5E1] bg-[#F8FAFC] hover:bg-slate-50 text-slate-600'
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <Wrench
                      className={`w-3.5 h-3.5 ${
                        accountType === 'TECHNICIAN' ? 'text-[#E52521]' : 'text-slate-400'
                      }`}
                    />
                    <span
                      className={`font-black text-[11px] ${
                        accountType === 'TECHNICIAN' ? 'text-[#E52521]' : 'text-slate-800'
                      }`}
                    >
                      Repair Technician
                    </span>
                  </div>
                  <span className="text-[10px] text-emerald-700 font-bold mt-0.5 flex items-center gap-1">
                    <Sparkles className="w-2.5 h-2.5 shrink-0" />
                    Wholesale Slab Pricing
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setAccountType('RETAIL')}
                  className={`p-3 rounded-md border text-left transition-all min-h-[56px] flex flex-col justify-center ${
                    accountType === 'RETAIL'
                      ? 'border-[#E52521] bg-red-50/60 ring-1 ring-[#E52521]'
                      : 'border-[#CBD5E1] bg-[#F8FAFC] hover:bg-slate-50 text-slate-600'
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <User
                      className={`w-3.5 h-3.5 ${
                        accountType === 'RETAIL' ? 'text-[#E52521]' : 'text-slate-400'
                      }`}
                    />
                    <span
                      className={`font-black text-[11px] ${
                        accountType === 'RETAIL' ? 'text-[#E52521]' : 'text-slate-800'
                      }`}
                    >
                      Retail Customer
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-500 mt-0.5">
                    Personal Device Repairs
                  </span>
                </button>
              </div>
            </div>

            {/* Full Name */}
            <div>
              <label htmlFor="fullName" className="block font-bold text-slate-800 mb-1">
                Full Name <span className="text-[#E52521]">*</span>
              </label>
              <div className="relative">
                <input
                  id="fullName"
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Abhay Sharma"
                  className="w-full px-3 py-2.5 bg-[#F8FAFC] border border-[#CBD5E1] rounded-md text-slate-900 font-sans focus:outline-none focus:ring-2 focus:ring-[#E52521] focus:bg-white min-h-[44px]"
                />
                <User className="absolute right-3 top-3 w-4 h-4 text-slate-400 pointer-events-none" />
              </div>
            </div>

            {/* Workshop / Shop Name (Shown for all, required for technicians) */}
            <div>
              <label htmlFor="shopName" className="block font-bold text-slate-800 mb-1">
                {accountType === 'TECHNICIAN' ? (
                  <>
                    Repair Workshop / Shop Name <span className="text-[#E52521]">*</span>
                  </>
                ) : (
                  <>Business Name (Optional)</>
                )}
              </label>
              <div className="relative">
                <input
                  id="shopName"
                  type="text"
                  required={accountType === 'TECHNICIAN'}
                  value={shopName}
                  onChange={(e) => setShopName(e.target.value)}
                  placeholder="e.g. Abhay Mobile Care & Repair"
                  className="w-full px-3 py-2.5 bg-[#F8FAFC] border border-[#CBD5E1] rounded-md text-slate-900 font-sans focus:outline-none focus:ring-2 focus:ring-[#E52521] focus:bg-white min-h-[44px]"
                />
                <Building2 className="absolute right-3 top-3 w-4 h-4 text-slate-400 pointer-events-none" />
              </div>
              {accountType === 'TECHNICIAN' && (
                <p className="text-[10px] text-slate-500 mt-1">
                  Used for wholesale account verification and technician tax invoices.
                </p>
              )}
            </div>

            {/* Mobile Number */}
            <div>
              <label htmlFor="phone" className="block font-bold text-slate-800 mb-1">
                WhatsApp Mobile Number <span className="text-[#E52521]">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500 font-mono font-bold">
                  +91
                </div>
                <input
                  id="phone"
                  type="tel"
                  required
                  maxLength={10}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="98765 43210"
                  className="w-full pl-12 pr-4 py-2.5 bg-[#F8FAFC] border border-[#CBD5E1] rounded-md text-slate-900 font-mono font-bold focus:outline-none focus:ring-2 focus:ring-[#E52521] focus:bg-white min-h-[44px]"
                />
                <Phone className="absolute right-3 top-3 w-4 h-4 text-slate-400 pointer-events-none" />
              </div>
              <p className="text-[11px] text-slate-500 mt-1">
                We will send your 6-digit login &amp; verification code directly to this WhatsApp number.
              </p>
            </div>

            {/* GSTIN (Optional) */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label htmlFor="gstin" className="font-bold text-slate-800">
                  GSTIN Number (Optional)
                </label>
                <span className="text-[10px] text-slate-400 font-medium">For 18% GST Input Credit</span>
              </div>
              <div className="relative">
                <input
                  id="gstin"
                  type="text"
                  maxLength={15}
                  value={gstin}
                  onChange={(e) => setGstin(e.target.value.toUpperCase())}
                  placeholder="e.g. 29ABCDE1234F1Z5"
                  className="w-full px-3 py-2.5 bg-[#F8FAFC] border border-[#CBD5E1] rounded-md text-slate-900 font-mono uppercase focus:outline-none focus:ring-2 focus:ring-[#E52521] focus:bg-white min-h-[44px]"
                />
                <FileText className="absolute right-3 top-3 w-4 h-4 text-slate-400 pointer-events-none" />
              </div>
            </div>

            {/* WhatsApp agreement checkbox */}
            <div className="pt-1">
              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreeWhatsApp}
                  onChange={(e) => setAgreeWhatsApp(e.target.checked)}
                  className="mt-0.5 rounded border-[#CBD5E1] text-[#E52521] focus:ring-[#E52521] w-4 h-4"
                />
                <span className="text-[11px] text-slate-600 leading-snug">
                  I agree to receive the 6-digit verification code and order dispatch updates via WhatsApp.
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-md bg-[#E52521] hover:bg-[#C61E1A] text-white font-bold text-xs sm:text-sm shadow-xs transition-all min-h-[44px] disabled:opacity-50 mt-2"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Sending Verification Code...</span>
                </>
              ) : (
                <>
                  <span>Send WhatsApp Verification Code</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp} className="space-y-4 text-xs">
            <div className="p-3 rounded-md bg-slate-50 border border-slate-200 space-y-1">
              <div className="text-[11px] text-slate-500 font-medium">Registering Account For:</div>
              <div className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
                <span>{fullName}</span>
                {shopName && (
                  <span className="text-slate-500 font-normal">({shopName})</span>
                )}
              </div>
              <div className="text-[11px] font-mono text-[#E52521] font-bold">
                WhatsApp: +91 {phone}
              </div>
            </div>

            <div>
              <label htmlFor="otp" className="block font-bold text-slate-800 mb-1">
                Enter 6-Digit WhatsApp OTP
              </label>
              <div className="relative">
                <input
                  id="otp"
                  type="text"
                  inputMode="numeric"
                  required
                  maxLength={6}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="123456"
                  autoFocus
                  className="w-full px-4 py-2.5 bg-[#F8FAFC] border border-[#CBD5E1] rounded-md text-center tracking-[0.4em] text-lg font-mono font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#E52521] focus:bg-white min-h-[44px]"
                />
                <KeyRound className="absolute right-3 top-3 w-4 h-4 text-slate-400 pointer-events-none" />
              </div>
              <p className="text-[11px] text-slate-500 mt-1.5 text-center">
                Check WhatsApp on +91 {phone} for your 6-digit security code.
              </p>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-md bg-[#E52521] hover:bg-[#C61E1A] text-white font-bold text-xs sm:text-sm shadow-xs transition-all min-h-[44px] disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Verifying &amp; Creating Account...</span>
                </>
              ) : (
                <>
                  <span>Complete Account Registration</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => setStep('DETAILS')}
              className="w-full text-center text-xs text-slate-600 hover:text-slate-900 transition-colors pt-1"
            >
              &larr; Back to edit details or change number
            </button>
          </form>
        )}

        {/* Existing User Link */}
        <div className="pt-3 border-t border-[#E2E8F0] text-center text-xs text-slate-600 space-y-2">
          <div>
            Already have an account?{' '}
            <Link
              href="/login"
              className="font-bold text-[#E52521] hover:underline"
            >
              Sign In with OTP
            </Link>
          </div>
          <div className="text-[11px] text-slate-400">
            Safe &amp; Secure • Fast Registration • Abhay Technicals
          </div>
        </div>
      </div>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <React.Suspense
      fallback={
        <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-4">
          <div className="text-slate-500 text-sm">Loading registration...</div>
        </div>
      }
    >
      <RegisterContent />
    </React.Suspense>
  );
}
