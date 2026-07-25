import React, { useState } from 'react';
import { Star, ThumbsUp, CheckCircle, MessageSquare, Send } from 'lucide-react';

interface ReviewItem {
  id: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  helpfulCount: number;
  isVerified: boolean;
}

interface ProductReviewsProps {
  productId: number;
  initialRating?: number;
  initialCount?: number;
}

export const ProductReviews: React.FC<ProductReviewsProps> = ({
  productId,
  initialRating = 4.8,
  initialCount = 24,
}) => {
  const [reviews, setReviews] = useState<ReviewItem[]>([
    {
      id: 'rev-1',
      author: 'Sandeep Prasad',
      rating: 5,
      date: '2026-07-20',
      title: 'Outstanding quality and enterprise build!',
      comment:
        'Exceeded my expectations. The sound isolation is pure bliss, battery life easily lasts two full work days, and the build quality feels premium.',
      helpfulCount: 18,
      isVerified: true,
    },
    {
      id: 'rev-2',
      author: 'Ananya Sharma',
      rating: 5,
      date: '2026-07-18',
      title: 'Fast dispatch & seamless connectivity',
      comment:
        'Paired instantly with my devices. Very comfortable for multi-hour meetings.',
      helpfulCount: 9,
      isVerified: true,
    },
    {
      id: 'rev-3',
      author: 'David K.',
      rating: 4,
      date: '2026-07-10',
      title: 'Great product, sleek design',
      comment:
        'Everything works well. Minor suggestion: would love an optional hard-shell travel case in the box.',
      helpfulCount: 4,
      isVerified: true,
    },
  ]);

  const [isAdding, setIsAdding] = useState(false);
  const [newRating, setNewRating] = useState(5);
  const [newTitle, setNewTitle] = useState('');
  const [newComment, setNewComment] = useState('');
  const [newAuthor, setNewAuthor] = useState('');

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newComment.trim()) return;

    const created: ReviewItem = {
      id: `rev-${Date.now()}`,
      author: newAuthor.trim() || 'Verified Customer',
      rating: newRating,
      date: new Date().toISOString().split('T')[0],
      title: newTitle.trim(),
      comment: newComment.trim(),
      helpfulCount: 0,
      isVerified: true,
    };

    setReviews([created, ...reviews]);
    setNewTitle('');
    setNewComment('');
    setNewAuthor('');
    setIsAdding(false);
  };

  const handleHelpfulVote = (reviewId: string) => {
    setReviews((prev) =>
      prev.map((r) =>
        r.id === reviewId ? { ...r, helpfulCount: r.helpfulCount + 1 } : r
      )
    );
  };

  return (
    <div className="space-y-8 pt-8 border-t border-[var(--border-default)]">
      
      {/* Header & Rating Breakdown */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 p-6 rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-default)] shadow-sm">
        
        {/* Rating Score Summary */}
        <div className="flex items-center gap-6">
          <div className="text-center p-4 rounded-2xl bg-[var(--bg-surface-raised)] border border-[var(--border-default)]">
            <span className="text-4xl font-black text-[var(--text-primary)]">{initialRating.toFixed(1)}</span>
            <div className="flex items-center justify-center gap-1 my-1 text-amber-400">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="w-4 h-4 fill-amber-400" />
              ))}
            </div>
            <p className="text-xs text-[var(--text-secondary)] font-medium">
              Based on {reviews.length + initialCount} reviews
            </p>
          </div>

          {/* Rating Distribution Bars */}
          <div className="space-y-1.5 text-xs w-48 sm:w-64">
            {[
              { star: 5, pct: 85 },
              { star: 4, pct: 10 },
              { star: 3, pct: 3 },
              { star: 2, pct: 1 },
              { star: 1, pct: 1 },
            ].map((bar) => (
              <div key={bar.star} className="flex items-center gap-2">
                <span className="w-8 font-bold text-[var(--text-secondary)]">{bar.star} ★</span>
                <div className="flex-1 h-2 rounded-full bg-[var(--bg-surface-raised)] overflow-hidden">
                  <div
                    style={{ width: `${bar.pct}%` }}
                    className="h-full bg-amber-400 rounded-full"
                  />
                </div>
                <span className="w-8 text-right font-semibold text-[var(--text-secondary)]">{bar.pct}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Trigger Review Button */}
        <div>
          <button
            onClick={() => setIsAdding(!isAdding)}
            className="px-5 py-2.5 bg-[var(--brand-primary)] text-white hover:bg-[var(--brand-hover)] rounded-xl text-xs font-bold transition-all shadow-md flex items-center gap-2 cursor-pointer"
          >
            <MessageSquare className="w-4 h-4" />
            <span>{isAdding ? 'Close Review Form' : 'Write a Product Review'}</span>
          </button>
        </div>
      </div>

      {/* Write Review Form */}
      {isAdding && (
        <form
          onSubmit={handleAddReview}
          className="p-6 rounded-3xl bg-[var(--bg-surface)] border border-indigo-500/30 shadow-lg space-y-4 animate-in slide-in-from-top duration-200"
        >
          <h4 className="text-sm font-extrabold text-[var(--text-primary)]">Write Your Customer Review</h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-bold text-[var(--text-secondary)] mb-1">Your Name</label>
              <input
                type="text"
                placeholder="e.g. Sandeep Prasad"
                value={newAuthor}
                onChange={(e) => setNewAuthor(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-[var(--border-default)] bg-[var(--bg-surface-raised)] text-[var(--text-primary)]"
              />
            </div>

            <div>
              <label className="block font-bold text-[var(--text-secondary)] mb-1">Rating Score</label>
              <div className="flex items-center gap-2 py-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setNewRating(star)}
                    className="cursor-pointer"
                  >
                    <Star
                      className={`w-6 h-6 ${
                        star <= newRating
                          ? 'text-amber-400 fill-amber-400'
                          : 'text-[var(--border-default)]'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="text-xs">
            <label className="block font-bold text-[var(--text-secondary)] mb-1">Review Headline Title</label>
            <input
              type="text"
              required
              placeholder="e.g. Outstanding quality & quick delivery!"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-[var(--border-default)] bg-[var(--bg-surface-raised)] text-[var(--text-primary)]"
            />
          </div>

          <div className="text-xs">
            <label className="block font-bold text-[var(--text-secondary)] mb-1">Detailed Review Comments</label>
            <textarea
              rows={3}
              required
              placeholder="What did you like or dislike about this item?"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-[var(--border-default)] bg-[var(--bg-surface-raised)] text-[var(--text-primary)]"
            />
          </div>

          <button
            type="submit"
            className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-xs flex items-center gap-2 shadow-md cursor-pointer"
          >
            <Send className="w-4 h-4" />
            <span>Submit Verified Review</span>
          </button>
        </form>
      )}

      {/* Reviews List */}
      <div className="space-y-4">
        {reviews.map((rev) => (
          <div
            key={rev.id}
            className="p-6 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-default)] space-y-3 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-indigo-600 text-white font-bold text-xs flex items-center justify-center">
                  {rev.author.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs text-[var(--text-primary)]">{rev.author}</span>
                    {rev.isVerified && (
                      <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 text-[10px] font-bold flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" />
                        <span>Verified Buyer</span>
                      </span>
                    )}
                  </div>
                  <p className="text-[10px] text-[var(--text-secondary)]">{rev.date}</p>
                </div>
              </div>

              <div className="flex items-center gap-1 text-amber-400">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-3.5 h-3.5 ${
                      star <= rev.rating ? 'fill-amber-400' : 'text-slate-300'
                    }`}
                  />
                ))}
              </div>
            </div>

            <p className="text-xs font-extrabold text-[var(--text-primary)]">{rev.title}</p>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{rev.comment}</p>

            <div className="pt-2 flex items-center justify-between text-[11px] text-[var(--text-secondary)]">
              <button
                onClick={() => handleHelpfulVote(rev.id)}
                className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[var(--bg-surface-raised)] hover:bg-indigo-50 dark:hover:bg-indigo-950 text-[var(--text-primary)] transition-colors cursor-pointer"
              >
                <ThumbsUp className="w-3.5 h-3.5 text-indigo-500" />
                <span>Helpful ({rev.helpfulCount})</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
