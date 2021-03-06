import React, { useEffect, useState } from 'react';
import { Link, Redirect, useHistory, useParams } from 'react-router-dom';
import { getProduct, updateList, updateProduct } from '../../services/products';
import ViewProducts from './ViewProducts';


function EditProduct({ setAlert }) {
    const { id } = useParams();
    const history = useHistory();
    const [itemName, setItemName] = useState();
    const [itemDescription, setItemDescription] = useState();
    const [itemSKU, setItemSKU] = useState();
    const [itemHeliumId, setItemHeliumId] = useState();
    
    useEffect(() => {
        getProduct(id)
            .then(items => {
                setItemName(items.Name);
                setItemDescription(items.Description);
                setItemSKU(items.SKU);
                setItemHeliumId(items.HeliumId);
            })
    }, []);

    const onSubmit = async e => {
        e.preventDefault();
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
        updateProduct(id, { itemName, itemDescription, itemSKU, itemHeliumId });
        history.push("/ViewProducts");
    };

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-12">
                    <div className="card card-primary">
                        <div className="card-header">
                            <h3 class="card-title">Edit Sensor Information</h3>
                        </div>
                        <form onSubmit={e => onSubmit(e)}>
                            <div className="card-body">
                                <div className="form-group">
                                    <label for="exampleInputName">Sensor Name</label>
                                    <input type="text" className="form-control" id="exampleInputId" type="hidden" value={id} />
                                    <input type="text" className="form-control" id="exampleInputName" placeholder="Enter Name" name="name" defaultValue={itemName}
                                        onChange={event => setItemName(event.target.value)} />
                                </div>
                                <div className="form-group">
                                    <label for="exampleInputCode">Description</label>
                                    <input type="text" className="form-control" id="exampleInputCode" placeholder="Description" name="description" defaultValue={itemDescription}
                                        onChange={event => setItemDescription(event.target.value)} />
                                </div>
                                <div className="form-group">
                                    <label for="exampleInputSKU">Hardware Serial No.</label>
                                    <input type="text" className="form-control" id="exampleInputSKU" placeholder="Hardware Serial Number" name="sku" defaultValue={itemSKU}
                                        onChange={event => setItemSKU(event.target.value)} />
                                </div>
                                <div className="form-group">
                                    <label for="exampleInputHeliumId">Helium Id</label>
                                    <input type="text" className="form-control" id="exampleInputHeliumId" placeholder="Helium Id" name="heliumid" defaultValue={itemHeliumId}
                                        onChange={event => setItemHeliumId(event.target.value)} />
                                </div>
                            </div>
                            <div className="card-footer">
                                <button type="submit" name="submit" className="btn btn-primary">Update</button>
                                <button type="submit" name="cancel" className="btn btn-info">Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default EditProduct;