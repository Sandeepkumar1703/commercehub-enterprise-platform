import React, { useState } from 'react';
import { Plus, ShieldCheck } from 'lucide-react';
import { roleApi, BackendRole } from '../../api/roleApi';
import { useApi } from '../../hooks/useApi';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { Modal } from '../../components/common/Modal';
import { Loader } from '../../components/common/Loader';
import { ErrorMessage } from '../../components/common/ErrorMessage';

export const RoleManagement: React.FC = () => {
  const { data: rawRoles, loading, error, refetch } = useApi<BackendRole[]>(roleApi.getRoles);
  const roles = Array.isArray(rawRoles) ? rawRoles : (rawRoles as any)?.data || [];
  const [modalOpen, setModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [saving, setSaving] = useState(false);

  const handleCreateRole = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await roleApi.createRole({ name, description });
      setModalOpen(false);
      setName('');
      setDescription('');
      refetch();
    } catch (err: any) {
      alert(err.message || 'Failed to create role');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <Loader text="Loading Spring Security Role Definitions..." />;
  if (error) return <ErrorMessage message={error} onRetry={refetch} />;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-slate-100">RBAC Role Definitions</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Configure system authorization roles enforced by Spring Security.
          </p>
        </div>
        <Button onClick={() => setModalOpen(true)} icon={<Plus className="w-4 h-4" />}>
          Create New Role
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {roles?.map((r: BackendRole) => (
          <div key={r.id} className="card-surface p-5 space-y-3 relative flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-sm text-[var(--vynk-brand)]">{r.name}</span>
                <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-500 text-[10px] font-bold rounded-full">
                  ID: #{r.id}
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400">{r.description || 'No description provided'}</p>
            </div>
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
              <span className="font-bold text-slate-500 flex items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-emerald-500" /> Active Role
              </span>
            </div>
          </div>
        ))}
      </div>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Create Security Role">
        <form onSubmit={handleCreateRole} className="space-y-4">
          <Input label="Role Name (e.g. AUDITOR)" value={name} onChange={(e) => setName(e.target.value)} required />
          <Input label="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
          <Button type="submit" loading={saving} className="w-full">
            Save Role Definition
          </Button>
        </form>
      </Modal>
    </div>
  );
};

