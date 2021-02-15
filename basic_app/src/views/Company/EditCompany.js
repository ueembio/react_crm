import React,{ useEffect, useState } from 'react';
import {Link,Redirect,useHistory,useParams} from 'react-router-dom';
import { getCompany,updateCompany} from '../../services/company';

function EditCompany({setAlert}) { 
    const { id } = useParams();
    const history = useHistory();
    const [company, setCompany] = useState({
        name: "",
        number: "",
        address: "",
    });

    const { name, number, address } = company;
    const onInputChange = e => {
        setCompany({ ...company, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        getCompany(id)
            .then(items => {   
                console.log(items);             
                setCompany(items)              
    })
    }, []);

    const onSubmit = async e => {
        e.preventDefault();
        updateCompany(id,company);            
        history.push("/ViewProducts");
        };    

        return (
        <div className="container-fluid">            
            <div class="row">
                <div class="col-md-12">
                    <div class="card card-primary">
                    <div class="card-header">
                        <h3 class="card-title">Add Product</h3>
                    </div>                
                    <form onSubmit={onSubmit}>
                        <div className="card-body">
                        <div className="form-group">
                            <label for="exampleInputName"> Name</label>
                            <input type="text" className="form-control" id="exampleInputName" placeholder="Enter Name" 
                            name="name"
                            value={name}
                            onChange={e => onInputChange(e)}
                            />
                        </div>
                        <div className="form-group">
                            <label for="exampleInputCode">Address</label>
                            <input type="text" className="form-control" id="exampleInputCode" placeholder="Enter Address" 
                            name="address"
                            value={address}
                            onChange={e => onInputChange(e)} 
                            />
                        </div>
                        <div className="form-group">
                            <label for="exampleInputCode">Contact #</label>
                            <input type="text" className="form-control" id="exampleInputCode" placeholder="Enter Address" 
                            name="number"
                            value={number}
                            onChange={e => onInputChange(e)} 
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