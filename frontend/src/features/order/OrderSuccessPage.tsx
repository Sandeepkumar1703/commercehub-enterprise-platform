import React from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { CheckCircle2, Package, ArrowRight, Truck } from 'lucide-react';
import { Order } from '../../types';
import { Button } from '../../shared/components/Button';
import { formatCurrency, formatDate } from '../../core/utils/formatters';

export const OrderSuccessPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const order = (location.state as any)?.order as Order | undefined;

  if (!order) {
    return (
      <div className="max-w-md mx-auto my-20 p-8 bg-surface border border-border rounded-2xl text-center space-y-4">
        <h2 className="text-base font-bold text-content-primary">Order Confirmation</h2>
        <Button onClick={() => navigate('/orders')}>View My Orders</Button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 space-y-8 text-center">
      <div className="w-16 h-16 rounded-full bg-status-success/10 text-status-success flex items-center justify-center mx-auto border border-status-success/20">
        <CheckCircle2 className="w-10 h-10" />
      </div>

      <div className="space-y-2">
        <h1 className="text-h1 font-extrabold text-content-primary">Order Confirmed!</h1>
        <p className="text-xs text-content-secondary max-w-md mx-auto">
          Thank you for your purchase. Order <span className="font-bold text-brand">{order.orderNumber || order.id}</span> has been received and sent to our warehouse for fulfillment.
        </p>
      </div>

      <div className="bg-surface border border-border rounded-2xl p-6 shadow-card text-left space-y-4">
        <div className="flex items-center justify-between border-b border-border pb-3">
          <span className="text-xs font-bold text-content-muted">Order ID: {order.id}</span>
          <span className="text-xs text-content-muted">{formatDate(order.createdAt)}</span>
        </div>

        <div className="space-y-3">
          {order.items.map((item) => (
            <div key={item.id} className="flex items-center justify-between text-xs">
              <span className="font-bold text-content-primary">
                {item.quantity}x {item.productName}
              </span>
              <span className="font-semibold text-content-secondary">{formatCurrency(item.price * item.quantity)}</span>
            </div>
          ))}
        </div>

        <div className="pt-3 border-t border-border flex justify-between items-center font-bold text-sm">
          <span>Total Paid</span>
          <span className="text-brand text-base font-black">{formatCurrency(order.totalAmount)}</span>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-4">
        <Button onClick={() => navigate(`/orders/${order.id}/tracking`)} leftIcon={<Truck className="w-4 h-4" />}>
          Track Live Order Status
        </Button>
        <Button variant="outline" onClick={() => navigate('/products')}>
          Continue Shopping
        </Button>
      </div>
    </div>
  );
};
