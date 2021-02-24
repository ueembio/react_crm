import React, { useEffect, useState } from 'react';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { addProduct, addUser } from '../../services/users';
import ViewUsers from './ViewUsers';

function AddUser({ setAlert }) {
    const [itemFirstName, setItemFirstName] = useState();
    const [itemLastName, setItemLastName] = useState();
    const [itemUserame, setItemUsername] = useState();
    const [itemEmail, setItemEmail] = useState();
    const [itemCompany, setItemCompany] = useState();
    const [itemCreatedOn, setItemCreatedOn] = useState();
    const history = useHistory();

    //Comment Added
    const handleSubmit = (e) => {
        e.preventDefault();
        addUser({ itemFirstName, itemLastName, itemUserame, itemEmail, itemCompany, itemCreatedOn });
        history.push({
            pathname: '/ViewUsers/',
            search: '?query=abc',
            state: { alert: true }
        });
    };

    return (
        <div className="container-fluid">
            <div class="row">
                <div class="col-md-12">
                    <div class="card card-primary">
                        <div class="card-header">
                            <h3 class="card-title">Add User</h3>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="card-body">
                                <div className="form-group">
                                    <label for="exampleInputFirstName">First Name</label>
                                    <input type="text" className="form-control" id="exampleInputFirstName" placeholder="First Name" onChange={event => setItemFirstName(event.target.value)} value={itemFirstName} />
                                </div>
                                <div className="form-group">
                                    <label for="exampleInputLastName">Last Name</label>
                                    <input type="text" className="form-control" id="exampleInputLastName" placeholder="Last Name" onChange={event => setItemLastName(event.target.value)} value={itemLastName} />
                                </div>
                                <div className="form-group">
                                    <label for="exampleInputUsername">Username</label>
                                    <input type="text" className="form-control" id="exampleInputUsername" placeholder="Username" onChange={event => setItemUsername(event.target.value)} value={itemUserame} />
                                </div>
                                <div className="form-group">
                                    <label for="exampleInputEmail">Email</label>
                                    <input type="text" className="form-control" id="exampleInputEmail" placeholder="Email" onChange={event => setItemEmail(event.target.value)} value={itemEmail} />
                                </div>
                                <div className="form-group">
                                    <label for="exampleInputCompany">Company</label>
                                    <input type="text" className="form-control" id="exampleInputCompany" placeholder="Company" onChange={event => setItemCompany(event.target.value)} value={itemCompany} />
                                </div>
                                <div className="form-group">
                                    <label for="exampleInputCreatedOn">Created On</label>
                                    <input type="text" className="form-control" id="exampleInputCreatedOn" placeholder="Created On" onChange={event => setItemCreatedOn(event.target.value)} value={itemCreatedOn} />
                                </div>
                            </div>
                            <div className="card-footer">
                                <button type="submit" className="btn btn-primary">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default AddUser;