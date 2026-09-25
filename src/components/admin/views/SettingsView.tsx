import React, { useState } from 'react';
import { Settings, Save, RefreshCw, Download, CheckCircle2, Shield, Bell, Truck, AlertTriangle } from 'lucide-react';
import { useAdminData } from '../../../context/AdminDataContext';
import { formatINR } from '../../../utils/currency';

export const SettingsView: React.FC = () => {
  const { settings, updateSettings, resetAllData, perfumes, orders, customers } = useAdminData();

  const [boutiqueName, setBoutiqueName] = useState(settings.boutiqueName);
  const [currencySymbol, setCurrencySymbol] = useState(settings.currencySymbol);
  const [currencyCode, setCurrencyCode] = useState(settings.currencyCode);
  const [freeShippingThreshold, setFreeShippingThreshold] = useState(settings.freeShippingThreshold);
  const [standardShippingFee, setStandardShippingFee] = useState(settings.standardShippingFee);
  const [courierPartner, setCourierPartner] = useState(settings.courierPartner);
  const [taxRate, setTaxRate] = useState(settings.taxRate);
  const [lowStockThreshold, setLowStockThreshold] = useState(settings.lowStockThreshold);
  const [notificationsEmail, setNotificationsEmail] = useState(settings.notificationsEmail);
  const [smsNotificationsEnabled, setSmsNotificationsEnabled] = useState(settings.smsNotificationsEnabled);
  const [orderEmailNotifications, setOrderEmailNotifications] = useState(settings.orderEmailNotifications);

  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [confirmReset, setConfirmReset] = useState(false);

  const showToast = (text: string) => {
    setToastMessage(text);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings({
      boutiqueName: boutiqueName.trim(),
      currencySymbol,
      currencyCode,
      freeShippingThreshold: Number(freeShippingThreshold),
      standardShippingFee: Number(standardShippingFee),
      courierPartner: courierPartner.trim(),
      taxRate: Number(taxRate),
      lowStockThreshold: Number(lowStockThreshold),
      notificationsEmail: notificationsEmail.trim(),
      smsNotificationsEnabled,
      orderEmailNotifications
    });
    showToast('Atelier boutique settings successfully saved.');
  };

  const handleExportData = () => {
    const data = {
      perfumes,
      orders,
      customers,
      settings,
      exportedAt: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `zelia-parfums-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Atelier database exported as JSON.');
  };

  const handleResetDefaults = () => {
    resetAllData();
    setConfirmReset(false);
    showToast('Factory initial database restored.');
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#2C241E] text-white px-5 py-3 rounded-2xl shadow-2xl border border-[#D4AF37]/60 flex items-center gap-3 text-xs tracking-wider">
          <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="bg-white p-5 sm:p-6 rounded-2xl border border-[#E8DFD4] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif-luxury text-2xl text-[#2C241E] font-medium">
            Boutique & Atelier System Settings
          </h2>
          <p className="text-xs text-[#7A6A5D] mt-0.5">
            Configure financial thresholds, logistics carriers, inventory alert limits, and notifications.
          </p>
        </div>

        <button
          onClick={handleSaveSettings}
          className="px-5 py-2.5 bg-[#2C241E] hover:bg-[#9A7B38] text-white text-xs font-semibold rounded-xl transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer self-start md:self-auto"
        >
          <Save className="w-4 h-4 text-[#D4AF37]" />
          <span>Save All Settings</span>
        </button>
      </div>

      <form onSubmit={handleSaveSettings} className="space-y-6 text-xs">
        {/* Boutique Profile */}
        <div className="bg-white p-5 sm:p-6 rounded-2xl border border-[#E8DFD4] shadow-xs space-y-4">
          <h3 className="font-serif-luxury text-lg text-[#2C241E] font-medium">
            Maison Identity & Currency
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="font-semibold text-[#2C241E] block mb-1">
                Boutique House Name
              </label>
              <input
                type="text"
                value={boutiqueName}
                onChange={(e) => setBoutiqueName(e.target.value)}
                className="w-full bg-[#FAF7F2] border border-[#E8DFD4] rounded-xl px-3 py-2 text-[#2C241E] focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            <div>
              <label className="font-semibold text-[#2C241E] block mb-1">
                Currency Symbol
              </label>
              <input
                type="text"
                value={currencySymbol}
                onChange={(e) => setCurrencySymbol(e.target.value)}
                className="w-full bg-[#FAF7F2] border border-[#E8DFD4] rounded-xl px-3 py-2 text-[#2C241E] font-mono focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            <div>
              <label className="font-semibold text-[#2C241E] block mb-1">
                Currency Code
              </label>
              <input
                type="text"
                value={currencyCode}
                onChange={(e) => setCurrencyCode(e.target.value)}
                className="w-full bg-[#FAF7F2] border border-[#E8DFD4] rounded-xl px-3 py-2 text-[#2C241E] font-mono focus:outline-none focus:border-[#D4AF37]"
              />
            </div>
          </div>
        </div>

        {/* Shipping & Delivery Rules */}
        <div className="bg-white p-5 sm:p-6 rounded-2xl border border-[#E8DFD4] shadow-xs space-y-4">
          <div className="flex items-center gap-2">
            <Truck className="w-4 h-4 text-[#9A7B38]" />
            <h3 className="font-serif-luxury text-lg text-[#2C241E] font-medium">
              Pan-India Logistics & Delivery Policies
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="font-semibold text-[#2C241E] block mb-1">
                Complimentary Shipping Threshold (₹)
              </label>
              <input
                type="number"
                min={0}
                value={freeShippingThreshold}
                onChange={(e) => setFreeShippingThreshold(Number(e.target.value))}
                className="w-full bg-[#FAF7F2] border border-[#E8DFD4] rounded-xl px-3 py-2 text-[#2C241E] font-mono focus:outline-none focus:border-[#D4AF37]"
              />
              <span className="text-[10px] text-[#7A6A5D] mt-0.5 block">
                Orders equal or exceeding {formatINR(freeShippingThreshold)} unlock free air express shipping.
              </span>
            </div>

            <div>
              <label className="font-semibold text-[#2C241E] block mb-1">
                Standard Shipping Fee (₹)
              </label>
              <input
                type="number"
                min={0}
                value={standardShippingFee}
                onChange={(e) => setStandardShippingFee(Number(e.target.value))}
                className="w-full bg-[#FAF7F2] border border-[#E8DFD4] rounded-xl px-3 py-2 text-[#2C241E] font-mono focus:outline-none focus:border-[#D4AF37]"
              />
              <span className="text-[10px] text-[#7A6A5D] mt-0.5 block">
                Applied on orders below the threshold.
              </span>
            </div>

            <div>
              <label className="font-semibold text-[#2C241E] block mb-1">
                Designated Courier Partner
              </label>
              <input
                type="text"
                value={courierPartner}
                onChange={(e) => setCourierPartner(e.target.value)}
                className="w-full bg-[#FAF7F2] border border-[#E8DFD4] rounded-xl px-3 py-2 text-[#2C241E] focus:outline-none focus:border-[#D4AF37]"
              />
            </div>
          </div>
        </div>

        {/* Inventory & Tax */}
        <div className="bg-white p-5 sm:p-6 rounded-2xl border border-[#E8DFD4] shadow-xs space-y-4">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-[#9A7B38]" />
            <h3 className="font-serif-luxury text-lg text-[#2C241E] font-medium">
              Inventory Alerts & Tax Compliance
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-semibold text-[#2C241E] block mb-1">
                Low Stock Threshold Alert (Flacon Units)
              </label>
              <input
                type="number"
                min={1}
                max={50}
                value={lowStockThreshold}
                onChange={(e) => setLowStockThreshold(Number(e.target.value))}
                className="w-full bg-[#FAF7F2] border border-[#E8DFD4] rounded-xl px-3 py-2 text-[#2C241E] font-mono focus:outline-none focus:border-[#D4AF37]"
              />
              <span className="text-[10px] text-[#7A6A5D] mt-0.5 block">
                Triggers visual warning when perfume quantity reaches this number or below.
              </span>
            </div>

            <div>
              <label className="font-semibold text-[#2C241E] block mb-1">
                Applicable GST Rate (%)
              </label>
              <input
                type="number"
                min={0}
                max={28}
                value={taxRate}
                onChange={(e) => setTaxRate(Number(e.target.value))}
                className="w-full bg-[#FAF7F2] border border-[#E8DFD4] rounded-xl px-3 py-2 text-[#2C241E] font-mono focus:outline-none focus:border-[#D4AF37]"
              />
              <span className="text-[10px] text-[#7A6A5D] mt-0.5 block">
                Standard GST for haute cosmetics & extraits is 18%.
              </span>
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white p-5 sm:p-6 rounded-2xl border border-[#E8DFD4] shadow-xs space-y-4">
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4 text-[#9A7B38]" />
            <h3 className="font-serif-luxury text-lg text-[#2C241E] font-medium">
              Notifications & Order Dispatches
            </h3>
          </div>

          <div className="space-y-3">
            <div>
              <label className="font-semibold text-[#2C241E] block mb-1">
                Admin Notification Email
              </label>
              <input
                type="email"
                value={notificationsEmail}
                onChange={(e) => setNotificationsEmail(e.target.value)}
                className="w-full bg-[#FAF7F2] border border-[#E8DFD4] rounded-xl px-3 py-2 text-[#2C241E] focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={smsNotificationsEnabled}
                  onChange={(e) => setSmsNotificationsEnabled(e.target.checked)}
                  className="w-4 h-4 text-[#D4AF37] accent-[#D4AF37] rounded"
                />
                <span className="font-medium text-[#2C241E]">
                  SMS Air Dispatch Tracking Alerts to Patrons
                </span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={orderEmailNotifications}
                  onChange={(e) => setOrderEmailNotifications(e.target.checked)}
                  className="w-4 h-4 text-[#D4AF37] accent-[#D4AF37] rounded"
                />
                <span className="font-medium text-[#2C241E]">
                  Send Email Receipts with Monogrammed Seal
                </span>
              </label>
            </div>
          </div>
        </div>

        {/* Data Maintenance */}
        <div className="bg-[#FAF7F2] p-5 sm:p-6 rounded-2xl border border-[#E8DFD4] space-y-4">
          <h3 className="font-serif-luxury text-lg text-[#2C241E] font-medium">
            Database Maintenance & Export
          </h3>
          <p className="text-[#7A6A5D]">
            Download your current perfume inventory, order ledgers, and VIP patron databases, or restore factory demonstration fixtures.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-1">
            <button
              type="button"
              onClick={handleExportData}
              className="px-4 py-2 bg-white hover:bg-[#EDE4D8] border border-[#E8DFD4] rounded-xl font-medium text-[#2C241E] transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
            >
              <Download className="w-3.5 h-3.5 text-[#9A7B38]" />
              <span>Export Store Database (JSON)</span>
            </button>

            <button
              type="button"
              onClick={() => setConfirmReset(true)}
              className="px-4 py-2 bg-white hover:bg-rose-50 border border-rose-200 text-rose-700 rounded-xl font-medium transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
            >
              <RefreshCw className="w-3.5 h-3.5 text-rose-600" />
              <span>Reset to Sample Data</span>
            </button>
          </div>
        </div>

        {/* Save button footer */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-2.5 bg-[#2C241E] hover:bg-[#9A7B38] text-white font-semibold rounded-xl transition-all shadow-sm cursor-pointer"
          >
            Save Atelier Configuration
          </button>
        </div>
      </form>

      {/* Reset Confirmation Modal */}
      {confirmReset && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1C1714]/70 backdrop-blur-xs">
          <div className="bg-white rounded-2xl border border-rose-200 shadow-xl max-w-md w-full p-6 space-y-4 animate-in zoom-in-95 duration-150 text-xs">
            <div className="flex items-center gap-3 text-rose-700">
              <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200">
                <AlertTriangle className="w-5 h-5 text-rose-600" />
              </div>
              <div>
                <h4 className="font-serif-luxury text-xl text-[#2C241E] font-medium">
                  Restore Factory Demo Data?
                </h4>
                <p className="text-xs text-[#7A6A5D]">
                  This resets all perfumes, orders, reviews and clientele records back to initial states.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button
                onClick={() => setConfirmReset(false)}
                className="px-4 py-2 rounded-xl border border-[#E8DFD4] text-[#7A6A5D] hover:bg-[#FAF7F2] cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleResetDefaults}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-semibold shadow-xs cursor-pointer"
              >
                Confirm Reset
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
