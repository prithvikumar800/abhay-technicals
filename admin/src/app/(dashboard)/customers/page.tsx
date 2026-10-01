'use client';

import React, { useState } from 'react';
import {
  Users,
  Search,
  Shield,
  Phone,
  Building,
  CheckCircle,
  Eye,
  IndianRupee,
  ShoppingBag,
} from 'lucide-react';
import { mockCustomers } from '../../../lib/mock-data';
import { AdminCustomer } from '../../../types';
import { Modal } from '../../../components/ui/Modal';
import { Button } from '../../../components/ui/Button';

export default function CustomersPage() {
  const [customers, setCustomers] = useState<AdminCustomer[]>(mockCustomers);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('ALL');
  const [inspectCustomer, setInspectCustomer] = useState<AdminCustomer | null>(null);

  const filteredCustomers = customers.filter((c) => {
    const term = searchTerm.toLowerCase();
    const matchesSearch =
      c.phone.includes(term) ||
      (c.name && c.name.toLowerCase().includes(term)) ||
      (c.businessName && c.businessName.toLowerCase().includes(term)) ||
      (c.gstin && c.gstin.toLowerCase().includes(term));

    const matchesRole = roleFilter === 'ALL' || c.role === roleFilter;

    return matchesSearch && matchesRole;
  });

  const handleRoleToggle = (id: string, currentRole: AdminCustomer['role']) => {
    const nextRole: AdminCustomer['role'] =
      currentRole === 'CUSTOMER' ? 'WHOLESALER' : 'CUSTOMER';
    setCustomers((prev) =>
      prev.map((c) => (c.id === id ? { ...c, role: nextRole } : c))
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-content-primary">Customer & Wholesaler Accounts</h1>
          <p className="text-xs text-content-secondary mt-0.5">
            Manage repair technicians, retail customers, GSTIN verification, and wholesale tier authorization.
          </p>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="bg-surface-card p-4 rounded-xl border border-border-subtle shadow-xs flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-content-muted" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by Mobile Phone, Name, Business Name, or GSTIN..."
            className="w-full pl-9 pr-3 py-2 text-xs bg-surface-subtle border border-border-subtle rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-accent"
          />
        </div>
        <div className="w-full sm:w-48">
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="w-full py-2 px-3 text-xs bg-surface-subtle border border-border-subtle rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-accent"
          >
            <option value="ALL">All Account Roles</option>
            <option value="WHOLESALER">Wholesaler / Technician</option>
            <option value="CUSTOMER">Retail Customer</option>
            <option value="STAFF">Staff</option>
            <option value="ADMIN">Admin</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-surface-card rounded-xl border border-border-subtle shadow-xs overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-surface-subtle border-b border-border-subtle text-content-secondary font-medium uppercase tracking-wider">
            <tr>
              <th className="py-3 px-4">Customer / Business</th>
              <th className="py-3 px-4">Mobile Number</th>
              <th className="py-3 px-4">B2B GSTIN</th>
              <th className="py-3 px-4">Account Role</th>
              <th className="py-3 px-4">Lifetime Orders</th>
              <th className="py-3 px-4">Total GMV</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-subtle">
            {filteredCustomers.map((cust) => (
              <tr key={cust.id} className="hover:bg-slate-50/70 transition-colors">
                <td className="py-3 px-4">
                  <div className="font-semibold text-content-primary">
                    {cust.name || 'Unnamed Account'}
                  </div>
                  {cust.businessName && (
                    <div className="text-[11px] text-content-secondary flex items-center gap-1 mt-0.5">
                      <Building className="w-3 h-3 text-content-muted" />
                      <span>{cust.businessName}</span>
                    </div>
                  )}
                </td>
                <td className="py-3 px-4 font-mono font-medium text-brand-primary">{cust.phone}</td>
                <td className="py-3 px-4 font-mono text-content-secondary">
                  {cust.gstin ? (
                    <span className="font-bold text-slate-800">{cust.gstin}</span>
                  ) : (
                    <span className="text-content-muted italic">Non-GST</span>
                  )}
                </td>
                <td className="py-3 px-4">
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold ${
                      cust.role === 'WHOLESALER'
                        ? 'bg-sky-50 text-brand-accent border border-sky-200'
                        : cust.role === 'ADMIN'
                        ? 'bg-purple-50 text-purple-700 border border-purple-200'
                        : 'bg-slate-100 text-slate-700 border border-slate-200'
                    }`}
                  >
                    {cust.role}
                  </span>
                </td>
                <td className="py-3 px-4 font-mono font-medium text-content-primary">
                  {cust.totalOrders} Orders
                </td>
                <td className="py-3 px-4 font-mono font-bold text-content-primary">
                  ₹{cust.totalSpend.toFixed(2)}
                </td>
                <td className="py-3 px-4 text-right">
                  <div className="inline-flex items-center gap-1.5">
                    <button
                      onClick={() => setInspectCustomer(cust)}
                      className="p-1 rounded text-content-secondary hover:text-brand-accent hover:bg-sky-50 transition-colors"
                      title="Inspect Customer Profile"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    {cust.role !== 'ADMIN' && (
                      <button
                        onClick={() => handleRoleToggle(cust.id, cust.role)}
                        className="px-2 py-0.5 rounded text-[10px] font-medium bg-surface-subtle hover:bg-slate-200 text-content-primary border border-border-subtle"
                        title="Toggle Wholesaler Status"
                      >
                        {cust.role === 'WHOLESALER' ? 'Downgrade' : 'Promote to Wholesale'}
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Inspect Customer Modal */}
      {inspectCustomer && (
        <Modal
          isOpen={!!inspectCustomer}
          onClose={() => setInspectCustomer(null)}
          title={`Customer: ${inspectCustomer.name || inspectCustomer.phone}`}
        >
          <div className="space-y-4 text-xs">
            <div className="p-3 bg-surface-subtle rounded-lg border border-border-subtle space-y-2">
              <div className="flex justify-between">
                <span className="text-content-muted">Phone:</span>
                <span className="font-mono font-bold text-content-primary">
                  {inspectCustomer.phone}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-content-muted">Business / Shop Name:</span>
                <span className="font-semibold text-content-primary">
                  {inspectCustomer.businessName || 'N/A'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-content-muted">Registered Role:</span>
                <span className="font-bold text-brand-accent">{inspectCustomer.role}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-content-muted">GSTIN:</span>
                <span className="font-mono font-medium text-content-primary">
                  {inspectCustomer.gstin || 'None Provided'}
                </span>
              </div>
            </div>

            <div className="p-3 bg-sky-50 rounded-lg border border-sky-200 text-sky-900 space-y-1">
              <div className="font-bold">Security & Token Policy:</div>
              <p className="text-[11px]">
                Under Abhay Technicals security architecture, customer session tokens, WhatsApp OTP
                hashes, and refresh tokens are strictly inaccessible to staff consoles and client
                JavaScript.
              </p>
            </div>

            <div className="flex justify-end pt-2">
              <Button variant="outline" size="sm" onClick={() => setInspectCustomer(null)}>
                Close
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
