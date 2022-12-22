import * as React from 'react';
import { IContact } from '../redux/constants';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import DraftsIcon from '@mui/icons-material/Drafts';
import CallIcon from '@mui/icons-material/Call';
import Chip from '@mui/material/Chip';


interface IContactProps {
    contact: IContact
}

const Contact: React.FunctionComponent<IContactProps> = ({contact}: IContactProps) => {
    // console.log(contact);
    
  return (
    <Card sx={{ minWidth: 275 }} style={{marginTop: '16px'}} variant="elevation" >
      <CardContent>
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <Typography sx={{ fontSize: 26 }} color='primary' gutterBottom>
            {contact.name}
            </Typography>
            <Chip label={contact.type.charAt(0).toUpperCase() + contact.type.slice(1)} color="primary" size='medium' style={{fontSize: '12px !important'}} />
        </div>

        <div style={{display: 'flex', alignItems: 'center'}}>
        <DraftsIcon style={{marginRight: '6px'}} />
        <Typography variant="h6">
            {contact.email}
        </Typography>
        </div>
        
        <div  style={{display: 'flex', alignItems: 'center'}}>
            <CallIcon />
            <Typography variant="h6">
                {contact.phone}
            </Typography>
        </div>
      </CardContent>
      <CardActions>
        <Button variant="contained">Edit</Button>
        <Button variant="contained" color='error'>Delete</Button>
      </CardActions>
    </Card>
  );
};

export default Contact;
