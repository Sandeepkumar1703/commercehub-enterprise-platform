import React, { useState, useEffect } from 'react';
import { userApi } from '../../api/userApi';
import { roleApi, BackendRole } from '../../api/roleApi';
import { User as UserType } from '../../types';
import { Loader } from '../../components/common/Loader';
import { ErrorMessage } from '../../components/common/ErrorMessage';

export const UserPermissions: React.FC = () => {
  const [users, setUsers] = useState<UserType[]>([]);
  const [roles, setRoles] = useState<BackendRole[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const uRes = await userApi.getUsers();
      const rRes = await roleApi.getRoles();
      const uData = Array.isArray(uRes) ? uRes : (uRes as any)?.data || [];
      const rData = Array.isArray(rRes) ? rRes : (rRes as any)?.data || [];

      setUsers(uData);
      setRoles(rData);
    } catch (err: any) {
      setError(err.message || 'Error fetching user roles');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleRoleChange = async (userId: string | number, roleId: number) => {
    try {
      await roleApi.assignRoleToUser(userId, roleId);
      await fetchData();
    } catch (err: any) {
      alert(err.message || 'Failed to assign role');
    }
  };

  if (loading) return <Loader text="Loading User Authorization Directory..." />;
  if (error) return <ErrorMessage message={error} onRetry={fetchData} />;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-slate-900 dark:text-slate-100">User Role Grants</h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Assign system roles and security privileges to platform users.
        </p>
      </div>

      <div className="card-surface overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 dark:bg-slate-800/80 text-slate-500 font-extrabold uppercase border-b border-slate-200 dark:border-slate-700">
            <tr>
              <th className="p-4">User</th>
              <th className="p-4">Email</th>
              <th className="p-4">Assign Role</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {users.map((u) => (
              <tr key={u.id}>
                <td className="p-4 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[var(--vynk-brand)]/10 text-[var(--vynk-brand)] flex items-center justify-center font-bold text-xs shrink-0">
                    {(u.name || u.email || 'U').charAt(0)}
                  </div>
                  <span className="font-bold text-slate-900 dark:text-slate-100">{u.name || u.email}</span>
                </td>
                <td className="p-4 text-slate-600 dark:text-slate-300">{u.email}</td>
                <td className="p-4">
                  <select
                    onChange={(e) => handleRoleChange(u.id, Number(e.target.value))}
                    defaultValue=""
                    className="text-xs p-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 font-bold text-[var(--vynk-brand)]"
                  >
                    <option value="" disabled>Select Role to Assign</option>
                    {roles.map((r) => (
                      <option key={r.id} value={r.id}>
                        {r.name}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

