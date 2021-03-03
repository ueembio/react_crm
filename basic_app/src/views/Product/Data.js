import React, { useEffect, useState } from 'react';
import { Link, Redirect, useHistory, useParams } from 'react-router-dom';
import { formatDateTime } from "../../Utils"
import { getProduct, getProductData, getProductDataByDate } from '../../services/products';
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

    var date = new Date();
    date.setDate(date.getDate() - 15);

    const { id } = useParams();
    const [products, setList] = useState([]);
    const [title, setTitle] = useState('');
    const [startDate, setStartDate] = useState(date);
    const [endDate, setEndDate] = useState(new Date());
    const [showing, setShowing] = useState(true);

    useEffect(() => {
        getProduct(id)
            .then(items => {

                if (items) {
                    setTitle('Device Name: ' + items.Name + ', Hardware Serial #: ' + items.SKU);
                }

                getProductData(id)
                    .then(items => {
                        setList(items);
                        createLineChart();
                    });
            });
    }, []);

    function createLineChart() {

        let chart = am4core.create("chartdiv", am4charts.XYChart);

        let title = chart.titles.create();
        title.text = "Sensor temperature readings over the time";
        title.fontSize = 25;
        title.marginBottom = 30;
        chart.paddingRight = 20;

        let data = [];
        var temperature;
        var dt;

        for (let i = 0; i < products.length; i++) {
            temperature = products[i].temperature;
            dt = products[i].dt;
            //console.log(formatDateTime(dt));
            data.push({ date: formatDateTime(dt), name: "name" + i, value: temperature });
        }

        chart.data = data;

        let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
        dateAxis.renderer.grid.template.location = 0;
        dateAxis.title.text = "Date";
        dateAxis.title.fontWeight = "bold";
        dateAxis.dateFormatter = new am4core.DateFormatter();
        dateAxis.dateFormatter.dateFormat = "MM-dd HH:mm";

        let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        valueAxis.tooltip.disabled = true;
        //valueAxis.renderer.minWidth = 35;
        valueAxis.title.text = "Temperature";
        valueAxis.title.fontWeight = "bold";

        let series = chart.series.push(new am4charts.ColumnSeries());
        series.dataFields.dateX = "date";
        series.dataFields.valueY = "value";
        series.strokeWidth = "2";
        //series.tooltipText = "{valueY.value} °C";

        chart.dateFormatter.dateFormat = { month: "long", day: "numeric" };
        dateAxis.dateFormats.setKey("day", { day: "numeric" });
        dateAxis.dateFormats.setKey("hour", { hour: "numeric" });
        dateAxis.periodChangeDateFormats.setKey("day", { month: "long" });
        dateAxis.tooltipDateFormat = { month: "long", day: "numeric" };

        let bullet = series.bullets.push(new am4charts.CircleBullet())
        bullet.circle.fill = am4core.color("green");
        bullet.circle.fillOpacity = 0.5;
        bullet.circle.stroke = am4core.color("green");
        bullet.circle.strokeOpacity = 0.5;
        bullet.circle.strokeWidth = 1;
        bullet.circle.radius = 2;
        bullet.tooltipText = "{valueY.value} °C";

        /*
        let lineSeries = chart.series.push(new am4charts.LineSeries());
        let bullet = series.bullets.push(new am4charts.CircleBullet())
        lineSeries.dataFields.dateX = "date";
        lineSeries.dataFields.valueY = "value";
        lineSeries.strokeWidth = "2";
        lineSeries.tooltipText = "{valueY.value} °C";
        */

        chart.cursor = new am4charts.XYCursor();

        //let scrollbarX = new am4charts.XYChartScrollbar();
        //scrollbarX.series.push(series);
        //chart.scrollbarX = scrollbarX;

        //this.chart = chart;
    }

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
                        createLineChart();
                    });
            });
    }

    function handleSelect(e) {
        createLineChart();
        if (showing)
            setShowing(false);
        else
            setShowing(true);
    };

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

                <div className="col-md-12">
                    <div id="chartdiv" style={{ width: "100%", height: "350px", display: (showing ? 'block' : 'none') }}></div>
                </div>


            </div>
        </div >
    )
};

export default Data;
