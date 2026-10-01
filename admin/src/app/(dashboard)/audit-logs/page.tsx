'use client';

import React, { useState } from 'react';
import { ShieldAlert, Search, Filter, Calendar, User, Clock, FileCode } from 'lucide-react';
import { mockAuditLogs } from '../../../lib/mock-data';
import { AdminAuditLog } from '../../../types';

export default function AuditLogsPage() {
  const [logs, setLogs] = useState<AdminAuditLog[]>(mockAuditLogs);
  const [searchTerm, setSearchTerm] = useState('');
  const [actionFilter, setActionFilter] = useState('ALL');

  const filteredLogs = logs.filter((log) => {
    const term = searchTerm.toLowerCase();
    const matchesSearch =
      log.action.toLowerCase().includes(term) ||
      log.entity.toLowerCase().includes(term) ||
      log.entityId.toLowerCase().includes(term) ||
      log.actorPhone.includes(term) ||
      log.detailsSummary.toLowerCase().includes(term);

    const matchesAction = actionFilter === 'ALL' || log.action === actionFilter;

    return matchesSearch && matchesAction;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-content-primary">System Operational Audit Logs</h1>
          <p className="text-xs text-content-secondary mt-0.5">
            Cryptographic ledger tracking administrative actions, catalog modifications, and shipment dispatches.
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
            placeholder="Search action, staff phone, entity ID, or description..."
            className="w-full pl-9 pr-3 py-2 text-xs bg-surface-subtle border border-border-subtle rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-accent"
          />
        </div>
        <div className="w-full sm:w-60">
          <select
            value={actionFilter}
            onChange={(e) => setActionFilter(e.target.value)}
            className="w-full py-2 px-3 text-xs bg-surface-subtle border border-border-subtle rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-accent font-mono"
          >
            <option value="ALL">All Recorded Actions</option>
            <option value="UPDATE_PRODUCT_STOCK">UPDATE_PRODUCT_STOCK</option>
            <option value="GENERATE_DELHIVERY_AWB">GENERATE_DELHIVERY_AWB</option>
            <option value="MODIFY_WHOLESALE_TIER">MODIFY_WHOLESALE_TIER</option>
            <option value="UPDATE_ORDER_STATUS">UPDATE_ORDER_STATUS</option>
          </select>
        </div>
      </div>

      {/* Logs Table */}
      <div className="bg-surface-card rounded-xl border border-border-subtle shadow-xs overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-surface-subtle border-b border-border-subtle text-content-secondary font-medium uppercase tracking-wider">
            <tr>
              <th className="py-3 px-4">Timestamp</th>
              <th className="py-3 px-4">Operator</th>
              <th className="py-3 px-4">Action</th>
              <th className="py-3 px-4">Target Entity</th>
              <th className="py-3 px-4">Operational Summary</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-subtle">
            {filteredLogs.map((log) => (
              <tr key={log.id} className="hover:bg-slate-50/70 transition-colors">
                <td className="py-3 px-4 font-mono text-content-muted whitespace-nowrap">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>{new Date(log.timestamp).toLocaleString('en-IN')}</span>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <div className="font-mono font-medium text-content-primary">{log.actorPhone}</div>
                  <span className="text-[10px] font-mono text-brand-accent bg-sky-50 px-1.5 py-0.5 rounded border border-sky-200">
                    {log.actorRole}
                  </span>
                </td>
                <td className="py-3 px-4 font-mono font-bold text-slate-800">
                  <span className="px-2 py-0.5 rounded bg-slate-100 border border-slate-200 text-[11px]">
                    {log.action}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <div className="font-semibold text-content-primary">{log.entity}</div>
                  <div className="text-[11px] font-mono text-content-muted">{log.entityId}</div>
                </td>
                <td className="py-3 px-4 text-content-secondary max-w-md font-mono text-[11px]">
                  {log.detailsSummary}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
