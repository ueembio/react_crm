import React,{ useEffect, useState } from 'react';
import {Link,Redirect,useHistory} from 'react-router-dom';
import { setList } from '../../services/products';


function AddCompany({setAlert}) { 
    const [company, setCompany] = useState({
        name: "",
        number: "",
        address: "",
    });
    const onInputChange = e => {
        setCompany({ ...company, [e.target.name]: e.target.value });
    };

    const { name, number, address } = company;
    const history = useHistory();
   
    //Comment Added
    const handleSubmit = (e) => {
        console.log('hello');
        e.preventDefault();
        var product = {'id':1, 'name':name,'pnumber':number,'address':address}    
        setCompany({name,number,address});
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
                        <h3 class="card-title">Add Company</h3>
                    </div>                
                    <form onSubmit={handleSubmit}>
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

export default AddCompany;