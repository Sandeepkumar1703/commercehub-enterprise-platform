import React, { useState, useEffect } from 'react';
import { Star, CheckCircle, XCircle, Trash2, MessageSquare } from 'lucide-react';
import { adminApi } from './admin.api';
import { reviewApi } from '../review/review.api';
import { Review } from '../../types';
import { Table } from '../../shared/components/Table';
import { Badge } from '../../shared/components/Badge';
import { Button } from '../../shared/components/Button';
import { RatingStars } from '../../shared/components/RatingStars';
import { formatDate } from '../../core/utils/formatters';
import { useToast } from '../../shared/components/Toast';

export const AdminReviewsPage: React.FC = () => {
  const toast = useToast();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadReviews();
  }, []);

  const loadReviews = () => {
    setIsLoading(true);
    adminApi
      .getReviews()
      .then((res) => setReviews(res.content))
      .catch(() => toast.error('Failed to load reviews'))
      .finally(() => setIsLoading(false));
  };

  const handleModerate = async (reviewId: string, status: 'APPROVED' | 'REJECTED') => {
    try {
      await adminApi.moderateReview(reviewId, status);
      setReviews(reviews.map((r) => (r.id === reviewId ? { ...r, status } : r)));
      toast.success(`Review ${status.toLowerCase()}`);
    } catch {
      toast.error('Failed to update review status');
    }
  };

  const handleDelete = async (reviewId: string) => {
    if (!confirm('Are you sure you want to delete this review?')) return;
    try {
      await reviewApi.deleteReview(reviewId);
      setReviews(reviews.filter((r) => r.id !== reviewId));
      toast.info('Review deleted');
    } catch {
      toast.error('Failed to delete review');
    }
  };

  const columns = [
    {
      key: 'customer',
      header: 'Customer',
      render: (r: Review) => (
        <div>
          <p className="font-bold text-content-primary">{r.userName}</p>
          <p className="text-[10px] text-content-muted">{formatDate(r.createdAt)}</p>
        </div>
      ),
    },
    {
      key: 'rating',
      header: 'Rating',
      render: (r: Review) => <RatingStars rating={r.rating} size="sm" />,
    },
    {
      key: 'comment',
      header: 'Review Comment',
      render: (r: Review) => (
        <p className="text-xs text-content-secondary line-clamp-2 max-w-md">{r.comment}</p>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      render: (r: Review) => {
        const s = (r as any).status || 'APPROVED';
        return (
          <Badge variant={s === 'APPROVED' ? 'success' : s === 'REJECTED' ? 'danger' : 'warning'}>
            {s}
          </Badge>
        );
      },
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (r: Review) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleModerate(r.id, 'APPROVED')}
            className="p-1.5 text-status-success border border-border rounded-lg hover:bg-surface-hover cursor-pointer"
            title="Approve Review"
          >
            <CheckCircle className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleModerate(r.id, 'REJECTED')}
            className="p-1.5 text-status-warning border border-border rounded-lg hover:bg-surface-hover cursor-pointer"
            title="Reject Review"
          >
            <XCircle className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleDelete(r.id)}
            className="p-1.5 text-status-danger border border-border rounded-lg hover:bg-surface-hover cursor-pointer"
            title="Delete Review"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="border-b border-border pb-4">
        <h1 className="text-h1 font-extrabold text-content-primary">Review Moderation Queue</h1>
        <p className="text-xs text-content-muted mt-0.5">Approve, reject, or delete customer product ratings and reviews</p>
      </div>

      <Table columns={columns} data={reviews} isLoading={isLoading} />
    </div>
  );
};
