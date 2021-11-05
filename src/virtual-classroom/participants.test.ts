import fetch from 'node-fetch';
import { list, read } from './participants';

jest.mock('node-fetch');

beforeEach(() => {
  ((fetch as unknown) as jest.Mock).mockClear();
});

describe('Participants', () => {
  it('read sends get request', async () => {
    ((fetch as unknown) as jest.Mock).mockResolvedValue({
      status: 200,
      json: jest.fn().mockResolvedValue({}),
    });

    const response = await read('1234', 'api-token');

    expect(fetch).toHaveBeenCalledWith(
      'https://app.learncube.com/api/virtual-classroom/participants/1234',
      expect.objectContaining({
        method: 'GET',
        body: undefined,
        headers: expect.any(Object),
      }),
    );
    expect(response).toMatchInlineSnapshot(`
      Object {
        "body": Object {},
        "status": 200,
      }
    `);
  });

  it('list sends get request', async () => {
    ((fetch as unknown) as jest.Mock).mockResolvedValue({
      status: 200,
      json: jest.fn().mockResolvedValue({}),
    });

    const response = await list(
      {
        page: 1,
      },
      'api-token',
    );

    expect(fetch).toHaveBeenCalledWith(
      'https://app.learncube.com/api/virtual-classroom/participants?page=1',
      expect.objectContaining({
        method: 'GET',
        body: undefined,
        headers: expect.any(Object),
      }),
    );
    expect(response).toMatchInlineSnapshot(`
      Object {
        "body": Object {},
        "status": 200,
      }
    `);
  });
});
