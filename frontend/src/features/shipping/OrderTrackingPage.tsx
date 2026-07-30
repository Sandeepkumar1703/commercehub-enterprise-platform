import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Truck, CheckCircle2, PackageCheck, MapPin, ArrowLeft, Clock, AlertCircle } from 'lucide-react';
import { shippingApi } from './shipping.api';
import { orderApi } from '../order/order.api';
import { Order, Shipping } from '../../types';
import { formatDate, formatCurrency } from '../../core/utils/formatters';
import { Badge } from '../../shared/components/Badge';
import { Button } from '../../shared/components/Button';
import { Skeleton } from '../../shared/components/Skeleton';
import { useToast } from '../../shared/components/Toast';
import { DeliveryMap } from './components/DeliveryMap';

export const OrderTrackingPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const toast = useToast();

  const [shipping, setShipping] = useState<Shipping | null>(null);
  const [order, setOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    setIsLoading(true);

    Promise.all([shippingApi.getShippingByOrderId(id), orderApi.getOrderById(id)])
      .then(([shipRes, ordRes]) => {
        setShipping(shipRes);
        setOrder(ordRes);
      })
      .catch(() => toast.error('Tracking information unavailable'))
      .finally(() => setIsLoading(false));
  }, [id]);

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
        <Skeleton className="w-full h-48 rounded-2xl" />
        <Skeleton className="w-full h-64 rounded-2xl" />
      </div>
    );
  }

  if (!shipping || !order) {
    return (
      <div className="max-w-md mx-auto my-20 p-8 bg-surface border border-border rounded-2xl text-center space-y-4">
        <AlertCircle className="w-12 h-12 text-status-warning mx-auto" />
        <h2 className="text-base font-bold text-content-primary">Tracking Record Not Found</h2>
        <Button onClick={() => navigate('/orders')}>Return to Order History</Button>
      </div>
    );
  }

  const steps = [
    { key: 'PROCESSING', label: 'Order Confirmed', icon: Clock },
    { key: 'SHIPPED', label: 'Dispatched from Hub', icon: PackageCheck },
    { key: 'IN_TRANSIT', label: 'In Transit', icon: Truck },
    { key: 'OUT_FOR_DELIVERY', label: 'Out for Delivery', icon: MapPin },
    { key: 'DELIVERED', label: 'Package Delivered', icon: CheckCircle2 },
  ];

  const currentStepIndex = steps.findIndex((s) => s.key === shipping.status);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <button
        onClick={() => navigate('/orders')}
        className="inline-flex items-center gap-1.5 text-xs font-bold text-content-secondary hover:text-brand transition-colors cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" /> Back to My Orders
      </button>

      {/* Shipment Header Card */}
      <div className="bg-surface border border-border rounded-2xl p-6 shadow-card space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4">
          <div>
            <span className="text-[10px] font-bold text-content-muted uppercase tracking-wider">Tracking Number</span>
            <h1 className="text-h2 font-black text-content-primary font-mono-custom mt-0.5">{shipping.trackingNumber}</h1>
            <p className="text-xs text-content-muted mt-0.5">Carrier: {shipping.carrier} Express</p>
          </div>

          <div className="flex items-center gap-3">
            <Badge variant="accent">{shipping.status}</Badge>
            <div className="text-right">
              <span className="text-[10px] font-bold text-content-muted uppercase block">Estimated Arrival</span>
              <span className="text-xs font-bold text-brand">{formatDate(shipping.estimatedDelivery)}</span>
            </div>
          </div>
        </div>

        {/* Milestone Timeline Map */}
        <div className="pt-6">
          <div className="relative flex items-center justify-between">
            {/* Background Line */}
            <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-1 bg-border -z-0" />

            {steps.map((step, idx) => {
              const IconComponent = step.icon;
              const isPassed = idx <= currentStepIndex;

              return (
                <div key={step.key} className="relative z-10 flex flex-col items-center group">
                  <div
                    className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all ${
                      isPassed
                        ? 'bg-brand text-brand-foreground border-brand shadow-sm'
                        : 'bg-surface text-content-muted border-border'
                    }`}
                  >
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <span
                    className={`text-[10px] font-bold mt-2 text-center max-w-[80px] ${
                      isPassed ? 'text-content-primary' : 'text-content-muted'
                    }`}
                  >
                    {step.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Interactive Delivery Logistics Map */}
      <DeliveryMap
        orderId={order.id}
        trackingNumber={shipping.trackingNumber}
        carrier={shipping.carrier}
        status={shipping.status}
      />

      {/* Live Timeline Activity Log */}
      <div className="bg-surface border border-border rounded-2xl p-6 shadow-card space-y-4">
        <h3 className="text-xs font-bold text-content-primary uppercase tracking-wider">Live Checkpoint Logs</h3>

        <div className="divide-y divide-border">
          {shipping.trackingEvents?.map((evt) => (
            <div key={evt.id} className="py-3 flex items-center justify-between text-xs">
              <div className="space-y-0.5">
                <p className="font-bold text-content-primary">{evt.description}</p>
                <p className="text-[10px] text-content-muted">{evt.location}</p>
              </div>
              <span className="text-[11px] font-mono-custom text-content-muted">{formatDate(evt.timestamp)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

