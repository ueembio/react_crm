import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Login from '../Login/Login';
import Dashboard from '../Dashboard/Dashboard';
import ViewProducts from '../Product/ViewProducts';
import AddProduct from '../Product/AddProduct';
import EditProduct from '../Product/EditProduct';
import Data from '../Product/Data';
import Alerts from '../Product/Alerts';
import SetRule from '../Product/SetRule'
import SetLocation from '../Product/SetLocation'
import ViewCompany from '../Company/ViewCompany';
import AddCompany from '../Company/AddCompany';
import EditCompany from '../Company/EditCompany';
import AddRent from '../Rent/AddRent';
import ViewRents from '../Rent/ViewRents';
import CloseRent from '../Rent/CloseRent';
import AddUser from '../User/AddUser';
import ViewUsers from '../User/ViewUsers';
import EditUser from '../User/EditUser';
import AddLocation from '../Location/AddLocation';
import ViewLocations from '../Location/ViewLocations';
import EditLocation from '../Location/EditLocation';

function Content() {

  return (
   
      <Switch>
            <Route exact path="/" component={Dashboard} />            
            <Route exact path="/dashboard" component={Dashboard} />

            <Route exact path="/login" component={Login} />
            
            <Route exact path="/ViewProducts" component={ViewProducts} />            
            <Route exact path="/AddProduct" component={AddProduct} /> 
            <Route exact path="/product/edit/:id" component={EditProduct} />
            <Route exact path="/product/data/:id" component={Data} />
            <Route exact path="/Alerts/:id" component={Alerts} />
            <Route exact path="/SetRule/:id" component={SetRule} /> 
            <Route exact path="/SetLocation/:id" component={SetLocation} /> 

            <Route exact path="/ViewLocations" component={ViewLocations} />            
            <Route exact path="/AddLocation" component={AddLocation} /> 
            <Route exact path="/EditLocation/:id" component={EditLocation} />

            <Route exact path="/ViewCompany" component={ViewCompany} /> 
            <Route exact path="/AddCompany" component={AddCompany} /> 
            <Route exact path="/company/edit/:id" component={EditCompany} />

            <Route exact path="/rent/index" component={ViewRents} />  
            <Route exact path="/rent/add" component={AddRent} />
            <Route exact path="/rent/close/:id" component={CloseRent} /> 

            <Route exact path="/ViewUsers" component={ViewUsers} /> 
            <Route exact path="/AddUser" component={AddUser} /> 
            <Route exact path="/user/edit/:id" component={EditUser} />

            /*<Redirect from='/AddProduct/' to="/ViewProducts/" />*/

      </Switch>
  );    
}

export default Content;
