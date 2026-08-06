import React, { useState, useEffect } from 'react';
import { Users, Ban, CheckCircle, Search } from 'lucide-react';
import { userApi } from '../../api/userApi';
import { User } from '../../types';
import { Loader } from '../../components/common/Loader';
import { ErrorMessage } from '../../components/common/ErrorMessage';

export const CustomerList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await userApi.getUsers();
      if (res.success && res.data) {
        setUsers(res.data.filter((u) => u.role === 'CUSTOMER'));
      } else {
        setError(res.message);
      }
    } catch (err: any) {
      setError(err.message || 'Error fetching user directory');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleToggleBlock = async (user: User) => {
    const nextStatus = user.status === 'ACTIVE' ? 'BLOCKED' : 'ACTIVE';
    await userApi.toggleUserStatus(user.id, nextStatus);
    fetchUsers();
  };

  const filtered = users.filter((u) => u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase()));

  if (loading) return <Loader text="Retrieving customer records from Spring Boot backend..." />;
  if (error) return <ErrorMessage message={error} onRetry={fetchUsers} />;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-slate-900 dark:text-slate-100">Customer Accounts</h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Registered enterprise customer directory and fraud security controls.
        </p>
      </div>

      <div className="card-surface p-4">
        <div className="relative w-72">
          <input
            type="text"
            placeholder="Search name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full text-xs pl-8 pr-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-2.5 top-2.5" />
        </div>
      </div>

      <div className="card-surface overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 dark:bg-slate-800/80 text-slate-500 font-extrabold uppercase border-b border-slate-200 dark:border-slate-700">
            <tr>
              <th className="p-4">Customer</th>
              <th className="p-4">Email Address</th>
              <th className="p-4">Account Status</th>
              <th className="p-4 text-right">Security Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {filtered.map((u) => (
              <tr key={u.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50">
                <td className="p-4 flex items-center gap-3">
                  {u.avatar ? (
                    <img src={u.avatar} alt="" className="w-8 h-8 rounded-full object-cover" />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-[var(--vynk-brand)]/10 text-[var(--vynk-brand)] flex items-center justify-center font-bold text-xs shrink-0">
                      {u.name.charAt(0)}
                    </div>
                  )}
                  <span className="font-bold text-slate-900 dark:text-slate-100">{u.name}</span>
                </td>
                <td className="p-4 text-slate-600 dark:text-slate-300">{u.email}</td>
                <td className="p-4">
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${u.status === 'ACTIVE' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
                    {u.status}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <button
                    onClick={() => handleToggleBlock(u)}
                    className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg cursor-pointer"
                  >
                    <Ban className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
