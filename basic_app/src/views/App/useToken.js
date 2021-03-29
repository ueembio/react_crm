import { useState } from 'react';

export default function useToken() {

  const getToken = () => {
    const tokenString = sessionStorage.getItem('token');
    //const userToken = JSON.parse(tokenString);
    //return userToken?.token
    return tokenString;
  };
  
  const [token, setToken] = useState(getToken());
  
  const saveToken = userToken => {
    //alert(userToken.temperatureUnit);
    //alert(userToken.isAdmin);
    sessionStorage.setItem('id', userToken.id);
    sessionStorage.setItem('token', userToken.token);
    sessionStorage.setItem('temperatureUnit', userToken.temperatureUnit);
    sessionStorage.setItem('isAdmin', userToken.isAdmin);
    setToken(userToken.token);
  };

  return {
    setToken: saveToken,
    token
  }
}
