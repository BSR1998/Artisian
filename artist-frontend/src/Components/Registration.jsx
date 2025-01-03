import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import { styled } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import ColorModeSelect from '../shared-theme/ColorModeSelect';
import { useNavigate } from 'react-router';


const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  [theme.breakpoints.up('sm')]: {
    width: '450px',
  },
}));

const SignUpContainer = styled(Stack)(({ theme }) => ({
  height: '100vh',
  minHeight: '100%',
  padding: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(4),
  },
  '&::before': {
    content: '""',
    display: 'block',
    position: 'absolute',
    zIndex: -1,
    inset: 0,
    backgroundImage:
      'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
    backgroundRepeat: 'no-repeat',
    ...theme.applyStyles('dark', {
      backgroundImage:
        'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
    }),
  },
}));

export default function Registration() {

  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    gender: '',
    dob: null,
    city: '',
    state: '',
    mobileNo: '',
  });

  const [errors, setErrors] = useState({});

  const validateInputs = () => {
    const newErrors = {};
    const emailRegex = /\S+@\S+\.\S+/;

    if (!formData.firstName) newErrors.firstName = 'First name is required.';
    if (!formData.lastName) newErrors.lastName = 'Last name is required.';
    if (!formData.email || !emailRegex.test(formData.email))
      newErrors.email = 'Please enter a valid email address.';
    if (!formData.password || formData.password.length < 6)
      newErrors.password = 'Password must be at least 6 characters long.';
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = 'Passwords do not match.';
    if (!formData.city) newErrors.city = 'City is required.';
    if (!formData.state) newErrors.state = 'State is required.';
    if (!formData.mobileNo || !/^\d{10}$/.test(formData.mobileNo))
      newErrors.mobileNo = 'Please enter a valid 10-digit mobile number.';
    if (!formData.dob) newErrors.dob = 'Date of birth is required.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    
  };

  const handleDateChange = (newDate) => {
    setFormData((prevData) => ({ ...prevData, dob: newDate }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (validateInputs()) {
      try {
        const response = await fetch("http://localhost:8000/user/register", {
          method: "POST",
          body: JSON.stringify(formData),
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", // Ensures cookies are sent and stored
        });
      
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
      
        const data = await response.json();
        console.log(data); // Handle the response data
        if(data) {
            navigate("/")
        }
      } catch (error) {
        console.error("Error:", error.message);
      }
      
    }
  };

  return (
    <>
      <CssBaseline enableColorScheme />
      <ColorModeSelect sx={{ position: 'fixed', top: '1rem', right: '1rem' }} />
      <SignUpContainer direction="column" justifyContent="center">
        <Card variant="outlined">
          <Typography component="h1" variant="h4" sx={{ fontSize: '30px', fontWeight: '500' }}>
            Artistian
          </Typography>
          <Typography component="h3" variant="h5" sx={{ fontSize: '25px' }}>
            Sign up
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ display: 'flex', flexDirection: 'column', gap: 2,overflow:"auto" }}
            
          >
            <FormControl>
              <FormLabel>First name</FormLabel>
              <TextField
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                error={!!errors.firstName}
                helperText={errors.firstName}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Last name</FormLabel>
              <TextField
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                error={!!errors.lastName}
                helperText={errors.lastName}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <TextField
                name="email"
                value={formData.email}
                onChange={handleChange}
                error={!!errors.email}
                helperText={errors.email}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Password</FormLabel>
              <TextField
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                error={!!errors.password}
                helperText={errors.password}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Confirm password</FormLabel>
              <TextField
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Gender</FormLabel>
              <RadioGroup
                name="gender"
                value={formData.gender}
                onChange={handleChange}
              >
                <FormControlLabel value="male" control={<Radio />} label="Male" />
                <FormControlLabel value="female" control={<Radio />} label="Female" />
                <FormControlLabel value="other" control={<Radio />} label="Other" />
              </RadioGroup>
            </FormControl>
            <FormControl>
              <FormLabel>Date of birth</FormLabel>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <MobileDatePicker
                  value={formData.dob}
                  onChange={handleDateChange}
                  renderInput={(params) => (
                    <TextField {...params} error={!!errors.dob} helperText={errors.dob} />
                  )}
                />
              </LocalizationProvider>
            </FormControl>
            <FormControl>
              <FormLabel>City</FormLabel>
              <TextField
                name="city"
                value={formData.city}
                onChange={handleChange}
                error={!!errors.city}
                helperText={errors.city}
              />
            </FormControl>
            <FormControl>
              <FormLabel>State</FormLabel>
              <TextField
                name="state"
                value={formData.state}
                onChange={handleChange}
                error={!!errors.state}
                helperText={errors.state}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Mobile number</FormLabel>
              <TextField
                name="mobileNo"
                value={formData.mobileNo}
                onChange={handleChange}
                error={!!errors.mobileNo}
                helperText={errors.mobileNo}
              />
            </FormControl>
            <Button type="submit" variant="contained">
              Sign up
            </Button>
            <Button onClick={()=>{navigate("/login")}} variant="contained">
              Sign In
            </Button>
          </Box>
        </Card>
      </SignUpContainer>
    </>
  );
}
