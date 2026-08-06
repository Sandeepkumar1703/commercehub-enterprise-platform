import React, { useState } from 'react';
import { MapPin, Plus, Trash2, Edit, CheckCircle2 } from 'lucide-react';
import { addressApi } from '../../api/addressApi';
import { useApi } from '../../hooks/useApi';
import { Address } from '../../types';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { Modal } from '../../components/common/Modal';
import { Loader } from '../../components/common/Loader';
import { ErrorMessage } from '../../components/common/ErrorMessage';
import { EmptyState } from '../../components/common/EmptyState';

export const Addresses: React.FC = () => {
  const { data: addresses, loading, error, refetch } = useApi<Address[]>(addressApi.getAddresses);
  const [modalOpen, setModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState<Partial<Address>>({
    fullName: '',
    addressLine1: '',
    street: '',
    city: '',
    state: '',
    postalCode: '',
    zipCode: '',
    country: 'USA',
    phoneNumber: '',
    phone: '',
    type: 'HOME',
  });

  const handleOpenAddModal = () => {
    setFormData({
      fullName: '',
      addressLine1: '',
      street: '',
      city: '',
      state: '',
      postalCode: '',
      zipCode: '',
      country: 'USA',
      phoneNumber: '',
      phone: '',
      type: 'HOME',
    });
    setModalOpen(true);
  };

  const handleOpenEditModal = (addr: Address) => {
    setFormData({
      ...addr,
      street: addr.addressLine1 || addr.street || '',
      phone: addr.phoneNumber || addr.phone || '',
      zipCode: addr.postalCode || addr.zipCode || '',
    });
    setModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const payload = {
      ...formData,
      addressLine1: formData.street || formData.addressLine1,
      phoneNumber: formData.phone || formData.phoneNumber,
      postalCode: formData.zipCode || formData.postalCode,
      type: formData.type || 'HOME',
    };
    try {
      if (formData.id) {
        await addressApi.updateAddress(formData.id, payload);
      } else {
        await addressApi.createAddress(payload);
      }
      setModalOpen(false);
      refetch();
    } catch (err) {
      console.error('Error saving address', err);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string | number) => {
    if (confirm('Are you sure you want to remove this address?')) {
      await addressApi.deleteAddress(id);
      refetch();
    }
  };

  const handleSetDefault = async (id: string | number) => {
    try {
      await addressApi.setDefaultAddress(id);
      refetch();
    } catch (err) {
      console.error('Error setting default address', err);
    }
  };

  if (loading) return <Loader text="Loading addresses from Spring Boot REST API..." />;
  if (error) return <ErrorMessage message={error} onRetry={refetch} />;

  const addressList = Array.isArray(addresses) ? addresses : (addresses as any)?.data || [];

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-slate-100">Saved Addresses</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Manage your default delivery destinations for checkout fulfillment.
          </p>
        </div>
        <Button onClick={handleOpenAddModal} icon={<Plus className="w-4 h-4" />}>
          Add New Address
        </Button>
      </div>

      {addressList && addressList.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {addressList.map((addr: Address) => {
            const streetLine = addr.addressLine1 || addr.street || '';
            const zip = addr.postalCode || addr.zipCode || '';
            const phoneNum = addr.phoneNumber || addr.phone || '';

            return (
              <div key={addr.id} className="card-surface p-5 relative space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-[var(--vynk-brand)]" />
                    <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">{addr.fullName}</h3>
                  </div>
                  {addr.isDefault ? (
                    <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded-full">
                      Default
                    </span>
                  ) : (
                    <button
                      onClick={() => handleSetDefault(addr.id)}
                      className="text-[10px] text-purple-600 hover:underline font-bold cursor-pointer"
                    >
                      Make Default
                    </button>
                  )}
                </div>

                <div className="text-xs text-slate-600 dark:text-slate-300 space-y-1">
                  <p>{streetLine}</p>
                  <p>{addr.city}, {addr.state} {zip}, {addr.country}</p>
                  <p className="font-mono text-slate-500">{phoneNum}</p>
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end gap-2">
                  <button
                    onClick={() => handleOpenEditModal(addr)}
                    className="p-1.5 text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(addr.id)}
                    className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <EmptyState
          title="No addresses found."
          description="You have not registered any delivery address yet."
          actionText="Add Address"
          onAction={handleOpenAddModal}
        />
      )}

      {/* Modal */}
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Address Details">
        <form onSubmit={handleSave} className="space-y-4">
          <Input
            label="Full Name"
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            required
          />
          <Input
            label="Street Address"
            value={formData.street}
            onChange={(e) => setFormData({ ...formData, street: e.target.value, addressLine1: e.target.value })}
            required
          />
          <div className="grid grid-cols-2 gap-3">
            <Input
              label="City"
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              required
            />
            <Input
              label="State / Province"
              value={formData.state}
              onChange={(e) => setFormData({ ...formData, state: e.target.value })}
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Zip Code"
              value={formData.zipCode}
              onChange={(e) => setFormData({ ...formData, zipCode: e.target.value, postalCode: e.target.value })}
              required
            />
            <Input
              label="Phone Number"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value, phoneNumber: e.target.value })}
              required
            />
          </div>
          <Button type="submit" loading={saving} className="w-full mt-2">
            Save Address
          </Button>
        </form>
      </Modal>
    </div>
  );
};
