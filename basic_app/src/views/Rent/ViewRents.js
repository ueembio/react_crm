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
              <th>Device</th>
              <th>Company</th>
              <th>Rent Date</th>
              <th>Return Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {rents.map(rent => (
              <tr key={rent.Id}>
                <td>{rent.Product}</td>
                <td>{rent.Company}</td>
                <td>{rent.RentDT}</td>
                <td>{rent.ReturnDT}</td>
                <td>
                  <Link className="btn btn-primary">Details</Link>                  
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