import React, { useEffect, useState } from 'react';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { addLocation } from '../../services/locations';
import { getLoggedInUserId } from '../../Utils';

function AddLocation({ setAlert }) {
    const [itemName, setItemName] = useState("");
    const [itemUserId, setItemUserId] = useState("");
    const history = useHistory();

    useEffect(() => {
        setItemUserId(getLoggedInUserId());
        //console.log(itemUserId);
    }, []);
    
    //Comment Added
    const handleSubmit = (e) => {
        e.preventDefault();
        //console.log(e.nativeEvent.submitter.name);
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
        addLocation({ itemName, itemUserId });
        history.push({
            pathname: '/ViewLocations/',
            search: '',
            state: { alert: true }
        });
    };

    return (
        <div className="container-fluid">
            <div class="row">
                <div class="col-md-12">
                    <div class="card card-primary">
                        <div class="card-header">
                            <h3 class="card-title">Add Location</h3>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="card-body">
                                <div className="form-group">
                                    <label for="exampleInputName">Name</label>
                                    <input type="text" className="form-control" id="exampleInputName" placeholder="Enter Name" onChange={event => setItemName(event.target.value)} value={itemName} />
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

export default AddLocation;