import React from 'react';

export default function Dashboard() {
  return (
    <section className="content">
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-3 col-6">
            <div className="small-box bg-danger">
              <div className="inner">
                <h3>25°C</h3>
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
                <h3>3°C</h3>
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
                <h3>65</h3>
                <p>Device Registrations</p>
              </div>
              <div className="icon">
                <i className="ion ion-pie-graph"></i>
              </div>
              <a href="#" className="small-box-footer">More info <i className="fas fa-arrow-circle-right"></i></a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}