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

  const updatedbookingdata = {
    firstname: 'John',
    lastname: 'Watson',
    totalprice: 200,
    depositpaid: false,
    bookingdates: {
      checkin: '2019-01-01',
      checkout: '2020-01-01',
    },
    additionalneeds: 'Dinner',
  };

  const updatedresponse = await request.put(
    'https://restful-booker.herokuapp.com/booking/' + bookingID,
    {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Cookie: 'token=' + authtoken,
      },
      data: updatedbookingdata,
    },
  );

  const updatedresponsejson = await updatedresponse.json();

  console.log(updatedresponsejson);

  expect(updatedresponsejson.totalprice).toBe(updatedbookingdata.totalprice);
  expect(updatedresponsejson.additionalneeds).toBe(updatedbookingdata.additionalneeds);
});
