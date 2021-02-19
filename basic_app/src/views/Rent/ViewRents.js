import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getList } from '../../services/products';
import { Table } from 'react-bootstrap';
import { getRents, getRentsByLeaseStatus } from '../../services/rent';

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


  const handleChangeStatus = (e) => {
    console.log('handleChangeStatus');
    let { name, value } = e.target;
    //let index = e.target.selectedIndex;
    //let element = e.target.childNodes[index]
    //let id = element.getAttribute('id');
    console.log(value);

    getRentsByLeaseStatus(value).then(items => {
      setRents(items)
    });

  }

  return (
    <div className="container-fluid">

      <div className="row col-md-12">
        <h2>Devices Lease List</h2>

        <hr />
        <div>
          <select className="select2 form-control" style={{ 'width': '100%' }}
            onChange={handleChangeStatus}>
            <option value="0">Select Filter</option>
            <option value="1">Leased</option>
            <option value="2">Available</option>
            <option value="3">All</option>
          </select>
        </div>

        <Table>
          <thead>
            <tr>
              <th>Device</th>
              <th>Company</th>
              <th>Lease Date</th>
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
                  <Link className="btn btn-primary" to={`/rent/close/${rent.Id}`}>Close/Return</Link>
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