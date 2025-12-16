import { test, expect } from '@playwright/test';
import fs from 'fs';

test('Create New Booking with Post Call', async function ({ request }) {
  const file = fs.readFileSync('./testdata/booking.json');

  const booking = JSON.parse(file);

  const response = await request.post('https://restful-booker.herokuapp.com/booking', {
    headers: { 'Content-Type': 'application/json' },
    data: booking,
  });

  const responsejson = await response.json();

  console.log(responsejson);

  expect(responsejson.bookingid).not.toBeNull();
  console.log(responsejson.bookingid);

  expect(responsejson.booking.firstname).toBe(booking.firstname);
  console.log(responsejson.booking.firstname);
});
