import React from 'react';
import './Login.css';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom';

async function loginUser(credentials) {
  return fetch(`${process.env.REACT_APP_API_BASE_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  }).then(data => data.json())
}

export default function Login({ setToken }) {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async e => {
    e.preventDefault();
    const token = await loginUser({ username, password });
    setToken(token);
    console.log('handleSubmit');
    window.location.replace('/Dashboard');
  }

  return (
    <div className="login">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="u" placeholder="Username" required="required" onChange={e => setUserName(e.target.value)} />
        <input type="password" name="p" placeholder="Password" required="required" onChange={e => setPassword(e.target.value)} />
        <button type="submit" className="btn btn-primary btn-block btn-large">Let me in.</button>
      </form>
    </div>
  )
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired
}