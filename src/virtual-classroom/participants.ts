import { ListResponse } from './common';
import * as client from '../client';
import { PARTICIPANTS_ENDPOINT } from '../endpoints';
import { ClientResponse } from '../client';

export interface Participant {
  uuid: string;
  event_uuid: string;
  room_token: string | null;
  room_slug: string;
  company_slug: string;
  teacher: string;
  user_role: string;
  userid: string | null;
  name: string;
  username: string;
  avatar: string;
  cancelled: boolean;
  cancelled_by: string | null;
  attended: boolean;
  attended_time: string | null;
  ended_time: string | null;
  class_rating: string;
  class_review: string;
}

export type ParticipantsReadResponse = Participant;

export type ParticipantsListResponse = ListResponse<Participant>;

export type ParticipantsListRequestParams = Partial<{
  page: number;
  room_token: string;
  room_slug: string;
  company_slug: string;
  userid: string;
  username: string;
  attended: boolean;
  attended_time_before: string;
  attended_time_after: string;
  ended_time_before: string;
  ended_time_after: string;
  class_rating_lte: number;
  class_rating_gte: number;
  user_role: string;
  teacher: string;
}>;

export interface ParticipantsCreateRequestParams {
  room_token: string;
  room_slug?: string;
  company_slug?: string;
  teacher?: string;
  user_role: string;
  username: string;
  cancelled: boolean;
  attended_time: string;
  ended_time: string;
  class_rating: string;
  class_review: string;
}

export async function list(
  params: ParticipantsListRequestParams,
  token: string,
): Promise<ClientResponse<ParticipantsListResponse>> {
  return client.get(PARTICIPANTS_ENDPOINT, params, token);
}

export async function read(
  uuid: string,
  token: string,
): Promise<ClientResponse<ParticipantsReadResponse>> {
  return client.get(`${PARTICIPANTS_ENDPOINT}/${uuid}`, undefined, token);
}

export async function create(
  params: ParticipantsCreateRequestParams,
  token: string,
): Promise<ClientResponse<ParticipantsListResponse>> {
  return client.get(PARTICIPANTS_ENDPOINT, params, token);
}
