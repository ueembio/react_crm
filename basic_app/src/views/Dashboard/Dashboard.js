import React, { useEffect, useState } from 'react';
import { formatDateTime, convertCToF, getIsAdmin, getLoggedInUserId } from "../../Utils"
import { getList, getAlertsByDate } from '../../services/products';
import { getTemperatureUnit } from '../../Utils'

export default function Dashboard() {

  var date = new Date();
  date.setDate(date.getDate() - 7);

  const [products, setList] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [startDate, setStartDate] = useState(date);
  const [endDate, setEndDate] = useState(new Date());

  useEffect(() => {
    console.log('on loading');
    let mounted = true;
    getList()
      .then(items => {
        if (mounted) {
          setList(items)
        }
      });

    getAlertsByDate(formatDateTime(startDate), formatDateTime(endDate))
      .then(items => {
        if (mounted) {
          console.log('getAlertsByDate returned');
          setAlerts(items);
        }
      });

  }, []);

  function ConvertTemperature(props) {
    const value = props.value;
    if (getTemperatureUnit() === 'F') {
      return convertCToF(value);
    }
    return value;
  }

  return (
    <section className="content">
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-3 col-6">
            <div className="small-box bg-danger">
              <div className="inner">
                <h3>25°{getTemperatureUnit()}</h3>
                <p>Highest Temperature</p>
              </div>
              <div className="icon">
                <i className="ion ion-bag"></i>
              </div>
              <a href="#" className="small-box-footer">More info <i className="fas fa-arrow-circle-right"></i></a>
            </div>
          </div>
          <div className="col-lg-3 col-6">

            <div className="small-box bg-success">
              <div className="inner">
                <h3>3°{getTemperatureUnit()}</h3>
                <p>Lowest Temperature</p>
              </div>
              <div className="icon">
                <i className="ion ion-stats-bars"></i>
              </div>
              <a href="#" className="small-box-footer">More info <i className="fas fa-arrow-circle-right"></i></a>
            </div>
          </div>
          <div className="col-lg-3 col-6">
            <div className="small-box bg-info">
              <div className="inner">
                <h3>14</h3>
                <p>User Registrations</p>
              </div>
              <div className="icon">
                <i className="ion ion-person-add"></i>
              </div>
              <a href="#" className="small-box-footer">More info <i className="fas fa-arrow-circle-right"></i></a>
            </div>
          </div>
          <div className="col-lg-3 col-6">
            <div className="small-box bg-warning">
              <div className="inner">
                <h3>5</h3>
                <p>Device Registrations</p>
              </div>
              <div className="icon">
                <i className="ion ion-pie-graph"></i>
              </div>
              <a href="#" className="small-box-footer">More info <i className="fas fa-arrow-circle-right"></i></a>
            </div>
          </div>
        </div>

        <div class="row">
          <section class="col-lg-6 connectedSortable ui-sortable">
            <div class="card">
              <div class="card-header border-0">
                <h3 class="card-title">Sensors</h3>
              </div>
              <div class="card-body table-responsive p-0">
                <table class="table table-striped table-valign-middle">
                  <thead>
                    <tr>
                      <th>Sensor Name</th>
                      <th>Last Data Received On</th>
                      <th>Temperature (°{getTemperatureUnit()})</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map(product => (
                      <tr key={product.Id}>
                        <td>{product.Name}</td>
                        <td>{formatDateTime(product.datareceivedon)}</td>
                        <td><ConvertTemperature value={product.temperature} /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          <section class="col-lg-6 connectedSortable ui-sortable">
            <div class="card">
              <div class="card-header border-0">
                <h3 class="card-title">Alerts</h3>
              </div>
              <div class="card-body table-responsive p-0">
                <table class="table table-striped table-valign-middle">
                  <thead>
                    <tr>
                      <th>Alert Message</th>
                      <th>Received On</th>
                    </tr>
                  </thead>
                  <tbody>
                    {alerts.map(alert => (
                      <tr key={alert.Id}>
                        <td>{alert.Message}</td>
                        <td>{formatDateTime(alert.DT)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

        </div>


      </div>
    </section>
  );
}