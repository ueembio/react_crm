import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Dashboard from '../Dashboard/Dashboard';
import ViewProducts from '../Product/ViewProducts';
import AddProduct from '../Product/AddProduct';
import EditProduct from '../Product/EditProduct';
import ViewCompany from '../Company/ViewCompany';
import AddCompany from '../Company/AddCompany';
import EditCompany from '../Company/EditCompany';



function Content() {

  return (

    <Switch>
      <Route exact path="/" component={Dashboard} />
      <Route exact path="/dashboard" component={Dashboard} />

      <Route exact path="/ViewProducts" component={ViewProducts} />
      <Route exact path="/AddProduct" component={AddProduct} />
      <Route exact path="/product/edit/:id" component={EditProduct} />
      <Redirect from='/AddProduct/' to="/ViewProducts/" />

      <Route exact path="/ViewCompanies" component={ViewCompany} />
      <Route exact path="/AddCompany" component={AddCompany} />
      <Route exact path="/company/edit/:id" component={EditCompany} />
      <Redirect from='/AddCompany/' to="/ViewCompanies/" />
      
    </Switch>
  );
}

export default Content;
