import React, { useState } from 'react';
import { FileText, Plus, Trash2, Save, CheckCircle2, Sparkles, Building, Phone, Mail, Clock } from 'lucide-react';
import { useAdminData } from '../../../context/AdminDataContext';

export const WebsiteContentView: React.FC = () => {
  const { websiteContent, updateWebsiteContent } = useAdminData();

  const [announcements, setAnnouncements] = useState<string[]>(websiteContent.announcements);
  const [newAnnouncement, setNewAnnouncement] = useState('');
  const [heroHeadline, setHeroHeadline] = useState(websiteContent.heroHeadline);
  const [heroSubtext, setHeroSubtext] = useState(websiteContent.heroSubtext);
  const [storyHeadline, setStoryHeadline] = useState(websiteContent.storyHeadline);
  const [storyParagraph, setStoryParagraph] = useState(websiteContent.storyParagraph);
  const [conciergePhone, setConciergePhone] = useState(websiteContent.conciergePhone);
  const [conciergeEmail, setConciergeEmail] = useState(websiteContent.conciergeEmail);
  const [boutiqueAddress, setBoutiqueAddress] = useState(websiteContent.boutiqueAddress);
  const [boutiqueHours, setBoutiqueHours] = useState(websiteContent.boutiqueHours);

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (text: string) => {
    setToastMessage(text);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleAddAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAnnouncement.trim()) return;
    setAnnouncements((prev) => [...prev, newAnnouncement.trim()]);
    setNewAnnouncement('');
  };

  const handleRemoveAnnouncement = (index: number) => {
    setAnnouncements((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSaveAll = (e: React.FormEvent) => {
    e.preventDefault();
    updateWebsiteContent({
      announcements,
      heroHeadline: heroHeadline.trim(),
      heroSubtext: heroSubtext.trim(),
      storyHeadline: storyHeadline.trim(),
      storyParagraph: storyParagraph.trim(),
      conciergePhone: conciergePhone.trim(),
      conciergeEmail: conciergeEmail.trim(),
      boutiqueAddress: boutiqueAddress.trim(),
      boutiqueHours: boutiqueHours.trim()
    });
    showToast('Storefront content successfully updated and published.');
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
            Website Content & Copy Editor
          </h2>
          <p className="text-xs text-[#7A6A5D] mt-0.5">
            Modify announcements, hero messaging, boutique location details and brand storytelling in real time.
          </p>
        </div>

        <button
          onClick={handleSaveAll}
          className="px-5 py-2.5 bg-[#2C241E] hover:bg-[#9A7B38] text-white text-xs font-semibold rounded-xl transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer self-start md:self-auto"
        >
          <Save className="w-4 h-4 text-[#D4AF37]" />
          <span>Publish Changes</span>
        </button>
      </div>

      <form onSubmit={handleSaveAll} className="space-y-6 text-xs">
        {/* Top Rotating Announcement Ticker */}
        <div className="bg-white p-5 sm:p-6 rounded-2xl border border-[#E8DFD4] shadow-xs space-y-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#9A7B38]" />
            <h3 className="font-serif-luxury text-lg text-[#2C241E] font-medium">
              Top Rotating Announcement Marquee
            </h3>
          </div>
          <p className="text-[#7A6A5D]">
            These lines rotate continuously across the black luxury ribbon at the very top of the storefront.
          </p>

          <div className="space-y-2">
            {announcements.map((line, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2 p-2.5 bg-[#FAF7F2] rounded-xl border border-[#E8DFD4]"
              >
                <span className="font-mono text-[#9A7B38] w-5 text-center font-bold">
                  {idx + 1}.
                </span>
                <input
                  type="text"
                  value={line}
                  onChange={(e) => {
                    const updated = [...announcements];
                    updated[idx] = e.target.value;
                    setAnnouncements(updated);
                  }}
                  className="flex-1 bg-white border border-[#E8DFD4] rounded-lg px-3 py-1.5 text-[#2C241E] focus:outline-none focus:border-[#D4AF37]"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveAnnouncement(idx)}
                  className="p-1.5 text-neutral-400 hover:text-rose-600 rounded-lg cursor-pointer"
                  title="Remove Announcement"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          <div className="flex gap-2 pt-2">
            <input
              type="text"
              placeholder="e.g. ⚜️ COMPLIMENTARY TRAVEL ATOMIZER WITH ORDERS OVER ₹4,999"
              value={newAnnouncement}
              onChange={(e) => setNewAnnouncement(e.target.value)}
              className="flex-1 bg-white border border-[#E8DFD4] rounded-xl px-3 py-2 text-[#2C241E] focus:outline-none focus:border-[#D4AF37]"
            />
            <button
              type="button"
              onClick={handleAddAnnouncement}
              className="px-4 py-2 bg-[#FAF7F2] hover:bg-[#EDE4D8] border border-[#E8DFD4] text-[#2C241E] font-medium rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add Line</span>
            </button>
          </div>
        </div>

        {/* Hero Section Copy */}
        <div className="bg-white p-5 sm:p-6 rounded-2xl border border-[#E8DFD4] shadow-xs space-y-4">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-[#9A7B38]" />
            <h3 className="font-serif-luxury text-lg text-[#2C241E] font-medium">
              Hero Section Copy
            </h3>
          </div>

          <div className="space-y-3">
            <div>
              <label className="font-semibold text-[#2C241E] block mb-1">
                Main Hero Headline
              </label>
              <input
                type="text"
                value={heroHeadline}
                onChange={(e) => setHeroHeadline(e.target.value)}
                className="w-full bg-[#FAF7F2] border border-[#E8DFD4] rounded-xl px-3 py-2 text-[#2C241E] focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            <div>
              <label className="font-semibold text-[#2C241E] block mb-1">
                Hero Subtext / Tagline
              </label>
              <textarea
                rows={3}
                value={heroSubtext}
                onChange={(e) => setHeroSubtext(e.target.value)}
                className="w-full bg-[#FAF7F2] border border-[#E8DFD4] rounded-xl p-3 text-[#2C241E] focus:outline-none focus:border-[#D4AF37]"
              />
            </div>
          </div>
        </div>

        {/* Brand Story Copy */}
        <div className="bg-white p-5 sm:p-6 rounded-2xl border border-[#E8DFD4] shadow-xs space-y-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#9A7B38]" />
            <h3 className="font-serif-luxury text-lg text-[#2C241E] font-medium">
              Maison Heritage & Craft Story
            </h3>
          </div>

          <div className="space-y-3">
            <div>
              <label className="font-semibold text-[#2C241E] block mb-1">
                Story Section Headline
              </label>
              <input
                type="text"
                value={storyHeadline}
                onChange={(e) => setStoryHeadline(e.target.value)}
                className="w-full bg-[#FAF7F2] border border-[#E8DFD4] rounded-xl px-3 py-2 text-[#2C241E] focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            <div>
              <label className="font-semibold text-[#2C241E] block mb-1">
                Story Paragraph
              </label>
              <textarea
                rows={4}
                value={storyParagraph}
                onChange={(e) => setStoryParagraph(e.target.value)}
                className="w-full bg-[#FAF7F2] border border-[#E8DFD4] rounded-xl p-3 text-[#2C241E] focus:outline-none focus:border-[#D4AF37]"
              />
            </div>
          </div>
        </div>

        {/* Concierge & Boutique Location Details */}
        <div className="bg-white p-5 sm:p-6 rounded-2xl border border-[#E8DFD4] shadow-xs space-y-4">
          <div className="flex items-center gap-2">
            <Building className="w-4 h-4 text-[#9A7B38]" />
            <h3 className="font-serif-luxury text-lg text-[#2C241E] font-medium">
              Boutique Concierge Information
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-semibold text-[#2C241E] flex items-center gap-1.5 mb-1">
                <Phone className="w-3.5 h-3.5 text-[#9A7B38]" />
                <span>Concierge Telephone</span>
              </label>
              <input
                type="text"
                value={conciergePhone}
                onChange={(e) => setConciergePhone(e.target.value)}
                className="w-full bg-[#FAF7F2] border border-[#E8DFD4] rounded-xl px-3 py-2 text-[#2C241E] focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            <div>
              <label className="font-semibold text-[#2C241E] flex items-center gap-1.5 mb-1">
                <Mail className="w-3.5 h-3.5 text-[#9A7B38]" />
                <span>Concierge Email</span>
              </label>
              <input
                type="email"
                value={conciergeEmail}
                onChange={(e) => setConciergeEmail(e.target.value)}
                className="w-full bg-[#FAF7F2] border border-[#E8DFD4] rounded-xl px-3 py-2 text-[#2C241E] focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            <div>
              <label className="font-semibold text-[#2C241E] flex items-center gap-1.5 mb-1">
                <Building className="w-3.5 h-3.5 text-[#9A7B38]" />
                <span>Boutique Atelier Address</span>
              </label>
              <input
                type="text"
                value={boutiqueAddress}
                onChange={(e) => setBoutiqueAddress(e.target.value)}
                className="w-full bg-[#FAF7F2] border border-[#E8DFD4] rounded-xl px-3 py-2 text-[#2C241E] focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            <div>
              <label className="font-semibold text-[#2C241E] flex items-center gap-1.5 mb-1">
                <Clock className="w-3.5 h-3.5 text-[#9A7B38]" />
                <span>Opening Hours</span>
              </label>
              <input
                type="text"
                value={boutiqueHours}
                onChange={(e) => setBoutiqueHours(e.target.value)}
                className="w-full bg-[#FAF7F2] border border-[#E8DFD4] rounded-xl px-3 py-2 text-[#2C241E] focus:outline-none focus:border-[#D4AF37]"
              />
            </div>
          </div>
        </div>

        {/* Save button footer */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-2.5 bg-[#2C241E] hover:bg-[#9A7B38] text-white font-semibold rounded-xl transition-all shadow-sm cursor-pointer"
          >
            Publish Website Content
          </button>
        </div>
      </form>
    </div>
  );
};
