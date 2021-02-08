import React from 'react';
import {BrowserRouter,Switch, Route,Redirect} from 'react-router-dom';
import Dashboard from '../Dashboard/Dashboard';
import ViewProducts from '../Product/ViewProducts';
import AddProduct from '../Product/AddProduct';
import EditProduct from '../Product/EditProduct';

function Content() {

  return (
   
      <Switch>
            <Route exact path="/" component={Dashboard} />            
            <Route exact path="/dashboard" component={Dashboard} />            
            <Route exact path="/ViewProducts" component={ViewProducts} />            
            <Route exact path="/AddProduct" component={AddProduct} /> 
            <Route exact path="/EditProduct" component={EditProduct} /> 
            <Redirect from='/AddProduct/' to="/ViewProducts/" />           
      </Switch>
  );    
}

export default Content;
