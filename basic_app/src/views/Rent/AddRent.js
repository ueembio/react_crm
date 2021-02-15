<<<<<<< HEAD
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
=======
import React,{ useEffect, useState } from 'react';
import {useHistory} from 'react-router-dom';
import { getCompanies } from '../../services/company';
>>>>>>> 2de75c196f4fe73655d7051b735a07642f2999f4
import { getList } from '../../services/products';


function AddRent({ setAlert }) {
    const [company, setCompany] = useState([]);
    const [prroducts, setProduct] = useState([]);
    const history = useHistory();

    useEffect(() => {
        let mounted = true;
        getList()
<<<<<<< HEAD
            .then(items => {
                if (mounted) {
                    setProduct(items)
                }
            })
        return () => mounted = false;




    }, [])

=======
          .then(items => {
            if (mounted) {
                setProduct(items)
            }
          })
        getCompanies()
          .then(items => {
            if (mounted) {
                setCompany(items)
            }
          })  
        return () => mounted = false;
        
      }, [])
   
>>>>>>> 2de75c196f4fe73655d7051b735a07642f2999f4
    //Comment Added
    const handleSubmit = (e) => {
        console.log('hello');
        e.preventDefault();
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
<<<<<<< HEAD
                        <div class="card-header">
                            <h3 class="card-title">Rent Out Product</h3>
=======
                    <div class="card-header">
                        <h3 class="card-title">Rent Out Product</h3>
                    </div>                
                    <form onSubmit={handleSubmit}>
                        <div className="card-body">
                        <div className="form-group">
                        <label>Product</label>
                            <select className="form-control select2" style={{'width':'100%'}}>
                                {prroducts.map(product => (<option id={product.Id}>{product.Name}</option>))}
                            </select>
                        </div>

                        <div className="form-group">
                        <label>Company</label>
                            <select className="form-control select2" style={{'width':'100%'}}>
                                {company.map(cmp => (<option id={cmp.Id}>{cmp.Name}</option>))}
                            </select>
>>>>>>> 2de75c196f4fe73655d7051b735a07642f2999f4
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="card-body">
                                <div className="form-group">
                                    <label>Product</label>
                                    <select className="form-control select2" style={{ 'width': '100%' }}>
                                        {prroducts.map(product => (<option>{product.Name}</option>))}
                                    </select>
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

export default AddRent;