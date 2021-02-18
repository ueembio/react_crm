import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { getCompanies } from '../../services/company';
import { getAvailableProducts } from '../../services/products';
import { addRent } from '../../services/rent';

function AddRent({ setAlert }) {
    const [company, setCompany] = useState([]);
    const [product, setProduct] = useState([]);
    const [selectedCompany, setSelectedCompany] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState([]);

    const history = useHistory();

    useEffect(() => {
        let mounted = true;
        getAvailableProducts()
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

    const handleChangeDevice = (e) => {
        let { name, value } = e.target;
        console.log('handleChangeDevice');
        //console.log(name);
        //console.log(value);

        let index = e.target.selectedIndex;
        let el = e.target.childNodes[index]
        let id = el.getAttribute('id');
        //console.log('Name, Code', e.target.value, option);

        setSelectedProduct(id)
        //this.setState({
        //    [name]: value,
        //});
    }

    const handleChangeCompany = (e) => {
        let { name, value } = e.target;
        console.log('handleChangeCompany');
        //console.log(name);
        //console.log(value);

        let index = e.target.selectedIndex;
        let el = e.target.childNodes[index]
        let id = el.getAttribute('id');
        //console.log('Name, Code', e.target.value, option);

        setSelectedCompany(id)

        //this.setState({
        //    [name]: value,
        //});
    }

    //Comment Added
    const handleSubmit = (e) => {
        e.preventDefault();

        console.log(selectedCompany);
        console.log(selectedProduct);
        if (selectedCompany.length == 0 || selectedProduct.length == 0) {
            alert("Please select all fields")
            return;
        }
        addRent({ selectedCompany, selectedProduct });
        history.push({
            pathname: '/ViewRents/',
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
                            <h3 class="card-title">New Lease</h3>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="card-body">
                                <div className="form-group">
                                    <label>Device</label>
                                    <select className="form-control select2" style={{ 'width': '100%' }}
                                        onChange={handleChangeDevice} >
                                        <option value="0" >Select Device</option>
                                        {product.map(product => (<option id={product.Id}>{product.Name}</option>))}
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label>Company</label>
                                    <select className="form-control select2" style={{ 'width': '100%' }}
                                        onChange={handleChangeCompany}>
                                        <option value="0" >Select Company</option>
                                        {company.map(cmp => (<option id={cmp.Id}>{cmp.Name}</option>))}
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