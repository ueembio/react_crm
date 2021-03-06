import React from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Login from '../Login/Login';
import useToken from './useToken';
import Sidebar from './Sidebar';
import Content from './Content';
import Footer from './Footer';
import Header from './Header';
import Breadcrumb from './Breadcrumb';
import ErrorBoundary from './ErrorBoundary'

function App() {

  const { token, setToken } = useToken();
  console.log('App()::' + token);
  if (!token) {
    return <Login setToken={setToken} />
  }
  
  return (
    <BrowserRouter>
      <Header></Header>
      <Sidebar></Sidebar>
      <div className="content-wrapper px-4 py-2">
        <Breadcrumb></Breadcrumb>
        <Content></Content>
      </div>

      <ErrorBoundary>
        <p>Some error occurred!</p>
      </ErrorBoundary>
      
      <Footer></Footer>
    </BrowserRouter>
  );
}

export default App;
