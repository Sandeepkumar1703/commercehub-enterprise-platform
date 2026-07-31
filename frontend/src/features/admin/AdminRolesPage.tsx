import React, { useEffect, useState } from 'react';
import { roleService } from '../../services/role.service';
import { ShieldCheck, Plus, UserCheck, Loader2 } from 'lucide-react';

export const AdminRolesPage: React.FC = () => {
  const [roles, setRoles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const fetchRoles = async () => {
    setLoading(true);
    try {
      const res = await roleService.getRoles();
      setRoles(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;
    try {
      await roleService.createRole({ name, description });
      setName('');
      setDescription('');
      fetchRoles();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex justify-between items-center border-b pb-4 dark:border-gray-800">
        <div className="flex items-center space-x-3">
          <ShieldCheck className="w-7 h-7 text-blue-600" />
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Role & Access Control</h1>
        </div>
      </div>

      <form onSubmit={handleCreate} className="bg-white dark:bg-gray-800 p-6 rounded-xl border dark:border-gray-700 space-y-4">
        <h2 className="font-semibold text-lg text-gray-900 dark:text-white">Create New Security Role</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1 dark:text-gray-300">Role Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. ROLE_MANAGER"
              required
              className="w-full px-3 py-2 border rounded-lg dark:bg-gray-900 dark:border-gray-700"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 dark:text-gray-300">Description</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Role scope and permissions"
              className="w-full px-3 py-2 border rounded-lg dark:bg-gray-900 dark:border-gray-700"
            />
          </div>
        </div>
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          Create Role
        </button>
      </form>

      {loading ? (
        <div className="flex justify-center p-12">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {roles.map((r) => (
            <div key={r.id} className="bg-white dark:bg-gray-800 rounded-xl border dark:border-gray-700 p-5 space-y-2 shadow-sm">
              <div className="flex items-center space-x-2">
                <UserCheck className="w-5 h-5 text-blue-600" />
                <h3 className="font-bold text-gray-900 dark:text-white">{r.name}</h3>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">{r.description || 'No description provided'}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
