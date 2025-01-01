const { test, expect, request } = require('@playwright/test');

test.describe('API Smoke Tests', () => {
  let apiContext;

  test.beforeAll(async ({ playwright }) => {
    // Create a new API request context
    apiContext = await request.newContext({
      baseURL: 'http://localhost:3000',
    });
  });

  test('should successfully sign up a new user', async () => {
    const newUser = {
      nameAndSurname: 'John Doe',
      email: 'johndoe@university.com',
      password: 'password123',
    };

    // Send POST request to signup endpoint
    const response = await apiContext.post('/accounts', {
      data: newUser,
    });

    // Validate response
    expect(response.ok()).toBeTruthy();

    // Parse response body
    const responseBody = await response.json();

    // Check the structure of the response
    expect(responseBody).toHaveProperty('status', 'success');
    expect(responseBody).toHaveProperty('data');
    expect(responseBody.data).toHaveProperty('email', newUser.email);
    expect(responseBody.data).toHaveProperty(
      'nameAndSurname',
      newUser.nameAndSurname
    );
  });

  test('should fetch all opportunities', async () => {
    // Send GET request to opportunities endpoint
    const response = await apiContext.get('/opportunities');

    // Validate response
    expect(response.ok()).toBeTruthy();
    const opportunities = await response.json();
    expect(opportunities).toBeInstanceOf(Array);
    expect(opportunities.length).toBeGreaterThan(0);
  });
});
