import { NextRequest, NextResponse } from 'next/server';
import { GET as getMedia } from '../app/(api)/api/media/[id]/get';

type TestCase = {
  name: string;
  method: string;
  path: string;
  handler: (
    req: NextRequest,
    { params }: any
  ) => Promise<
    | NextResponse<{ ok: boolean; body: any }>
    | NextResponse<{ ok: boolean; error: string }>
  >;
  params: any;
  body: any;
  expectedPayload: any;
  expectedStatus: number;
};

const testCases: TestCase[] = [
  {
    name: 'GET /api/media/[id]',
    method: 'GET',
    path: '/api/media',
    handler: getMedia,
    params: { params: { id: '66922047aab73406a4292de4' } },
    body: null,
    expectedPayload: {
      ok: true,
      body: {
        _id: '66922047aab73406a4292de4',
        media_type: 'occaecati',
        name: 'ut',
        alt_text: 'Pauci veritas damno totus thermae carcer aperio.',
        media_url: 'https://wretched-disconnection.org',
        preview_url: 'https://hilarious-transformation.biz/',
        date_added: '2023-12-20T14:52:58.552Z',
      },
    },
    expectedStatus: 200,
  },
  {
    name: 'GET /api/media/[id]',
    method: 'GET',
    path: '/api/media',
    handler: getMedia,
    params: { params: { id: '111111111111111111111111' } },
    body: null,
    expectedPayload: {
      ok: false,
      error: 'Item with id: 111111111111111111111111 not found.',
    },
    expectedStatus: 404,
  },
  {
    name: 'GET /api/media/[id]',
    method: 'GET',
    path: '/api/media',
    handler: getMedia,
    params: { params: { id: 'not_a_real_id' } },
    body: null,
    expectedPayload: {
      ok: false,
      error:
        'input must be a 24 character hex string, 12 byte Uint8Array, or an integer',
    },
    expectedStatus: 400,
  },
];

export default testCases;
