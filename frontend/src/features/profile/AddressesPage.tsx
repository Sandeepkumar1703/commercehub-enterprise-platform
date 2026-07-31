import React, { useEffect, useState } from 'react';
import { addressService } from '../../services/address.service';
import { MapPin, Plus, Trash2, CheckCircle2, Loader2, Star } from 'lucide-react';

export const AddressesPage: React.FC = () => {
  const [addresses, setAddresses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [country, setCountry] = useState('United States');
  const [isDefault, setIsDefault] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const fetchAddresses = async () => {
    setLoading(true);
    try {
      const res = await addressService.getAddresses();
      setAddresses(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!street || !city) return;
    try {
      await addressService.createAddress({ street, city, state, zipCode, country, isDefault });
      setStreet('');
      setCity('');
      setState('');
      setZipCode('');
      setIsDefault(false);
      setIsAdding(false);
      fetchAddresses();
    } catch (err) {
      console.error(err);
    }
  };

  const handleSetDefault = async (id: string) => {
    try {
      await addressService.setDefaultAddress(id);
      fetchAddresses();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this address?')) return;
    try {
      await addressService.deleteAddress(id);
      fetchAddresses();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <div className="flex justify-between items-center border-b pb-4 dark:border-gray-800">
        <div className="flex items-center space-x-3">
          <MapPin className="w-7 h-7 text-blue-600" />
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Saved Delivery Addresses</h1>
        </div>
        <button
          onClick={() => setIsAdding(!isAdding)}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition text-sm font-medium"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Address</span>
        </button>
      </div>

      {isAdding && (
        <form onSubmit={handleCreate} className="bg-white dark:bg-gray-800 p-6 rounded-xl border dark:border-gray-700 space-y-4">
          <h2 className="font-semibold text-lg text-gray-900 dark:text-white">New Address Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1 dark:text-gray-300">Street Address</label>
              <input
                type="text"
                value={street}
                onChange={(e) => setStreet(e.target.value)}
                placeholder="123 Enterprise Blvd"
                required
                className="w-full px-3 py-2 border rounded-lg dark:bg-gray-900 dark:border-gray-700"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 dark:text-gray-300">City</label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
                className="w-full px-3 py-2 border rounded-lg dark:bg-gray-900 dark:border-gray-700"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 dark:text-gray-300">State / Region</label>
              <input
                type="text"
                value={state}
                onChange={(e) => setState(e.target.value)}
                required
                className="w-full px-3 py-2 border rounded-lg dark:bg-gray-900 dark:border-gray-700"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 dark:text-gray-300">Zip / Postal Code</label>
              <input
                type="text"
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
                required
                className="w-full px-3 py-2 border rounded-lg dark:bg-gray-900 dark:border-gray-700"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 dark:text-gray-300">Country</label>
              <input
                type="text"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                required
                className="w-full px-3 py-2 border rounded-lg dark:bg-gray-900 dark:border-gray-700"
              />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="isDefault"
              checked={isDefault}
              onChange={(e) => setIsDefault(e.target.checked)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor="isDefault" className="text-sm dark:text-gray-300">Set as default delivery address</label>
          </div>
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="px-4 py-2 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Save Address
            </button>
          </div>
        </form>
      )}

      {loading ? (
        <div className="flex justify-center p-12">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {addresses.map((addr) => (
            <div key={addr.id} className="bg-white dark:bg-gray-800 rounded-xl border dark:border-gray-700 p-5 space-y-3 relative shadow-sm">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <p className="font-bold text-gray-900 dark:text-white">{addr.street}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{addr.city}, {addr.state} {addr.zipCode}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{addr.country}</p>
                </div>
                <button onClick={() => handleDelete(addr.id)} className="text-red-600 hover:text-red-800 p-1">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-center justify-between border-t pt-3 dark:border-gray-700">
                {addr.isDefault ? (
                  <span className="flex items-center text-xs font-semibold text-green-600 bg-green-50 dark:bg-green-900/30 px-2.5 py-1 rounded-full">
                    <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> Default Address
                  </span>
                ) : (
                  <button
                    onClick={() => handleSetDefault(addr.id)}
                    className="text-xs text-blue-600 hover:underline font-medium"
                  >
                    Set as Default
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
