export type UserRole = 'CUSTOMER' | 'SELLER' | 'MODERATOR' | 'ADMIN' | 'SUPER_ADMIN';

export type UserStatus = 'ACTIVE' | 'PENDING' | 'BLOCKED' | 'INACTIVE';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  sellerId?: string;
  permissions: string[];
  avatar?: string;
  status: UserStatus;
  createdAt?: string;
}

export interface Address {
  id: string | number;
  userId?: number | string;
  fullName: string;
  phoneNumber?: string;
  phone?: string;
  addressLine1?: string;
  addressLine2?: string;
  street?: string;
  landmark?: string;
  city: string;
  state: string;
  postalCode?: string;
  zipCode?: string;
  country: string;
  type?: 'HOME' | 'WORK' | 'OTHER' | string;
  isDefault?: boolean;
  isDefaultLanguage?: boolean;
  latitude?: number;
  longitude?: number;
  active?: boolean;
  createdAt?: string;
  updatedAt?: string;
}
