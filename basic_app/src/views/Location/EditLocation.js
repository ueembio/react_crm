import React, { useEffect, useState } from 'react';
import { Link, Redirect, useHistory, useParams } from 'react-router-dom';
import { getLocation, updateLocation } from '../../services/locations';
import { getLoggedInUserId } from '../../Utils';

function EditLocation({ setAlert }) {
    const { id } = useParams();
    const history = useHistory();
    const [itemName, setItemName] = useState();
    const [itemUserId, setItemUserId] = useState("");

    useEffect(() => {
        getLocation(id)
            .then(items => {
                setItemName(items.Name);
                setItemUserId(items.UserId);
            })
    }, []);

    const onSubmit = async e => {
        e.preventDefault();
        if (e.nativeEvent.submitter.name == "cancel") {
            history.push({
                pathname: '/ViewLocations/',
                search: '',
                state: { alert: true }
            });
            return;
        }

        if (!itemName) {
            alert('please enter location name');
            return;
        }
        updateLocation(id, { itemName });
        history.push("/ViewLocations");
    };

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-12">
                    <div className="card card-primary">
                        <div className="card-header">
                            <h3 class="card-title">Edit Location</h3>
                        </div>
                        <form onSubmit={e => onSubmit(e)}>
                            <div className="card-body">
                                <div className="form-group">
                                    <label for="exampleInputName">Name</label>
                                    <input type="text" className="form-control" id="exampleInputId" type="hidden" value={id} />
                                    <input type="text" className="form-control" id="exampleInputName" placeholder="Enter Name" name="name" defaultValue={itemName}
                                        onChange={event => setItemName(event.target.value)} />
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

export default EditLocation;