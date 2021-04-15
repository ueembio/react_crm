import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getList, getListByLocation } from '../../services/products';
import { getLocations } from '../../services/locations';
import { formatDate, getIsAdmin, getLoggedInUserId } from "../../Utils"
import { Table } from 'react-bootstrap';

function ViewProducts() {

  const [products, setList] = useState([]);
  const [locations, setLocations] = useState([]);
  
  useEffect(() => {
    console.log('on loading');
    let mounted = true;
    getList()
      .then(items => {
        if (mounted) {
          setList(items)
        }
      })

    let loggedInUserId = getLoggedInUserId();
    getLocations(loggedInUserId)
      .then(items => {
        if (mounted) {
          setLocations(items)
        }
      });

    return () => mounted = false;
  }, [])

  const handleChangeLocation = (e) => {
    console.log('handleChangeLocation');
    let { name, value } = e.target;
    //let index = e.target.selectedIndex;
    //let element = e.target.childNodes[index]
    //let id = element.getAttribute('id');
    console.log(value);
    if (value === '0') {
      console.log('all locations');
      getList().then(items => {
        setList(items)
      });
    }
    else {
      getListByLocation(getLoggedInUserId(), value).then(items => {
        setList(items)
      });
    }
  }

  return (
    <div className="container-fluid">

      <div className="row col-md-12">
        <h2>Sensor List</h2>

        <hr />
        <div>
          <select className="select2 form-control" style={{ 'width': '100%' }}
            onChange={handleChangeLocation}>
            <option value="0">All Locations</option>
            {locations.map(loc => (<option value={loc.Id}>{loc.Name}</option>))}
          </select>
        </div>

        <Table>
          <thead>
            <tr>
              <th>Sensor Name</th>
              <th>Description</th>
              <th>Hardware Serial No.</th>
              <th>Created On</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product.Id}>
                <td>{product.Name}</td>
                <td>{product.Description}</td>
                <td>{product.SKU}</td>
                <td>{formatDate(product.DT)}</td>
                <td>
                  <Link className="btn btn-sm btn-primary" to={`/product/edit/${product.Id}`} style={{ display: (getIsAdmin() == 1) ? "show" : "none" }}>Edit</Link>
                  <Link className="btn btn-secondary" to={`/SetRule/${product.Id}`}>Alert Rule</Link>
                  <Link className="btn btn-secondary" to={`/product/data/${product.Id}`}>Data</Link>
                  <Link className="btn btn-secondary" to={`/Alerts/${product.Id}`}>Alerts</Link>
                  <Link className="btn btn-secondary" to={`/SetLocation/${product.Id}`}>Location</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  )
};

export default ViewProducts;