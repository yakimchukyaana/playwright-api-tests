import { test, expect } from '@playwright/test';

test('Check API Health', async function ({ request }) {
  test.setTimeout(0);
  while (true) {
    const start = Date.now();

    const response = await request.get('https://restful-booker.herokuapp.com/ping');

    const end = Date.now();

    const duration = end - start;

    if (duration > 2000) {
      throw new Error('API response is slow ' + duration);
    } else {
      console.log('Total duration of the response is ' + duration);
    }

    const status = response.status();

    console.log('Response Code Fom API is ' + status);
    expect(status).toBe(201);
  }
});
