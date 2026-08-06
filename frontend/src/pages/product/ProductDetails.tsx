import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Star, ShoppingCart, Heart, ShieldCheck, Truck, ArrowLeft, MessageSquare, Send } from 'lucide-react';
import { productApi } from '../../api/productApi';
import { reviewApi } from '../../api/reviewApi';
import { cartApi } from '../../api/cartApi';
import { wishlistApi } from '../../api/wishlistApi';
import { Product, Review } from '../../types';
import { Button } from '../../components/common/Button';
import { Loader } from '../../components/common/Loader';
import { ErrorMessage } from '../../components/common/ErrorMessage';
import { Input } from '../../components/common/Input';

export const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [product, setProduct] = useState<Product | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [addingCart, setAddingCart] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // New Review form state
  const [reviewTitle, setReviewTitle] = useState('');
  const [reviewComment, setReviewComment] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [submittingReview, setSubmittingReview] = useState(false);

  useEffect(() => {
    if (!id) return;
    const fetchProductDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const prodRes = await productApi.getProductById(id);
        const prodData = (prodRes as any)?.data ?? prodRes;
        if (prodData && (prodData.id || prodData.name || prodData.title)) {
          setProduct(prodData);
          const firstImg =
            (prodData.images && prodData.images[0]) ||
            prodData.imageUrl ||
            'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800';
          setSelectedImage(firstImg);
        } else {
          setError('Product not found');
        }

        const revRes = await reviewApi.getReviewsByProductId(id);
        const revData = (revRes as any)?.data ?? revRes;
        const reviewList = Array.isArray(revData)
          ? revData
          : Array.isArray(revData?.reviews)
          ? revData.reviews
          : [];
        setReviews(reviewList);
      } catch (err: any) {
        setError(err?.message || 'Error fetching product details');
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id]);

  const handleAddToCart = async () => {
    if (!product) return;
    setAddingCart(true);
    try {
      await cartApi.addToCart(product.id, quantity);
      navigate('/cart');
    } catch (err) {
      console.error('Cart error', err);
    } finally {
      setAddingCart(false);
    }
  };

  const handleAddReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;
    setSubmittingReview(true);
    try {
      const res = await reviewApi.createReview({
        productId: id,
        rating: reviewRating,
        title: reviewTitle,
        comment: reviewComment,
      });
      const newReview = (res as any)?.data ?? res;
      if (newReview && (newReview.id || newReview.title)) {
        setReviews([newReview, ...reviews]);
        setReviewTitle('');
        setReviewComment('');
      }
    } catch (err) {
      console.error('Review error', err);
    } finally {
      setSubmittingReview(false);
    }
  };

  if (loading) return <Loader text="Retrieving product specifications from API..." />;
  if (error || !product) return <ErrorMessage message={error || 'Product not found'} />;

  const displayTitle = product.title || product.name || 'Product Details';
  const displayImages = (product.images && product.images.length > 0)
    ? product.images
    : [product.imageUrl || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800'];
  const displayBrand = product.brand || product.categoryName || product.category || 'VYNK';
  const displaySku = product.sku || `SKU-${product.id}`;
  const displayRating = product.rating ?? 4.5;
  const displayReviewCount = product.reviewCount ?? reviews.length;

  return (
    <div className="space-y-10 max-w-6xl mx-auto">
      <Link to="/products" className="inline-flex items-center gap-2 text-xs font-bold text-[var(--vynk-brand)] hover:underline">
        <ArrowLeft className="w-4 h-4" /> Back to Catalog
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Images Gallery */}
        <div className="space-y-4">
          <div className="aspect-4/3 card-surface overflow-hidden bg-slate-100 dark:bg-slate-800">
            <img src={selectedImage || displayImages[0]} alt={displayTitle} className="w-full h-full object-cover" />
          </div>
          {displayImages.length > 1 && (
            <div className="flex items-center gap-3">
              {displayImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className={`w-16 h-16 rounded-xl overflow-hidden border-2 cursor-pointer transition-all ${
                    selectedImage === img ? 'border-[var(--vynk-brand)] scale-105' : 'border-transparent opacity-70'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-[var(--vynk-brand)] uppercase tracking-wider mb-1">
              <span>{displayBrand}</span> • <span>SKU: {displaySku}</span>
            </div>
            <h1 className="text-2xl font-black text-slate-900 dark:text-slate-100">{displayTitle}</h1>

            <div className="flex items-center gap-2 mt-2">
              <div className="flex items-center text-amber-400">
                <Star className="w-4 h-4 fill-amber-400" />
                <span className="text-xs font-extrabold text-slate-800 dark:text-slate-200 ml-1">{displayRating}</span>
              </div>
              <span className="text-xs text-slate-400">({displayReviewCount} reviews)</span>
            </div>
          </div>

          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-black text-slate-900 dark:text-slate-100">${product.price.toFixed(2)}</span>
            {product.comparePrice && (
              <span className="text-sm text-slate-400 line-through">${product.comparePrice.toFixed(2)}</span>
            )}
          </div>

          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{product.description}</p>

          <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-4">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Quantity:</label>
              <div className="flex items-center border border-slate-200 dark:border-slate-700 rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-1 text-sm font-bold hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                >
                  -
                </button>
                <span className="px-3 py-1 text-xs font-bold">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-1 text-sm font-bold hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                >
                  +
                </button>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button
                onClick={handleAddToCart}
                loading={addingCart}
                size="lg"
                className="flex-1"
                icon={<ShoppingCart className="w-4 h-4" />}
              >
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="card-surface p-6 space-y-6">
        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">Customer Reviews & Ratings</h3>

        {/* Add Review Form */}
        <form onSubmit={handleAddReview} className="space-y-3 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl">
          <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300">Leave a Review</h4>
          <Input
            placeholder="Review Title (e.g. Excellent build quality)"
            value={reviewTitle}
            onChange={(e) => setReviewTitle(e.target.value)}
            required
          />
          <textarea
            placeholder="Write your honest review..."
            value={reviewComment}
            onChange={(e) => setReviewComment(e.target.value)}
            required
            className="w-full text-xs p-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
            rows={3}
          />
          <Button type="submit" loading={submittingReview} size="sm" icon={<Send className="w-3.5 h-3.5" />}>
            Submit Review
          </Button>
        </form>

        {/* Reviews List */}
        <div className="space-y-4">
          {reviews.map((rev) => (
            <div key={rev.id} className="p-4 border-b border-slate-100 dark:border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900 dark:text-slate-100">{rev.userName}</span>
                <div className="flex items-center text-amber-400">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <span className="text-xs font-bold ml-1">{rev.rating}</span>
                </div>
              </div>
              <p className="text-xs font-bold text-slate-800 dark:text-slate-200">{rev.title}</p>
              <p className="text-xs text-slate-600 dark:text-slate-400">{rev.comment}</p>
              {rev.sellerResponse && (
                <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-xl text-xs text-slate-800 dark:text-slate-200 mt-2">
                  <span className="font-bold block text-[var(--vynk-brand)]">Merchant Seller Response:</span>
                  {rev.sellerResponse}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
