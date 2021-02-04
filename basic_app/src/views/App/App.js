import React, { useState } from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Dashboard from '../Dashboard/Dashboard';
import Preferences from '../Preference/Preferences';
import Login from '../Login/Login';
import useToken from './useToken';
import Sidebar from './Sidebar';
import Content from './Content';
import Footer from './Footer';
import Header from './Header';
import Breadcrumb from './Breadcrumb';



function App() {
  const { token, setToken } = useToken();
  
  if(!token) {
    return <Login setToken={setToken} />
  }

  return (
    <BrowserRouter>
        <Header></Header>
        <Sidebar ></Sidebar>
        <div className="content-wrapper">
          <Breadcrumb></Breadcrumb>
          <Content></Content>
        </div>
        <Footer></Footer>
    </BrowserRouter>
  );
}

export default App;
