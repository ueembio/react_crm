import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getCompanies } from '../../services/company';
import { Table } from 'react-bootstrap';

function ViewCompany() {
  const [companies, setList] = useState([]);
  useEffect(() => {
    let mounted = true;
    getCompanies()
      .then(items => {
        console.log(items);
        if (mounted) {
          setList(items)
        }
      })
    return () => mounted = false;
  }, [])


  return (
    <div className="container-fluid">
      <div className="row col-md-12">
        <h2>Companies List</h2>
        <Table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {companies.map(company => (
              <tr key={company.Id}>
                <td>{company.Name}</td>
                <td>{company.Phone}</td>
                <td>{company.Address}</td>
                <td>
                  <Link className="btn btn-primary">View</Link>
                  <Link className="btn btn-info" to={`/company/edit/${company.Id}`}>Edit</Link>
                  <Link className="btn btn-secondary">Delete</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  )
};

export default ViewCompany;