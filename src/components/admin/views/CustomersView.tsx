import React, { useState } from 'react';
import { Search, Plus, Mail, Phone, MapPin, Award, CheckCircle2, X } from 'lucide-react';
import { useAdminData } from '../../../context/AdminDataContext';
import { Customer } from '../../../types';
import { formatINR } from '../../../utils/currency';

export const CustomersView: React.FC = () => {
  const { customers, addCustomer, updateCustomer } = useAdminData();

  const [searchQuery, setSearchQuery] = useState('');
  const [tierFilter, setTierFilter] = useState<string>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [tier, setTier] = useState<Customer['tier']>('Haute Member');

  const showToast = (text: string) => {
    setToastMessage(text);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const filteredCustomers = customers.filter((cust) => {
    if (tierFilter !== 'all' && cust.tier !== tierFilter) return false;
    const q = searchQuery.toLowerCase().trim();
    if (q) {
      const matchName = cust.name.toLowerCase().includes(q);
      const matchEmail = cust.email.toLowerCase().includes(q);
      const matchCity = cust.city.toLowerCase().includes(q);
      const matchPhone = cust.phone.includes(q);
      if (!matchName && !matchEmail && !matchCity && !matchPhone) return false;
    }
    return true;
  });

  const handleCreateCustomer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    const newCust: Customer = {
      id: `cust-${Date.now()}`,
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim() || '+91 98000 00000',
      city: city.trim() || 'Mumbai',
      tier,
      totalOrders: 0,
      totalSpent: 0,
      lastOrderDate: new Date().toISOString().split('T')[0],
      status: 'Active'
    };

    addCustomer(newCust);
    showToast(`Added client "${name.trim()}" to VIP directory.`);
    setIsModalOpen(false);
    setName('');
    setEmail('');
    setPhone('');
    setCity('');
  };

  const getTierColor = (t: Customer['tier']) => {
    switch (t) {
      case 'Gold Reserve VIP':
        return 'bg-[#FFFBEB] text-[#9A7B38] border-[#FDE68A]';
      case 'Haute Member':
        return 'bg-purple-50 text-purple-800 border-purple-200';
      case 'Connoisseur':
        return 'bg-sky-50 text-sky-800 border-sky-200';
      default:
        return 'bg-[#FAF7F2] text-[#6E5D53] border-[#E8DFD4]';
    }
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
            VIP Clientele Directory ({customers.length} Patrons)
          </h2>
          <p className="text-xs text-[#7A6A5D] mt-0.5">
            Manage relationships with royal patrons, private connoisseurs, and fragrance collectors.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2.5 bg-[#D4AF37] hover:bg-[#E5C158] text-[#1C1714] text-xs font-semibold rounded-xl transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer self-start md:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Client</span>
        </button>
      </div>

      {/* Search & Tier Filter */}
      <div className="bg-white p-4 rounded-2xl border border-[#E8DFD4] shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#7A6A5D]" />
          <input
            type="text"
            placeholder="Search by patron name, email, phone or city..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#FAF7F2] border border-[#E8DFD4] rounded-xl pl-9 pr-3.5 py-2 text-[#2C241E] focus:outline-none focus:border-[#D4AF37]"
          />
        </div>

        <select
          value={tierFilter}
          onChange={(e) => setTierFilter(e.target.value)}
          className="bg-[#FAF7F2] border border-[#E8DFD4] rounded-xl px-3 py-2 text-[#2C241E] focus:outline-none focus:border-[#D4AF37] cursor-pointer"
        >
          <option value="all">All Membership Tiers</option>
          <option value="Gold Reserve VIP">Gold Reserve VIP</option>
          <option value="Haute Member">Haute Member</option>
          <option value="Connoisseur">Connoisseur</option>
          <option value="Member">Member</option>
        </select>
      </div>

      {/* Customers Table */}
      <div className="bg-white rounded-2xl border border-[#E8DFD4] shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#FAF7F2] text-[11px] uppercase tracking-wider text-[#7A6A5D] font-medium border-b border-[#E8DFD4]">
                <th className="py-3 px-4 sm:px-6">Patron Name</th>
                <th className="py-3 px-4">Contact & Location</th>
                <th className="py-3 px-4">Membership Tier</th>
                <th className="py-3 px-4 text-center">Orders Placed</th>
                <th className="py-3 px-4 text-right">Lifetime Spend</th>
                <th className="py-3 px-4 text-right">Last Purchase</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8DFD4]">
              {filteredCustomers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-[#7A6A5D]">
                    No clientele records match the filter criteria.
                  </td>
                </tr>
              ) : (
                filteredCustomers.map((c) => (
                  <tr key={c.id} className="hover:bg-[#FAF7F2]/60 transition-colors">
                    {/* Name */}
                    <td className="py-4 px-4 sm:px-6">
                      <span className="font-serif-luxury text-base text-[#2C241E] font-medium block">
                        {c.name}
                      </span>
                      <span className="text-[10px] text-[#9A7B38] font-mono uppercase">
                        ID: {c.id}
                      </span>
                    </td>

                    {/* Contact */}
                    <td className="py-4 px-4">
                      <div className="space-y-0.5">
                        <span className="text-[#6E5D53] flex items-center gap-1.5">
                          <Mail className="w-3 h-3 text-[#9A7B38]" />
                          {c.email}
                        </span>
                        <span className="text-[#6E5D53] flex items-center gap-1.5">
                          <Phone className="w-3 h-3 text-[#9A7B38]" />
                          {c.phone}
                        </span>
                        <span className="text-[#7A6A5D] flex items-center gap-1.5 text-[11px]">
                          <MapPin className="w-3 h-3 text-[#9A7B38]" />
                          {c.city}
                        </span>
                      </div>
                    </td>

                    {/* Tier */}
                    <td className="py-4 px-4">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold border ${getTierColor(
                          c.tier
                        )}`}
                      >
                        <Award className="w-3 h-3" />
                        {c.tier}
                      </span>
                    </td>

                    {/* Total Orders */}
                    <td className="py-4 px-4 text-center font-mono font-semibold text-[#2C241E] tabular-nums">
                      {c.totalOrders}
                    </td>

                    {/* Total Spent */}
                    <td className="py-4 px-4 text-right font-mono font-semibold text-[#2C241E] text-sm tabular-nums">
                      {formatINR(c.totalSpent)}
                    </td>

                    {/* Last Order Date */}
                    <td className="py-4 px-4 text-right font-mono text-[#7A6A5D] tabular-nums">
                      {c.lastOrderDate}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Client Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1C1714]/70 backdrop-blur-xs">
          <div className="bg-white rounded-3xl border border-[#D4AF37]/50 shadow-2xl max-w-lg w-full p-6 space-y-4 animate-in zoom-in-95 duration-150 text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-[#E8DFD4]">
              <div>
                <span className="text-[10px] tracking-wider uppercase font-semibold text-[#9A7B38]">
                  Patron Directory
                </span>
                <h3 className="font-serif-luxury text-xl text-[#2C241E] font-medium">
                  Enroll New Patron
                </h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 text-[#7A6A5D] hover:text-[#2C241E] rounded-full cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateCustomer} className="space-y-4">
              <div>
                <label className="font-semibold text-[#2C241E] block mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Princess Diya Kumari"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#FAF7F2] border border-[#E8DFD4] rounded-xl px-3 py-2 text-[#2C241E] focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div>
                <label className="font-semibold text-[#2C241E] block mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="diya.kumari@royal.in"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#FAF7F2] border border-[#E8DFD4] rounded-xl px-3 py-2 text-[#2C241E] focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-[#2C241E] block mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    placeholder="+91 98201 11223"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-[#FAF7F2] border border-[#E8DFD4] rounded-xl px-3 py-2 text-[#2C241E] focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div>
                  <label className="font-semibold text-[#2C241E] block mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    placeholder="Jaipur / Mumbai / Delhi"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full bg-[#FAF7F2] border border-[#E8DFD4] rounded-xl px-3 py-2 text-[#2C241E] focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-[#2C241E] block mb-1">
                  Membership Tier
                </label>
                <select
                  value={tier}
                  onChange={(e) => setTier(e.target.value as Customer['tier'])}
                  className="w-full bg-[#FAF7F2] border border-[#E8DFD4] rounded-xl px-3 py-2 text-[#2C241E] focus:outline-none focus:border-[#D4AF37] cursor-pointer"
                >
                  <option value="Gold Reserve VIP">Gold Reserve VIP (Exclusive Concierge)</option>
                  <option value="Haute Member">Haute Member</option>
                  <option value="Connoisseur">Connoisseur</option>
                  <option value="Member">Member</option>
                </select>
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
                  Enroll Patron
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
