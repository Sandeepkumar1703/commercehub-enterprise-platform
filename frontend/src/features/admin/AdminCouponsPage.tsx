import React, { useState, useEffect } from 'react';
import { Plus, Tag, Trash2 } from 'lucide-react';
import { couponApi } from '../coupon/coupon.api';
import { Coupon } from '../../types';
import { Table } from '../../shared/components/Table';
import { Button } from '../../shared/components/Button';
import { Input } from '../../shared/components/Input';
import { Select } from '../../shared/components/Select';
import { Modal } from '../../shared/components/Modal';
import { Badge } from '../../shared/components/Badge';
import { formatDate } from '../../core/utils/formatters';
import { useToast } from '../../shared/components/Toast';

export const AdminCouponsPage: React.FC = () => {
  const toast = useToast();
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Modal
  const [showModal, setShowModal] = useState(false);
  const [code, setCode] = useState('');
  const [discountType, setDiscountType] = useState<'PERCENTAGE' | 'FIXED_AMOUNT'>('PERCENTAGE');
  const [discountValue, setDiscountValue] = useState(10);
  const [minOrderAmount, setMinOrderAmount] = useState(50);
  const [expiryDate, setExpiryDate] = useState('2026-12-31');

  useEffect(() => {
    loadCoupons();
  }, []);

  const loadCoupons = () => {
    setIsLoading(true);
    couponApi
      .getCoupons()
      .then(setCoupons)
      .catch(() => toast.error('Failed to load coupons'))
      .finally(() => setIsLoading(false));
  };

  const handleCreateCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await couponApi.createCoupon({
        code: code.toUpperCase(),
        discountType,
        discountValue,
        minOrderAmount,
        minOrderValue: minOrderAmount,
        expiryDate,
        active: true,
        isActive: true,
      });
      toast.success('Coupon created successfully');
      setShowModal(false);
      loadCoupons();
    } catch {
      toast.error('Failed to create coupon');
    }
  };

  const handleDeleteCoupon = async (id: string) => {
    try {
      await couponApi.deleteCoupon(id);
      setCoupons(coupons.filter((c) => c.id !== id));
      toast.info('Coupon deleted');
    } catch {
      toast.error('Failed to delete coupon');
    }
  };

  const columns = [
    {
      key: 'code',
      header: 'Coupon Code',
      render: (c: Coupon) => <span className="font-mono-custom font-bold text-brand uppercase">{c.code}</span>,
    },
    {
      key: 'discount',
      header: 'Discount Value',
      render: (c: Coupon) => (
        <span className="font-bold text-content-primary">
          {c.discountType === 'PERCENTAGE' ? `${c.discountValue}% OFF` : `$${c.discountValue} OFF`}
        </span>
      ),
    },
    {
      key: 'minOrder',
      header: 'Min Order',
      render: (c: Coupon) => <span className="text-xs text-content-muted">${c.minOrderAmount ?? c.minOrderValue ?? 0}</span>,
    },
    {
      key: 'expiry',
      header: 'Expires On',
      render: (c: Coupon) => <span className="text-xs text-content-muted">{formatDate(c.expiryDate)}</span>,
    },
    {
      key: 'actions',
      header: 'Delete',
      render: (c: Coupon) => (
        <button
          onClick={() => handleDeleteCoupon(c.id)}
          className="p-1.5 text-content-muted hover:text-status-danger border border-border rounded-lg hover:bg-surface-hover cursor-pointer"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4">
        <div>
          <h1 className="text-h1 font-extrabold text-content-primary">Promotions & Coupon Discounts</h1>
          <p className="text-xs text-content-muted mt-0.5">Manage promotional codes, percentage discounts, and order thresholds</p>
        </div>
        <Button onClick={() => setShowModal(true)} leftIcon={<Plus className="w-4 h-4" />}>
          Create New Coupon
        </Button>
      </div>

      <Table columns={columns} data={coupons} isLoading={isLoading} />

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Create Promotional Coupon">
        <form onSubmit={handleCreateCoupon} className="space-y-3">
          <Input label="Coupon Code" placeholder="SUMMER20" value={code} onChange={(e) => setCode(e.target.value)} required />
          <div className="grid grid-cols-2 gap-2">
            <Select
              label="Discount Type"
              options={[
                { label: 'Percentage (%)', value: 'PERCENTAGE' },
                { label: 'Fixed Amount ($)', value: 'FIXED_AMOUNT' },
              ]}
              value={discountType}
              onChange={(e) => setDiscountType(e.target.value as any)}
            />
            <Input
              label="Discount Value"
              type="number"
              value={discountValue}
              onChange={(e) => setDiscountValue(parseFloat(e.target.value))}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Input
              label="Min Order Subtotal ($)"
              type="number"
              value={minOrderAmount}
              onChange={(e) => setMinOrderAmount(parseFloat(e.target.value))}
              required
            />
            <Input label="Expiration Date" type="date" value={expiryDate} onChange={(e) => setExpiryDate(e.target.value)} required />
          </div>

          <Button type="submit" className="w-full mt-2">
            Create Coupon
          </Button>
        </form>
      </Modal>
    </div>
  );
};
