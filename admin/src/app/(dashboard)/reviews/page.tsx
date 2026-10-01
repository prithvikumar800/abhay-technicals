'use client';

import React, { useState } from 'react';
import { Star, CheckCircle, XCircle, Search, MessageSquare } from 'lucide-react';
import { Button } from '../../../components/ui/Button';

interface AdminReview {
  id: string;
  customerName: string;
  customerPhone: string;
  productTitle: string;
  productSku: string;
  rating: number;
  comment: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  createdAt: string;
}

const mockReviewsData: AdminReview[] = [
  {
    id: 'rev-1',
    customerName: 'Suresh Mobile Care',
    customerPhone: '+91 98765 43210',
    productTitle: 'iPhone 6G Battery 1810mAh OEM Tested',
    productSku: 'BAT-IP6G-01',
    rating: 5,
    comment: 'Super backup and genuine capacity. Fitted seamlessly in customer phone.',
    status: 'APPROVED',
    createdAt: '2026-09-24T14:20:00Z',
  },
  {
    id: 'rev-2',
    customerName: 'Anil Verma',
    customerPhone: '+91 97123 45678',
    productTitle: 'Vivo Y11 2019 Charging Port Flex Board OEM',
    productSku: 'FLX-VY11-CC',
    rating: 4,
    comment: 'Mic and fast charging working properly. Good packaging by Abhay Technicals.',
    status: 'PENDING',
    createdAt: '2026-09-25T07:10:00Z',
  },
];

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<AdminReview[]>(mockReviewsData);
  const [statusFilter, setStatusFilter] = useState('ALL');

  const handleUpdateStatus = (id: string, status: 'APPROVED' | 'REJECTED') => {
    setReviews((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));
  };

  const filteredReviews = reviews.filter((r) => {
    if (statusFilter === 'ALL') return true;
    return r.status === statusFilter;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-content-primary">Product Reviews & Moderation</h1>
          <p className="text-xs text-content-secondary mt-0.5">
            Moderate feedback submitted by mobile repair technicians and verify ratings before public display.
          </p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-border-subtle pb-3 text-xs">
        {['ALL', 'PENDING', 'APPROVED', 'REJECTED'].map((st) => (
          <button
            key={st}
            onClick={() => setStatusFilter(st)}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
              statusFilter === st
                ? 'bg-brand-accent text-white font-semibold'
                : 'bg-surface-subtle text-content-secondary hover:text-content-primary'
            }`}
          >
            {st} Reviews
          </button>
        ))}
      </div>

      {/* Reviews Cards List */}
      <div className="space-y-4">
        {filteredReviews.length === 0 ? (
          <div className="p-8 text-center bg-surface-card rounded-xl border border-border-subtle text-xs text-content-muted">
            No reviews matching status {statusFilter}.
          </div>
        ) : (
          filteredReviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-surface-card p-5 rounded-xl border border-border-subtle shadow-xs space-y-3"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-border-subtle pb-3">
                <div>
                  <span className="font-semibold text-content-primary text-xs">{rev.productTitle}</span>
                  <span className="text-[11px] font-mono text-content-muted ml-2">
                    (SKU: {rev.productSku})
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center text-amber-500">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < rev.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      rev.status === 'APPROVED'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : rev.status === 'PENDING'
                        ? 'bg-amber-50 text-amber-700 border border-amber-200'
                        : 'bg-rose-50 text-rose-700 border border-rose-200'
                    }`}
                  >
                    {rev.status}
                  </span>
                </div>
              </div>

              {/* Review Text */}
              <p className="text-xs text-content-secondary leading-relaxed bg-surface-subtle p-3 rounded-lg border border-border-subtle">
                &ldquo;{rev.comment}&rdquo;
              </p>

              {/* Footer with Customer & Action Buttons */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs pt-1">
                <div className="text-content-muted text-[11px]">
                  Submitted by <strong className="text-content-primary">{rev.customerName}</strong> ({rev.customerPhone}) on{' '}
                  {new Date(rev.createdAt).toLocaleDateString('en-IN')}
                </div>
                <div className="flex items-center gap-2">
                  {rev.status !== 'APPROVED' && (
                    <Button
                      size="sm"
                      variant="primary"
                      onClick={() => handleUpdateStatus(rev.id, 'APPROVED')}
                    >
                      <CheckCircle className="w-3.5 h-3.5 mr-1" />
                      Approve
                    </Button>
                  )}
                  {rev.status !== 'REJECTED' && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleUpdateStatus(rev.id, 'REJECTED')}
                    >
                      <XCircle className="w-3.5 h-3.5 mr-1" />
                      Reject
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
