import React, { useState } from 'react';
import { useApp } from '../../../app/store/store';
import { Table, Column } from '../../../shared/components/Table';
import { Badge } from '../../../shared/components/Badge';
import { Button } from '../../../shared/components/Button';
import { Modal } from '../../../shared/components/Modal';
import { Input } from '../../../shared/components/Input';
import { Select } from '../../../shared/components/Select';
import { User, UserRole } from '../../../shared/types';
import { Users, Shield, Edit3 } from 'lucide-react';

export const UserManagement: React.FC = () => {
  const { users, setUsers, addAuditLog, showToast } = useApp();
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('ALL');

  // Edit User Modal
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [newRole, setNewRole] = useState<UserRole>('seller');
  const [newStatus, setNewStatus] = useState<'active' | 'suspended' | 'pending'>('active');

  const filteredUsers = users.filter(u => {
    if (roleFilter !== 'ALL' && u.role !== roleFilter) return false;
    if (search && !u.name.toLowerCase().includes(search.toLowerCase()) && !u.email.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const columns: Column<User>[] = [
    {
      key: 'name',
      header: 'User Identity',
      render: (u) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-purple-600 text-white font-bold text-xs flex items-center justify-center">
            {u.name.charAt(0)}
          </div>
          <div>
            <p className="font-bold text-xs text-slate-100">{u.name}</p>
            <p className="text-[11px] text-slate-400">{u.email}</p>
          </div>
        </div>
      )
    },
    {
      key: 'role',
      header: 'RBAC Role',
      render: (u) => (
        <Badge variant={u.role === 'super_admin' ? 'error' : u.role === 'seller' ? 'info' : 'neutral'}>
          {u.role.toUpperCase()}
        </Badge>
      )
    },
    {
      key: 'status',
      header: 'Account Status',
      render: (u) => (
        <Badge variant={u.status === 'active' ? 'success' : 'warning'}>
          {u.status.toUpperCase()}
        </Badge>
      )
    },
    { key: 'lastActive', header: 'Last Active' },
    {
      key: 'actions',
      header: 'RBAC Governance',
      align: 'right',
      render: (u) => (
        <div className="flex justify-end gap-2">
          <button
            onClick={() => {
              setEditingUser(u);
              setNewRole(u.role);
              setNewStatus(u.status);
            }}
            className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-purple-400 rounded-lg text-xs font-semibold flex items-center gap-1"
          >
            <Edit3 className="w-3.5 h-3.5" /> Reassign Role
          </button>
        </div>
      )
    }
  ];

  const handleSaveUserRBAC = () => {
    if (editingUser) {
      setUsers(prev => prev.map(u => u.id === editingUser.id ? { ...u, role: newRole, status: newStatus } : u));
      addAuditLog('UPDATE', 'User RBAC Role', editingUser.id, { role: editingUser.role, status: editingUser.status }, { role: newRole, status: newStatus });
      showToast('RBAC Updated', `Updated role for ${editingUser.name} to ${newRole}`, 'success');
      setEditingUser(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-2">
          <Shield className="w-5 h-5 text-purple-400" />
          <h2 className="text-base font-bold text-white">Identity & Access Governance (RBAC)</h2>
        </div>

        <div className="flex items-center gap-3">
          <Select
            options={[
              { value: 'ALL', label: 'All Roles' },
              { value: 'super_admin', label: 'SUPER ADMIN' },
              { value: 'ops_manager', label: 'OPS MANAGER' },
              { value: 'seller', label: 'SELLER' },
              { value: 'customer', label: 'CUSTOMER' }
            ]}
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            containerClassName="w-36"
          />
          <Input
            placeholder="Search email/name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            containerClassName="w-48"
          />
        </div>
      </div>

      <Table
        columns={columns}
        data={filteredUsers}
        keyExtractor={(u) => u.id}
      />

      {/* Edit RBAC Modal */}
      {editingUser && (
        <Modal
          isOpen={!!editingUser}
          onClose={() => setEditingUser(null)}
          title="Reassign RBAC Security Role"
        >
          <div className="space-y-4 text-xs">
            <p className="font-bold text-slate-100">{editingUser.name} ({editingUser.email})</p>

            <Select
              label="Assigned System Role"
              options={[
                { value: 'super_admin', label: 'SUPER ADMIN (Full Tenant Control)' },
                { value: 'ops_manager', label: 'OPS MANAGER (Platform Ops)' },
                { value: 'auditor', label: 'AUDITOR (Read-Only Compliance)' },
                { value: 'seller', label: 'SELLER (Merchant Portal Access)' },
                { value: 'customer', label: 'CUSTOMER (Consumer Shopping)' }
              ]}
              value={newRole}
              onChange={(e) => setNewRole(e.target.value as UserRole)}
            />

            <Select
              label="Account Governance Status"
              options={[
                { value: 'active', label: 'Active (Granted Access)' },
                { value: 'suspended', label: 'Suspended (Revoked Access)' },
                { value: 'pending', label: 'Pending MFA Verification' }
              ]}
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value as any)}
            />

            <div className="pt-3 flex justify-end gap-2">
              <Button variant="ghost" onClick={() => setEditingUser(null)}>Cancel</Button>
              <Button variant="primary" onClick={handleSaveUserRBAC}>Apply Governance Update</Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default UserManagement;
