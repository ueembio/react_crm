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
    
    useEffect(() => {
        getProduct(id)
            .then(items => {
                setItemName(items.Name);
                setItemDescription(items.Description);
                setItemSKU(items.SKU);
            })
    }, []);

    const onSubmit = async e => {
        e.preventDefault();
        updateProduct(id, { itemName, itemDescription, itemSKU });
        history.push("/ViewProducts");
    };

    return (
        <div className="container-fluid">
            <div class="row">
                <div class="col-md-12">
                    <div class="card card-primary">
                        <div class="card-header">
                            <h3 class="card-title">Edit Product</h3>
                        </div>
                        <form onSubmit={e => onSubmit(e)}>
                            <div className="card-body">
                                <div className="form-group">
                                    <label for="exampleInputName">Product Name</label>
                                    <input type="text" className="form-control" id="exampleInputId" type="hidden" value={id} />
                                    <input type="text" className="form-control" id="exampleInputName" placeholder="Product Name" name="name" defaultValue={itemName}
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
                            </div>
                            <div className="card-footer">
                                <button type="submit" className="btn btn-primary">Update</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default EditProduct;