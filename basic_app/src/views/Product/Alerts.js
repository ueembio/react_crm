import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { formatDateTime } from "../../Utils"
import { getProduct, getProductAlertsByDate, updateAlertSetMarkAsRead } from '../../services/products';
import DatePicker from "react-datepicker";
import DataTable from 'react-data-table-component';

import "react-datepicker/dist/react-datepicker.css";


function Alerts({ setAlert }) {

    const columns = [
        {
            name: 'Alert Message',
            selector: 'Message',
            sortable: true,
            width: '550px'
        },
        {
            name: 'Alert Time',
            sortable: true,
            selector: 'DT',
            cell: row => <div>{formatDateTime(row.DT)}</div>,
            width: '200px'
        },
        {
            name: 'Read Status',
            selector: 'ActionTaken',
            sortable: true,
            cell: row => {
                if (!row.ActionTaken)
                    return <div>Unread</div>
                return <div>Read</div>
            },
            width: '150px'
        },
        {
            name: 'Alert Read On',
            selector: 'ActionTakenOn',
            sortable: true,
            cell: row => <div>{formatDateTime(row.ActionTakenOn)}</div>,
            width: '200px'
        },
        {
            name: 'Action',
            selector: 'Action',
            sortable: true,
            cell: row => {
                if (!row.ActionTaken)
                    return <div><button class="btn btn-sm btn-primary" onClick={markAsRead} id={row.Id}>Action</button></div>
                return <div></div>
            }
        }
    ];

    const conditionalRowStyles = [
        {
            when: row => row.ActionTaken == 0,
            style: {
                backgroundColor: 'orange',
                color: 'white',
                '&:hover': {
                    cursor: 'pointer',
                },
            },
        }
    ];

    var date = new Date();
    date.setDate(date.getDate() - 7);

    const { id } = useParams();
    const [products, setList] = useState([]);
    const [title, setTitle] = useState('');
    const [startDate, setStartDate] = useState(date);
    const [endDate, setEndDate] = useState(new Date());

    useEffect(() => {
        getProduct(id)
            .then(items => {
                console.log('getProduct returned');
                setTitle('Sensor Name: ' + items.Name + ', Hardware Serial #: ' + items.SKU);

                getProductAlertsByDate(id, formatDateTime(startDate), formatDateTime(endDate))
                    .then(items => {
                        console.log('getProductAlertsByDate returned');
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

    const markAsRead = (e) => {
        console.log(e.target.id);
        if (e.target.id) {
            updateAlertSetMarkAsRead(e.target.id);
            getProductAlertsByDate(id, formatDateTime(startDate), formatDateTime(endDate))
                .then(items => {
                    console.log('getProductAlertsByDate returned');
                    setList(items);
                });
        }
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
                        paginationPerPage={10}
                        paginationRowsPerPageOptions={[10]}
                        pagination
                        conditionalRowStyles={conditionalRowStyles}>
                    </DataTable>
                </div>

            </div>
        </div >
    )
};

export default Alerts;

