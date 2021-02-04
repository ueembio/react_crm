import React,{ useEffect, useState } from 'react';
import {Link,Redirect,useHistory} from 'react-router-dom';
import { setList } from '../../services/products';
import ViewProducts from './ViewProducts';

function AddProduct({setAlert}) { 
    const [itemName, setItemName] = useState();
    const [itemCode, setItemCode] = useState();
    const history = useHistory();
    

    

    //Comment Added
    const handleSubmit = (e) => {
        console.log('hello');
        e.preventDefault();
        var product = {'id':1, 'name':itemName,'pnumber':itemCode}    
        setList({itemName,itemCode});
        history.push({
           pathname: '/ViewProducts/',
           search: '?query=abc',
           state:{alert:true}
        });                  
      };
    
      return (
        <div className="container-fluid">            
            <div class="row">
                <div class="col-md-12">
                    <div class="card card-primary">
                    <div class="card-header">
                        <h3 class="card-title">Add Product</h3>
                    </div>                
                    <form onSubmit={handleSubmit}>
                        <div className="card-body">
                        <div className="form-group">
                            <label for="exampleInputName">Product Name</label>
                            <input type="text" className="form-control" id="exampleInputName" placeholder="Enter Name" onChange={event => setItemName(event.target.value)} value={itemName} />
                        </div>
                        <div className="form-group">
                            <label for="exampleInputCode">Code</label>
                            <input type="text" className="form-control" id="exampleInputCode" placeholder="Product Code" onChange={event => setItemCode(event.target.value)} value={itemCode} />
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