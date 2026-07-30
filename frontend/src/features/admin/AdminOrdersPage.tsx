import React, { useState, useEffect } from 'react';
import { ShoppingCart, Eye, Truck, Check } from 'lucide-react';
import { adminApi } from './admin.api';
import { orderApi } from '../order/order.api';
import { Order } from '../../types';
import { Table } from '../../shared/components/Table';
import { Badge } from '../../shared/components/Badge';
import { Select } from '../../shared/components/Select';
import { Modal } from '../../shared/components/Modal';
import { formatCurrency, formatDate } from '../../core/utils/formatters';
import { useToast } from '../../shared/components/Toast';

export const AdminOrdersPage: React.FC = () => {
  const toast = useToast();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = () => {
    setIsLoading(true);
    adminApi
      .getOrders()
      .then((res) => setOrders(res.content))
      .catch(() => toast.error('Failed to load orders'))
      .finally(() => setIsLoading(false));
  };

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    try {
      const updated = await orderApi.updateOrderStatus(orderId, newStatus);
      setOrders(orders.map((o) => (o.id === orderId ? updated : o)));
      toast.success('Order status updated');
    } catch {
      toast.error('Failed to update status');
    }
  };

  const columns = [
    {
      key: 'orderNumber',
      header: 'Order #',
      render: (o: Order) => (
        <div>
          <span className="font-bold text-content-primary">{o.orderNumber}</span>
          <p className="text-[10px] text-content-muted">{formatDate(o.createdAt)}</p>
        </div>
      ),
    },
    {
      key: 'customer',
      header: 'Customer',
      render: (o: Order) => (
        <div>
          <p className="font-bold text-content-primary">{o.userName}</p>
          <p className="text-[10px] text-content-muted">{o.userEmail}</p>
        </div>
      ),
    },
    {
      key: 'total',
      header: 'Total Amount',
      render: (o: Order) => <span className="font-bold text-brand">{formatCurrency(o.totalAmount)}</span>,
    },
    {
      key: 'status',
      header: 'Fulfillment Status',
      render: (o: Order) => (
        <div className="w-40">
          <Select
            options={[
              { label: 'PROCESSING', value: 'PROCESSING' },
              { label: 'SHIPPED', value: 'SHIPPED' },
              { label: 'IN_TRANSIT', value: 'IN_TRANSIT' },
              { label: 'DELIVERED', value: 'DELIVERED' },
              { label: 'CANCELLED', value: 'CANCELLED' },
            ]}
            value={o.status}
            onChange={(e) => handleStatusChange(o.id, e.target.value)}
          />
        </div>
      ),
    },
    {
      key: 'actions',
      header: 'View',
      render: (o: Order) => (
        <button
          onClick={() => setSelectedOrder(o)}
          className="p-1.5 text-content-muted hover:text-brand border border-border rounded-lg hover:bg-surface-hover cursor-pointer"
        >
          <Eye className="w-4 h-4" />
        </button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="border-b border-border pb-4">
        <h1 className="text-h1 font-extrabold text-content-primary">Order Fulfillment Queue</h1>
        <p className="text-xs text-content-muted mt-0.5">Manage customer shipments, status tracking, and invoices</p>
      </div>

      <Table columns={columns} data={orders} isLoading={isLoading} />

      <Modal isOpen={!!selectedOrder} onClose={() => setSelectedOrder(null)} title={`Order Details: ${selectedOrder?.orderNumber}`}>
        {selectedOrder && (
          <div className="space-y-4">
            <div className="p-3 bg-surface-hover border border-border rounded-xl text-xs space-y-1">
              <p className="font-bold text-content-primary">Shipping Address:</p>
              <p className="text-content-secondary">
                {selectedOrder.shippingAddress?.street}, {selectedOrder.shippingAddress?.city},{' '}
                {selectedOrder.shippingAddress?.state} {selectedOrder.shippingAddress?.postalCode}
              </p>
            </div>

            <div className="divide-y divide-border">
              {selectedOrder.items.map((item) => (
                <div key={item.id} className="py-2 flex justify-between text-xs">
                  <span className="font-bold text-content-primary">
                    {item.quantity}x {item.productName}
                  </span>
                  <span className="font-semibold text-content-secondary">{formatCurrency(item.price * item.quantity)}</span>
                </div>
              ))}
            </div>

            <div className="pt-2 border-t border-border flex justify-between font-bold text-sm">
              <span>Total Amount:</span>
              <span className="text-brand">{formatCurrency(selectedOrder.totalAmount)}</span>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};
