import React from 'react';
import { Permission } from './permissions';
import { usePermissions } from './PermissionContext';
import { DisabledActionTooltip } from '../../shared/components/DisabledActionTooltip';

interface CanProps {
  permission: Permission | Permission[];
  requireAll?: boolean;
  fallback?: React.ReactNode;
  explainDisabled?: boolean;
  disabledReason?: string;
  children: React.ReactNode;
}

export const Can: React.FC<CanProps> = ({
  permission,
  requireAll = false,
  fallback = null,
  explainDisabled = false,
  disabledReason,
  children,
}) => {
  const { can } = usePermissions();
  const allowed = can(permission, requireAll);

  if (allowed) {
    return <>{children}</>;
  }

  if (explainDisabled) {
    const permText = Array.isArray(permission) ? permission.join(', ') : permission;
    return (
      <DisabledActionTooltip
        reason={disabledReason || `Requires ${permText} permission.`}
      >
        {children}
      </DisabledActionTooltip>
    );
  }

  return <>{fallback}</>;
};
