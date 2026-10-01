'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ShieldCheck,
  Phone,
  KeyRound,
  AlertCircle,
  ArrowRight,
  RefreshCw,
  Lock,
} from 'lucide-react';
import { useAuth } from '../../providers/auth-provider';

export default function LoginPage() {
  const router = useRouter();
  const { requestOtp, verifyOtp } = useAuth();

  const [step, setStep] = useState<'PHONE' | 'OTP'>('PHONE');
  const [phone, setPhone] = useState('9876543210');
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleRequestOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);

    const cleanPhone = phone.trim().replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      setError('Please enter a valid 10-digit Indian mobile number.');
      return;
    }

    setIsLoading(true);
    try {
      const res = await requestOtp(cleanPhone);
      setSuccessMsg(res?.message || 'Verification OTP code sent to your WhatsApp.');
      setStep('OTP');
    } catch (err: any) {
      // Offline fallback guidance during development
      if (err.message?.includes('fetch') || err.message?.includes('API Error') || err.message?.includes('Network')) {
        setSuccessMsg('Development Mode: Enter any 6-digit code (e.g. 123456) to sign in.');
        setStep('OTP');
      } else {
        setError(err.message || 'Unable to send OTP. Please check your phone number.');
      }
    } finally {
      setIsLoading(false);
    }
  };

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
      await verifyOtp(cleanPhone, cleanOtp);
      router.push('/account');
    } catch (err: any) {
      setError(err.message || 'Invalid or expired OTP code. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="py-12 px-4 max-w-md mx-auto space-y-6">
      {/* Brand Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-[#E52521] text-white shadow-xs">
          <Lock className="w-6 h-6 stroke-[2.5]" />
        </div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
          Sign In with Mobile OTP
        </h1>
        <p className="text-xs text-slate-600 max-w-sm mx-auto leading-relaxed">
          Enter your 10-digit mobile number to sign in. A 6-digit verification code will be sent to your WhatsApp.
        </p>
      </div>

      {/* Login Card Form */}
      <div className="bg-white border border-[#CBD5E1] rounded-md p-6 sm:p-8 shadow-xs space-y-5">
        {error && (
          <div className="p-3 rounded bg-red-50 border border-red-200 text-xs text-[#E52521] font-medium flex items-start gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-[#E52521]" />
            <span>{error}</span>
          </div>
        )}

        {successMsg && (
          <div className="p-3 rounded bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 font-medium">
            {successMsg}
          </div>
        )}

        {step === 'PHONE' ? (
          <form onSubmit={handleRequestOtp} className="space-y-4 text-xs">
            <div>
              <label htmlFor="phone" className="block font-bold text-slate-800 mb-1">
                Mobile Number <span className="text-[#E52521]">*</span>
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
              <p className="text-[11px] text-slate-500 mt-1.5">
                Enter your mobile number. A 6-digit verification OTP code will be sent to your WhatsApp.
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
                  <span>Sending OTP Code...</span>
                </>
              ) : (
                <>
                  <span>Send OTP Code</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp} className="space-y-4 text-xs">
            <div>
              <label htmlFor="otp" className="block font-bold text-slate-800 mb-1">
                Enter 6-Digit OTP Code
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
                OTP code sent to +91 {phone} via WhatsApp
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
                  <span>Verifying Code...</span>
                </>
              ) : (
                <>
                  <span>Verify OTP &amp; Sign In</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => setStep('PHONE')}
              className="w-full text-center text-xs text-slate-600 hover:text-slate-900 transition-colors pt-1"
            >
              Change mobile number
            </button>
          </form>
        )}

        <div className="pt-4 border-t border-[#E2E8F0] space-y-3">
          <div className="text-center text-xs text-slate-600">
            Don&apos;t have an account yet?{' '}
            <Link
              href="/register"
              className="font-bold text-[#E52521] hover:underline"
            >
              Create Account
            </Link>
          </div>

          <div className="p-3 bg-red-50/60 rounded-md border border-red-200/60 flex items-center justify-between gap-3 text-xs">
            <div className="text-left">
              <span className="font-bold text-slate-900 block text-[11px]">
                Mobile Repair Workshop Owner?
              </span>
              <span className="text-[10px] text-slate-500">
                Unlock technician wholesale rates &amp; GST tax invoices.
              </span>
            </div>
            <Link
              href="/register?type=wholesale"
              className="px-2.5 py-1.5 bg-[#E52521] hover:bg-[#C61E1A] text-white font-bold text-[10px] rounded transition-colors shrink-0"
            >
              Register &rarr;
            </Link>
          </div>

          <div className="text-center text-[11px] text-slate-400">
            <span>Safe &amp; Secure • Passwordless OTP Authentication • Abhay Technicals</span>
          </div>
        </div>
      </div>
    </div>
  );
}
