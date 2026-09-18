import React, { useState } from 'react';
import { Star, CheckCircle2, MessageSquarePlus, Sparkles, Quote, X, ThumbsUp } from 'lucide-react';
import { CUSTOMER_REVIEWS, PERFUMES } from '../data/perfumes';
import { Review } from '../types';

export const CustomerReviews: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>(CUSTOMER_REVIEWS);
  const [selectedFragranceFilter, setSelectedFragranceFilter] = useState<string>('All');
  const [showAddReviewModal, setShowAddReviewModal] = useState(false);
  const [likedReviews, setLikedReviews] = useState<Record<string, number>>({});

  // Review Form State
  const [newAuthor, setNewAuthor] = useState('');
  const [newLocation, setNewLocation] = useState('');
  const [newPerfume, setNewPerfume] = useState(PERFUMES[0].name);
  const [newRating, setNewRating] = useState(5);
  const [newTitle, setNewTitle] = useState('');
  const [newComment, setNewComment] = useState('');
  const [submittedFeedback, setSubmittedFeedback] = useState(false);

  const filteredReviews = selectedFragranceFilter === 'All'
    ? reviews
    : reviews.filter((r) => r.perfumeName === selectedFragranceFilter);

  const handleLikeReview = (reviewId: string) => {
    setLikedReviews((prev) => ({
      ...prev,
      [reviewId]: (prev[reviewId] || 0) + 1,
    }));
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAuthor || !newComment || !newTitle) return;

    const newRev: Review = {
      id: `rev-custom-${Date.now()}`,
      author: newAuthor,
      location: newLocation || 'Verified Client',
      rating: newRating,
      date: 'Just now',
      perfumeName: newPerfume,
      title: newTitle,
      comment: newComment,
      verified: true,
    };

    setReviews([newRev, ...reviews]);
    setSubmittedFeedback(true);
    setTimeout(() => {
      setSubmittedFeedback(false);
      setShowAddReviewModal(false);
      setNewAuthor('');
      setNewLocation('');
      setNewTitle('');
      setNewComment('');
    }, 1500);
  };

  return (
    <section id="customer-reviews" className="py-20 md:py-28 bg-[#FAF7F2] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center justify-center gap-2">
            <span className="text-xs uppercase tracking-[0.3em] text-[#9A7B38] font-semibold">
              The Sillage Echoes
            </span>
          </div>
          <h2 className="font-serif-luxury text-4xl sm:text-5xl text-[#2C241E] font-normal tracking-wide">
            Customer Reviews
          </h2>
          <div className="w-16 h-[1px] bg-[#C5A059] mx-auto my-3" />
          <p className="text-sm sm:text-base text-[#6E5D53] leading-relaxed">
            Read authentic impressions from our worldwide patrons about the longevity,
            enchanting compliments, and luxurious unboxing of Maison ZÉLIA.
          </p>
        </div>

        {/* Global Rating Score Board */}
        <div className="bg-[#F7F2EA] rounded-2xl border border-[#EADBCE] p-6 sm:p-8 mb-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <div className="text-center">
              <span className="font-serif-luxury text-5xl font-bold text-[#2C241E] leading-none">
                4.96
              </span>
              <div className="flex items-center justify-center gap-1 text-[#C5A059] my-1.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#C5A059]" />
                ))}
              </div>
              <span className="text-[10px] uppercase tracking-wider text-[#7A6A5D]">
                Overall Scent Score
              </span>
            </div>
            <div className="h-12 w-[1px] bg-[#D8C3A5] hidden sm:block" />
            <div className="space-y-1 text-xs text-[#6E5D53]">
              <p><strong className="text-[#2C241E]">99%</strong> would recommend to a friend</p>
              <p><strong className="text-[#2C241E]">98%</strong> noticed compliments within 24 hours</p>
              <p><strong className="text-[#2C241E]">640+</strong> verified flacons delivered</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Filter by Perfume */}
            <select
              value={selectedFragranceFilter}
              onChange={(e) => setSelectedFragranceFilter(e.target.value)}
              className="bg-white border border-[#D8C3A5] rounded-lg px-3 py-2 text-xs text-[#2C241E] focus:outline-none"
            >
              <option value="All">All Fragrances ({reviews.length})</option>
              {PERFUMES.map((p) => (
                <option key={p.name} value={p.name}>
                  {p.name}
                </option>
              ))}
            </select>

            {/* Write a Review Button */}
            <button
              id="open-write-review-btn"
              onClick={() => setShowAddReviewModal(true)}
              className="px-4 py-2 bg-[#2C241E] text-white hover:bg-[#C5A059] text-xs uppercase tracking-wider rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shrink-0 shadow-sm"
            >
              <MessageSquarePlus className="w-4 h-4" />
              <span>Share Impression</span>
            </button>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {filteredReviews.map((review) => (
            <div
              key={review.id}
              className="bg-white p-6 sm:p-8 rounded-2xl border border-[#EADBCE] shadow-sm hover:shadow-md transition-all flex flex-col justify-between relative group"
            >
              <Quote className="absolute top-6 right-6 w-8 h-8 text-[#EADBCE]/50 pointer-events-none" />

              <div className="space-y-3">
                {/* Rating & Perfume Name */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < review.rating
                            ? 'fill-[#C5A059] text-[#C5A059]'
                            : 'text-[#EADBCE]'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs font-serif-luxury font-medium text-[#9A7B38] bg-[#FAF7F2] px-2.5 py-1 rounded-full border border-[#EADBCE]">
                    {review.perfumeName}
                  </span>
                </div>

                {/* Review Title */}
                <h3 className="font-serif-luxury text-xl font-medium text-[#2C241E]">
                  “{review.title}”
                </h3>

                {/* Comment */}
                <p className="text-xs sm:text-sm text-[#5A4D43] leading-relaxed">
                  {review.comment}
                </p>
              </div>

              {/* Author & Helpful counter */}
              <div className="pt-4 mt-4 border-t border-[#F0E6DA] flex items-center justify-between text-xs text-[#7A6A5D]">
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-medium text-[#2C241E]">{review.author}</span>
                    {review.verified && (
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#4B6B48]" title="Verified Purchase" />
                    )}
                  </div>
                  <span className="text-[11px] text-[#9A8A7D]">
                    {review.location} • {review.date}
                  </span>
                </div>

                <button
                  onClick={() => handleLikeReview(review.id)}
                  className="inline-flex items-center gap-1 text-[11px] text-[#7A6A5D] hover:text-[#2C241E] cursor-pointer"
                >
                  <ThumbsUp className="w-3.5 h-3.5" />
                  <span>Helpful ({likedReviews[review.id] || 12})</span>
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Write a Review Modal */}
      {showAddReviewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1C1714]/70 backdrop-blur-sm">
          <div className="bg-[#FAF7F2] rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-[#D8C3A5] relative">
            <button
              onClick={() => setShowAddReviewModal(false)}
              className="absolute top-4 right-4 text-[#7A6A5D] hover:text-[#2C241E]"
            >
              <X className="w-5 h-5" />
            </button>

            {submittedFeedback ? (
              <div className="text-center py-8 space-y-3">
                <div className="w-12 h-12 rounded-full bg-[#4B6B48] text-white flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="font-serif-luxury text-2xl text-[#2C241E]">
                  Merci Pour Votre Avis!
                </h3>
                <p className="text-xs text-[#6E5D53]">
                  Your review has been verified and added to the Maison ZÉLIA client guestbook.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmitReview} className="space-y-4">
                <div className="space-y-1">
                  <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#9A7B38]">
                    Guestbook of ZÉLIA
                  </span>
                  <h3 className="font-serif-luxury text-2xl text-[#2C241E]">
                    Share Your Scent Experience
                  </h3>
                </div>

                {/* Fragrance selector */}
                <div>
                  <label className="text-xs font-medium text-[#4A3F35] block mb-1">
                    Which Flacon Did You Experience?
                  </label>
                  <select
                    value={newPerfume}
                    onChange={(e) => setNewPerfume(e.target.value)}
                    className="w-full bg-white border border-[#D8C3A5] rounded-lg px-3 py-2 text-xs text-[#2C241E] focus:outline-none"
                  >
                    {PERFUMES.map((p) => (
                      <option key={p.name} value={p.name}>
                        {p.name} ({p.subTitle})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Star rating selector */}
                <div>
                  <label className="text-xs font-medium text-[#4A3F35] block mb-1">
                    Rating
                  </label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setNewRating(star)}
                        className="cursor-pointer"
                      >
                        <Star
                          className={`w-6 h-6 ${
                            star <= newRating
                              ? 'fill-[#C5A059] text-[#C5A059]'
                              : 'text-[#D8C3A5]'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Author name & location */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-medium text-[#4A3F35] block mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      value={newAuthor}
                      onChange={(e) => setNewAuthor(e.target.value)}
                      placeholder="e.g. Marie Laurent"
                      className="w-full bg-white border border-[#D8C3A5] rounded-lg px-3 py-2 text-xs text-[#2C241E] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-[#4A3F35] block mb-1">
                      City, Country
                    </label>
                    <input
                      type="text"
                      value={newLocation}
                      onChange={(e) => setNewLocation(e.target.value)}
                      placeholder="e.g. Geneva, Switzerland"
                      className="w-full bg-white border border-[#D8C3A5] rounded-lg px-3 py-2 text-xs text-[#2C241E] focus:outline-none"
                    />
                  </div>
                </div>

                {/* Review title */}
                <div>
                  <label className="text-xs font-medium text-[#4A3F35] block mb-1">
                    Title / Scent Impression
                  </label>
                  <input
                    type="text"
                    required
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="e.g. Divine longevity and warm compliments"
                    className="w-full bg-white border border-[#D8C3A5] rounded-lg px-3 py-2 text-xs text-[#2C241E] focus:outline-none"
                  />
                </div>

                {/* Review comment */}
                <div>
                  <label className="text-xs font-medium text-[#4A3F35] block mb-1">
                    Your Sillage Story
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Describe how the fragrance evolved on your skin, how long it lingered..."
                    className="w-full bg-white border border-[#D8C3A5] rounded-lg px-3 py-2 text-xs text-[#2C241E] focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-[#2C241E] text-white hover:bg-[#C5A059] text-xs font-medium uppercase tracking-[0.2em] rounded-lg transition-colors cursor-pointer"
                >
                  Publish Impression
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
