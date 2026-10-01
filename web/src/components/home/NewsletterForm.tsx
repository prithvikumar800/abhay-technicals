'use client';

import React, { useState } from 'react';

export function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
    }
  };

  if (submitted) {
    return (
      <div className="px-5 py-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 font-bold text-sm text-center flex items-center justify-center">
        ✓ Thank you for subscribing!
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full gap-2 flex-col sm:flex-row items-center"
    >
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email address"
        required
        className="w-full sm:flex-1 px-4 py-2.5 rounded-md text-sm bg-[#F8FAFC] border border-[#CBD5E1] text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#E52521] focus:bg-white transition-all min-h-[44px]"
      />
      <button
        type="submit"
        className="w-full sm:w-auto px-6 py-2.5 rounded-md bg-[#E52521] hover:bg-[#C61E1A] text-white font-bold text-xs sm:text-sm transition-colors shadow-xs whitespace-nowrap min-h-[44px]"
      >
        Subscribe
      </button>
    </form>
  );
}
