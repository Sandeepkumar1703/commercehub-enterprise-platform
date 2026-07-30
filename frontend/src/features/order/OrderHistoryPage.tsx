import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Truck, FileText, XCircle, RotateCcw } from 'lucide-react';
import { orderApi } from './order.api';
import { Order } from '../../types';
import { formatCurrency, formatDate } from '../../core/utils/formatters';
import { Badge } from '../../shared/components/Badge';
import { Button } from '../../shared/components/Button';
import { Skeleton } from '../../shared/components/Skeleton';
import { useToast } from '../../shared/components/Toast';

export const OrderHistoryPage: React.FC = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    orderApi
      .getMyOrders()
      .then(setOrders)
      .catch(() => toast.error('Failed to load orders'))
      .finally(() => setIsLoading(false));
  }, []);

  const handleCancelOrder = async (orderId: string) => {
    if (!confirm('Are you sure you want to cancel this order?')) return;
    try {
      const updated = await orderApi.cancelOrder(orderId);
      setOrders(orders.map((o) => (o.id === orderId ? updated : o)));
      toast.info('Order has been cancelled');
    } catch {
      toast.error('Failed to cancel order');
    }
  };

  const handleDownloadInvoice = (order: Order) => {
    toast.success('Invoice Downloaded', `Tax invoice for ${order.orderNumber}`);
  };

  const handleReturnOrder = (orderNumber: string) => {
    toast.info('Return Request Initiated', `Return ticket created for ${orderNumber}. Our team will review your request.`);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'DELIVERED':
        return <Badge variant="success">Delivered</Badge>;
      case 'SHIPPED':
      case 'IN_TRANSIT':
      case 'OUT_FOR_DELIVERY':
        return <Badge variant="accent">In Transit</Badge>;
      case 'PROCESSING':
      case 'PLACED':
        return <Badge variant="warning">Processing</Badge>;
      case 'CANCELLED':
        return <Badge variant="danger">Cancelled</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="w-full h-32 rounded-xl" />
        ))}
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="bg-surface border border-border rounded-xl p-12 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-surface-hover flex items-center justify-center text-content-muted mx-auto">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <h2 className="text-h2 font-extrabold text-content-primary">No Past Orders Found</h2>
        <p className="text-xs text-content-muted max-w-sm mx-auto">
          You haven't placed any orders yet. Check out our high-performance tech and workspace gear.
        </p>
        <Button onClick={() => navigate('/products')}>Explore Products</Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="border-b border-border pb-4">
        <h1 className="text-h1 font-extrabold text-content-primary">My Orders & Fulfillment History</h1>
        <p className="text-xs text-content-muted mt-0.5">Track active shipments, download invoices, and manage past purchases</p>
      </div>

      <div className="space-y-4">
        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-surface border border-border rounded-xl p-5 shadow-card hover:border-brand/30 transition-all space-y-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border pb-3">
              <div>
                <span className="text-xs font-bold text-content-primary">{order.orderNumber}</span>
                <p className="text-[10px] text-content-muted">Placed on {formatDate(order.createdAt)}</p>
              </div>

              <div className="flex items-center gap-3">
                {getStatusBadge(order.status)}
                <span className="text-sm font-black text-brand">{formatCurrency(order.totalAmount)}</span>
              </div>
            </div>

            <div className="divide-y divide-border">
              {order.items.map((item) => (
                <div key={item.id} className="py-2 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    {item.productImageUrl && (
                      <img src={item.productImageUrl} alt="" className="w-10 h-10 object-cover rounded-md border border-border" />
                    )}
                    <div>
                      <p className="font-bold text-content-primary">{item.productName}</p>
                      <p className="text-[10px] text-content-muted">Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <span className="font-semibold text-content-secondary">{formatCurrency(item.price * item.quantity)}</span>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-border flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleDownloadInvoice(order)}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-content-secondary hover:text-brand cursor-pointer"
                >
                  <FileText className="w-3.5 h-3.5" /> Tax Invoice
                </button>

                {order.status === 'DELIVERED' && (
                  <button
                    onClick={() => handleReturnOrder(order.orderNumber)}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-content-secondary hover:text-amber-600 cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" /> Request Return
                  </button>
                )}

                {(order.status === 'PROCESSING' || order.status === 'PLACED') && (
                  <button
                    onClick={() => handleCancelOrder(order.id)}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-status-danger hover:underline cursor-pointer"
                  >
                    <XCircle className="w-3.5 h-3.5" /> Cancel Order
                  </button>
                )}
              </div>

              <Link
                to={`/orders/${order.id}/tracking`}
                className="inline-flex items-center gap-1 text-xs font-bold text-brand hover:underline"
              >
                <Truck className="w-4 h-4" /> Live Tracking
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
