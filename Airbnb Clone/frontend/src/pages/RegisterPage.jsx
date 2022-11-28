import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Grid, Paper, Avatar, Input, Button } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { useHistory } from 'react-router-dom';
import AlertUser from '../components/AlertUser'

const RegisterPage = ({ setter }) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [passwordCheck, setPasswordCheck] = React.useState('');
  const [name, setName] = React.useState('');
  const [displayError, setDisplayError] = React.useState(false)
  const [displaySubmit, setDidisplaySubmit] = React.useState(true)
  const [loginsucces, setLoginSucces] = React.useState(false)
  const [erorrDisplay, seterorDisplay] = React.useState(false)
  const history = useHistory();
  // Some style
  const paperStyle = { padding: 20, height: 'auto', width: '280px', margin: '20px auto' }
  const avatarStyle = { backgroundColor: '#1bbd7e' }
  const btnstyle = { margin: '8px 0' }

  useEffect(() => {
    if (password !== passwordCheck) {
      setDisplayError(true)
      setDidisplaySubmit(false)
    } if (password === passwordCheck) {
      setDisplayError(false)
      setDidisplaySubmit(true)
    }
    if (loginsucces) {
      console.log('Reached here')
      history.push('/listings/create')
    }
  }, [passwordCheck, loginsucces])
  return (<>
      <Grid>
        <Paper elevation={10} style={paperStyle}>
            <Grid align='center'>
                 <Avatar style={avatarStyle}><LockOutlinedIcon/></Avatar>
                <h2>Register Account</h2>
            </Grid>
            <form onSubmit = {(e) => PushRegister(name, password, email, e, setLoginSucces, setter, seterorDisplay)}>
            <Input id='Email' placeholder='Enter email' fullWidth required value={email} onChange = {e => setEmail(e.target.value)}/>
            <br/>
            <Input id='Name' placeholder='Enter your Name' type='text' fullWidth value={name} onChange = {e => setName(e.target.value)} required/>
            <Input id='Passowrd' placeholder='Please Enter a password' type='password' fullWidth required value={password} onChange ={e => setPassword(e.target.value)}/>
            <Input id='ConfirmPassowrd' placeholder='Please Confirm your password' type='password' fullWidth required value={passwordCheck} onChange ={e => setPasswordCheck(e.target.value)}/>
            {/* If passwords are not matching display error and dissable button */}
            {displayError && <div> <AlertUser sev = {'error'} mess = {'Both passwords do not match, make sure they are matching'} />
              <Button disabled color='primary' variant="contained" style={btnstyle} fullWidth >Register Account</Button>
            </div>}
            {displaySubmit && <Button id= 'Submitbtn' type='submit' color='primary' variant="contained" style={btnstyle} fullWidth>Register Account</Button>}
            {erorrDisplay && <AlertUser sev = {'error'} mess = {'Email address already registered'} />}
            </form>
        </Paper>
    </Grid>
    </>
  )
}
// Update server on register
const PushRegister = (name, password, email, e, setLoginSucces, setter, seterorDisplay) => {
  e.preventDefault()
  fetch('http://localhost:5005/user/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({
      email: email,
      password: password,
      name: name,
    })
  })
    .then(r => r.json())
    .then(data => {
      if (data.token) {
        console.log(data.token);
        localStorage.setItem('Token', data.token);
        localStorage.setItem('Email', email);
        localStorage.setItem('LoginStatus', true);
        setLoginSucces(true)
        setter('True')
      } else {
        console.log(data.error);
        if (data.error === 'Email address already registered') {
          seterorDisplay(true)
        }
      }
    })
}

RegisterPage.propTypes = {
  setter: PropTypes.func,
}

export default RegisterPage;
