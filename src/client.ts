import fetch, { Response } from 'node-fetch';

export interface ErrorResponse {
  message: string;
  error_code: string;
}

export interface NotFoundErrorResponse {
  detail: 'Not found.';
}

export type BadRequestErrorResponse<R> = {
  [K in keyof R]?: string;
};

export class ApiClientError extends Error {
  constructor(
    public readonly message: string,
    public readonly errorCode?: string,
  ) {
    super(message);
  }
}

export type ClientResponse<T> =
  | {
      status: 200 | 201;
      body: T;
    }
  | {
      status: 400;
      body: BadRequestErrorResponse<{ [key: string]: string }>;
    }
  | {
      status: 404;
      body: NotFoundErrorResponse;
    }
  | {
      status: 204 | 405 | 500;
    };

export async function createClientResponse<T>(
  response: Response,
): Promise<ClientResponse<T>> {
  const status = response.status as 200 | 201;

  try {
    return Promise.resolve({
      status,
      body: (await response.json()) as T,
    });
  } catch (e) {
    console.info(e);
    return Promise.resolve({
      status: status as 204 | 405 | 500,
    });
  }
}

export async function get<P, R>(
  endpoint: string,
  params?: P,
  token?: string,
): Promise<ClientResponse<R>> {
  const urlSearchParams = new URLSearchParams(
    Object.entries(params || {}),
  ).toString();

  const url = new URL(
    urlSearchParams.length > 0
      ? `${endpoint}?${urlSearchParams.toString()}`
      : endpoint,
  );

  return request('GET', url.toString(), undefined, token);
}

export async function post<P, R>(
  endpoint: string,
  params: P,
  token?: string,
): Promise<ClientResponse<R>> {
  return request('POST', endpoint, params, token);
}

export async function put<P, R>(
  endpoint: string,
  params: P,
  token?: string,
): Promise<ClientResponse<R>> {
  return request('PUT', endpoint, params, token);
}

export async function del<P>(
  endpoint: string,
  params?: P,
  token?: string,
): Promise<ClientResponse<undefined>> {
  return request('DELETE', endpoint, params, token);
}

export async function request<P, R>(
  method: 'GET' | 'POST' | 'DELETE' | 'PUT',
  endpoint: string,
  params?: P,
  token?: string,
): Promise<ClientResponse<R>> {
  const headers: HeadersInit = {};
  let body;

  if (['PUT', 'POST'].includes(method)) {
    body = JSON.stringify(params);
    headers['Content-Type'] = 'application/json';
    headers['Content-Length'] = body.length.toString();
  }

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(endpoint, {
    method,
    headers,
    body,
  });

  return createClientResponse(response);
}
