import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShoppingBag, Heart, ShieldCheck, Truck, RefreshCw, Star, MessageSquarePlus, Check, ArrowLeft } from 'lucide-react';
import { productApi } from './product.api';
import { reviewApi } from '../review/review.api';
import { Product, Review } from '../../types';
import { formatCurrency, formatDate } from '../../core/utils/formatters';
import { Button } from '../../shared/components/Button';
import { Badge } from '../../shared/components/Badge';
import { RatingStars } from '../../shared/components/RatingStars';
import { Modal } from '../../shared/components/Modal';
import { Skeleton } from '../../shared/components/Skeleton';
import { useAppDispatch, useAppSelector } from '../../app/store/hooks';
import { cartApi } from '../cart/cart.api';
import { setCart, toggleCartDrawer } from '../cart/cartSlice';
import { wishlistApi } from '../wishlist/wishlist.api';
import { setWishlist } from '../wishlist/wishlistSlice';
import { useToast } from '../../shared/components/Toast';

export const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const toast = useToast();
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const { items: wishlistItems } = useAppSelector((state) => state.wishlist);

  const [product, setProduct] = useState<Product | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [selectedImage, setSelectedImage] = useState<string>('');
  const [quantity, setQuantity] = useState(1);

  // Review Modal State
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState('');
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);

  useEffect(() => {
    if (!id) return;
    setIsLoading(true);

    Promise.all([productApi.getProductById(id), reviewApi.getProductReviews(id)])
      .then(([prodRes, revRes]) => {
        setProduct(prodRes);
        setSelectedImage(prodRes.imageUrl);
        setReviews(revRes);
      })
      .catch(() => toast.error('Product not found'))
      .finally(() => setIsLoading(false));
  }, [id]);

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <Skeleton className="w-full h-96 rounded-2xl" />
          <div className="space-y-4">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-6 w-1/4" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-md mx-auto my-20 p-8 bg-surface border border-border rounded-2xl text-center space-y-4">
        <h2 className="text-base font-bold text-content-primary">Product Not Found</h2>
        <Button onClick={() => navigate('/products')}>Return to Catalog</Button>
      </div>
    );
  }

  const isWishlisted = wishlistItems.some((w) => w.productId === product.id);

  const handleAddToCart = async (buyNow = false) => {
    try {
      const updatedCart = await cartApi.addItem(product.id, quantity);
      dispatch(setCart(updatedCart));
      if (buyNow) {
        navigate('/checkout');
      } else {
        toast.success('Added to Cart', `${quantity}x ${product.name}`);
        dispatch(toggleCartDrawer(true));
      }
    } catch {
      toast.error('Failed to add item to cart.');
    }
  };

  const handleToggleWishlist = async () => {
    try {
      if (isWishlisted) {
        const updated = await wishlistApi.removeFromWishlist(product.id);
        dispatch(setWishlist(updated));
        toast.info('Removed from Wishlist');
      } else {
        const updated = await wishlistApi.addToWishlist(product.id);
        dispatch(setWishlist(updated));
        toast.success('Saved to Wishlist');
      }
    } catch {
      toast.error('Failed to update wishlist');
    }
  };

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    if (!isAuthenticated) {
      toast.error('Please sign in to submit a review.');
      navigate('/login');
      return;
    }

    setIsSubmittingReview(true);
    try {
      const rev = await reviewApi.createReview({
        productId: product.id,
        rating: newRating,
        comment: newComment,
      });
      setReviews([rev, ...reviews]);
      setShowReviewModal(false);
      setNewComment('');
      toast.success('Review Submitted!');
    } catch {
      toast.error('Failed to submit review');
    } finally {
      setIsSubmittingReview(false);
    }
  };

  const allImages = [product.imageUrl, ...(product.additionalImages || [])];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Back Button */}
      <button
        onClick={() => navigate('/products')}
        className="inline-flex items-center gap-1.5 text-xs font-bold text-content-secondary hover:text-brand transition-colors cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Catalog
      </button>

      {/* Main Details Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Image Gallery */}
        <div className="space-y-4">
          <div className="aspect-4/3 bg-surface-hover border border-border rounded-2xl overflow-hidden shadow-card">
            <img src={selectedImage} alt={product.name} className="w-full h-full object-cover" />
          </div>

          {allImages.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {allImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className={`w-20 h-20 rounded-xl border overflow-hidden shrink-0 transition-all cursor-pointer ${
                    selectedImage === img ? 'border-brand ring-2 ring-brand/20' : 'border-border hover:border-brand/50'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Meta & Purchase Panel */}
        <div className="space-y-6">
          <div className="space-y-2">
            <Badge variant="primary">{product.categoryName}</Badge>
            <h1 className="text-h1 font-extrabold text-content-primary leading-tight">{product.name}</h1>

            <div className="flex items-center gap-4 text-xs">
              <div className="flex items-center gap-1 font-bold text-amber-500">
                <RatingStars rating={product.rating} size="sm" />
                <span className="ml-1 text-content-primary">{product.rating}</span>
                <span className="text-content-muted font-normal">({reviews.length} reviews)</span>
              </div>

              <span
                className={`font-bold flex items-center gap-1 ${
                  product.stockQuantity > 0 ? 'text-status-success' : 'text-status-danger'
                }`}
              >
                <Check className="w-4 h-4" />
                {product.stockQuantity > 0 ? `${product.stockQuantity} In Stock` : 'Out of Stock'}
              </span>
            </div>
          </div>

          <div className="p-4 bg-surface-hover/50 border border-border rounded-xl space-y-1">
            <div className="flex items-baseline gap-3">
              <span className="text-2xl font-black text-brand">{formatCurrency(product.price)}</span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="text-sm text-content-muted line-through">
                  {formatCurrency(product.originalPrice)}
                </span>
              )}
            </div>
            <p className="text-[11px] text-content-muted">Taxes calculated at checkout. Free shipping available.</p>
          </div>

          <p className="text-xs text-content-secondary leading-relaxed">{product.description}</p>

          {/* Quantity selector & CTAs */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-4">
              <label className="text-xs font-bold text-content-primary">Quantity:</label>
              <div className="flex items-center border border-border rounded-lg overflow-hidden bg-surface">
                <button
                  type="button"
                  disabled={quantity <= 1}
                  onClick={() => setQuantity(quantity - 1)}
                  className="px-3 py-1.5 text-xs font-bold text-content-primary hover:bg-surface-hover cursor-pointer"
                >
                  -
                </button>
                <span className="px-4 text-xs font-bold text-content-primary">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-1.5 text-xs font-bold text-content-primary hover:bg-surface-hover cursor-pointer"
                >
                  +
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <Button
                onClick={() => handleAddToCart(false)}
                disabled={product.stockQuantity === 0}
                leftIcon={<ShoppingBag className="w-4 h-4" />}
                size="lg"
              >
                Add to Cart
              </Button>
              <Button
                onClick={() => handleAddToCart(true)}
                disabled={product.stockQuantity === 0}
                variant="accent"
                size="lg"
              >
                Buy Now
              </Button>
            </div>

            <Button
              onClick={handleToggleWishlist}
              variant="outline"
              className="w-full"
              leftIcon={<Heart className={`w-4 h-4 ${isWishlisted ? 'fill-status-danger text-status-danger' : ''}`} />}
            >
              {isWishlisted ? 'Remove from Wishlist' : 'Save to Wishlist'}
            </Button>
          </div>

          {/* Trust Guarantees */}
          <div className="grid grid-cols-3 gap-3 pt-4 border-t border-border text-[11px] text-content-muted">
            <div className="flex items-center gap-1.5">
              <Truck className="w-4 h-4 text-brand shrink-0" />
              <span>Express Delivery</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-brand shrink-0" />
              <span>2-Year Warranty</span>
            </div>
            <div className="flex items-center gap-1.5">
              <RefreshCw className="w-4 h-4 text-brand shrink-0" />
              <span>30-Day Returns</span>
            </div>
          </div>
        </div>
      </div>

      {/* Specifications & Reviews Tabs */}
      <div className="space-y-8 pt-8 border-t border-border">
        {/* Specs Table */}
        {product.specifications && Object.keys(product.specifications).length > 0 && (
          <div className="bg-surface border border-border rounded-2xl p-6 shadow-card space-y-4">
            <h3 className="text-sm font-bold text-content-primary uppercase tracking-wider">Technical Specifications</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 divide-y sm:divide-y-0 sm:divide-x divide-border">
              {Object.entries(product.specifications).map(([key, val]) => (
                <div key={key} className="flex justify-between py-2 sm:px-4 text-xs">
                  <span className="font-semibold text-content-muted">{key}</span>
                  <span className="font-bold text-content-primary">{val}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Customer Reviews Feed */}
        <div className="bg-surface border border-border rounded-2xl p-6 shadow-card space-y-6">
          <div className="flex items-center justify-between border-b border-border pb-4">
            <div>
              <h3 className="text-sm font-bold text-content-primary uppercase tracking-wider">
                Customer Ratings & Feedback ({reviews.length})
              </h3>
              <p className="text-xs text-content-muted mt-0.5">Verified purchaser reviews and satisfaction ratings</p>
            </div>
            <Button
              size="sm"
              leftIcon={<MessageSquarePlus className="w-4 h-4" />}
              onClick={() => setShowReviewModal(true)}
            >
              Write Review
            </Button>
          </div>

          {reviews.length === 0 ? (
            <div className="text-center py-8 text-xs text-content-muted">
              No reviews yet. Be the first to share your experience with this item!
            </div>
          ) : (
            <div className="divide-y divide-border space-y-4">
              {reviews.map((rev) => (
                <div key={rev.id} className="pt-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-brand/10 text-brand font-bold text-xs flex items-center justify-center">
                        {rev.userName[0]}
                      </div>
                      <div>
                        <p className="text-xs font-bold text-content-primary">{rev.userName}</p>
                        <p className="text-[10px] text-content-muted">{formatDate(rev.createdAt)}</p>
                      </div>
                    </div>
                    <RatingStars rating={rev.rating} size="sm" />
                  </div>
                  <p className="text-xs text-content-secondary leading-relaxed pl-10">{rev.comment}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Review Submission Modal */}
      <Modal
        isOpen={showReviewModal}
        onClose={() => setShowReviewModal(false)}
        title="Write a Customer Review"
        description={`Share your feedback for ${product.name}`}
      >
        <form onSubmit={handleSubmitReview} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-content-primary">Your Rating</label>
            <RatingStars rating={newRating} interactive onRatingChange={setNewRating} size="lg" />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-content-primary">Review Comment</label>
            <textarea
              rows={4}
              required
              placeholder="Describe product quality, performance, noise cancellation, material texture..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="w-full p-3 bg-surface border border-border rounded-xl text-xs text-content-primary focus:outline-none focus:border-brand"
            />
          </div>

          <Button type="submit" className="w-full" isLoading={isSubmittingReview}>
            Submit Verified Review
          </Button>
        </form>
      </Modal>
    </div>
  );
};
