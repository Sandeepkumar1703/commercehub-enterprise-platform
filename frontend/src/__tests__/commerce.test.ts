import { describe, it, expect } from 'vitest';
import { cartApi } from '../api/cartApi';
import { orderApi } from '../api/orderApi';
import { paymentApi } from '../api/paymentApi';
import { productApi } from '../api/productApi';

describe('E-Commerce Core Workflows & Order Lifecycle Tests', () => {
  it('should fetch catalog products list', async () => {
    const productsRes = await productApi.getProducts();
    expect(productsRes.success).toBe(true);
    expect(Array.isArray(productsRes.data)).toBe(true);
    expect(productsRes.data.length).toBeGreaterThan(0);
  });

  it('should add item to shopping cart', async () => {
    const cartRes = await cartApi.addToCart('prod_101', 2);
    expect(cartRes.success).toBe(true);
    expect(cartRes.data).toBeDefined();
  });

  it('should fetch shopping cart contents', async () => {
    const cart = await cartApi.getCart();
    expect(cart.success).toBe(true);
    expect(Array.isArray(cart.data)).toBe(true);
  });

  it('should remove item from cart', async () => {
    const removeRes = await cartApi.removeFromCart('cart_item_1');
    expect(removeRes.success).toBe(true);
  });

  it('should create order from checkout payload', async () => {
    const orderRes = await orderApi.createOrder({
      items: [
        {
          productId: 'prod_101',
          productTitle: 'UltraBook Pro X1 Carbon Laptop',
          productImage: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800',
          quantity: 2,
          price: 99.99,
        },
      ],
      shippingAddress: {
        id: 'addr_1001',
        fullName: 'Alex Johnson',
        street: '123 Tech Way',
        city: 'San Francisco',
        state: 'CA',
        zipCode: '94105',
        country: 'USA',
        phone: '+1 (555) 019-2834',
        isDefault: true,
      },
      paymentMethod: 'CREDIT_CARD',
      totalAmount: 199.98,
    });

    expect(orderRes.success).toBe(true);
    expect(orderRes.data?.id).toBeDefined();
    expect(orderRes.data?.status).toBe('PLACED');
  });

  it('should process payment transaction and retrieve payment list', async () => {
    const paymentRes = await paymentApi.createPayment({
      orderId: 'ORD-98421',
      amount: 323.99,
      status: 'SUCCESS',
    });
    expect(paymentRes.success).toBe(true);

    const listRes = await paymentApi.getPayments();
    expect(listRes.success).toBe(true);
    expect(Array.isArray(listRes.data)).toBe(true);
  });
});
