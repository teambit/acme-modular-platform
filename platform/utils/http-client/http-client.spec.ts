import { createHttpClient, createMockTransport, HttpError } from './http-client.js';

const transport = createMockTransport({
  'GET /products': () => [{ id: 'p-300' }],
  'POST /orders': async (request) => ({ id: 'o-1', ...(await request.json()) }),
});

it('gets JSON through the transport', async () => {
  const client = createHttpClient({ baseUrl: 'http://mock.local', transport });
  expect(await client.get('/products')).toEqual([{ id: 'p-300' }]);
});

it('posts a JSON body', async () => {
  const client = createHttpClient({ baseUrl: 'http://mock.local', transport });
  expect(await client.post('/orders', { customerId: 'c-1' })).toEqual({ id: 'o-1', customerId: 'c-1' });
});

it('throws HttpError with the status on a non-2xx response', async () => {
  const client = createHttpClient({ baseUrl: 'http://mock.local', transport });
  await expect(client.get('/missing')).rejects.toBeInstanceOf(HttpError);
  await expect(client.get('/missing')).rejects.toMatchObject({ status: 404 });
});

it('resolves a relative path when there is no base URL', async () => {
  const client = createHttpClient({ transport });
  expect(await client.get('/products')).toEqual([{ id: 'p-300' }]);
});
