import * as React from 'react';
import Filterbar from './FilterBar';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/reducer/rootReducer';
import { IContact } from '../redux/constants';
import Contact from './Contact';
import { useDispatch } from 'react-redux';
import { fetchContactsRequest } from '../redux/actions/contacts';

interface IContactsProps {
}

const Contacts: React.FunctionComponent<IContactsProps> = () => {

  const dispatch = useDispatch()

  React.useEffect(() => {
    dispatch(fetchContactsRequest())
  }, [dispatch])

    const contactReducer = useSelector((state: RootState) => state.contacts)
    const {contacts, pending, error} = contactReducer
    // console.log('Contacts array:', contacts);
        
    
  return (
    <div>
        <Filterbar />

        <div>
        {pending && <h3>Pending...</h3>}
        {error && <h3>Error...</h3>}
        {contacts && (contacts as IContact[])?.map((contact: IContact, index) => (
            <div key={index}>
                <Contact contact={contact} />
            </div>
        ))}
        </div>
    </div>
  );
};

export default Contacts;
