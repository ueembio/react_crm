import React, { useEffect, useState } from 'react';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { addProduct, addUser } from '../../services/users';
import { getCompanies } from '../../services/company';
import ViewUsers from './ViewUsers';

function AddUser({ setAlert }) {
    const [company, setCompany] = useState([]);
    const [itemFirstName, setItemFirstName] = useState("");
    const [itemLastName, setItemLastName] = useState("");
    const [itemUserame, setItemUsername] = useState("");
    const [itemPassword, setItemPassword] = useState("");
    const [itemPhone, setItemPhone] = useState("");
    const [itemEmail, setItemEmail] = useState("");
    const [selectedCompany, setSelectedCompany] = useState(0);
    const [itemCreatedOn, setItemCreatedOn] = useState();
    const [itemTemperatureUnit, setItemTemperatureUnit] = useState("");
    const history = useHistory();

    useEffect(() => {
        let mounted = true;
        setItemTemperatureUnit("C");
        getCompanies()
            .then(items => {
                if (mounted) {
                    setCompany(items)
                }
            })
        return () => mounted = false;

    }, [])

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
    }

    const handleChangeTemperatureUnit = (e) => {
        console.log('handleChangeTemperatureUnit');
        let { name, value } = e.target;
        console.log(value);
        setItemTemperatureUnit(value);
    }

    //Comment Added
    const handleSubmit = (e) => {
        e.preventDefault();
        if (e.nativeEvent.submitter.name == "cancel") {
            history.push({
                pathname: '/ViewUsers/',
                search: '',
                state: { alert: true }
            });
            return;
        }

        //console.log(selectedCompany);
        if (!itemFirstName || !itemLastName || !itemUserame || !itemPassword || selectedCompany == 0) {
            alert('please provide all information.');
            return;
        }
        addUser({ itemFirstName, itemLastName, itemUserame, itemPassword, itemPhone, itemEmail, selectedCompany, itemCreatedOn, itemTemperatureUnit });
        history.push({
            pathname: '/ViewUsers/',
            search: '',
            state: { alert: true }
        });
    };

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-12">
                    <div className="card card-primary">
                        <div className="card-header">
                            <h3 className="card-title">Add User</h3>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="card-body">
                                <div className="form-group">
                                    <label for="exampleInputFirstName">First Name</label>
                                    <input type="text" className="form-control" id="exampleInputFirstName" placeholder="First Name" onChange={event => setItemFirstName(event.target.value)} value={itemFirstName} />
                                </div>
                                <div className="form-group">
                                    <label for="exampleInputLastName">Last Name</label>
                                    <input type="text" className="form-control" id="exampleInputLastName" placeholder="Last Name" onChange={event => setItemLastName(event.target.value)} value={itemLastName} />
                                </div>
                                <div className="form-group">
                                    <label for="exampleInputUsername">Username</label>
                                    <input type="text" className="form-control" id="exampleInputUsername" placeholder="Username" onChange={event => setItemUsername(event.target.value)} value={itemUserame} />
                                </div>
                                <div className="form-group">
                                    <label for="exampleInputEmail">Password</label>
                                    <input type="text" className="form-control" id="exampleInputPassword" placeholder="Password" type="password" onChange={event => setItemPassword(event.target.value)} value={itemPassword} />
                                </div>
                                <div className="form-group">
                                    <label for="exampleInputPhone">Phone</label>
                                    <input type="text" className="form-control" id="exampleInputPhone" placeholder="Phone" onChange={event => setItemPhone(event.target.value)} value={itemPhone} />
                                </div>
                                <div className="form-group">
                                    <label for="exampleInputEmail">Email</label>
                                    <input type="text" className="form-control" id="exampleInputEmail" placeholder="Email" onChange={event => setItemEmail(event.target.value)} value={itemEmail} />
                                </div>
                                <div className="form-group">
                                    <label>Company</label>
                                    <select className="form-control select2" style={{ 'width': '100%' }}
                                        onChange={handleChangeCompany}>
                                        <option value="0" >Select Company</option>
                                        {company.map(cmp => (<option id={cmp.Id}>{cmp.Name}</option>))}
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Temperature Unit</label>
                                    <select className="form-control select2" style={{ 'width': '100%' }}
                                        onChange={handleChangeTemperatureUnit}>
                                        <option value="C">Celsius</option>
                                        <option value="F">Fahrenheit</option>
                                    </select>
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

export default AddUser;