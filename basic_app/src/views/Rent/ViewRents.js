import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getList } from '../../services/products';
import { Table } from 'react-bootstrap';
import { getRents } from '../../services/rent';

function ViewRents() {
  const [rents, setRents] = useState([]);
  useEffect(() => {
    console.log('on loading');
    let mounted = true;
    getRents()
      .then(items => {
        if (mounted) {
            setRents(items)
        }
      })
    return () => mounted = false;
  }, [])


  return (
    <div className="container-fluid">

      <div className="row col-md-12">
        <h2>Rent List</h2>
        <Table>
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Company Name</th>
              <th>Rent Date</th>
              <th>Return Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {rents.map(rent => (
              <tr key={rent.Id}>
                <td>{rent.Name}</td>
                <td>{rent.Description}</td>
                <td>{rent.SKU}</td>
                <td>{rent.DT}</td>
                <td>
                  <Link className="btn btn-primary">View</Link>
                  <Link className="btn btn-info" to={`/rent/edit/${rent.Id}`}>Edit</Link>
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

export default ViewRents;