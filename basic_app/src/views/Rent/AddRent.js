import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { getList } from '../../services/products';


function AddRent({ setAlert }) {
    const [company, setCompany] = useState([]);
    const [prroducts, setProduct] = useState([]);
    const history = useHistory();

    useEffect(() => {
        let mounted = true;
        getList()
            .then(items => {
                if (mounted) {
                    setProduct(items)
                }
            })
        return () => mounted = false;




    }, [])

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
                        <div class="card-header">
                            <h3 class="card-title">Rent Out Product</h3>
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