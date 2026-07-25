import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { User, Lock, Save, CheckCircle2, MapPin, Bell, Plus, Trash2 } from 'lucide-react';

interface AddressItem {
  id: string;
  type: 'HOME' | 'OFFICE';
  name: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  isDefault: boolean;
}

export const AccountPage: React.FC = () => {
  const { user, updateProfile, changePassword } = useAuth();
  const { t } = useLanguage();

  const [firstName, setFirstName] = useState(user?.firstName || '');
  const [lastName, setLastName] = useState(user?.lastName || '');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [msg, setMsg] = useState<{ text: string; isError: boolean } | null>(null);

  // Addresses State
  const [addresses, setAddresses] = useState<AddressItem[]>([
    {
      id: 'addr-1',
      type: 'OFFICE',
      name: user ? `${user.firstName} ${user.lastName}` : 'Sandeep Prasad',
      street: '123 Enterprise Blvd, Suite 400',
      city: 'San Francisco',
      state: 'CA',
      zip: '94105',
      isDefault: true,
    },
    {
      id: 'addr-2',
      type: 'HOME',
      name: user ? `${user.firstName} ${user.lastName}` : 'Sandeep Prasad',
      street: '789 Tech Park Drive',
      city: 'San Jose',
      state: 'CA',
      zip: '95112',
      isDefault: false,
    },
  ]);

  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [newAddress, setNewAddress] = useState({
    type: 'HOME' as 'HOME' | 'OFFICE',
    street: '',
    city: '',
    state: '',
    zip: '',
  });

  // Notifications State
  const [notifications, setNotifications] = useState({
    emailOrders: true,
    emailPromos: true,
    smsAlerts: false,
    securityNotice: true,
  });

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await updateProfile(firstName, lastName);
    setMsg({ text: res.message, isError: !res.success });
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await changePassword(currentPassword, newPassword);
    setMsg({ text: res.message, isError: !res.success });
    setCurrentPassword('');
    setNewPassword('');
  };

  const handleAddAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAddress.street || !newAddress.city) return;

    const created: AddressItem = {
      id: `addr-${Date.now()}`,
      type: newAddress.type,
      name: `${firstName || 'User'} ${lastName}`,
      street: newAddress.street,
      city: newAddress.city,
      state: newAddress.state || 'CA',
      zip: newAddress.zip || '90001',
      isDefault: false,
    };

    setAddresses([...addresses, created]);
    setNewAddress({ type: 'HOME', street: '', city: '', state: '', zip: '' });
    setIsAddingAddress(false);
  };

  const handleDeleteAddress = (id: string) => {
    setAddresses((prev) => prev.filter((a) => a.id !== id));
  };

  return (
    <div className="max-w-3xl mx-auto py-6 space-y-8">
      
      <div>
        <h1 className="text-3xl font-black text-[var(--text-primary)] tracking-tight">
          {t('account.profileTab')}
        </h1>
        <p className="text-xs text-[var(--text-secondary)] mt-1">
          Manage your enterprise profile, shipping addresses, security, and notification settings.
        </p>
      </div>

      {msg && (
        <div className={`p-4 rounded-xl border text-xs font-semibold flex items-center gap-2 ${msg.isError ? 'bg-rose-50 text-rose-700 border-rose-200' : 'bg-emerald-50 text-emerald-700 border-emerald-200'}`}>
          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          <span>{msg.text}</span>
        </div>
      )}

      {/* Profile Form */}
      <div className="bg-[var(--bg-surface)] p-6 sm:p-8 rounded-3xl border border-[var(--border-default)] shadow-xs space-y-6">
        <h3 className="text-base font-extrabold text-[var(--text-primary)] flex items-center gap-2">
          <User className="w-5 h-5 text-indigo-500" />
          <span>Profile Information</span>
        </h3>

        <form onSubmit={handleUpdateProfile} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-[var(--text-primary)] uppercase">
                {t('auth.register.firstName')}
              </label>
              <input
                type="text"
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full mt-1 px-4 py-2.5 text-xs rounded-xl border border-[var(--border-default)] bg-[var(--bg-surface-raised)] text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)]"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-[var(--text-primary)] uppercase">
                {t('auth.register.lastName')}
              </label>
              <input
                type="text"
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full mt-1 px-4 py-2.5 text-xs rounded-xl border border-[var(--border-default)] bg-[var(--bg-surface-raised)] text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)]"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-[var(--text-primary)] uppercase">
              {t('auth.login.emailLabel')}
            </label>
            <input
              type="email"
              disabled
              value={user?.email || ''}
              className="w-full mt-1 px-4 py-2.5 text-xs rounded-xl border border-[var(--border-default)] bg-[var(--bg-surface-raised)] text-[var(--text-secondary)] opacity-60 cursor-not-allowed"
            />
          </div>

          <button
            type="submit"
            className="px-5 py-2.5 bg-[var(--brand-primary)] text-white hover:bg-[var(--brand-hover)] text-xs font-bold rounded-xl shadow-xs transition-all flex items-center gap-2 cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>{t('btn.save')}</span>
          </button>
        </form>
      </div>

      {/* Address Book Management */}
      <div className="bg-[var(--bg-surface)] p-6 sm:p-8 rounded-3xl border border-[var(--border-default)] shadow-xs space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-extrabold text-[var(--text-primary)] flex items-center gap-2">
            <MapPin className="w-5 h-5 text-indigo-500" />
            <span>Saved Shipping Address Book</span>
          </h3>
          <button
            onClick={() => setIsAddingAddress(!isAddingAddress)}
            className="px-3 py-1.5 bg-indigo-600 text-white rounded-xl text-xs font-bold hover:bg-indigo-500 cursor-pointer flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Address</span>
          </button>
        </div>

        {isAddingAddress && (
          <form onSubmit={handleAddAddress} className="p-4 rounded-2xl bg-[var(--bg-surface-raised)] border border-[var(--border-default)] space-y-3">
            <p className="text-xs font-bold text-[var(--text-primary)]">New Address Details</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <input
                type="text"
                required
                placeholder="Street Address"
                value={newAddress.street}
                onChange={(e) => setNewAddress({ ...newAddress, street: e.target.value })}
                className="px-3 py-2 rounded-xl border border-[var(--border-default)] bg-[var(--bg-surface)]"
              />
              <input
                type="text"
                required
                placeholder="City"
                value={newAddress.city}
                onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                className="px-3 py-2 rounded-xl border border-[var(--border-default)] bg-[var(--bg-surface)]"
              />
              <input
                type="text"
                placeholder="State (e.g. CA)"
                value={newAddress.state}
                onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })}
                className="px-3 py-2 rounded-xl border border-[var(--border-default)] bg-[var(--bg-surface)]"
              />
              <input
                type="text"
                placeholder="Zip Code"
                value={newAddress.zip}
                onChange={(e) => setNewAddress({ ...newAddress, zip: e.target.value })}
                className="px-3 py-2 rounded-xl border border-[var(--border-default)] bg-[var(--bg-surface)]"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white font-bold rounded-xl text-xs cursor-pointer"
            >
              Save Address
            </button>
          </form>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {addresses.map((a) => (
            <div key={a.id} className="p-4 rounded-2xl bg-[var(--bg-surface-raised)] border border-[var(--border-default)] space-y-2 relative">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded-md bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300 font-bold text-[10px]">
                  {a.type}
                </span>
                <button
                  onClick={() => handleDeleteAddress(a.id)}
                  className="p-1 text-[var(--text-secondary)] hover:text-rose-500 cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
              <p className="text-xs font-bold text-[var(--text-primary)]">{a.name}</p>
              <p className="text-xs text-[var(--text-secondary)]">{a.street}</p>
              <p className="text-xs text-[var(--text-secondary)]">{a.city}, {a.state} {a.zip}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Notifications Preferences */}
      <div className="bg-[var(--bg-surface)] p-6 sm:p-8 rounded-3xl border border-[var(--border-default)] shadow-xs space-y-6">
        <h3 className="text-base font-extrabold text-[var(--text-primary)] flex items-center gap-2">
          <Bell className="w-5 h-5 text-indigo-500" />
          <span>Notification & Alert Preferences</span>
        </h3>

        <div className="space-y-3 text-xs">
          {[
            { key: 'emailOrders', label: 'Order Status & Shipping Dispatch Email Updates' },
            { key: 'emailPromos', label: 'Promotions, Coupons, and Special Offer Announcements' },
            { key: 'smsAlerts', label: 'SMS Instant Order Delivery Tracking Alerts' },
            { key: 'securityNotice', label: 'Security & Account Activity Notices' },
          ].map((item) => (
            <label key={item.key} className="flex items-center justify-between p-3 rounded-xl bg-[var(--bg-surface-raised)] border border-[var(--border-default)] cursor-pointer">
              <span className="font-semibold text-[var(--text-primary)]">{item.label}</span>
              <input
                type="checkbox"
                checked={(notifications as any)[item.key]}
                onChange={() =>
                  setNotifications({
                    ...notifications,
                    [item.key]: !(notifications as any)[item.key],
                  })
                }
                className="w-4 h-4 text-indigo-600 rounded cursor-pointer"
              />
            </label>
          ))}
        </div>
      </div>

      {/* Security Form */}
      <div className="bg-[var(--bg-surface)] p-6 sm:p-8 rounded-3xl border border-[var(--border-default)] shadow-xs space-y-6">
        <h3 className="text-base font-extrabold text-[var(--text-primary)] flex items-center gap-2">
          <Lock className="w-5 h-5 text-indigo-500" />
          <span>{t('account.securityTab')}</span>
        </h3>

        <form onSubmit={handleChangePassword} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-[var(--text-primary)] uppercase">
              {t('account.currentPassword')}
            </label>
            <input
              type="password"
              required
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full mt-1 px-4 py-2.5 text-xs rounded-xl border border-[var(--border-default)] bg-[var(--bg-surface-raised)] text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)]"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-[var(--text-primary)] uppercase">
              {t('account.newPassword')}
            </label>
            <input
              type="password"
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full mt-1 px-4 py-2.5 text-xs rounded-xl border border-[var(--border-default)] bg-[var(--bg-surface-raised)] text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)]"
            />
          </div>

          <button
            type="submit"
            className="px-5 py-2.5 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 text-xs font-bold rounded-xl shadow-xs transition-all cursor-pointer"
          >
            Update Security Password
          </button>
        </form>
      </div>

    </div>
  );
};
