import React, { useEffect, useState } from 'react';
import { Link, Redirect, useHistory, useParams } from 'react-router-dom';
import { getUser, updateUser } from '../../services/users';
import { getCompanies } from '../../services/company';
import ViewProducts from './ViewUsers';


function EditProduct({ setAlert }) {
    const { id } = useParams();
    const [company, setCompany] = useState([]);
    const [itemFirstName, setItemFirstName] = useState();
    const [itemLastName, setItemLastName] = useState();
    const [itemUserame, setItemUsername] = useState();
    const [itemPassword, setItemPassword] = useState();
    const [itemEmail, setItemEmail] = useState();
    const [selectedCompany, setSelectedCompany] = useState([]);
    const history = useHistory();

    useEffect(() => {

        getCompanies()
            .then(items => {
                setCompany(items)
            })

        getUser(id)            
            .then(items => {                
                setItemFirstName(items.FirstName);
                setItemLastName(items.LastName);
                setItemUsername(items.Username);
                setItemPassword(items.itemPassword);
                setItemEmail(items.Email);
                setSelectedCompany(items.CompanyId);
            })
    }, []);

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

    const onSubmit = async e => {
        e.preventDefault();
        updateUser(id, { itemFirstName, itemLastName, itemPassword, itemEmail, selectedCompany });
        history.push("/ViewUsers");
    };

    return (
        <div className="container-fluid">
            <div class="row">
                <div class="col-md-12">
                    <div class="card card-primary">
                        <div class="card-header">
                            <h3 class="card-title">Edit Device Information</h3>
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
                                    <input type="text" className="form-control" id="exampleInputUsername" readOnly placeholder="Username" name="username" defaultValue={itemUserame} />
                                </div>
                                <div className="form-group">
                                    <label for="exampleInputPassword">Password</label>
                                    <input type="text" className="form-control" id="exampleInputPassword" placeholder="Password" type="password" onChange={event => setItemPassword(event.target.value)} defaultValue={itemPassword} />
                                </div>
                                <div className="form-group">
                                    <label for="exampleInputEmail">Email</label>
                                    <input type="text" className="form-control" id="exampleInputEmail" placeholder="Email" onChange={event => setItemEmail(event.target.value)} defaultValue={itemEmail} />
                                </div>
                                <div className="form-group">
                                    <label>Company</label>
                                    <select className="form-control select2" style={{ 'width': '100%' }} defaultValue={selectedCompany}
                                        onChange={handleChangeCompany}>
                                        <option value="0" >Select Company</option>
                                        {company.map(cmp => (<option id={cmp.Id}>{cmp.Name}</option>))}
                                    </select>
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