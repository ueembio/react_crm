import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getList } from '../../services/products';
import { formatDate } from "../../Utils"
import { Table } from 'react-bootstrap';

function ViewProducts() {
  const [products, setList] = useState([]);
  useEffect(() => {
    console.log('on loading');
    let mounted = true;
    getList()
      .then(items => {
        if (mounted) {
          setList(items)
        }
      })
    return () => mounted = false;
  }, [])


  return (
    <div className="container-fluid">

      <div className="row col-md-12">
        <h2>Device List</h2>
        <Table>
          <thead>
            <tr>
              <th>Device Name</th>
              <th>Description</th>
              <th>Hardware Serial No.</th>
              <th>Saved On</th>
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
                  <Link className="btn btn-sm btn-primary" to={`/product/edit/${product.Id}`}>Edit</Link>
                  {/*<Link className="btn btn-secondary">Delete</Link>*/}
                  <Link className="btn btn-sm btn-secondary" to={`/product/data/${product.Id}`}>Data</Link>
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