import { describe, it, expect } from 'vitest';
import { authApi } from '../api/authApi';

describe('Authentication & Authorization Integration Tests', () => {
  it('should authenticate valid user credentials successfully', async () => {
    const response = await authApi.login({
      email: 'sandeep@vynk.com',
      password: 'Password123!',
    });

    expect(response.data?.accessToken).toBeDefined();
  });

  it('should register a new customer account', async () => {
    const response = await authApi.register({
      firstName: 'Jane',
      lastName: 'Doe',
      email: 'janedoe@example.com',
      password: 'Password123!',
    });

    expect(response.data?.message || response.message).toBeDefined();
  });

  it('should process password reset request', async () => {
    const response = await authApi.forgotPassword({ email: 'admin@vynk.com' });
    expect(response).toBeDefined();
  });
});


