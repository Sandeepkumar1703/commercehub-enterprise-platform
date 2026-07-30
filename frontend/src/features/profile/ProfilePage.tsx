import React, { useState, useEffect } from 'react';
import { User, MapPin, Plus, Trash2, Edit2, ShieldCheck, Lock } from 'lucide-react';
import { userApi } from './profile.api';
import { addressApi } from './address.api';
import { authApi } from '../auth/auth.api';
import { Address, User as UserType } from '../../types';
import { useAppDispatch, useAppSelector } from '../../app/store/hooks';
import { updateUser } from '../auth/authSlice';
import { Button } from '../../shared/components/Button';
import { Input } from '../../shared/components/Input';
import { Card } from '../../shared/components/Card';
import { Modal } from '../../shared/components/Modal';
import { useToast } from '../../shared/components/Toast';

export const ProfilePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const toast = useToast();
  const { user } = useAppSelector((state) => state.auth);

  const [firstName, setFirstName] = useState(user?.firstName || '');
  const [lastName, setLastName] = useState(user?.lastName || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);

  // Password change
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  // Address Manager
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState<string | null>(null);

  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('USA');

  useEffect(() => {
    addressApi.getAddresses().then(setAddresses).catch(() => {});
  }, []);

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdatingProfile(true);
    try {
      const updated = await userApi.updateProfile({ firstName, lastName, phone });
      dispatch(updateUser(updated));
      toast.success('Profile updated successfully');
    } catch {
      toast.error('Failed to update profile');
    } finally {
      setIsUpdatingProfile(false);
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPassword || !newPassword) return;
    setIsChangingPassword(true);
    try {
      await authApi.changePassword({ currentPassword, newPassword });
      toast.success('Password changed successfully');
      setCurrentPassword('');
      setNewPassword('');
    } catch {
      toast.error('Current password incorrect');
    } finally {
      setIsChangingPassword(false);
    }
  };

  const handleSaveAddress = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingAddressId) {
        const updated = await addressApi.updateAddress(editingAddressId, {
          street,
          city,
          state,
          zipCode: postalCode,
          postalCode,
          country,
        });
        setAddresses(addresses.map((a) => (a.id === editingAddressId ? updated : a)));
        toast.success('Address updated');
      } else {
        const created = await addressApi.createAddress({
          street,
          city,
          state,
          zipCode: postalCode,
          postalCode,
          country,
          isDefaultLanguage: addresses.length === 0,
        });
        setAddresses([...addresses, created]);
        toast.success('Address created');
      }
      setShowAddressModal(false);
      setEditingAddressId(null);
      setStreet('');
      setCity('');
      setState('');
      setPostalCode('');
    } catch {
      toast.error('Failed to save address');
    }
  };

  const handleDeleteAddress = async (id: string) => {
    try {
      await addressApi.deleteAddress(id);
      setAddresses(addresses.filter((a) => a.id !== id));
      toast.info('Address deleted');
    } catch {
      toast.error('Failed to delete address');
    }
  };

  return (
    <div className="space-y-8">
      <div className="border-b border-border pb-4">
        <h1 className="text-h1 font-extrabold text-content-primary">Account Dashboard & Address Book</h1>
        <p className="text-xs text-content-muted mt-0.5">Manage personal information, security, and saved addresses</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Personal Details Form */}
        <Card>
          <div className="space-y-4">
            <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider text-content-primary pb-3 border-b border-border">
              <User className="w-4 h-4 text-brand" />
              <span>Personal Information</span>
            </div>

            <form onSubmit={handleProfileSubmit} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <Input label="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
                <Input label="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
              </div>
              <Input label="Email (Read-Only)" value={user?.email || ''} disabled />
              <Input label="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} />
              <Button type="submit" isLoading={isUpdatingProfile} size="sm">
                Save Personal Details
              </Button>
            </form>
          </div>
        </Card>

        {/* Change Password Form */}
        <Card>
          <div className="space-y-4">
            <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider text-content-primary pb-3 border-b border-border">
              <Lock className="w-4 h-4 text-brand" />
              <span>Security & Password</span>
            </div>

            <form onSubmit={handlePasswordSubmit} className="space-y-3">
              <Input
                label="Current Password"
                type="password"
                placeholder="••••••••"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
              />
              <Input
                label="New Password"
                type="password"
                placeholder="••••••••"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
              <Button type="submit" variant="outline" isLoading={isChangingPassword} size="sm">
                Update Password
              </Button>
            </form>
          </div>
        </Card>
      </div>

      {/* Address Book Manager */}
      <Card>
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-border">
            <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider text-content-primary">
              <MapPin className="w-4 h-4 text-brand" />
              <span>Saved Shipping Addresses ({addresses.length})</span>
            </div>
            <Button
              size="sm"
              leftIcon={<Plus className="w-3.5 h-3.5" />}
              onClick={() => {
                setEditingAddressId(null);
                setStreet('');
                setCity('');
                setState('');
                setPostalCode('');
                setShowAddressModal(true);
              }}
            >
              Add New Address
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {addresses.map((addr) => (
              <div key={addr.id} className="p-4 bg-surface border border-border rounded-xl space-y-2 relative group shadow-card">
                <span className="text-xs font-bold text-content-primary block">{addr.street}</span>
                <p className="text-[11px] text-content-muted">
                  {addr.city}, {addr.state} {addr.postalCode}, {addr.country}
                </p>

                <div className="flex items-center justify-end gap-2 pt-2 border-t border-border mt-2">
                  <button
                    onClick={() => {
                      setEditingAddressId(addr.id);
                      setStreet(addr.street);
                      setCity(addr.city);
                      setState(addr.state);
                      setPostalCode(addr.postalCode);
                      setShowAddressModal(true);
                    }}
                    className="p-1 text-content-muted hover:text-brand transition-colors cursor-pointer"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDeleteAddress(addr.id)}
                    className="p-1 text-content-muted hover:text-status-danger transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>

      <Modal isOpen={showAddressModal} onClose={() => setShowAddressModal(false)} title={editingAddressId ? 'Edit Address' : 'Add New Address'}>
        <form onSubmit={handleSaveAddress} className="space-y-3">
          <Input label="Street Address" value={street} onChange={(e) => setStreet(e.target.value)} required />
          <div className="grid grid-cols-2 gap-2">
            <Input label="City" value={city} onChange={(e) => setCity(e.target.value)} required />
            <Input label="State" value={state} onChange={(e) => setState(e.target.value)} required />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Input label="ZIP/Postal Code" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} required />
            <Input label="Country" value={country} onChange={(e) => setCountry(e.target.value)} required />
          </div>
          <Button type="submit" className="w-full mt-2">
            Save Address
          </Button>
        </form>
      </Modal>
    </div>
  );
};
