import { test, expect } from '@playwright/test';

test('Post call Example with token', async function ({ request }) {
  const authdata = {
    username: 'admin',
    password: 'password123',
  };
  const responce = await request.post('https://restful-booker.herokuapp.com/auth', {
    headers: { 'Content-Type': 'application/json' },
    data: authdata,
  });
  console.log(responce.status());
  console.log(await responce.json());

  const responseData = await responce.json();
  expect(responseData.token).not.toBeNull();
});

test('Post call Example with Booking ID', async function ({ request }) {
  const bookingData = {
    firstname: 'Jim',
    lastname: 'Brown',
    totalprice: 111,
    depositpaid: true,
    bookingdates: {
      checkin: '2018-01-01',
      checkout: '2019-01-01',
    },
    additionalneeds: 'Breakfast',
  };
  const responce = await request.post('https://restful-booker.herokuapp.com/booking', {
    headers: { 'Content-Type': 'application/json' },
    data: bookingData,
  });
  console.log(responce.status());
  console.log(await responce.json());

  const responseData = await responce.json();
  console.log(responseData);
  console.log(responseData.bookingid);

  expect(responseData.bookingid).not.toBeNull();
  expect(responce.status()).toBe(200);
  expect(responseData.booking.firstname).toBe(bookingData.firstname);
  expect(responseData.booking.lastname).toBe(bookingData.lastname);
  expect(responseData.booking.totalprice).toBe(bookingData.totalprice);
  expect(responseData.booking.depositpaid).toBe(bookingData.depositpaid);
  expect(responseData.booking.bookingdates.checkin).toBe(bookingData.bookingdates.checkin);
  expect(responseData.booking.bookingdates.checkout).toBe(bookingData.bookingdates.checkout);
  expect(responseData.booking.additionalneeds).toBe(bookingData.additionalneeds);
});
