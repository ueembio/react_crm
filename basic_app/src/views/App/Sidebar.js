import React from 'react';
import {Link} from 'react-router-dom';

function Sidebar() {
  
  return (
    <aside className="main-sidebar sidebar-dark-primary elevation-4">
    <Link to="/dashboard" className="brand-link">
      <img src="/assets/dist/img/AdminLTELogo.png" alt="AdminLTE Logo" className="brand-image img-circle elevation-3" style={{"opacity": ".8"}} />
      <span className="brand-text font-weight-light">AdminLTE 3</span>
    </Link>

    <div className="sidebar">
      <div className="user-panel mt-3 pb-3 mb-3 d-flex">
        <div className="image">
          <img src="/assets/dist/img/user2-160x160.jpg" className="img-circle elevation-2" alt="User Image" />
        </div>
        <div className="info">
          <a href="#" className="d-block">Alexander Pierce</a>
        </div>
      </div>

      <div className="form-inline">
        <div className="input-group" data-widget="sidebar-search">
          <input className="form-control form-control-sidebar" type="search" placeholder="Search" aria-label="Search" />
          <div className="input-group-append">
            <button className="btn btn-sidebar">
              <i className="fas fa-search fa-fw"></i>
            </button>
          </div>
        </div>
      </div>

      <nav className="mt-2">
        <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
          <li className="nav-item">
                <Link to="/" className="nav-link">
                <i className="nav-icon fas fa-th"></i>
                <p>
                    Dashboard
                </p>
                </Link>
          </li>

          <li className="nav-item menu-open">
            <Link href="#" className="nav-link active">
              <i className="nav-icon fas fa-tachometer-alt"></i>
              <p>
                Products
                <i className="right fas fa-angle-left"></i>
              </p>
            </Link>
            <ul className="nav nav-treeview">
              <li className="nav-item">
                <Link to="/AddProduct" className="nav-link active">
                  <i className="far fa-circle nav-icon"></i>
                  <p>Add Products</p>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/viewProducts" className="nav-link">
                  <i className="far fa-circle nav-icon"></i>
                  <p>View Products</p>
                </Link>
              </li>
            </ul>
          </li>
          
        </ul>
      </nav>
    </div>
  </aside>
        
  
  );
}

export default Sidebar;
