import { NextRequest } from 'next/server';
import { getClient } from '@utils/mongodb/mongoClient.mjs';
import testCases from './api_test_cases';

describe('API Routes', () => {
  afterAll(async () => {
    const client = await getClient();
    await client.close();
  });

  test.each(testCases)(
    '$name',
    async ({
      method,
      path,
      handler,
      params,
      body,
      expectedPayload,
      expectedStatus,
    }) => {
      const req = new NextRequest(`http://localhost:3000${path}`, {
        method,
        body,
      });

      const res = await handler(req, params);

      expect(res.status).toBe(expectedStatus);
      const data = await res.json();
      expect(data).toEqual(expectedPayload);
    }
  );
});
