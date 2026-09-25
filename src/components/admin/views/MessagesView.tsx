import React, { useState } from 'react';
import { MessageSquare, Mail, Phone, Clock, CheckCircle2, Trash2, Reply, X } from 'lucide-react';
import { useAdminData } from '../../../context/AdminDataContext';
import { InquiryMessage } from '../../../types';

export const MessagesView: React.FC = () => {
  const { messages, updateMessageStatus, deleteMessage } = useAdminData();

  const [statusFilter, setStatusFilter] = useState<'all' | 'Unread' | 'Read' | 'Replied'>('all');
  const [selectedMessage, setSelectedMessage] = useState<InquiryMessage | null>(null);
  const [replyText, setReplyText] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (text: string) => {
    setToastMessage(text);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const filteredMessages = messages.filter((m) => {
    if (statusFilter !== 'all' && m.status !== statusFilter) return false;
    return true;
  });

  const handleOpenMessage = (msg: InquiryMessage) => {
    setSelectedMessage(msg);
    setReplyText(msg.reply || '');
    if (msg.status === 'Unread') {
      updateMessageStatus(msg.id, 'Read');
    }
  };

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMessage) return;
    updateMessageStatus(selectedMessage.id, 'Replied', replyText.trim());
    setSelectedMessage((prev) => (prev ? { ...prev, status: 'Replied', reply: replyText.trim() } : null));
    showToast(`Replied to ${selectedMessage.name}.`);
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
            Concierge Inquiries & Messages ({messages.length})
          </h2>
          <p className="text-xs text-[#7A6A5D] mt-0.5">
            Incoming inquiries from the online boutique contact form for bespoke bridal formulations and VIP requests.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 text-xs">
          <button
            onClick={() => setStatusFilter('all')}
            className={`px-3 py-1.5 rounded-xl border transition-colors cursor-pointer ${
              statusFilter === 'all'
                ? 'bg-[#2C241E] text-white border-[#2C241E]'
                : 'bg-white border-[#E8DFD4] text-[#6E5D53]'
            }`}
          >
            All ({messages.length})
          </button>
          <button
            onClick={() => setStatusFilter('Unread')}
            className={`px-3 py-1.5 rounded-xl border transition-colors cursor-pointer ${
              statusFilter === 'Unread'
                ? 'bg-rose-700 text-white border-rose-700'
                : 'bg-white border-[#E8DFD4] text-[#6E5D53]'
            }`}
          >
            Unread ({messages.filter((m) => m.status === 'Unread').length})
          </button>
          <button
            onClick={() => setStatusFilter('Replied')}
            className={`px-3 py-1.5 rounded-xl border transition-colors cursor-pointer ${
              statusFilter === 'Replied'
                ? 'bg-emerald-700 text-white border-emerald-700'
                : 'bg-white border-[#E8DFD4] text-[#6E5D53]'
            }`}
          >
            Replied ({messages.filter((m) => m.status === 'Replied').length})
          </button>
        </div>
      </div>

      {/* Messages List */}
      <div className="space-y-3">
        {filteredMessages.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-2xl border border-[#E8DFD4] text-[#7A6A5D] text-xs">
            No concierge messages found in this category.
          </div>
        ) : (
          filteredMessages.map((msg) => (
            <div
              key={msg.id}
              onClick={() => handleOpenMessage(msg)}
              className={`p-5 rounded-2xl border transition-all cursor-pointer shadow-xs ${
                msg.status === 'Unread'
                  ? 'bg-[#FFFBEB] border-[#FDE68A] hover:border-[#D4AF37]'
                  : 'bg-white border-[#E8DFD4] hover:border-[#D4AF37]/50'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <span className="font-semibold text-xs text-[#2C241E]">
                    {msg.name}
                  </span>
                  <span className="text-[#A6978A]">·</span>
                  <span className="text-[#6E5D53] text-[11px] font-medium">
                    {msg.email}
                  </span>
                  {msg.phone && (
                    <>
                      <span className="text-[#A6978A]">·</span>
                      <span className="text-[#7A6A5D] text-[11px]">
                        {msg.phone}
                      </span>
                    </>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-semibold border ${
                      msg.status === 'Unread'
                        ? 'bg-rose-50 text-rose-800 border-rose-200'
                        : msg.status === 'Replied'
                        ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                        : 'bg-neutral-100 text-neutral-600 border-neutral-200'
                    }`}
                  >
                    {msg.status}
                  </span>
                  <span className="text-[11px] text-[#7A6A5D] font-mono">
                    {new Date(msg.date).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric'
                    })}
                  </span>
                </div>
              </div>

              <h4 className="font-serif-luxury text-lg text-[#2C241E] font-medium mt-1">
                {msg.subject}
              </h4>

              <p className="text-xs text-[#5C4E43] line-clamp-2 mt-1 leading-relaxed">
                {msg.message}
              </p>

              {msg.reply && (
                <div className="mt-3 p-2.5 bg-[#FAF7F2] rounded-xl border border-[#E8DFD4] text-[11px] text-[#2C241E]">
                  <strong className="text-[#9A7B38]">Atelier Reply:</strong> {msg.reply}
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* View & Reply Modal */}
      {selectedMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1C1714]/70 backdrop-blur-xs">
          <div className="bg-white rounded-3xl border border-[#D4AF37]/50 shadow-2xl max-w-xl w-full p-6 space-y-4 animate-in zoom-in-95 duration-150 text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-[#E8DFD4]">
              <div>
                <span className="text-[10px] tracking-wider uppercase font-semibold text-[#9A7B38]">
                  Concierge Inquiry
                </span>
                <h3 className="font-serif-luxury text-xl text-[#2C241E] font-medium mt-0.5">
                  {selectedMessage.subject}
                </h3>
              </div>
              <button
                onClick={() => setSelectedMessage(null)}
                className="p-1.5 text-[#7A6A5D] hover:text-[#2C241E] rounded-full cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-3 bg-[#FAF7F2] rounded-xl border border-[#E8DFD4] space-y-1">
              <div className="flex justify-between text-[#2C241E] font-semibold">
                <span>{selectedMessage.name}</span>
                <span className="text-[10px] text-[#7A6A5D] font-mono">
                  {selectedMessage.date}
                </span>
              </div>
              <p className="text-[11px] text-[#6E5D53]">
                Email: {selectedMessage.email} {selectedMessage.phone ? `· Phone: ${selectedMessage.phone}` : ''}
              </p>
            </div>

            <div className="p-3 bg-white rounded-xl border border-[#E8DFD4] text-xs text-[#2C241E] leading-relaxed">
              {selectedMessage.message}
            </div>

            <form onSubmit={handleSendReply} className="space-y-3">
              <label className="font-semibold text-[#2C241E] block">
                Maison Concierge Response
              </label>
              <textarea
                rows={3}
                required
                placeholder="Compose courteous response from Maison ZÉLIA Concierge..."
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                className="w-full bg-[#FAF7F2] border border-[#E8DFD4] rounded-xl p-3 text-[#2C241E] focus:outline-none focus:border-[#D4AF37]"
              />

              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={() => {
                    deleteMessage(selectedMessage.id);
                    setSelectedMessage(null);
                    showToast('Message removed.');
                  }}
                  className="text-xs text-rose-600 hover:text-rose-800 transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete Message</span>
                </button>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedMessage(null)}
                    className="px-4 py-2 rounded-xl border border-[#E8DFD4] text-[#7A6A5D] hover:bg-[#FAF7F2] cursor-pointer"
                  >
                    Close
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-[#2C241E] hover:bg-[#9A7B38] text-white font-semibold transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    <Reply className="w-3.5 h-3.5" />
                    <span>Send Atelier Reply</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
