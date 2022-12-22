import { GET_ALL_CONTACTS_REQUEST, GET_ALL_CONTACTS_SUCCESS, GET_ALL_CONTACTS_ERROR, CREATE_CONTACT_REQUEST, CREATE_CONTACT_SUCCESS, CREATE_CONTACT_ERROR } from '../actionTypes';
import { ContactState, ProjectActionTypes } from '../constants';


const initialState: ContactState = {
    pending: false,
    contacts: [],
    error: null,
    contact: null
}

export const contactReducer = (state=initialState, action: ProjectActionTypes) => {
    switch (action.type) {
        case GET_ALL_CONTACTS_REQUEST:
            return {
                ...state,
                pending: true,
            };
        case GET_ALL_CONTACTS_SUCCESS:
            return {
                ...state,
                pending: false,
                contacts: action.payload
            }
        case GET_ALL_CONTACTS_ERROR:
            return {
                ...state,
                pending: false,
                error: action.payload
            };
        case CREATE_CONTACT_REQUEST:
            return {
                ...state,
                pending: true,
            };
        case CREATE_CONTACT_SUCCESS:
            return {
                ...state,
                pending: false,
                user: action.payload
            }
        case CREATE_CONTACT_ERROR:
            return {
                ...state,
                pending: false,
                error: action.payload
            };
        default:
            return state;
    }
}