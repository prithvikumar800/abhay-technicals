'use client';

import React, { useState } from 'react';
import {
  Truck,
  Search,
  CheckCircle,
  Clock,
  Printer,
  FileText,
  MapPin,
  AlertCircle,
  ExternalLink,
  RefreshCw,
} from 'lucide-react';
import { mockShipments } from '../../../lib/mock-data';
import { AdminShipment } from '../../../types';
import { Button } from '../../../components/ui/Button';
import { Modal } from '../../../components/ui/Modal';

export default function ShipmentsPage() {
  const [shipments, setShipments] = useState<AdminShipment[]>(mockShipments);
  const [searchTerm, setSearchTerm] = useState('');

  // Pincode serviceability check tool
  const [pincodeQuery, setPincodeQuery] = useState('110019');
  const [serviceabilityResult, setServiceabilityResult] = useState<{
    serviced: boolean;
    city?: string;
    state?: string;
    courier?: string;
  } | null>(null);

  // New Shipment Manifest modal
  const [isManifestModalOpen, setIsManifestModalOpen] = useState(false);
  const [selectedOrderNum, setSelectedOrderNum] = useState('AT-2026-00102');
  const [isGeneratingAwb, setIsGeneratingAwb] = useState(false);

  // Tracking inspection modal
  const [trackingModalShipment, setTrackingModalShipment] = useState<AdminShipment | null>(null);

  const checkPincode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pincodeQuery || pincodeQuery.length !== 6) return;

    // Simulate Delhivery pincode serviceability check
    if (pincodeQuery.startsWith('0') || pincodeQuery === '999999') {
      setServiceabilityResult({ serviced: false });
    } else {
      setServiceabilityResult({
        serviced: true,
        city: 'New Delhi / NCR Hub',
        state: 'Delhi',
        courier: 'Delhivery Surface Express',
      });
    }
  };

  const handleGenerateAwb = () => {
    setIsGeneratingAwb(true);
    setTimeout(() => {
      const generatedAwb = `DELHIVERY_${Date.now().toString().slice(-10)}`;
      const newShipment: AdminShipment = {
        id: `ship-${Date.now()}`,
        orderNumber: selectedOrderNum,
        awbCode: generatedAwb,
        courier: 'Delhivery Surface',
        status: 'MANIFESTED',
        customerName: 'Anil Repairs',
        customerPhone: '+91 97123 45678',
        destinationPincode: '302001',
        weightGrams: 240,
        labelPdfUrl: `https://mock.delhivery.com/labels/${generatedAwb}.pdf`,
        createdAt: new Date().toISOString(),
      };

      setShipments([newShipment, ...shipments]);
      setIsGeneratingAwb(false);
      setIsManifestModalOpen(false);
    }, 800);
  };

  const filteredShipments = shipments.filter(
    (s) =>
      s.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (s.awbCode && s.awbCode.toLowerCase().includes(searchTerm.toLowerCase())) ||
      s.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.destinationPincode.includes(searchTerm)
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-content-primary">Delhivery Logistics & Shipments</h1>
          <p className="text-xs text-content-secondary mt-0.5">
            Automated courier manifesting, AWB waybill assignment, serviceability check, and tracking.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={() => setIsManifestModalOpen(true)} variant="primary" size="sm">
            <Truck className="w-4 h-4 mr-1.5" />
            Create Delhivery Shipment
          </Button>
        </div>
      </div>

      {/* Top Cards: Provider Status & Serviceability Checker */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Logistics Provider Mode */}
        <div className="bg-surface-card p-5 rounded-xl border border-border-subtle shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-content-secondary">
              Integration Provider
            </span>
            <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-sky-50 text-brand-accent border border-sky-200">
              Mock Delhivery
            </span>
          </div>
          <div>
            <div className="text-sm font-bold text-content-primary">Delhivery Surface Express B2B/B2C</div>
            <p className="text-xs text-content-secondary mt-1">
              Production API credentials are completely decoupled. Local development uses sandbox
              simulation with simulated AWBs and thermal labels.
            </p>
          </div>
        </div>

        {/* Pincode Serviceability Lookup */}
        <div className="lg:col-span-2 bg-surface-card p-5 rounded-xl border border-border-subtle shadow-xs">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-content-secondary mb-2 flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-brand-accent" />
            <span>Pincode Courier Serviceability Verification</span>
          </h2>
          <form onSubmit={checkPincode} className="flex gap-2">
            <input
              type="text"
              value={pincodeQuery}
              onChange={(e) => setPincodeQuery(e.target.value.replace(/\D/g, '').slice(0, 6))}
              placeholder="Enter 6-digit Pincode (e.g. 110019)..."
              maxLength={6}
              className="flex-1 px-3 py-2 text-xs bg-surface-subtle border border-border-subtle rounded-lg font-mono focus:outline-none focus:ring-2 focus:ring-brand-accent"
            />
            <Button type="submit" variant="secondary" size="sm">
              Check Serviceability
            </Button>
          </form>

          {serviceabilityResult && (
            <div className="mt-3 p-3 rounded-lg border text-xs flex items-center gap-2">
              {serviceabilityResult.serviced ? (
                <div className="text-emerald-700 bg-emerald-50/80 p-2.5 rounded-lg border border-emerald-200 flex-1 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>
                    <strong>Serviceable:</strong> Destination is verified for {serviceabilityResult.city} (
                    {serviceabilityResult.state}) via {serviceabilityResult.courier}.
                  </span>
                </div>
              ) : (
                <div className="text-rose-700 bg-rose-50/80 p-2.5 rounded-lg border border-rose-200 flex-1 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                  <span>
                    <strong>Unserviceable:</strong> Pincode {pincodeQuery} is currently not serviced by
                    Delhivery surface network.
                  </span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Shipment Manifests Table */}
      <div className="bg-surface-card rounded-xl border border-border-subtle shadow-xs overflow-hidden">
        <div className="p-4 border-b border-border-subtle flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <h2 className="text-sm font-semibold text-content-primary">Active Waybills & Manifests</h2>
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-content-muted" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search AWB or Order #..."
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-surface-subtle border border-border-subtle rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-accent"
            />
          </div>
        </div>

        <table className="w-full text-left text-xs">
          <thead className="bg-surface-subtle border-b border-border-subtle text-content-secondary font-medium uppercase tracking-wider">
            <tr>
              <th className="py-3 px-4">AWB Waybill</th>
              <th className="py-3 px-4">Order Number</th>
              <th className="py-3 px-4">Recipient</th>
              <th className="py-3 px-4">Destination Pincode</th>
              <th className="py-3 px-4">Package Weight</th>
              <th className="py-3 px-4">Manifest Status</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-subtle">
            {filteredShipments.map((ship) => (
              <tr key={ship.id} className="hover:bg-slate-50/70 transition-colors">
                <td className="py-3 px-4 font-mono font-bold text-brand-accent">
                  {ship.awbCode || 'Pending Assignment'}
                </td>
                <td className="py-3 px-4 font-mono text-content-primary font-medium">
                  {ship.orderNumber}
                </td>
                <td className="py-3 px-4">
                  <div className="font-semibold text-content-primary">{ship.customerName}</div>
                  <div className="text-[11px] font-mono text-content-muted">{ship.customerPhone}</div>
                </td>
                <td className="py-3 px-4 font-mono font-medium text-content-primary">
                  {ship.destinationPincode}
                </td>
                <td className="py-3 px-4 font-mono text-content-secondary">
                  {ship.weightGrams}g
                </td>
                <td className="py-3 px-4">
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-sky-50 text-sky-800 border border-sky-200">
                    {ship.status}
                  </span>
                </td>
                <td className="py-3 px-4 text-right">
                  <div className="inline-flex items-center gap-2">
                    <button
                      onClick={() => setTrackingModalShipment(ship)}
                      className="text-xs text-brand-accent hover:underline font-medium inline-flex items-center gap-1"
                    >
                      <Clock className="w-3.5 h-3.5" />
                      <span>Track</span>
                    </button>
                    {ship.labelPdfUrl && (
                      <a
                        href={ship.labelPdfUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs text-emerald-700 hover:underline font-medium inline-flex items-center gap-1"
                      >
                        <Printer className="w-3.5 h-3.5" />
                        <span>Thermal Label</span>
                      </a>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Manifest Modal */}
      <Modal
        isOpen={isManifestModalOpen}
        onClose={() => setIsManifestModalOpen(false)}
        title="Create Delhivery Surface Waybill"
      >
        <div className="space-y-4 text-xs">
          <p className="text-content-secondary">
            Assign a Delhivery AWB and generate a barcode shipping label for ready-to-ship orders.
          </p>

          <div>
            <label className="block font-medium text-content-primary mb-1">Select Ready Order</label>
            <select
              value={selectedOrderNum}
              onChange={(e) => setSelectedOrderNum(e.target.value)}
              className="w-full px-3 py-2 bg-surface-subtle border border-border-subtle rounded-lg text-content-primary focus:outline-none focus:ring-2 focus:ring-brand-accent font-mono"
            >
              <option value="AT-2026-00102">AT-2026-00102 (Anil Repairs — Jaipur, 302001)</option>
              <option value="AT-2026-00103">AT-2026-00103 (Rahul Tech — Mumbai, 400001)</option>
            </select>
          </div>

          <div className="p-3 bg-sky-50 rounded-lg border border-sky-200 text-sky-800">
            <strong>Pickup Hub:</strong> Abhay Technicals Central Dispatch, Delhi NCR (Pincode: 110019)
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-border-subtle">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setIsManifestModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="primary"
              size="sm"
              isLoading={isGeneratingAwb}
              onClick={handleGenerateAwb}
            >
              Generate AWB & Barcode
            </Button>
          </div>
        </div>
      </Modal>

      {/* Tracking Modal */}
      {trackingModalShipment && (
        <Modal
          isOpen={!!trackingModalShipment}
          onClose={() => setTrackingModalShipment(null)}
          title={`Delhivery Tracking: ${trackingModalShipment.awbCode}`}
        >
          <div className="space-y-4 text-xs">
            <div className="p-3 bg-surface-subtle rounded-lg border border-border-subtle grid grid-cols-2 gap-2">
              <div>
                <span className="text-content-muted">Order:</span>
                <p className="font-mono font-bold text-content-primary">
                  {trackingModalShipment.orderNumber}
                </p>
              </div>
              <div>
                <span className="text-content-muted">Destination:</span>
                <p className="font-semibold text-content-primary">
                  {trackingModalShipment.destinationPincode}
                </p>
              </div>
            </div>

            {/* Tracking Milestones */}
            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 mt-1" />
                <div>
                  <div className="font-bold text-content-primary">Manifested & Bagged</div>
                  <div className="text-[11px] text-content-muted">
                    Abhay Technicals Logistics Hub, New Delhi
                  </div>
                  <div className="text-[10px] text-content-muted font-mono">
                    {new Date().toLocaleDateString('en-IN')} 09:30 AM
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-slate-300 mt-1" />
                <div>
                  <div className="font-semibold text-content-secondary">In Transit to Regional Hub</div>
                  <div className="text-[11px] text-content-muted">Delhivery Line-haul Surface</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-slate-300 mt-1" />
                <div>
                  <div className="font-semibold text-content-secondary">Out for Delivery</div>
                  <div className="text-[11px] text-content-muted">Destination Last-Mile Facility</div>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-3 border-t border-border-subtle">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setTrackingModalShipment(null)}
              >
                Close
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
