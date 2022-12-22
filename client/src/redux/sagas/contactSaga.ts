import { createContact, getContacts } from '../../api/contact';
import { put, all, takeEvery, call, fork, delay, takeLatest } from 'redux-saga/effects';
import { fetchContactsSuccess, createContactsSuccess, fetchContactsError, createContactsError } from '../actions/contacts';
import { GET_ALL_CONTACTS_REQUEST, CREATE_CONTACT_REQUEST } from '../actionTypes';
import axios from 'axios';


export function* fetchContacts(): any {
    try {
        const response  = yield call(getContacts)
        if(response.status === 200) {
            yield delay(500)
            yield put(fetchContactsSuccess(response.data))
        }
    } catch (error: any) {
        yield put(fetchContactsError(error.response.data))
    }
}

export function* createContactRequest({payload}: any):any {
    try {
        const response: any  = yield call(createContact, payload)
        // const resp = yield axios.post('/api/contacts', payload);
        yield put(createContactsSuccess(response.data))
        console.log(response);
    } catch (error: any) {
        yield put(createContactsError(error.response.data))
    }
}

export function* fetchAllContactsSaga() {
    yield takeEvery(GET_ALL_CONTACTS_REQUEST, fetchContacts)
}

export function* createContactSaga() {
    yield takeLatest(CREATE_CONTACT_REQUEST, createContactRequest)
}


export default function* rootSaga() {
    yield all(
        [
            fork(fetchAllContactsSaga), 
            fork(createContactSaga)
        ])
}