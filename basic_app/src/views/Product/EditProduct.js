import React,{ useEffect, useState } from 'react';
import {Link,Redirect,useHistory,useParams} from 'react-router-dom';
import { getProduct,updateList} from '../../services/products';
import ViewProducts from './ViewProducts';


function EditProduct({setAlert}) { 
    const { id } = useParams();
        const [user, setUser] = useState({
            name: "",
            pnumber: "",
        });

        const { name, pnumber } = user;
        const onInputChange = e => {
            setUser({ ...user, [e.target.name]: e.target.value });
        };

        useEffect(() => {
            getProduct(id)
                .then(items => {   
                    console.log(items);             
                    setUser(items)              
        })
        }, []);

        return (
        <div className="container-fluid">            
            <div class="row">
                <div class="col-md-12">
                    <div class="card card-primary">
                    <div class="card-header">
                        <h3 class="card-title">Add Product</h3>
                    </div>                
                    <form >
                        <div className="card-body">
                        <div className="form-group">
                            <label for="exampleInputName">Product Name</label>
                            <input type="text" className="form-control" id="exampleInputName" type="hidden" value={id} />
                            <input type="text" className="form-control" id="exampleInputName" placeholder="Enter Name"  name="name"
                            value={name}
                            onChange={e => onInputChange(e)} />
                        </div>
                        <div className="form-group">
                            <label for="exampleInputCode">Code</label>
                            <input type="text" className="form-control" id="exampleInputCode" placeholder="Product Code"  
                            name="pnumber"
                            value={pnumber}
                            onChange={e => onInputChange(e)}
                            />
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