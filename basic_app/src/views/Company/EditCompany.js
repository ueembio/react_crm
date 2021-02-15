import React, { useEffect, useState } from 'react';
import { Link, Redirect, useHistory, useParams } from 'react-router-dom';
import { getCompany, updateCompany } from '../../services/company';
import ViewCompany from './ViewCompany';

function EditCompany({ setAlert }) {
    const { id } = useParams();
    const history = useHistory();
    const [itemName, setItemName] = useState();
    const [itemNumber, setItemNumber] = useState();
    const [itemAddress, setItemAddress] = useState();

    useEffect(() => {
        getCompany(id)
            .then(items => {
                setItemName(items.Name);
                setItemNumber(items.Phone);
                setItemAddress(items.Address);
            })
    }, []);

    const onSubmit = async e => {
        e.preventDefault();
        updateCompany(id, { itemName, itemNumber, itemAddress });
        history.push("/ViewCompany");
    };

    return (
        <div className="container-fluid">
            <div class="row">
                <div class="col-md-12">
                    <div class="card card-primary">
                        <div class="card-header">
                            <h3 class="card-title">Edit Company Information</h3>
                        </div>
                        <form onSubmit={onSubmit}>
                            <div className="card-body">
                                <div className="form-group">
                                    <label for="exampleInputName"> Name</label>
                                    <input type="text" className="form-control" id="exampleInputName" placeholder="Enter Name" name="name" defaultValue={itemName}
                                        onChange={event => setItemName(event.target.value)} />
                                </div>
                                <div className="form-group">
                                    <label for="exampleInputCode">Phone</label>
                                    <input type="text" className="form-control" id="exampleInputCode" placeholder="Enter Phone Number" name="number" defaultValue={itemNumber}
                                        onChange={event => setItemNumber(event.target.value)} />
                                </div>
                                <div className="form-group">
                                    <label for="exampleInputCode">Address</label>
                                    <input type="text" className="form-control" id="exampleInputCode" placeholder="Enter Address"
                                        name="address"
                                        defaultValue={itemAddress}
                                        onChange={event => setItemAddress(event.target.value)}
                                    />
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

export default EditCompany;