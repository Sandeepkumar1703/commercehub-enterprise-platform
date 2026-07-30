export const formatCurrency = (amount: number, currency = 'USD'): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount || 0);
};

export const formatDate = (dateString?: string): string => {
  if (!dateString) return 'N/A';
  try {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  } catch {
    return dateString;
  }
};

export const getOrderStatusBadgeVariant = (status: string): 'success' | 'warning' | 'danger' | 'primary' | 'secondary' => {
  switch (status) {
    case 'DELIVERED':
    case 'SUCCESS':
      return 'success';
    case 'SHIPPED':
    case 'OUT_FOR_DELIVERY':
    case 'PACKED':
      return 'primary';
    case 'PLACED':
    case 'PROCESSING':
    case 'PENDING':
      return 'warning';
    case 'CANCELLED':
    case 'FAILED':
    case 'REFUNDED':
      return 'danger';
    default:
      return 'secondary';
  }
};
