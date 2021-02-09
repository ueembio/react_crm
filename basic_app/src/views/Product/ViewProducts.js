import React,{ useEffect, useState } from 'react';
import {Link,useLocation} from 'react-router-dom';
import { getList } from '../../services/products';
import { Table } from 'react-bootstrap';
function ViewProducts() {  
    const [products, setList] = useState([]);
    useEffect(() => {
      console.log('On Loading');
      let mounted = true;
      getList()
        .then(items => {
          if(mounted) {
            setList(items)
          }
        })
      return () => mounted = false;
    }, [])


    return(    
        <div className="container-fluid">
        {alert && <div className="alert alert-info alert-dismissible">
          <button type="button" className="close" data-dismiss="alert" aria-hidden="true">×</button>
          <h5><i className="icon fas fa-info"></i> Alert!</h5>
            Form SUbmitted.
          </div>
          }
        <div className="row col-md-12">
          <h2>My Grocery List</h2>
          <Table>
            <thead>
              <tr>
                <th>#ID</th>
                <th>Product Name</th>                
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>{product.name}</td>
                  <td>
                    <Link className="btn btn-primary">View</Link>
                    <Link className="btn btn-info" to={`/product/edit/${product.id}`}>Edit</Link>
                    <Link className="btn btn-secondary">Delete</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>  
    )};

export default ViewProducts;