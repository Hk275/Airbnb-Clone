import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
// Function to display the logout button to the user
// When clicked on the user is logged out
const LogoutButton = ({ setter }) => {
  const history = useHistory();
  const Token = localStorage.getItem('Token');
  return <>
      <button id = "logout" onClick= {() => logUserOut(Token, setter, history) }> Logout</button>
      </>;
}

const logUserOut = (Token, setter, history) => {
  fetch('http://localhost:5005/user/auth/logout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: 'Bearer ' + Token,
    },
  })
    .then(r => r.json())
    .then(data => {
      console.log('new', Token)
      localStorage.removeItem('Token');
      localStorage.removeItem('Email');
      localStorage.setItem('LoginStatus', false);
      setter('False');
      console.log(data)
      history.push('/')
    })
}

export default LogoutButton;

LogoutButton.propTypes = {
  setter: PropTypes.func,
}
