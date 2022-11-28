import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { StoreContext } from '../utils/Store';
// // import LogComp from '../components/LogComp'
import { Grid, Paper, Avatar, Typography, Link, Input, Button } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { useHistory } from 'react-router-dom';
import AlertUser from '../components/AlertUser'

const LoginPage = ({ setter }) => {
  const [loginStatus, setloginStatus] = React.useState('Requesting')
  const context = React.useContext(StoreContext);
  const [Token, setToken] = context.Token;
  const history = useHistory();
  const TokenUpdate = setToken
  console.log(Token);
  const paperStyle = { padding: 20, height: 'auto', width: '280px', margin: '20px auto' }
  const avatarStyle = { backgroundColor: '#1bbd7e' }
  const btnstyle = { margin: '8px 0' }

  useEffect(() => {
    // console.log('Hi');
  }, [loginStatus])

  const Update = (fnc, log, TokenUpdate) => {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    if (log === 'Requesting') {
      return <>
      <Grid>
        <Paper elevation={10} style={paperStyle}>
            <Grid align='center'>
                 <Avatar style={avatarStyle}><LockOutlinedIcon/></Avatar>
                <h2>Sign In</h2>
            </Grid>
            <form onSubmit = {(e) => pushLogin(email, password, fnc, setter, TokenUpdate, e, history)}>
            <Input id = "userName" label='Username' placeholder='Enter username' value={email} fullWidth required onChange = {e => setEmail(e.target.value)}/>
            <br/>
            <Input id = "pass" label='Password' placeholder='Enter password' value={password} type='password' fullWidth required onChange ={e => setPassword(e.target.value)}/>
            <Button id = "login" type='submit' color='primary' variant="contained" style={btnstyle} fullWidth>Sign in</Button>
            </form>
            <Typography > Do you have an account ?
                 <Link onClick = {() => history.push('/register')} >
                    Sign Up
            </Link>
            </Typography>
        </Paper>
    </Grid>
      </>;
    } if (log === 'Error') {
      console.log('Reach ere');
      return <>
      <Grid>
        <Paper elevation={10} style={paperStyle}>
            <Grid align='center'>
                 <Avatar style={avatarStyle}><LockOutlinedIcon/></Avatar>
                <h2>Sign In</h2>
            </Grid>
            <form onSubmit = {(e) => pushLogin(email, password, fnc, setter, TokenUpdate, e)}>
            <Input label='Username' placeholder='Enter username' value={email} fullWidth required onChange = {e => setEmail(e.target.value)}/>
            <br/>
            <Input label='Password' placeholder='Enter password' value={password} type='password' fullWidth required onChange ={e => setPassword(e.target.value)}/>
            <Button type='submit' color='primary' variant="contained" style={btnstyle} fullWidth>Sign in</Button>
            </form>
            <Typography > Do you have an account ?
            <Link onClick = {() => history.push('/register')}>
                    Sign Up
            </Link>
            <AlertUser sev = {'error'} mess = {'Invalid Login Details. Please Enter Again !'} />
            </Typography>
        </Paper>
    </Grid>
      </>;
    }
  }
  const b = Update(setloginStatus, loginStatus, TokenUpdate);
  return b
}
// Push login details to server
const pushLogin = (email, password, fnc, setter, setToken, e, history) => {
  e.preventDefault()
  fetch('http://localhost:5005/user/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({
      email: email,
      password: password,
    })
  })
    .then(r => r.json())
    .then(data => {
      if (data.token) {
        setToken(data.token);
        localStorage.setItem('Token', data.token);
        localStorage.setItem('Email', email);
        localStorage.setItem('LoginStatus', true);
        history.push('/HostedListings')
        setter('True');
        return (
          <>
          Hi
          </>
        )
      } else {
        fnc('Error');
      }
    })
}

LoginPage.propTypes = {
  setter: PropTypes.func,
}

export default LoginPage;
