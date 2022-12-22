import { GET_ALL_CONTACTS_REQUEST, GET_ALL_CONTACTS_SUCCESS, GET_ALL_CONTACTS_ERROR, CREATE_CONTACT_REQUEST, CREATE_CONTACT_SUCCESS, CREATE_CONTACT_ERROR } from './actionTypes';

export interface ContactState {
    pending: boolean, 
    contacts: IContact[],
    error: string | null,
    contact: IContact | null
} 

export enum Type {
    personal = 'personal',
    professional = 'professional',
}

export interface IContact {
    id: string,
    name: string,
    email: string,
    phone: string,
    type: Type,
}

export interface FetchContactsSuccessPayload {
    contacts: IContact[]
}

export interface FetchContactsErrorPayload {
    error: {message: string}
}

export interface CreateContactsErrorPayload {
    error: {message: string}
}

export interface CreateContactsSuccessPayload {
    contact: IContact
}

export type FetchContactsRequest = {
    type: typeof GET_ALL_CONTACTS_REQUEST
}

export type FetchContactsSuccess = {
    type: typeof GET_ALL_CONTACTS_SUCCESS,
    payload: FetchContactsSuccessPayload
}

export type FetchContactsError = {
    type: typeof GET_ALL_CONTACTS_ERROR,
    payload: FetchContactsErrorPayload
}

export type CreateContactRequest = {
    type: typeof CREATE_CONTACT_REQUEST,
}

export type CreateContactSuccess = {
    type: typeof CREATE_CONTACT_SUCCESS,
    payload: CreateContactsSuccessPayload
}

export type CreateContactError = {
    type: typeof CREATE_CONTACT_ERROR,
    payload: CreateContactsErrorPayload
}

export type ProjectActionTypes = 
    | FetchContactsRequest
    | FetchContactsSuccess
    | FetchContactsError
    | CreateContactRequest
    | CreateContactSuccess
    | CreateContactError
