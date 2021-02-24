import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getList } from '../../services/users';
import { formatDate } from "../../Utils"
import { Table } from 'react-bootstrap';

function ViewUsers() {
  const [users, setList] = useState([]);
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
        <h2>Users List</h2>
        <Table>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Username</th>
              <th>Email</th>
              <th>Company</th>
              <th>Created On</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.Id}>
                <td>{user.FirstName}</td>
                <td>{user.LastName}</td>
                <td>{user.Username}</td>
                <td>{user.Email}</td>
                <td>{user.Company}</td>
                <td>{formatDate(user.DT)}</td>
                <td>
                  <Link className="btn btn-primary">View</Link>
                  <Link className="btn btn-info" to={`/user/edit/${user.Id}`}>Edit</Link>
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

export default ViewUsers;