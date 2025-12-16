import { test, expect } from '@playwright/test';

test('Test Get API', async function ({ request }) {
  const resp = await request.get('https://jsonplaceholder.typicode.com/posts/1');
  const respbody = await resp.body();
  //console.log(respbody);
  const respstatus = resp.status();
  //console.log(respstatus);
  const respstatustext = resp.statusText();
  //console.log(respstatustext);
  const respjson = await resp.json();
  //console.log(respjson);
  const respheaders = resp.headers();
  //console.log(respheaders);
  const respheaderasarray = resp.headersArray();
  //console.log(respheaderasarray);

  expect(respstatus).toBe(200);
  expect(respstatustext).toBe('OK');
  expect(resp.ok()).toBeTruthy();
  expect(respjson).toHaveProperty('userId', 1);
  expect(respjson).toHaveProperty('id', 1);
  expect(respjson).toHaveProperty(
    'title',
    'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
  );
  expect(respjson.body).toContain('quia et suscipit');
});
