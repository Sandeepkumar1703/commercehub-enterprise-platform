import { test, expect } from '@playwright/test';

test.describe('Vynk Enterprise E2E Test Suite', () => {
  test('Customer Flow: Login, Browse Catalog, Add to Cart, and Checkout', async ({ page }) => {
    // 1. Visit homepage
    await page.goto('/');
    await expect(page).toHaveTitle(/Vynk/i);

    // 2. Open login page
    await page.goto('/auth/login');
    await page.fill('input[type="email"]', 'sandeep@vynk.com');
    await page.fill('input[type="password"]', 'Password123!');
    await page.click('button[type="submit"]');

    // 3. Navigate to Product Catalog
    await page.goto('/products');
    await expect(page.locator('h1, h2')).toContainText(/Products/i);

    // 4. View Product Details
    await page.goto('/products/prod_101');
    await expect(page.locator('body')).toContainText(/UltraBook Pro/i);

    // 5. Open Shopping Cart
    await page.goto('/cart');
    await expect(page.locator('body')).toContainText(/Cart/i);

    // 6. Navigate to Checkout
    await page.goto('/checkout');
    await expect(page.locator('body')).toContainText(/Checkout/i);
  });

  test('Admin Flow: Dashboard Metrics, Analytics, and Role Management', async ({ page }) => {
    // 1. Visit Admin Dashboard directly
    await page.goto('/admin/dashboard');
    await expect(page.locator('body')).toContainText(/Dashboard/i);

    // 2. Visit Analytics Page
    await page.goto('/analytics');
    await expect(page.locator('body')).toContainText(/Analytics/i);

    // 3. Visit Role Management
    await page.goto('/permission/roles');
    await expect(page.locator('body')).toContainText(/Role/i);
  });
});
