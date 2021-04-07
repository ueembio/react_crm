import React, { useEffect, useState } from 'react';
import { Link, Redirect, useHistory, useParams } from 'react-router-dom';
import { getUser, updateUser } from '../../services/users';
import { getCompanies } from '../../services/company';
import { getIsAdmin } from '../../Utils';
import ViewProducts from './ViewUsers';


function EditProduct({ setAlert }) {
    const { id } = useParams();
    const [company, setCompany] = useState([]);
    const [itemFirstName, setItemFirstName] = useState('');
    const [itemLastName, setItemLastName] = useState('');
    const [itemUserame, setItemUsername] = useState('');
    const [itemPassword, setItemPassword] = useState('');
    const [itemPhone, setItemPhone] = useState('');
    const [itemEmail, setItemEmail] = useState();
    const [itemCompany, setItemCompany] = useState('');
    const [itemTemperatureUnit, setItemTemperatureUnit] = useState('');
    var selectedCompanyId = "0";
    const history = useHistory();


    useEffect(() => {

        getCompanies()
            .then(items => {
                setCompany(items)
            });

        getUser(id)            
            .then(items => {
                //console.log(items);
                setItemFirstName(items.FirstName);
                setItemLastName(items.LastName);
                setItemUsername(items.Username);
                setItemPassword(items.Password);
                setItemPhone(items.Phone);
                setItemEmail(items.Email);
                setItemCompany(items.CompanyId);
                setItemTemperatureUnit(items.TemperatureUnit);
                selectedCompanyId = items.CompanyId;
                console.log(items.CompanyId);
                console.log(itemCompany);
                console.log(selectedCompanyId);
            });

    }, []);

    const handleChangeCompany = (e) => {
        let { name, value } = e.target;
        console.log('handleChangeCompany');
        //console.log(name);
        console.log(value);

        //let index = e.target.selectedIndex;
        //let el = e.target.childNodes[index]
        //let id = el.getAttribute('id');
        //console.log('Name, Value', e.target.value, id);

        setItemCompany(value)
    }

    const handleChangeTemperatureUnit = (e) => {
        console.log('handleChangeTemperatureUnit');
        let { name, value } = e.target;
        console.log(value);
        setItemTemperatureUnit(value);
    }

    const onSubmit = async e => {
        e.preventDefault();
        if (e.nativeEvent.submitter.name == "cancel") {
            history.push({
                pathname: '/ViewUsers/',
                search: '',
                state: { alert: true }
            });
            return;
        }

        if (!itemFirstName || !itemLastName || !itemUserame || !itemPassword) {
            alert('please provide all information.');
            return;
        }
        updateUser(id, { itemFirstName, itemLastName, itemPassword, itemPhone, itemEmail, itemCompany, itemTemperatureUnit });
        //alert(itemTemperatureUnit);
        sessionStorage.setItem('temperatureUnit', itemTemperatureUnit);
        history.push("/ViewUsers");
    };

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-12">
                    <div className="card card-primary">
                        <div className="card-header">
                            <h3 className="card-title">Edit Device Information</h3>
                        </div>
                        <form onSubmit={e => onSubmit(e)}>
                            <div className="card-body">
                                <div className="form-group">
                                    <label for="exampleInputName">First Name</label>
                                    <input type="text" className="form-control" id="exampleInputId" type="hidden" value={id} />
                                    <input type="text" className="form-control" id="exampleInputName" placeholder="First Name" name="firstname" defaultValue={itemFirstName}
                                        onChange={event => setItemFirstName(event.target.value)} />
                                </div>
                                <div className="form-group">
                                    <label for="exampleInputCode">Last Name</label>
                                    <input type="text" className="form-control" id="exampleInputCode" placeholder="Last Name" name="lastname" defaultValue={itemLastName}
                                        onChange={event => setItemLastName(event.target.value)} />
                                </div>
                                <div className="form-group">
                                    <label for="exampleInputUsername">Username</label>
                                    <input type="text" className="form-control" id="exampleInputUsername" readOnly placeholder="Username" 
                                        name="username" defaultValue={itemUserame} />
                                </div>
                                <div className="form-group">
                                    <label for="exampleInputPassword">Password</label>
                                    <input type="text" className="form-control" id="exampleInputPassword" placeholder="Password" type="password" 
                                        onChange={event => setItemPassword(event.target.value)} defaultValue={itemPassword} />
                                </div>
                                <div className="form-group">
                                    <label for="exampleInputPhone">Phone</label>
                                    <input type="text" className="form-control" id="exampleInputPhone" placeholder="Phone" 
                                        onChange={event => setItemPhone(event.target.value)} defaultValue={itemPhone} />
                                </div>
                                <div className="form-group">
                                    <label for="exampleInputEmail">Email</label>
                                    <input type="text" className="form-control" id="exampleInputEmail" placeholder="Email" 
                                        onChange={event => setItemEmail(event.target.value)} defaultValue={itemEmail} />
                                </div>
                                <div className="form-group" style={{ 'display': getIsAdmin() ? 'block' : 'none' }}>
                                    <label>Company</label>
                                    <select className="form-control select2" style={{ 'width': '100%' }} 
                                        value={itemCompany}
                                        onChange={handleChangeCompany}>
                                        <option value="0" >Select Company</option>
                                        {company.map(cmp => (<option value={cmp.Id}>{cmp.Name}</option>))}
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Temperature Unit</label>
                                    <select className="form-control select2" style={{ 'width': '100%' }} 
                                        value={itemTemperatureUnit}
                                        onChange={handleChangeTemperatureUnit}>
                                        <option value="C">Celsius</option>
                                        <option value="F">Fahrenheit</option>
                                    </select>
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