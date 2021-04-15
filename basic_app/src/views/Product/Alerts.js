import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { formatDateTime, getTemperatureUnit, convertCToF } from "../../Utils"
import { getProduct, getProductAlertsByDate } from '../../services/products';
import DatePicker from "react-datepicker";
import DataTable from 'react-data-table-component';

import "react-datepicker/dist/react-datepicker.css";


const columns = [
    {
        name: 'Name',
        selector: 'Name',
        sortable: true,
    },
    {
        name: 'Hardware Serial',
        selector: 'hardware_serial',
        sortable: true
    },
    {
        name: 'Temperature (°' + getTemperatureUnit() + ')',
        selector: 'temperature',
        sortable: true,
        right: true,
        cell: row => {
            if (getTemperatureUnit() === 'F')
                return <div>{convertCToF(row.temperature)}</div>
            return <div>{row.temperature}</div>
        }
    },
    {
        name: 'Data Received On',
        sortable: true,
        selector: 'dt',
        cell: row => <div>{formatDateTime(row.dt)}</div>,
    }
];


function Alerts({ setAlert }) {

    var date = new Date();
    date.setDate(date.getDate() - 7);

    const { id } = useParams();
    const [products, setList] = useState([]);
    const [title, setTitle] = useState('');
    const [startDate, setStartDate] = useState(date);
    const [endDate, setEndDate] = useState(new Date());
    const [showing, setShowing] = useState(true);
    
    useEffect(() => {
        getProduct(id)
            .then(items => {
                console.log('getProduct returned');
                setTitle('Sensor Name: ' + items.Name + ', Hardware Serial #: ' + items.SKU);

                getProductAlertsByDate(id, formatDateTime(startDate), formatDateTime(endDate))
                    .then(items => {
                        console.log('getProductAlertsByDate returned');
                        console.log(items);
                        setList(items);
                    });
            });

    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        getProduct(id)
            .then(items => {
                setTitle('Sensor Name: ' + items.Name + ', Hardware Serial #: ' + items.SKU);
                setEndDate(new Date());
                getProductAlertsByDate(id, formatDateTime(startDate), formatDateTime(endDate))
                    .then(items => {
                        setList(items);
                    });
            });
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-12">
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label>Start</label>
                            <DatePicker className="form-control" selected={startDate}
                                onChange={date => setStartDate(date)}
                                showTimeSelect />
                        </div>
                        <div>
                            <label>End</label>
                            <DatePicker className="form-control" selected={endDate}
                                onChange={date => setEndDate(date)}
                                showTimeSelect />
                        </div>

                        <div>
                            <button type="submit" className="btn btn-primary">Update</button>
                            {/*<button type="button" className="btn btn-success" onClick={handleSelect}>Toggle Graph</button>*/}
                        </div>


                    </form>
                </div>

                <div className="col-md-12">
                    <div id="status">
                    </div>
                </div>


                <div className="col-md-12">
                    <DataTable
                        title={title}
                        columns={columns}
                        data={products}
                        paginationPerPage={5}
                        paginationRowsPerPageOptions={[5]}
                        pagination>
                    </DataTable>
                </div>

            </div>
        </div >
    )
};

export default Alerts;

