import React, { useState, useEffect } from 'react';
import { Check } from 'lucide-react';
import { permissionApi, BackendPermission } from '../../api/permissionApi';
import { roleApi, BackendRole } from '../../api/roleApi';
import { Loader } from '../../components/common/Loader';
import { ErrorMessage } from '../../components/common/ErrorMessage';

export const PermissionMatrix: React.FC = () => {
  const [permissions, setPermissions] = useState<BackendPermission[]>([]);
  const [roles, setRoles] = useState<BackendRole[]>([]);
  const [rolePermissionsMap, setRolePermissionsMap] = useState<Record<number, number[]>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const pRes = await permissionApi.getAllPermissions();
      const rRes = await roleApi.getRoles();
      const pData = Array.isArray(pRes) ? pRes : (pRes as any)?.data || [];
      const rData = Array.isArray(rRes) ? rRes : (rRes as any)?.data || [];

      setPermissions(pData);
      setRoles(rData);

      const permMap: Record<number, number[]> = {};
      for (const role of rData) {
        try {
          const rpRes = await roleApi.getRolePermissions(role.id);
          const rpData = (rpRes as any)?.data || rpRes;
          if (rpData && Array.isArray(rpData.permissions)) {
            permMap[role.id] = rpData.permissions.map((p: any) => p.id);
          } else {
            permMap[role.id] = [];
          }
        } catch {
          permMap[role.id] = [];
        }
      }
      setRolePermissionsMap(permMap);
    } catch (err: any) {
      setError(err.message || 'Error fetching permissions matrix');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleToggle = async (roleId: number, permId: number, isGranted: boolean) => {
    try {
      if (isGranted) {
        await roleApi.removePermissionFromRole(roleId, permId);
      } else {
        await roleApi.addPermissionToRole(roleId, permId);
      }
      await fetchData();
    } catch (err: any) {
      alert(err.message || 'Failed to update role permission');
    }
  };

  if (loading) return <Loader text="Loading Spring Security RBAC Matrix..." />;
  if (error) return <ErrorMessage message={error} onRetry={fetchData} />;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-slate-900 dark:text-slate-100">Permissions Matrix</h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Spring Security endpoint authorization matrix mapping capabilities to roles.
        </p>
      </div>

      <div className="card-surface overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-800/80 text-slate-500 font-extrabold uppercase border-b border-slate-200 dark:border-slate-700">
              <tr>
                <th className="p-4">Permission Authority</th>
                <th className="p-4">Description</th>
                {roles.map((r) => (
                  <th key={r.id} className="p-4 text-center">{r.name}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {permissions.map((perm) => (
                <tr key={perm.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50">
                  <td className="p-4 font-mono font-bold text-slate-900 dark:text-slate-100">
                    {perm.name}
                  </td>
                  <td className="p-4 text-slate-500 dark:text-slate-400">
                    {perm.description || '-'}
                  </td>
                  {roles.map((role) => {
                    const assignedPermIds = rolePermissionsMap[role.id] || [];
                    const isGranted = assignedPermIds.includes(perm.id);
                    return (
                      <td key={role.id} className="p-4 text-center">
                        <button
                          onClick={() => handleToggle(role.id, perm.id, isGranted)}
                          className={`w-6 h-6 rounded-lg inline-flex items-center justify-center transition-all cursor-pointer ${
                            isGranted ? 'bg-[var(--vynk-brand)] text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-300'
                          }`}
                        >
                          {isGranted && <Check className="w-3.5 h-3.5" />}
                        </button>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

