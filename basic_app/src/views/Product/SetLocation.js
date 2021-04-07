import React, { useEffect, useState } from 'react';
import { Link, Redirect, useHistory, useParams } from 'react-router-dom';
import { getProduct, updateProductSetLocation } from '../../services/products';
import { getLocations } from '../../services/locations'
import { getLoggedInUserId } from '../../Utils'

function SetLocation({ setAlert }) {
    const { id } = useParams();
    const history = useHistory();
    const [itemName, setItemName] = useState();
    const [itemDescription, setItemDescription] = useState();
    const [itemSKU, setItemSKU] = useState();
    const [locations, setLocations] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState([]);

    useEffect(() => {
        let mounted = true;
        getProduct(id)
            .then(items => {
                console.log(items);
                if (mounted) {
                    setItemName(items.Name);
                    setItemDescription(items.Description);
                    setItemSKU(items.SKU);
                    setSelectedLocation(items.ProductLocationId);
                }
            });

        let loggedInUserId = getLoggedInUserId();
        getLocations(loggedInUserId)
            .then(items => {
                if (mounted) {
                    setLocations(items)
                }
            });

    }, []);

    const handleChangeLocation = (e) => {
        let { name, value } = e.target;
        console.log('handleChangeLocation');
        //console.log(name);
        console.log(value);

        //let index = e.target.selectedIndex;
        //let el = e.target.childNodes[index]
        //let id = el.getAttribute('id');
        //console.log('Name, Code', e.target.value, option);

        setSelectedLocation(value)
        //this.setState({
        //    [name]: value,
        //});
    }

    const onSubmit = async e => {
        e.preventDefault();
        if (e.nativeEvent.submitter.name == "cancel") {
            history.push({
                pathname: '/ViewProducts/',
                search: '',
                state: { alert: true }
            });
            return;
        }

        console.log(selectedLocation);
        if (selectedLocation === 0) {
            alert("Please select location");
            return;
        }
        updateProductSetLocation(id, { selectedLocation });

        history.push("/ViewProducts");
    };

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-12">
                    <div className="card card-primary">
                        <div className="card-header">
                            <h3 class="card-title">Set Sensor Location</h3>
                        </div>
                        <form onSubmit={e => onSubmit(e)}>
                            <div className="card-body">
                                <div className="form-group">
                                    <label for="exampleInputName">Sensor Name</label>
                                    <input type="text" className="form-control" id="exampleInputId" type="hidden" value={id} />
                                    <input type="text" className="form-control" id="exampleInputName" placeholder="Enter Name" name="name" defaultValue={itemName} readOnly="true"
                                        onChange={event => setItemName(event.target.value)} />
                                </div>
                                <div className="form-group">
                                    <label for="exampleInputCode">Description</label>
                                    <input type="text" className="form-control" id="exampleInputCode" placeholder="Description" name="description" defaultValue={itemDescription} readOnly="true"
                                        onChange={event => setItemDescription(event.target.value)} />
                                </div>
                                <div className="form-group">
                                    <label for="exampleInputSKU">Hardware Serial No.</label>
                                    <input type="text" className="form-control" id="exampleInputSKU" placeholder="Hardware Serial Number" name="sku" defaultValue={itemSKU} readOnly="true"
                                        onChange={event => setItemSKU(event.target.value)} />
                                </div>
                                <div className="form-group">
                                    <label for="exampleInputSKU">Location</label>
                                    <select className="form-control select2" style={{ 'width': '100%' }}
                                        value={selectedLocation}
                                        onChange={handleChangeLocation} >
                                        <option value="0" >Select Location</option>
                                        {locations.map(loc => (<option value={loc.Id}>{loc.Name}</option>))}
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

export default SetLocation;