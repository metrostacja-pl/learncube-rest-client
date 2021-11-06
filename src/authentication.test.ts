import fetch from 'node-fetch';
import { getApiToken, GetApiTokenResponse } from './authentication';

jest.mock('node-fetch');

beforeEach(() => {
  ((fetch as unknown) as jest.Mock).mockClear();
});

describe('authentication', () => {
  describe('get-api-token', () => {
    it('Makes a request and returns client response', async () => {
      ((fetch as unknown) as jest.Mock).mockResolvedValue({
        status: 200,
        json: jest.fn().mockResolvedValue({
          token: 'random-token',
        } as GetApiTokenResponse),
      });

      const result = await getApiToken('public-key', 'private-key');

      expect(result).toMatchInlineSnapshot(`
        Object {
          "body": Object {
            "token": "random-token",
          },
          "status": 200,
        }
      `);

      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining(
          'https://app.learncube.com/api/virtual-classroom/get-api-token/',
        ),
        expect.objectContaining({
          body: expect.any(String),
        }),
      );
    });
  });
});
