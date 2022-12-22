import React, {useEffect, Fragment} from 'react';
import { useDispatch } from 'react-redux';
import {  fetchContactsRequest } from './redux/actions/contacts';
import { Container, Grid } from '@mui/material';
import Navbar from './components/Navbar';
import Contacts from './components/Contacts';
import Form from './components/Form';


function App() {
  // const dispatch = useDispatch()

  // useEffect(() => {
  //   dispatch(fetchContactsRequest())
  // }, [dispatch])
  
  return (
    <Fragment>
      <Navbar />
      <Container style={{marginTop: '100px'}} maxWidth='md'>
      <Grid container spacing={4}>
        <Grid item xs={8}>
          <Contacts />
        </Grid>
        <Grid item xs={4}>
          <Form />
        </Grid>
      </Grid>
      </Container>
    </Fragment>
  );
}

export default App;
