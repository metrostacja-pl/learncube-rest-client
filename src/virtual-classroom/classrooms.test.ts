import fetch from 'node-fetch';
import { StatusCodes } from 'http-status-codes';
import { create, list, read, update, del } from './classrooms';
jest.mock('node-fetch');

beforeEach(() => {
  ((fetch as unknown) as jest.Mock).mockClear();
});

describe('classrooms', () => {
  it('list sends get request', async () => {
    ((fetch as unknown) as jest.Mock).mockResolvedValue({
      status: StatusCodes.OK,
      json: jest.fn().mockResolvedValue({}),
    });

    const response = await list(
      {
        page: 1,
        teacher_attended: true,
      },
      'api-token',
    );

    expect(fetch).toHaveBeenCalledWith(
      'https://app.learncube.com/api/virtual-classroom/classrooms?page=1&teacher_attended=true',
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

  it('create sends post request', async () => {
    ((fetch as unknown) as jest.Mock).mockResolvedValue({
      status: StatusCodes.CREATED,
      json: jest.fn().mockResolvedValue({}),
    });

    const params = {
      room_token: 'test-room-token',
    };

    const response = await create(params, 'api-token');

    expect(fetch).toHaveBeenCalledWith(
      'https://app.learncube.com/api/virtual-classroom/classrooms',
      expect.objectContaining({
        method: 'POST',
        body: JSON.stringify(params),
        headers: expect.any(Object),
      }),
    );
    expect(response).toMatchInlineSnapshot(`
      Object {
        "body": Object {},
        "status": 201,
      }
    `);
  });

  it('read sends get request', async () => {
    ((fetch as unknown) as jest.Mock).mockResolvedValue({
      status: 200,
      json: jest.fn().mockResolvedValue({}),
    });

    const response = await read('uuid-12345', 'api-token');

    expect(fetch).toHaveBeenCalledWith(
      'https://app.learncube.com/api/virtual-classroom/classrooms/uuid-12345',
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

  it('update sends put request', async () => {
    ((fetch as unknown) as jest.Mock).mockResolvedValue({
      status: StatusCodes.ACCEPTED,
      json: jest.fn().mockResolvedValue({}),
    });

    const params = {
      room_token: 'test-room-token',
    };

    const response = await update('uuid-12345', params, 'api-token');

    expect(fetch).toHaveBeenCalledWith(
      'https://app.learncube.com/api/virtual-classroom/classrooms/uuid-12345',
      expect.objectContaining({
        method: 'PUT',
        body: JSON.stringify(params),
        headers: expect.any(Object),
      }),
    );
    expect(response).toMatchInlineSnapshot(`
      Object {
        "body": Object {},
        "status": 202,
      }
    `);
  });

  it('del sends delete request and returns undefined', async () => {
    ((fetch as unknown) as jest.Mock).mockResolvedValue({
      status: 204,
      json: jest.fn().mockResolvedValue(undefined),
    });

    const response = await del('uuid-12345', 'api-token');

    expect(fetch).toHaveBeenCalledWith(
      'https://app.learncube.com/api/virtual-classroom/classrooms/uuid-12345',
      expect.objectContaining({
        method: 'DELETE',
        body: undefined,
        headers: expect.any(Object),
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
