import {combineReducers} from 'redux'
import { contactReducer } from './contactReducer';

const rootReducer = combineReducers({
    contacts: contactReducer
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer