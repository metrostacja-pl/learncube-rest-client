import * as client from '../client';
import { ClientResponse } from '../client';
import { VIRTUAL_CLASSROOM_ENDPOINT } from '../endpoints';
import { ListResponse } from './common';

export interface Classroom {
  uuid: string;
  teacher_first_name: string;
  teacher_last_name: string;
  teacher_avatar: string;
  creation_date: string;
  room_token: string | null;
  breakout_parent_token: string | null;
  cancelled: boolean;
  cancelled_by: string | null;
  description: string;
  start: string;
  end: string;
  max_participants: number;
  audio_only: boolean;
  whiteboard_only: boolean;
  teacher_attended: boolean;
  teacher_attended_time: string | null;
  actual_class_start: string | null;
  actual_class_end: string | null;
  actual_duration: number;
  return_url: string | null;
  room_url: string;
  room_review_url: string;
  recorded_class_url: string;
  slug: string;
}

export type ClassroomListResponse = ListResponse<Classroom>;
export type ClassroomListRequestParams = Partial<{
  page: number;
  room_token: string;
  start_before: string;
  start_after: string;
  company_slug: string;
  teacher_attended: boolean;
  teacher_id: string;
}>;

export type ClassroomCreateResponse = Classroom;
export interface ClassroomCreateRequestParams {
  room_token: string;
  cancelled?: boolean;
  description?: string;
  start?: string;
  end?: string;
  max_participants?: number;
  audio_only?: boolean;
  whiteboard_only?: boolean;
  return_url?: string;
  record_class?: boolean;
}

export interface ClassroomUpdateRequestParams {
  room_token: string;
  cancelled?: boolean;
  description?: string;
  start?: string;
  end?: string;
  max_participants?: number;
  audio_only?: boolean;
  whiteboard_only?: boolean;
  return_url?: string;
  record_class?: boolean;
}

export type ClassroomReadResponse = Classroom;
export type ClassroomUpdateResponse = Classroom;
export type ClassroomDeleteResponse = undefined;

export async function list(
  params: ClassroomListRequestParams,
  token: string,
): Promise<ClientResponse<ClassroomListResponse>> {
  return client.get(`${VIRTUAL_CLASSROOM_ENDPOINT}/classrooms`, params, token);
}

export async function create(
  params: ClassroomCreateRequestParams,
  token: string,
): Promise<ClientResponse<ClassroomCreateResponse>> {
  return client.post(`${VIRTUAL_CLASSROOM_ENDPOINT}/classrooms`, params, token);
}

export async function read(
  uuid: string,
  token: string,
): Promise<ClientResponse<ClassroomReadResponse>> {
  return client.get(
    `${VIRTUAL_CLASSROOM_ENDPOINT}/classrooms/${uuid}`,
    undefined,
    token,
  );
}

export async function update(
  uuid: string,
  params: ClassroomCreateRequestParams,
  token: string,
): Promise<ClientResponse<ClassroomUpdateResponse>> {
  return client.put(
    `${VIRTUAL_CLASSROOM_ENDPOINT}/classrooms/${uuid}`,
    params,
    token,
  );
}

export async function del(
  uuid: string,
  token: string,
): Promise<ClientResponse<ClassroomDeleteResponse>> {
  return client.del(
    `${VIRTUAL_CLASSROOM_ENDPOINT}/classrooms/${uuid}`,
    undefined,
    token,
  );
}
