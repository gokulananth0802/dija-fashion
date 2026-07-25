import React, { useState } from 'react';
import { Star, Instagram, CheckCircle, ExternalLink, MessageSquare, Plus, X, Heart } from 'lucide-react';
import { GOOGLE_REVIEWS, INSTAGRAM_POSTS, STORE_INFO } from '../data/initialData';
import { Review, Language } from '../types';

interface SocialProofAndInstaProps {
  language: Language;
}

export const SocialProofAndInsta: React.FC<SocialProofAndInstaProps> = ({ language }) => {
  const [reviewsList, setReviewsList] = useState<Review[]>(GOOGLE_REVIEWS);
  const [showAddReviewModal, setShowAddReviewModal] = useState(false);
  const [newAuthor, setNewAuthor] = useState('');
  const [newLocation, setNewLocation] = useState('Erode, Tamil Nadu');
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState('');

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAuthor.trim() || !newComment.trim()) return;

    const newRev: Review = {
      id: `rev-${Date.now()}`,
      author: newAuthor.trim(),
      location: newLocation.trim() || 'Erode',
      rating: newRating,
      comment: newComment.trim(),
      date: 'Just now',
      verifiedBuyer: true
    };

    setReviewsList([newRev, ...reviewsList]);
    setShowAddReviewModal(false);
    setNewAuthor('');
    setNewComment('');
  };

  return (
    <section id="reviews" className="py-12 bg-[#FCFBF7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
        
        {/* PART 1: Google Reviews & Social Proof Header */}
        <div>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-[#EADBB2]/60">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider mb-2">
                <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-600" />
                <span>5.0 ★ Google Rated Boutique</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#0A3A2A]">
                {language === 'EN' ? 'Loved by 500+ Local Customers in Erode' : 'வாடிக்கையாளர்களின் மேலான கருத்துக்கள்'}
              </h2>
              <p className="text-gray-600 text-xs sm:text-sm mt-1">
                Real customer feedback from Karungalpalayam, KAS Nagar, Surampatti, and Perundurai.
              </p>
            </div>

            <button
              onClick={() => setShowAddReviewModal(true)}
              className="mt-4 md:mt-0 self-start md:self-auto px-4 py-2 rounded-full bg-[#0A3A2A] text-[#D4AF37] font-semibold text-xs flex items-center gap-1.5 hover:bg-[#12533e] transition-colors shadow-xs"
            >
              <Plus className="w-4 h-4" />
              <span>{language === 'EN' ? 'Write Google Review' : 'கருத்து தெரிவிக்க'}</span>
            </button>
          </div>

          {/* Reviews Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {reviewsList.map((rev) => (
              <div
                key={rev.id}
                className="bg-white rounded-xl p-4 border border-[#EADBB2]/50 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div>
                  {/* Rating Stars */}
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < rev.rating ? 'fill-amber-400 text-amber-500' : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>

                  {/* Comment */}
                  <p className="text-xs text-gray-700 italic leading-relaxed mb-3 line-clamp-4">
                    "{rev.comment}"
                  </p>
                </div>

                {/* Author Info */}
                <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-[11px]">
                  <div>
                    <p className="font-bold text-[#0A3A2A] flex items-center gap-1">
                      <span>{rev.author}</span>
                      {rev.verifiedBuyer && (
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-600 fill-emerald-100" />
                      )}
                    </p>
                    <p className="text-gray-400">{rev.location}</p>
                  </div>
                  <span className="text-gray-400 text-[10px]">{rev.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* PART 2: Instagram Showcase Grid (@dija_fashion_6) */}
        <div>
          <div className="text-center mb-6">
            <a
              href={STORE_INFO.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 text-white font-bold text-xs shadow-md hover:opacity-90 transition-opacity mb-2"
            >
              <Instagram className="w-4 h-4" />
              <span>Follow Us {STORE_INFO.instagramHandle}</span>
              <ExternalLink className="w-3 h-3 ml-1" />
            </a>
            <h3 className="font-serif text-2xl font-bold text-[#0A3A2A]">
              {language === 'EN' ? 'Instagram Trending Outfits' : 'இன்ஸ்டாகிராம் புதிய ஆடைகள்'}
            </h3>
            <p className="text-xs text-gray-500">
              Tag us in your photos for a chance to get featured on our official page!
            </p>
          </div>

          {/* 6-Tile Instagram Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            {INSTAGRAM_POSTS.map((post) => (
              <a
                key={post.id}
                href={STORE_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative aspect-square rounded-xl overflow-hidden bg-gray-100 border border-gray-200 shadow-xs"
              >
                <img
                  src={post.image}
                  alt="Instagram Post"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-center items-center p-2 text-white text-center">
                  <Heart className="w-5 h-5 text-pink-400 fill-current mb-1 animate-pulse" />
                  <span className="text-xs font-bold">{post.likes} Likes</span>
                  <span className="text-[10px] text-gray-200 line-clamp-2 mt-1 px-1">
                    {post.caption}
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>

      </div>

      {/* Write Review Modal */}
      {showAddReviewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full border border-[#D4AF37] shadow-2xl">
            <div className="flex items-center justify-between border-b pb-3 mb-4">
              <h3 className="font-serif font-bold text-lg text-[#0A3A2A]">
                Write a Review for Dija Fashion
              </h3>
              <button onClick={() => setShowAddReviewModal(false)} className="text-gray-500 hover:text-black">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddReview} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Your Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sangeetha R."
                  value={newAuthor}
                  onChange={(e) => setNewAuthor(e.target.value)}
                  className="w-full px-3 py-2 text-xs border rounded-lg focus:ring-2 focus:ring-[#0A3A2A]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Location in Erode</label>
                <input
                  type="text"
                  placeholder="e.g. Karungalpalayam, Erode"
                  value={newLocation}
                  onChange={(e) => setNewLocation(e.target.value)}
                  className="w-full px-3 py-2 text-xs border rounded-lg focus:ring-2 focus:ring-[#0A3A2A]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Star Rating</label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setNewRating(star)}
                      className="p-1 text-amber-400 focus:outline-none"
                    >
                      <Star className={`w-6 h-6 ${star <= newRating ? 'fill-amber-400' : 'text-gray-300'}`} />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Your Experience / Review *</label>
                <textarea
                  required
                  rows={3}
                  placeholder="Share details about fabric quality, fitting, delivery, or store experience..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="w-full px-3 py-2 text-xs border rounded-lg focus:ring-2 focus:ring-[#0A3A2A]"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddReviewModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-gray-600 rounded-lg hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold text-[#D4AF37] bg-[#0A3A2A] rounded-lg shadow-sm"
                >
                  Submit Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </section>
  );
};
