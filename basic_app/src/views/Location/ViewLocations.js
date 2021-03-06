import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getLocations, deleteLocation } from '../../services/locations';
import { Table } from 'react-bootstrap';
import { getLoggedInUserId } from '../../Utils';

function ViewLocations() {
  const [locations, setLocations] = useState([]);
  useEffect(() => {
    console.log('on loading');
    let mounted = true;
    getLocations(getLoggedInUserId())
      .then(items => {
        if (mounted) {
          setLocations(items)
        }
      })
    return () => mounted = false;
  }, []);

  function deleteLoc(e, locationId) {
    e.preventDefault();
    console.log(locationId);
    deleteLocation(locationId)
    
    getLocations(getLoggedInUserId())
      .then(items => {
        setLocations(items)
      })
  }

  return (
    <div className="container-fluid">

      <div className="row col-md-12">
        <h2>Locations List</h2>
        <Table>
          <thead>
            <tr>
              <th>Location Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {locations.map(location => (
              <tr key={location.Id}>
                <td>{location.Name}</td>
                <td>
                  <Link className="btn btn-sm btn-primary" to={`/EditLocation/${location.Id}`}>Edit</Link>
                  <Link className="btn btn-sm btn-info" onClick={((e) => deleteLoc(e, location.Id))}>Delete</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  )
};

export default ViewLocations;