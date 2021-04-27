import React, { useEffect, useState } from 'react';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { addProduct } from '../../services/products';
import ViewProducts from './ViewProducts';

function AddProduct({ setAlert }) {
    const [itemName, setItemName] = useState("");
    const [itemDescription, setItemDescription] = useState("");
    const [itemSKU, setItemSKU] = useState("");
    const [itemHeliumId, setItemHeliumId] = useState("");
    const history = useHistory();

    //Comment Added
    const handleSubmit = (e) => {
        e.preventDefault();
        //console.log(e.nativeEvent.submitter.name);
        if (e.nativeEvent.submitter.name == "cancel") {
            history.push({
                pathname: '/ViewProducts/',
                search: '',
                state: { alert: true }
            });
            return;
        }

        if (!itemName) {
            alert('please enter name');
            return;
        }
        addProduct({ itemName, itemDescription, itemSKU, itemHeliumId });
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
                            <h3 class="card-title">Add Sensor</h3>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="card-body">
                                <div className="form-group">
                                    <label for="exampleInputName">Sensor Name</label>
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
                                <div className="form-group">
                                    <label for="exampleInputHeliumId">Helium Id</label>
                                    <input type="text" className="form-control" id="exampleInputHeliumId" placeholder="Helium Id" onChange={event => setItemHeliumId(event.target.value)} value={itemHeliumId} />
                                </div>
                            </div>
                            <div className="card-footer">
                                <button type="submit" name="submit" className="btn btn-primary">Submit</button>
                                <button type="submit" name="cancel" className="btn btn-info">Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default AddProduct;