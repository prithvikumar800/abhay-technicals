'use client';

import React, { useState } from 'react';
import { useAuth } from '../../../lib/auth-context';
import { ShieldCheck, Phone, KeyRound, AlertCircle, ArrowRight, RefreshCw } from 'lucide-react';

export default function LoginPage() {
  const { requestOtp, verifyOtp } = useAuth();
  const [step, setStep] = useState<'PHONE' | 'OTP'>('PHONE');
  const [phone, setPhone] = useState('7395096715'); // default prefill for development convenience
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
      // In dev/mock mode or via backend
      const res = await requestOtp(cleanPhone);
      setSuccessMsg(res?.message || 'Verification OTP sent to your WhatsApp.');
      setStep('OTP');
    } catch (err: any) {
      // For development, if backend server is offline, allow fallback to step 2 with mock OTP guidance
      if (err.message?.includes('fetch') || err.message?.includes('API error') || err.message?.includes('Network')) {
        setSuccessMsg('Development Offline Mode: Enter any 6-digit code (e.g. 123456) to proceed.');
        setStep('OTP');
      } else {
        setError(err.message || 'Unable to request OTP. Please verify your phone number.');
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
      setError('Please enter the 6-digit OTP received on WhatsApp.');
      return;
    }

    setIsLoading(true);
    try {
      const cleanPhone = phone.trim().replace(/\D/g, '');
      await verifyOtp(cleanPhone, cleanOtp);
    } catch (err: any) {
      setError(err.message || 'Invalid or expired OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden">
      {/* Background Decorative Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-brand-accent/5 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white p-2 shadow-lg mb-3 ring-2 ring-brand-accent/20 border border-slate-200">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo.png"
              alt="Abhay Technicals Logo"
              className="w-full h-full object-contain"
            />
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">
            ABHAY <span className="text-brand-accent">TECHNICALS</span>
          </h1>
          <p className="text-xs text-brand-accent font-mono tracking-widest mt-1 font-semibold">ADMINISTRATIVE CONSOLE</p>
        </div>

        {/* Card */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xl">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-slate-900">
              {step === 'PHONE' ? 'Admin Authentication' : 'Enter WhatsApp Verification Code'}
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              {step === 'PHONE'
                ? 'Sign in using your authorized staff or administrator mobile number.'
                : `Enter the 6-digit verification code sent to +91 ${phone}.`}
            </p>
          </div>

          {error && (
            <div className="mb-5 p-3 rounded-lg bg-red-50 border border-red-200 flex items-start gap-2.5 text-xs text-red-700">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-600 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {successMsg && (
            <div className="mb-5 p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-xs text-emerald-800">
              {successMsg}
            </div>
          )}

          {step === 'PHONE' ? (
            <form onSubmit={handleRequestOtp} className="space-y-4">
              <div>
                <label htmlFor="phone" className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Mobile Number (WhatsApp)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500 text-xs font-mono font-medium">
                    +91
                  </div>
                  <input
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="98765 43210"
                    maxLength={10}
                    required
                    className="w-full pl-12 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-brand-accent focus:border-transparent transition-all font-mono"
                  />
                  <Phone className="absolute right-3 top-3 h-4 w-4 text-slate-400 pointer-events-none" />
                </div>
                <p className="text-[11px] text-slate-500 mt-1.5">
                  Supported Roles: <span className="text-slate-800 font-mono font-semibold">ADMIN</span>, <span className="text-slate-800 font-mono font-semibold">STAFF</span>
                </p>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-brand-accent hover:bg-brand-accent-hover text-white font-semibold text-sm transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed mt-2"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Sending Code...</span>
                  </>
                ) : (
                  <>
                    <span>Request WhatsApp OTP</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp} className="space-y-4">
              <div>
                <label htmlFor="otp" className="block text-xs font-semibold text-slate-700 mb-1.5">
                  6-Digit OTP
                </label>
                <div className="relative">
                  <input
                    id="otp"
                    type="text"
                    inputMode="numeric"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="123456"
                    maxLength={6}
                    required
                    autoFocus
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-lg text-center tracking-[0.5em] text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-brand-accent focus:border-transparent transition-all font-mono font-bold"
                  />
                  <KeyRound className="absolute right-3 top-3 h-4 w-4 text-slate-400 pointer-events-none" />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed mt-2"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Validating Privileges...</span>
                  </>
                ) : (
                  <>
                    <span>Verify & Enter Console</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => setStep('PHONE')}
                className="w-full text-center text-xs text-slate-500 hover:text-slate-800 transition-colors pt-2"
              >
                Change mobile number
              </button>
            </form>
          )}

          {/* Security Banner */}
          <div className="mt-8 pt-4 border-t border-slate-100 text-center">
            <div className="text-[11px] text-slate-500 flex items-center justify-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span>HttpOnly Session Protected • Node 20 LTS API</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
