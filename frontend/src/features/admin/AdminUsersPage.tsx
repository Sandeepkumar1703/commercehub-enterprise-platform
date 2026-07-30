import React, { useState, useEffect } from 'react';
import { Users, Shield, Check, X } from 'lucide-react';
import { adminApi } from './admin.api';
import { User } from '../../types';
import { Table } from '../../shared/components/Table';
import { Badge } from '../../shared/components/Badge';
import { Button } from '../../shared/components/Button';
import { formatDate } from '../../core/utils/formatters';
import { useToast } from '../../shared/components/Toast';

export const AdminUsersPage: React.FC = () => {
  const toast = useToast();
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    adminApi
      .getUsers()
      .then((res) => setUsers(res.content))
      .catch(() => toast.error('Failed to load users'))
      .finally(() => setIsLoading(false));
  }, []);

  const columns = [
    {
      key: 'user',
      header: 'Customer Name',
      render: (u: User) => (
        <div>
          <p className="font-bold text-content-primary">
            {u.firstName} {u.lastName}
          </p>
          <p className="text-[10px] text-content-muted">{u.email}</p>
        </div>
      ),
    },
    {
      key: 'roles',
      header: 'Assigned Role',
      render: (u: User) => (
        <Badge variant={u.roles.some((r) => r.name === 'ROLE_ADMIN') ? 'accent' : 'secondary'}>
          {u.roles.map((r) => r.name.replace('ROLE_', '')).join(', ')}
        </Badge>
      ),
    },
    {
      key: 'status',
      header: 'Account Status',
      render: (u: User) => (
        <Badge variant={u.enabled !== false ? 'success' : 'danger'}>
          {u.enabled !== false ? 'Active' : 'Disabled'}
        </Badge>
      ),
    },
    {
      key: 'joined',
      header: 'Joined Date',
      render: (u: User) => <span className="text-xs text-content-muted">{formatDate(u.createdAt)}</span>,
    },
    {
      key: 'actions',
      header: 'Moderate',
      render: (u: User) => (
        <Button
          size="sm"
          variant={u.enabled !== false ? 'outline' : 'primary'}
          onClick={async () => {
            try {
              const updated = await adminApi.toggleUserStatus(u.id);
              setUsers(users.map((item) => (item.id === u.id ? updated : item)));
              toast.info(`Account status updated for ${u.firstName}`);
            } catch {
              toast.error('Failed to update account status');
            }
          }}
        >
          {u.enabled !== false ? 'Disable' : 'Enable'}
        </Button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="border-b border-border pb-4">
        <h1 className="text-h1 font-extrabold text-content-primary">User Management</h1>
        <p className="text-xs text-content-muted mt-0.5">Manage customer accounts, permissions, and security roles</p>
      </div>

      <Table columns={columns} data={users} isLoading={isLoading} />
    </div>
  );
};
