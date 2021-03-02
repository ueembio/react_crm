import React, { useEffect, useState } from 'react';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { addProduct } from '../../services/products';
import ViewProducts from './ViewProducts';

function AddProduct({ setAlert }) {
    const [itemName, setItemName] = useState("");
    const [itemDescription, setItemDescription] = useState("");
    const [itemSKU, setItemSKU] = useState("");
    const history = useHistory();

    //Comment Added
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!itemName) {
            alert('please enter name');
            return;
        }
        addProduct({ itemName, itemDescription, itemSKU });
        history.push({
            pathname: '/ViewProducts/',
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
                            <h3 class="card-title">Add Device</h3>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="card-body">
                                <div className="form-group">
                                    <label for="exampleInputName">Device Name</label>
                                    <input type="text" className="form-control" id="exampleInputName" placeholder="Enter Name" onChange={event => setItemName(event.target.value)} value={itemName} />
                                </div>
                                <div className="form-group">
                                    <label for="exampleInputCode">Description</label>
                                    <input type="text" className="form-control" id="exampleInputCode" placeholder="Description" onChange={event => setItemDescription(event.target.value)} value={itemDescription} />
                                </div>
                                <div className="form-group">
                                    <label for="exampleInputSKU">Hardware Serial No.</label>
                                    <input type="text" className="form-control" id="exampleInputSKU" placeholder="Hardware Serial Number" onChange={event => setItemSKU(event.target.value)} value={itemSKU} />
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

export default AddProduct;