import fetch, { Response } from 'node-fetch';

export class ApiClientError extends Error {
  constructor(public readonly response: Response) {
    super('Learncube api client error');
  }
}

export async function get<P, R>(
  endpoint: string,
  params?: P,
  token?: string,
): Promise<R> {
  const urlSearchParams = new URLSearchParams(
    Object.entries(params || {}),
  ).toString();

  const url = new URL(
    urlSearchParams.length > 0
      ? `${endpoint}?${urlSearchParams.toString()}`
      : endpoint,
  );

  return request<P, R>('GET', url.toString(), undefined, token) as Promise<R>;
}

export async function post<P, R>(
  endpoint: string,
  params: P,
  token?: string,
): Promise<R> {
  return request('POST', endpoint, params, token) as Promise<R>;
}

export async function put<P, R>(
  endpoint: string,
  params: P,
  token?: string,
): Promise<R> {
  return request('PUT', endpoint, params, token) as Promise<R>;
}

export async function del<P, R>(
  endpoint: string,
  params?: P,
  token?: string,
): Promise<R | undefined> {
  return request('DELETE', endpoint, params, token);
}

export async function request<P, R>(
  method: 'GET' | 'POST' | 'DELETE' | 'PUT',
  endpoint: string,
  params?: P,
  token?: string,
): Promise<R | undefined> {
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

  switch (response.status) {
    case 200:
      return (await response.json()) as R;
    case 204:
      return undefined;
  }

  throw new ApiClientError(response);
}
