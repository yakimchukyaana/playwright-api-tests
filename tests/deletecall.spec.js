import { test, expect } from '@playwright/test';

test('Put Example', async function ({ request }) {
  const authData = {
    username: 'admin',
    password: 'password123',
  };
  const response = await request.post('https://restful-booker.herokuapp.com/auth', {
    headers: { 'Content-Type': 'application/json' },
    data: authData,
  });

  const jsonresp = await response.json();

  const authtoken = jsonresp.token;

  console.log('Token is ' + authtoken);

  const newbookingdata = {
    firstname: 'Sherlock',
    lastname: 'Holmes',
    totalprice: 111,
    depositpaid: true,
    bookingdates: {
      checkin: '2018-01-01',
      checkout: '2019-01-01',
    },
    additionalneeds: 'Breakfast',
  };

  const newbookingresponse = await request.post('https://restful-booker.herokuapp.com/booking', {
    headers: { 'Content-Type': 'application/json' },
    data: newbookingdata,
  });

  const newbookingresponsejson = await newbookingresponse.json();

  const bookingID = newbookingresponsejson.bookingid;

  console.log(newbookingresponsejson);

  console.log('New booking id is ' + bookingID);

  const deleteresponse = await request.delete(
    'https://restful-booker.herokuapp.com/booking/' + bookingID,
    {
      headers: { 'Content-Type': 'application/json', Cookie: 'token=' + authtoken },
    },
  );

  console.log(deleteresponse.status());

  expect(deleteresponse.status()).toBe(201);

  console.log(deleteresponse.statusText());

  expect(deleteresponse.statusText()).toBe('Created');

  console.log('******************************');

  const getresponse = await request.get('https://restful-booker.herokuapp.com/booking' + bookingID);
  console.log(getresponse.status());
  expect(getresponse.status()).toBe(404);
  console.log(getresponse.statusText());
  expect(getresponse.statusText()).toBe('Not Found');
});
