import React,{ useEffect, useState } from 'react';
import {Link,useLocation} from 'react-router-dom';
import { getCompanies } from '../../services/company';
import { Table } from 'react-bootstrap';
function ViewCompany() {  
    const [companies, setList] = useState([]);
    useEffect(() => {      
      let mounted = true;
      getCompanies()
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
          <h2>My Companies List</h2>
          <Table>
            <thead>
              <tr>
                <th>#ID</th>
                <th>Name</th>                
                <th>Address</th>                
                <th>Number</th>                
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {companies.map(company => (
                <tr key={company.id}>
                  <td>{company.id}</td>
                  <td>{company.name}</td>
                  <td>{company.address}</td>
                  <td>{company.number}</td>
                  <td>
                    <Link className="btn btn-primary">View</Link>
                    <Link className="btn btn-info" to={`/company/edit/${company.id}`}>Edit</Link>
                    <Link className="btn btn-secondary">Delete</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>  
    )};

export default ViewCompany;