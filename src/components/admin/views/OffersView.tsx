import React, { useState } from 'react';
import { Tag, Plus, Edit3, Trash2, CheckCircle2, X, Percent, Calendar } from 'lucide-react';
import { useAdminData } from '../../../context/AdminDataContext';
import { Offer } from '../../../types';
import { formatINR } from '../../../utils/currency';

export const OffersView: React.FC = () => {
  const { offers, addOffer, updateOffer, deleteOffer } = useAdminData();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingOffer, setEditingOffer] = useState<Offer | null>(null);

  const [code, setCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState<number>(15);
  const [minSpend, setMinSpend] = useState<number>(4999);
  const [expiryDate, setExpiryDate] = useState('2026-12-31');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<Offer['status']>('Active');

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (text: string) => {
    setToastMessage(text);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleOpenCreate = () => {
    setEditingOffer(null);
    setCode('');
    setDiscountPercent(15);
    setMinSpend(4999);
    setExpiryDate('2026-12-31');
    setDescription('');
    setStatus('Active');
    setIsModalOpen(true);
  };

  const handleOpenEdit = (offer: Offer) => {
    setEditingOffer(offer);
    setCode(offer.code);
    setDiscountPercent(offer.discountPercent);
    setMinSpend(offer.minSpend);
    setExpiryDate(offer.expiryDate);
    setDescription(offer.description);
    setStatus(offer.status);
    setIsModalOpen(true);
  };

  const handleSaveOffer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) return;

    const cleanCode = code.trim().toUpperCase();

    if (editingOffer) {
      updateOffer(editingOffer.id, {
        code: cleanCode,
        discountPercent: Number(discountPercent),
        minSpend: Number(minSpend),
        expiryDate,
        description: description.trim(),
        status
      });
      showToast(`Updated offer code "${cleanCode}".`);
    } else {
      const newOffer: Offer = {
        id: `off-${Date.now()}`,
        code: cleanCode,
        discountPercent: Number(discountPercent),
        minSpend: Number(minSpend),
        expiryDate,
        usageCount: 0,
        status,
        description: description.trim() || `${discountPercent}% privileged savings.`
      };
      addOffer(newOffer);
      showToast(`Created offer code "${cleanCode}".`);
    }
    setIsModalOpen(false);
  };

  const handleToggleStatus = (offer: Offer) => {
    const nextStatus = offer.status === 'Active' ? 'Paused' : 'Active';
    updateOffer(offer.id, { status: nextStatus });
    showToast(`Offer "${offer.code}" set to ${nextStatus}.`);
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
            Privilege Offers & Promotion Codes ({offers.length})
          </h2>
          <p className="text-xs text-[#7A6A5D] mt-0.5">
            Configure seasonal promotions, exclusive bridal vouchers, and VIP celebration discount codes.
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="px-4 py-2.5 bg-[#D4AF37] hover:bg-[#E5C158] text-[#1C1714] text-xs font-semibold rounded-xl transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer self-start md:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Offer</span>
        </button>
      </div>

      {/* Offers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {offers.map((offer) => {
          const isActive = offer.status === 'Active';
          return (
            <div
              key={offer.id}
              className="p-5 bg-white rounded-2xl border border-[#E8DFD4] hover:border-[#D4AF37]/60 shadow-xs flex flex-col justify-between transition-all group"
            >
              <div>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2.5 rounded-xl bg-[#FAF6F0] border border-[#E8DFD4] text-[#9A7B38]">
                      <Tag className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="font-mono text-base font-bold text-[#2C241E] tracking-wider block">
                        {offer.code}
                      </span>
                      <span className="text-[11px] text-[#9A7B38] font-semibold">
                        {offer.discountPercent}% Discount
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleToggleStatus(offer)}
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold border cursor-pointer transition-colors ${
                      isActive
                        ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                        : 'bg-amber-50 text-amber-800 border-amber-200'
                    }`}
                  >
                    {offer.status}
                  </button>
                </div>

                <p className="text-xs text-[#6E5D53] mt-3 leading-relaxed">
                  {offer.description}
                </p>

                <div className="grid grid-cols-2 gap-2 mt-4 p-3 bg-[#FAF7F2] rounded-xl border border-[#E8DFD4] text-[11px]">
                  <div>
                    <span className="text-[#7A6A5D] block">Min Spend Requirement:</span>
                    <strong className="text-[#2C241E] font-mono tabular-nums">
                      {formatINR(offer.minSpend)}
                    </strong>
                  </div>
                  <div>
                    <span className="text-[#7A6A5D] block">Valid Until:</span>
                    <span className="text-[#2C241E] font-mono">
                      {offer.expiryDate}
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-3 mt-4 border-t border-[#E8DFD4] flex items-center justify-between text-xs">
                <span className="text-[#7A6A5D] font-mono">
                  {offer.usageCount} times redeemed
                </span>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleOpenEdit(offer)}
                    className="p-1.5 rounded-lg border border-[#E8DFD4] hover:bg-[#FAF7F2] text-[#2C241E] hover:text-[#9A7B38] transition-colors cursor-pointer"
                    title="Edit Offer"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => {
                      deleteOffer(offer.id);
                      showToast(`Removed offer code "${offer.code}".`);
                    }}
                    className="p-1.5 rounded-lg border border-[#E8DFD4] hover:bg-rose-50 text-[#7A6A5D] hover:text-rose-600 transition-colors cursor-pointer"
                    title="Delete Offer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add / Edit Offer Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1C1714]/70 backdrop-blur-xs">
          <div className="bg-white rounded-3xl border border-[#D4AF37]/50 shadow-2xl max-w-lg w-full p-6 space-y-4 animate-in zoom-in-95 duration-150 text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-[#E8DFD4]">
              <div>
                <span className="text-[10px] tracking-wider uppercase font-semibold text-[#9A7B38]">
                  Privilege Offer
                </span>
                <h3 className="font-serif-luxury text-xl text-[#2C241E] font-medium">
                  {editingOffer ? `Edit: ${editingOffer.code}` : 'Create Promotion Code'}
                </h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 text-[#7A6A5D] hover:text-[#2C241E] rounded-full cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveOffer} className="space-y-4">
              <div>
                <label className="font-semibold text-[#2C241E] block mb-1">
                  Coupon Code * (Uppercase)
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. DIWALI20"
                  value={code}
                  onChange={(e) => setCode(e.target.value.toUpperCase())}
                  className="w-full bg-[#FAF7F2] border border-[#E8DFD4] rounded-xl px-3 py-2 text-[#2C241E] font-mono font-bold tracking-wider focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-[#2C241E] block mb-1">
                    Discount Percentage (%) *
                  </label>
                  <input
                    type="number"
                    required
                    min={1}
                    max={90}
                    value={discountPercent}
                    onChange={(e) => setDiscountPercent(Number(e.target.value))}
                    className="w-full bg-[#FAF7F2] border border-[#E8DFD4] rounded-xl px-3 py-2 text-[#2C241E] font-mono font-semibold focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div>
                  <label className="font-semibold text-[#2C241E] block mb-1">
                    Minimum Order Value (₹) *
                  </label>
                  <input
                    type="number"
                    required
                    min={0}
                    value={minSpend}
                    onChange={(e) => setMinSpend(Number(e.target.value))}
                    className="w-full bg-[#FAF7F2] border border-[#E8DFD4] rounded-xl px-3 py-2 text-[#2C241E] font-mono focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-[#2C241E] block mb-1">
                    Expiry Date
                  </label>
                  <input
                    type="date"
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(e.target.value)}
                    className="w-full bg-[#FAF7F2] border border-[#E8DFD4] rounded-xl px-3 py-2 text-[#2C241E] focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div>
                  <label className="font-semibold text-[#2C241E] block mb-1">
                    Status
                  </label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as Offer['status'])}
                    className="w-full bg-[#FAF7F2] border border-[#E8DFD4] rounded-xl px-3 py-2 text-[#2C241E] focus:outline-none focus:border-[#D4AF37] cursor-pointer"
                  >
                    <option value="Active">Active</option>
                    <option value="Paused">Paused</option>
                    <option value="Expired">Expired</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-semibold text-[#2C241E] block mb-1">
                  Offer Description / Terms
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Complimentary 20% discount on all extraits de parfum above ₹9,999."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-[#FAF7F2] border border-[#E8DFD4] rounded-xl p-3 text-[#2C241E] focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div className="pt-3 border-t border-[#E8DFD4] flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-[#E8DFD4] text-[#7A6A5D] hover:bg-[#FAF7F2] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#2C241E] hover:bg-[#9A7B38] text-white font-semibold transition-colors cursor-pointer"
                >
                  Save Offer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
