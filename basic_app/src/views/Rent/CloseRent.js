import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import DatePicker from "react-datepicker";
import { formatDate } from "../../Utils"
import { getRent, updateRent } from '../../services/rent';

import "react-datepicker/dist/react-datepicker.css";


function CloseRent({ setAlert }) {

    let { id } = useParams();
    const [rent, setRent] = useState([]);
    const [returnDT, setReturnDT] = useState(new Date());

    const history = useHistory();

    useEffect(() => {
        let mounted = true;
        getRent(id)
            .then(items => {
                if (mounted) {
                    setRent(items);
                    console.log(rent);
                }
            })
        return () => mounted = false;

    }, [])


    const handleSubmit = (e) => {
        e.preventDefault();

        let dt = formatDate(returnDT)
        console.log(dt);

        updateRent(id, { dt });
        history.push({
            pathname: '/rent/index',
            //search: '?query=abc',
            state: { alert: true }
        });
    };

    return (
        <div className="container-fluid">
            <div class="row">
                <div class="col-md-12">
                    <div class="card card-primary">
                        <div class="card-header">
                            <h3 class="card-title">Close Lease (Return Sensor)</h3>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="card-body">
                                <div className="form-group">
                                    <label>Sensor Name</label>
                                    <input type="text" readOnly="true" className="form-control" value={rent.Product} />
                                </div>

                                <div className="form-group">
                                    <label>Leased To</label>
                                    <input type="text" readOnly="true" className="form-control" value={rent.Company} />
                                </div>

                                <div className="form-group">
                                    <label>Lease Date</label>
                                    <input type="text" readOnly="true" className="form-control" value={formatDate(rent.RentDT)} />
                                </div>

                                <div className="form-group">
                                    <label>Return Date</label>
                                    <DatePicker className="form-control" selected={returnDT} onChange={date => setReturnDT(date)} />
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

export default CloseRent;