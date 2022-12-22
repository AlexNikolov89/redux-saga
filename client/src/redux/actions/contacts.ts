import { FetchContactsRequest, FetchContactsSuccess, FetchContactsSuccessPayload, FetchContactsErrorPayload, FetchContactsError } from '../constants';
import { GET_ALL_CONTACTS_REQUEST, GET_ALL_CONTACTS_SUCCESS, GET_ALL_CONTACTS_ERROR, CREATE_CONTACT_REQUEST, CREATE_CONTACT_SUCCESS, CREATE_CONTACT_ERROR } from '../actionTypes';


export const fetchContactsRequest = (): FetchContactsRequest => ({
    type: GET_ALL_CONTACTS_REQUEST,
})

export const fetchContactsSuccess = (payload: FetchContactsSuccessPayload): FetchContactsSuccess => ({
    type: GET_ALL_CONTACTS_SUCCESS,
    payload
})

export const fetchContactsError = (payload: FetchContactsErrorPayload): FetchContactsError => ({
    type: GET_ALL_CONTACTS_ERROR,
    payload
})

export const createContactsRequest = () => ({
    type: CREATE_CONTACT_REQUEST
})

export const createContactsSuccess = (contactData: any) => ({
    type: CREATE_CONTACT_SUCCESS,
    payload: {contactData},
    
})

export const createContactsError = (error: any) => ({
    type: CREATE_CONTACT_ERROR,
    error
})