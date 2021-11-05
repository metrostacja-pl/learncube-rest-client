import { ClientResponse, post } from './client';
import { AUTHENTICATION_ENDPOINT } from './endpoints';

export type GetApiTokenParams = {
  api_public_key: string;
  api_private_key: string;
};

export type GetApiTokenResponse = {
  token: string;
};

export async function getApiToken(
  publicKey: string,
  privateKey: string,
): Promise<ClientResponse<GetApiTokenResponse>> {
  const body = JSON.stringify({
    api_public_key: publicKey,
    api_private_key: privateKey,
  });

  const url = `${AUTHENTICATION_ENDPOINT}/get-api-token/`;

  return await post(url, body);
}
