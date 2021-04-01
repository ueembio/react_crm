import React, { useEffect, useState } from 'react';
import { Link, Redirect, useHistory, useParams } from 'react-router-dom';
import { formatDateTime, getTemperatureUnit, convertCToF } from "../../Utils"
import { getProduct, getProductData, getProductDataByDate } from '../../services/products';
import DatePicker from "react-datepicker";
import DataTable from 'react-data-table-component';
import { Line, Bar } from 'react-chartjs-2';
import Chart from 'chart.js';
import moment from 'moment'
import $ from 'jquery';

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


function Data({ setAlert }) {

    var date = new Date();
    date.setDate(date.getDate() - 7);

    const { id } = useParams();
    const [products, setList] = useState([]);
    const [title, setTitle] = useState('');
    const [startDate, setStartDate] = useState(date);
    const [endDate, setEndDate] = useState(new Date());
    const [showing, setShowing] = useState(true);
    var chartData = [];
    var chartDataAverage = [];
    var chartTimeseriesData = [];

    useEffect(() => {
        getProduct(id)
            .then(items => {

                if (items) {
                    setTitle('Device Name: ' + items.Name + ', Hardware Serial #: ' + items.SKU);
                }

                getProductDataByDate(id, formatDateTime(startDate), formatDateTime(endDate))
                    .then(items => {
                        console.log('getProductData returned');
                        setList(items);
                        loadChartData();
                        handleLoad(chartData, chartDataAverage, chartTimeseriesData, id, startDate, endDate);
                    });
            });
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        getProduct(id)
            .then(items => {
                if (items) {
                    setTitle('Device Name: ' + items.Name + ', Hardware Serial #: ' + items.SKU);
                }
                getProductDataByDate(id, formatDateTime(startDate), formatDateTime(endDate))
                    .then(items => {
                        setList(items);
                        loadChartData();
                        handleLoad(chartData, chartDataAverage, chartTimeseriesData, id, startDate, endDate);
                    });
            });
    }

    function handleSelect(e) {
        loadChartData();
        if (showing)
            setShowing(false);
        else
            setShowing(true);
    };

    function loadChartData() {

        console.log('loadChartData');
        console.log(products.length);
        var temperature;
        var dt;
        var sum = 0.00;

        chartData = [];
        chartDataAverage = [];
        chartTimeseriesData = [];
        for (let i = 0; i < products.length; i++) {
            temperature = products[i].temperature;
            if (getTemperatureUnit() === 'F') {
                //console.log('=== F');
                temperature = convertCToF(temperature);
            }
            sum = sum + parseFloat(temperature);
            dt = products[i].dt;
            //console.log(formatDateTime(dt));
            //console.log(temperature);
            //chartData.push(temperature);
            chartData.push({ t: formatDateTime(dt), y: temperature });
            //chartTimeseriesData.push({ t: formatDateTime(dt), y: temperature });
            //data.push({ date: formatDateTime(dt), name: "name" + i, value: temperature });
        }

        sum = sum / products.length;
        for (let i = 0; i < products.length; i++) {
            chartDataAverage.push(sum);
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
                    <DataTable
                        title={title}
                        columns={columns}
                        data={products}
                        paginationPerPage={5}
                        paginationRowsPerPageOptions={[5]}
                        pagination>
                    </DataTable>
                </div>

                <div id="divmychart" className="col-md-12">
                    <canvas id="mychart"></canvas>
                </div>
                <div className="col-md-12">
                    <div id="status">
                    </div>
                </div>


            </div>
        </div >
    )
};

export default Data;

var MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
window.chartColors = {
    red: 'rgb(255, 99, 132)',
    orange: 'rgb(255, 159, 64)',
    yellow: 'rgb(255, 205, 86)',
    green: 'rgb(75, 192, 192)',
    blue: 'rgb(54, 162, 235)',
    purple: 'rgb(153, 102, 255)',
    grey: 'rgb(201, 203, 207)'
};

var handleLoad = function (chartData, chartDataAverage, chartTimeseriesData, id, startDate, endDate) {

    console.log('handleLoad');

    var divstatus = document.getElementById('status');

    document.getElementById("divmychart").innerHTML = "";
    document.getElementById("divmychart").innerHTML = '<canvas id="mychart"></canvas>';

    var c = document.getElementById('mychart');
    var ctx = c.getContext('2d');

    //divstatus.innerHTML = "Total Records: " + chartData.length;

    if (chartData.length === 0) {
        console.log('chartData.length === 0');
        getProductDataByDate(id, formatDateTime(startDate), formatDateTime(endDate))
            .then(items => {
                console.log(items.length);
                var sum = 0.00;
                chartData = []
                chartDataAverage = []
                chartTimeseriesData = []
                for (let i = 0; i < items.length; i++) {
                    var temperature = items[i].temperature;
                    if (getTemperatureUnit() === 'F') {
                        console.log('=== F');
                        temperature = convertCToF(items[i].temperature);
                    }
                    sum = sum + parseFloat(temperature);
                    var dt = items[i].dt;
                    chartData.push({ t: formatDateTime(dt), y: temperature });
                    //chartTimeseriesData.push({ t: formatDateTime(dt), y: temperature });
                }
                sum = sum / items.length;
                for (let i = 0; i < items.length; i++) {
                    chartDataAverage.push(sum);
                }
                if (window.chart) {
                    window.chart.update();
                }
            });
    }

    var config = {
        data: {
            datasets: [{
                label: 'Temperature °' + getTemperatureUnit(),
                borderColor: "#55bae7",
                backgroundColor: "#55bae7",
                pointBackgroundColor: "#55bae7",
                pointBorderColor: "#55bae7",
                pointHoverBackgroundColor: "#55bae7",
                pointHoverBorderColor: "#55bae7",
                pointRadius: 0,
                pointHoverRadius: 0,
                data: chartData,
                type: 'line',
                fill: false,
            },
            {
                label: 'Average',
                data: chartDataAverage,
                type: 'line',
                borderColor: "#55bae7",
                backgroundColor: "#55bae7",
            }]
        },
        options: {
            responsive: true,
            title: {
                display: true,
                text: 'Temperature sensor data over the time'
            },
            tooltips: {
                mode: 'index',
                intersect: false,
            },
            scales: {
                xAxes: [{
                    type: 'time',
                    time: {
                        displayFormats: {
                            month: 'DD MMM-YY'
                        }
                    },
                    distribution: 'series',
                    offset: true,
                    ticks: {
                        major: {
                            enabled: true,
                            fontStyle: 'bold'
                        },
                        source: 'data',
                        autoSkip: true,
                        autoSkipPadding: 75,
                        maxRotation: 0,
                        sampleSize: 100
                    }/*,
                    afterBuildTicks: function (scale, ticks) {
                        var majorUnit = scale._majorUnit;
                        console.log(ticks);
                        var firstTick = ticks[0];
                        var i, ilen, val, tick, currMajor, lastMajor;

                        val = moment(ticks[0].value);
                        if ((majorUnit === 'minute' && val.second() === 0)
                            || (majorUnit === 'hour' && val.minute() === 0)
                            || (majorUnit === 'day' && val.hour() === 9)
                            || (majorUnit === 'month' && val.date() <= 3 && val.isoWeekday() === 1)
                            || (majorUnit === 'year' && val.month() === 0)) {
                            firstTick.major = true;
                        } else {
                            firstTick.major = false;
                        }
                        lastMajor = val.get(majorUnit);

                        for (i = 1, ilen = ticks.length; i < ilen; i++) {
                            tick = ticks[i];
                            val = moment(tick.value);
                            currMajor = val.get(majorUnit);
                            tick.major = currMajor !== lastMajor;
                            lastMajor = currMajor;
                        }
                        return ticks;
                    }*/
                }],
                yAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'Temperature °' + getTemperatureUnit() + ''
                    }
                }]
            }
        }
    };
    if (window.chart) {
        window.chart.destroy();
        window.chart = null;
        console.log('destroy old');
    }
    window.chart = new Chart(ctx, config);
    window.chart.update();
}


