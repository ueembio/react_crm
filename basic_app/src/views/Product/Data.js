import React, { useEffect, useState } from 'react';
import { Link, Redirect, useHistory, useParams } from 'react-router-dom';
import { formatDateTime } from "../../Utils"
import { getProductData } from '../../services/products';
import DatePicker from "react-datepicker";
import DataTable from 'react-data-table-component';

import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

import "react-datepicker/dist/react-datepicker.css";


am4core.options.autoDispose = true;
am4core.useTheme(am4themes_animated);

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
        name: 'Temperature (°C)',
        selector: 'temperature',
        sortable: true,
        right: true,
    },
    {
        name: 'Data Received On',
        sortable: true,
        selector: 'dt',
        cell: row => <div>{formatDateTime(row.dt)}</div>,
    }
];

function Data({ setAlert }) {
    const { id } = useParams();
    const [products, setList] = useState([]);
    var date = new Date();
    date.setDate(date.getDate() - 15);
    const [startDate, setStartDate] = useState(date);
    const [endDate, setEndDate] = useState(new Date());

    useEffect(() => {
        getProductData(id)
            .then(items => {
                setList(items);
            });

        createChart();

    }, []);

    function createChart() {

        let chart = am4core.create("chartdiv", am4charts.XYChart);

        chart.paddingRight = 20;

        let data = [];
        var temperature;
        var dt;
        /*
        for (let i = 1; i < 366; i++) {
            visits += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 10);
            data.push({ date: new Date(2018, 0, i), name: "name" + i, value: visits });
        }
        */
        for (let i = 0; i < products.length; i++) {
            temperature = products[i].temperature;
            dt = products[i].dt;
            data.push({ date: dt, name: temperature, value: temperature });
        }

        chart.data = data;

        let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
        dateAxis.renderer.grid.template.location = 0;

        let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        valueAxis.tooltip.disabled = true;
        valueAxis.renderer.minWidth = 35;

        let series = chart.series.push(new am4charts.LineSeries());
        series.dataFields.dateX = "date";
        series.dataFields.valueY = "value";

        series.tooltipText = "{valueY.value} °C";
        chart.cursor = new am4charts.XYCursor();

        let scrollbarX = new am4charts.XYChartScrollbar();
        scrollbarX.series.push(series);
        chart.scrollbarX = scrollbarX;

        //this.chart = chart;
    }

    function handleSelect(e) {
        console.log(e);
        // {
        //   selection: {
        //     startDate: [native Date Object],
        //     endDate: [native Date Object],
        //   }
        // }
    };

    return (
        <div className="container-fluid">
            <div class="row">
                <div className="row col-md-12">
                    <form>
                        <div className="form-group">
                            <label>Start</label>
                            <DatePicker className="form-control" selected={startDate}
                                onChange={date => setStartDate(date)}
                                showTimeSelect />
                        </div>
                        <div className="form-group">
                            <label>End</label>
                            <DatePicker className="form-control" selected={endDate}
                                onChange={date => setEndDate(date)}
                                showTimeSelect />
                        </div>

                        <button type="submit" className="btn btn-primary">Update</button>
                    </form>
                </div>

                <div className="row col-md-12">
                    <div id="chartdiv" style={{ width: "100%", height: "250px" }}></div>
                </div>

                <div className="row col-md-12">
                    <DataTable
                        title='Sensor Data'
                        columns={columns}
                        data={products}
                        pagination>
                    </DataTable>
                </div>
            </div>
        </div >
    )
};

export default Data;
