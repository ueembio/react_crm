import React, { useEffect, useState } from 'react';
import { Link, Redirect, useHistory, useParams } from 'react-router-dom';
import { getProduct, updateProductSetRule } from '../../services/products';
import ViewProducts from './ViewProducts';
import { convertCToF, convertFToC, getTemperatureUnit } from '../../Utils'

function SetRule({ setAlert }) {
    const { id } = useParams();
    const history = useHistory();
    const [itemName, setItemName] = useState();
    const [itemDescription, setItemDescription] = useState();
    const [itemSKU, setItemSKU] = useState();
    var [itemMinThreshold, setItemMinThreshold] = useState();
    var [itemMaxThreshold, setItemMaxThreshold] = useState();
    const [itemThresholdInterval, setItemThresholdInterval] = useState();
    const [itemThresholdSinceLastMessageReceivedInSeconds, setItemThresholdSinceLastMessageReceivedInSeconds] = useState();
    
    useEffect(() => {
        getProduct(id)
            .then(items => {
                setItemName(items.Name);
                setItemDescription(items.Description);
                setItemSKU(items.SKU);
                if (getTemperatureUnit() === 'F') {
                    setItemMinThreshold(convertCToF(items.MinThreshold));
                    setItemMaxThreshold(convertCToF(items.MaxThreshold));
                }
                else {
                    setItemMinThreshold(items.MinThreshold);
                    setItemMaxThreshold(items.MaxThreshold);
                }
                setItemThresholdInterval(items.MaxThresholdIntervalInSeconds);
                setItemThresholdSinceLastMessageReceivedInSeconds(items.ThresholdSinceLastMessageReceivedInSeconds);
            })
    }, []);

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

        if (!itemMinThreshold) {
            alert('please set minimum threshold value');
            return;
        }
        if (!itemMaxThreshold) {
            alert('please set maximum threshold value');
            return;
        }


        if (getTemperatureUnit() === 'F') {
            itemMinThreshold = convertFToC(itemMinThreshold);
            itemMaxThreshold = convertFToC(itemMaxThreshold);
        }
        updateProductSetRule(id, { itemMinThreshold, itemMaxThreshold, itemThresholdInterval, itemThresholdSinceLastMessageReceivedInSeconds });

        history.push("/ViewProducts");
    };

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-12">
                    <div className="card card-primary">
                        <div className="card-header">
                            <h3 class="card-title">Set Rule for Alert</h3>
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
                                    <label for="exampleInputSKU">Min Temperature Threshold (°{getTemperatureUnit()})</label>
                                    <input type="number" step="any" className="form-control" id="exampleInputMinThreshold" placeholder="Min Temperature Threshold" name="threshold" defaultValue={itemMinThreshold}
                                        onChange={event => setItemMinThreshold(event.target.value)} />
                                </div>
                                <div className="form-group">
                                    <label for="exampleInputSKU">Max Temperature Threshold (°{getTemperatureUnit()})</label>
                                    <input type="number" step="any" className="form-control" id="exampleInputMaxThreshold" placeholder="Max Temperature Threshold" name="threshold" defaultValue={itemMaxThreshold}
                                        onChange={event => setItemMaxThreshold(event.target.value)} />
                                </div>
                                <div className="form-group">
                                    <label for="exampleInputSKU">Max Threshold Interval (seconds)</label>
                                    <input type="number" className="form-control" id="exampleInputThresholdInterval" placeholder="Max Threshold Interval (seconds)" name="thresholdinterval" defaultValue={itemThresholdInterval}
                                        onChange={event => setItemThresholdInterval(event.target.value)} />
                                </div>
                                <div className="form-group">
                                    <label for="exampleInputSKU">Threshold Since Last Message Received (seconds)</label>
                                    <input type="number" className="form-control" id="exampleInputThresholdSinceInterval" placeholder="Threshold Since Last Message Received (seconds)" name="thresholdsinceinterval" defaultValue={itemThresholdSinceLastMessageReceivedInSeconds}
                                        onChange={event => setItemThresholdSinceLastMessageReceivedInSeconds(event.target.value)} />
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

export default SetRule;