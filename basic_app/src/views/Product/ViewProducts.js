import React,{ useEffect, useState } from 'react';
import {Link,useLocation} from 'react-router-dom';
import { getList } from '../../services/products';

function ViewProducts() {  
    let mounted = true;
    const [products, setList] = useState([]);
    const [alert, setAlert] = useState(false);
    let location = useLocation();

    useEffect(() => {
        console.log(location.pathname); 
      console.log(location.search); 
      console.log(location.state.alert);
      //setAlert(location.state.alert); 
      if(products.length && !alert) {
        mounted = true;          
          return;
        }

        getList()
          .then(items => {
            if(mounted) {
              mounted = false;
              
            }
          })
        return () => mounted = false;
      }, [alert,products,location])
    
     /* useEffect(() => {
        if(alert) {
          setTimeout(() => {
            setAlert(false);
          }, 1000)
        }
      }, [alert])*/


    return(
      
        <div className="wrapper">
        {alert && <div className="alert alert-info alert-dismissible">
          <button type="button" className="close" data-dismiss="alert" aria-hidden="true">×</button>
          <h5><i className="icon fas fa-info"></i> Alert!</h5>
          Form SUbmitted.
          </div>
          }
        <h1>My Grocery List</h1>
        <ul>
          {products.map(item => <li key={item.id}>{item.name}</li>)}
        </ul>
      </div>  
    )};

export default ViewProducts;