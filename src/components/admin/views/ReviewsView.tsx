import React, { useState } from 'react';
import { Star, CheckCircle, EyeOff, Trash2, MessageSquare, Plus, CheckCircle2, X } from 'lucide-react';
import { useAdminData } from '../../../context/AdminDataContext';
import { AdminReview } from '../../../types';

export const ReviewsView: React.FC = () => {
  const { reviews, updateReviewStatus, deleteReview, addReview, perfumes } = useAdminData();

  const [statusFilter, setStatusFilter] = useState<'all' | 'Approved' | 'Pending' | 'Hidden'>('all');
  const [replyModalReview, setReplyModalReview] = useState<AdminReview | null>(null);
  const [replyText, setReplyText] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (text: string) => {
    setToastMessage(text);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const filteredReviews = reviews.filter((r) => {
    if (statusFilter !== 'all' && r.status !== statusFilter) return false;
    return true;
  });

  const handleOpenReply = (rev: AdminReview) => {
    setReplyModalReview(rev);
    setReplyText(rev.adminReply || '');
  };

  const handleSaveReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyModalReview) return;
    updateReviewStatus(replyModalReview.id, replyModalReview.status, replyText.trim());
    showToast('Published Atelier response to review.');
    setReplyModalReview(null);
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
            Client Reviews & Endorsements ({reviews.length})
          </h2>
          <p className="text-xs text-[#7A6A5D] mt-0.5">
            Moderate olfactory testimonials, verify authentic collectors, and post official Atelier concierge responses.
          </p>
        </div>

        {/* Status Filter Tabs */}
        <div className="flex items-center gap-2 text-xs">
          <button
            onClick={() => setStatusFilter('all')}
            className={`px-3 py-1.5 rounded-xl border transition-colors cursor-pointer ${
              statusFilter === 'all'
                ? 'bg-[#2C241E] text-white border-[#2C241E]'
                : 'bg-white border-[#E8DFD4] text-[#6E5D53]'
            }`}
          >
            All ({reviews.length})
          </button>
          <button
            onClick={() => setStatusFilter('Approved')}
            className={`px-3 py-1.5 rounded-xl border transition-colors cursor-pointer ${
              statusFilter === 'Approved'
                ? 'bg-emerald-700 text-white border-emerald-700'
                : 'bg-white border-[#E8DFD4] text-[#6E5D53]'
            }`}
          >
            Approved ({reviews.filter((r) => r.status === 'Approved').length})
          </button>
          <button
            onClick={() => setStatusFilter('Pending')}
            className={`px-3 py-1.5 rounded-xl border transition-colors cursor-pointer ${
              statusFilter === 'Pending'
                ? 'bg-amber-600 text-white border-amber-600'
                : 'bg-white border-[#E8DFD4] text-[#6E5D53]'
            }`}
          >
            Pending ({reviews.filter((r) => r.status === 'Pending').length})
          </button>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {filteredReviews.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-2xl border border-[#E8DFD4] text-[#7A6A5D] text-xs">
            No reviews found matching the status filter.
          </div>
        ) : (
          filteredReviews.map((rev) => (
            <div
              key={rev.id}
              className="p-5 bg-white rounded-2xl border border-[#E8DFD4] shadow-xs space-y-3"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-3">
                  <div className="flex items-center text-[#D4AF37]">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < rev.rating
                            ? 'fill-[#D4AF37] text-[#D4AF37]'
                            : 'text-[#E8DFD4]'
                        }`}
                      />
                    ))}
                  </div>

                  <span className="font-semibold text-xs text-[#2C241E]">
                    {rev.title}
                  </span>

                  {rev.verified && (
                    <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-medium">
                      Verified Collector
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-semibold border ${
                      rev.status === 'Approved'
                        ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                        : rev.status === 'Pending'
                        ? 'bg-amber-50 text-amber-800 border-amber-200'
                        : 'bg-neutral-100 text-neutral-600 border-neutral-200'
                    }`}
                  >
                    {rev.status}
                  </span>
                  <span className="text-[11px] text-[#7A6A5D] font-mono">
                    {rev.date}
                  </span>
                </div>
              </div>

              <p className="text-xs text-[#4A3F35] leading-relaxed">
                "{rev.comment}"
              </p>

              <div className="flex items-center justify-between pt-2 border-t border-[#E8DFD4] text-xs">
                <div className="text-[11px] text-[#7A6A5D]">
                  By <strong className="text-[#2C241E]">{rev.author}</strong> on{' '}
                  <span className="text-[#9A7B38] font-medium">{rev.perfumeName}</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleOpenReply(rev)}
                    className="p-1.5 rounded-lg border border-[#E8DFD4] hover:bg-[#FAF7F2] text-[#2C241E] hover:text-[#9A7B38] transition-colors cursor-pointer flex items-center gap-1 text-[11px]"
                    title="Respond as Maison ZÉLIA"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>{rev.adminReply ? 'Edit Reply' : 'Atelier Reply'}</span>
                  </button>

                  {rev.status !== 'Approved' && (
                    <button
                      onClick={() => {
                        updateReviewStatus(rev.id, 'Approved');
                        showToast('Review approved and visible.');
                      }}
                      className="px-2.5 py-1 rounded-lg bg-emerald-600 text-white text-[11px] font-medium hover:bg-emerald-700 transition-colors cursor-pointer"
                    >
                      Approve
                    </button>
                  )}

                  {rev.status === 'Approved' && (
                    <button
                      onClick={() => {
                        updateReviewStatus(rev.id, 'Hidden');
                        showToast('Review hidden.');
                      }}
                      className="px-2.5 py-1 rounded-lg border border-[#E8DFD4] text-[#7A6A5D] hover:bg-[#FAF7F2] text-[11px] cursor-pointer"
                    >
                      Hide
                    </button>
                  )}

                  <button
                    onClick={() => {
                      deleteReview(rev.id);
                      showToast('Review deleted.');
                    }}
                    className="p-1.5 rounded-lg border border-[#E8DFD4] hover:bg-rose-50 text-[#7A6A5D] hover:text-rose-600 transition-colors cursor-pointer"
                    title="Delete Review"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Official Maison Response preview */}
              {rev.adminReply && (
                <div className="p-3 bg-[#FAF7F2] rounded-xl border border-[#E8DFD4] text-xs text-[#2C241E] space-y-1">
                  <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider font-semibold text-[#9A7B38]">
                    <span>Official Atelier Concierge Response:</span>
                  </div>
                  <p className="italic text-[#5C4E43]">
                    "{rev.adminReply}"
                  </p>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Reply Modal */}
      {replyModalReview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1C1714]/70 backdrop-blur-xs">
          <div className="bg-white rounded-3xl border border-[#D4AF37]/50 shadow-2xl max-w-lg w-full p-6 space-y-4 animate-in zoom-in-95 duration-150 text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-[#E8DFD4]">
              <div>
                <span className="text-[10px] tracking-wider uppercase font-semibold text-[#9A7B38]">
                  Maison ZÉLIA Concierge
                </span>
                <h3 className="font-serif-luxury text-xl text-[#2C241E] font-medium">
                  Reply to {replyModalReview.author}
                </h3>
              </div>
              <button
                onClick={() => setReplyModalReview(null)}
                className="p-1.5 text-[#7A6A5D] hover:text-[#2C241E] rounded-full cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveReply} className="space-y-4">
              <div className="p-3 bg-[#FAF7F2] rounded-xl border border-[#E8DFD4]">
                <p className="text-[11px] text-[#6E5D53] italic">
                  "{replyModalReview.comment}"
                </p>
              </div>

              <div>
                <label className="font-semibold text-[#2C241E] block mb-1">
                  Official Atelier Response
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Express your gratitude and share olfactory guidance..."
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  className="w-full bg-[#FAF7F2] border border-[#E8DFD4] rounded-xl p-3 text-[#2C241E] focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div className="pt-3 border-t border-[#E8DFD4] flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setReplyModalReview(null)}
                  className="px-4 py-2 rounded-xl border border-[#E8DFD4] text-[#7A6A5D] hover:bg-[#FAF7F2] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#2C241E] hover:bg-[#9A7B38] text-white font-semibold transition-colors cursor-pointer"
                >
                  Publish Response
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
