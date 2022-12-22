import axios from 'axios'
import { IContact } from '../redux/constants'

export const getContacts = async () => await axios.get<IContact[]>('/api/contacts')
export const createContact = async (contact: IContact) => await axios.post<IContact>('/api/contacts', contact)