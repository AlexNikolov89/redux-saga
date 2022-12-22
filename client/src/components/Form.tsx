import React, {useState} from "react";
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import { RadioGroup, FormControlLabel, FormLabel } from "@mui/material";
import FormControl from "@mui/material/FormControl/FormControl";
import { Type } from "../redux/constants";
import { useDispatch } from "react-redux";
import { createContactsSuccess } from "../redux/actions/contacts";
import Button from '@mui/material/Button';

interface IFormProps {
}

const Form: React.FC<IFormProps> = () => {
    const dispatch = useDispatch()

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        contactType: Type
    })
    const {name, email, phone, contactType} = formData
    
    // const [name, setName] = useState<string | null>('')
    // const [email, setEmail] = useState<string | null>('')
    // const [phone, setPhone] = useState<string | null>('')
    // const [contactType, setContactType] = useState<Type | null>()

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if(name && email && phone && contactType) {
            dispatch(createContactsSuccess(formData))

        } else {
            console.log('error');
            
        }
        console.log(createContactsSuccess(formData));
        
        
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({...formData, [e.target.name]: e.target.value})  
    }

  return (
    <div>
        <Typography variant="h5" align="center">Add Contact</Typography>
        <form onSubmit={handleSubmit}>
            <TextField 
                fullWidth
                margin="dense"
                label="Name" 
                variant="outlined" 
                value={name}
                name='name' 
                onChange={handleChange} 
                />
                <TextField 
                fullWidth
                margin="dense"
                label="Email" 
                variant="outlined" 
                value={email} 
                name='email'
                onChange={handleChange} 
                />
                <TextField 
                fullWidth
                margin="dense"
                label="Phone" 
                variant="outlined" 
                value={phone} 
                name='phone'
                onChange={handleChange} 
                />

            <FormControl>
                <FormLabel>Contact Type</FormLabel>
                <RadioGroup
                    row
                    name='contactType'
                    value={contactType}
                    onChange={handleChange}
                    defaultValue={Type.personal}
                >
                    <FormControlLabel value={Type.personal} control={<Radio />} label="Personal" />
                    <FormControlLabel value={Type.professional} control={<Radio />} label="Professional" />
                </RadioGroup>
            </FormControl>
            <Button type="submit" variant="contained">Submit</Button>
        </form>
    </div>
  );
};

export default Form;
