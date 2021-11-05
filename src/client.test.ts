import fetch from 'node-fetch';
import { del, get, post, put, request } from './client';

jest.mock('node-fetch');

beforeEach(() => {
  ((fetch as unknown) as jest.Mock).mockReset();
});

describe('client', () => {
  describe('request', () => {
    it('sends authorization header if present', async () => {
      ((fetch as unknown) as jest.Mock).mockResolvedValue({
        status: 200,
        json: jest.fn(),
      });

      await request(
        'GET',
        'https://api.learncube.com/virtual-classroom/',
        {},
        'some-token',
      );

      expect(fetch).toHaveBeenCalledWith(
        'https://api.learncube.com/virtual-classroom/',
        expect.objectContaining({
          headers: expect.objectContaining({
            Authorization: 'Bearer some-token',
          }),
        }),
      );
    });
  });

  it('get should send a request with query params', async () => {
    ((fetch as unknown) as jest.Mock).mockResolvedValue({
      status: 200,
      json: jest.fn().mockResolvedValue({
        someData: 10,
      }),
    });

    const response = await get('https://api.learncube.com/virtual-classroom/', {
      page: '1',
      limit: '10',
    });

    expect(fetch).toHaveBeenCalledWith(
      'https://api.learncube.com/virtual-classroom/?page=1&limit=10',
      expect.objectContaining({
        body: undefined,
      }),
    );

    expect(response).toMatchInlineSnapshot(`
      Object {
        "body": Object {
          "someData": 10,
        },
        "status": 200,
      }
    `);
  });

  it('post should send a request with body params', async () => {
    ((fetch as unknown) as jest.Mock).mockResolvedValue({
      status: 200,
      json: jest.fn().mockResolvedValue({
        someData: 10,
      }),
    });
    const params = {
      page: '1',
      limit: '10',
    };
    const response = await post(
      'https://api.learncube.com/virtual-classroom/',
      params,
    );

    expect(fetch).toHaveBeenCalledWith(
      'https://api.learncube.com/virtual-classroom/',
      expect.objectContaining({
        method: 'POST',
        body: JSON.stringify(params),
      }),
    );

    expect(response).toMatchInlineSnapshot(`
      Object {
        "body": Object {
          "someData": 10,
        },
        "status": 200,
      }
    `);
  });

  it('put should send a request with body params', async () => {
    ((fetch as unknown) as jest.Mock).mockResolvedValue({
      status: 200,
      json: jest.fn(),
    });
    const params = {
      page: '1',
      limit: '10',
    };
    const response = await put(
      'https://api.learncube.com/virtual-classroom/',
      params,
    );

    expect(fetch).toHaveBeenCalledWith(
      'https://api.learncube.com/virtual-classroom/',
      expect.objectContaining({
        method: 'PUT',
        body: JSON.stringify(params),
      }),
    );

    expect(response).toMatchInlineSnapshot(`
      Object {
        "body": undefined,
        "status": 200,
      }
    `);
  });

  it('delete should send a request with body params', async () => {
    ((fetch as unknown) as jest.Mock).mockResolvedValue({
      status: 204,
      json: jest.fn(),
    });

    const response = await del(
      'https://api.learncube.com/virtual-classroom/10',
      undefined,
    );

    expect(fetch).toHaveBeenCalledWith(
      'https://api.learncube.com/virtual-classroom/10',
      expect.objectContaining({
        method: 'DELETE',
        body: undefined,
      }),
    );

    expect(response).toMatchInlineSnapshot(`
      Object {
        "body": undefined,
        "status": 204,
      }
    `);
  });
});
