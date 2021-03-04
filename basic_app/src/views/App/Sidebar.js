import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

function Sidebar() {

  const [pathname, setPathname] = useState(window.location.pathname);
  Array.prototype.contains = function (obj) {
    return this.indexOf(obj) > -1;
  };
  const history = useHistory();

  useEffect(() => {
    //setPathname(window.location.pathname);         
  }, [pathname]);

  function toggle(e, data) {
    e.preventDefault();
    console.log(data);
    //console.log(window.location.pathname);
    setPathname(data);
    history.push({
      pathname: data
    });
  }

  return (

    <aside className="main-sidebar sidebar-dark-primary elevation-4">
      <Link to="/dashboard" className="brand-link">
        {/*
        <img src="/assets/dist/img/AdminLTELogo.png"
          alt="AdminLTE Logo"
          className="brand-image img-circle elevation-3"
          style={{ "opacity": ".8" }} />
        */}
        <span className="brand-text font-weight-light">Sensor Management</span>
      </Link>

      <div className="sidebar">

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
              <Link to="/dashboard" onClick={((e) => toggle(e, '/dashboard'))} className={"nav-link " + (pathname.match('/dashboard') ? "active " : " ")}>
                <i className="nav-icon fas fa-tachometer-alt"></i>
                <p>
                  Dashboard
                </p>
              </Link>
            </li>

            <li className="nav-item menu-close">
              <Link href="#" className={"nav-link " + (['/AddProduct', '/ViewProducts'].contains(pathname) ? "active" : "")}>
                <i className="nav-icon fas fa-columns"></i>
                <p>
                  Devices
                <i className="right fas fa-angle-left"></i>
                </p>
              </Link>
              <ul className="nav nav-treeview">
                <li className="nav-item">
                  <Link to="/AddProduct" onClick={((e) => toggle(e, '/AddProduct'))} className={"nav-link " + (pathname.match('/AddProduct') ? "active " : " ")}>
                    <i className="far fa-circle nav-icon"></i>
                    <p>Add Device</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/ViewProducts" onClick={((e) => toggle(e, '/ViewProducts'))} className={"nav-link " + (pathname.match('/ViewProducts') ? "active " : " ")}>
                    <i className="far fa-circle nav-icon"></i>
                    <p>View Devices</p>
                  </Link>
                </li>
              </ul>

            </li>

            <li className="nav-item menu-close">
              <Link href="#" className={"nav-link " + (['/AddCompany', '/ViewCompany'].contains(pathname) ? "active" : "")}>
                <i className="nav-icon fas fa-copy"></i>
                <p>
                  Company
                <i className="right fas fa-angle-left"></i>
                </p>
              </Link>
              <ul className="nav nav-treeview">
                <li className="nav-item">
                  <Link to="/AddCompany" onClick={((e) => toggle(e, '/AddCompany'))} className={"nav-link " + (pathname.match('/AddCompany') ? "active " : " ")}>
                    <i className="far fa-circle nav-icon"></i>
                    <p>Add Company</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/ViewCompany" onClick={((e) => toggle(e, '/ViewCompany'))} className={"nav-link " + (pathname.match('/ViewCompany') ? "active " : " ")}>
                    <i className="far fa-circle nav-icon"></i>
                    <p>View Companies</p>
                  </Link>
                </li>
              </ul>
            </li>

            <li className="nav-item menu-close">
              <Link href="#" className={"nav-link " + (['/company/add', '/company/edit', '/company/index'].contains(pathname) ? "active" : "")}>
                <i className="nav-icon fas fa-th"></i>
                <p>
                  Lease Devices
                <i className="right fas fa-angle-left"></i>
                </p>
              </Link>
              <ul className="nav nav-treeview">
                <li className="nav-item">
                  <Link to="/NewLease" onClick={((e) => toggle(e, '/rent/add'))} className={"nav-link " + (pathname.match('/rent/add') ? "active " : " ")}>
                    <i className="far fa-circle nav-icon"></i>
                    <p>New Lease</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/ViewLeases" onClick={((e) => toggle(e, '/rent/index'))} className={"nav-link " + (pathname.match('/rent/index') ? "active " : " ")}>
                    <i className="far fa-circle nav-icon"></i>
                    <p>View Leases</p>
                  </Link>
                </li>
              </ul>
            </li>

            <li className="nav-item menu-close">
              <Link href="#" className={"nav-link " + (['/AddUser', '/ViewUsers'].contains(pathname) ? "active" : "")}>
                <i className="nav-icon fas fa-edit"></i>
                <p>
                  User Management
                <i className="right fas fa-angle-left"></i>
                </p>
              </Link>
              <ul className="nav nav-treeview">
                <li className="nav-item">
                  <Link to="/AddUser" onClick={((e) => toggle(e, '/AddUser'))} className={"nav-link " + (pathname.match('/AddUser') ? "active " : " ")}>
                    <i className="far fa-circle nav-icon"></i>
                    <p>Add New User</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/ViewUsers" onClick={((e) => toggle(e, '/ViewUsers'))} className={"nav-link " + (pathname.match('/ViewUsers') ? "active " : " ")}>
                    <i className="far fa-circle nav-icon"></i>
                    <p>View Users</p>
                  </Link>
                </li>
              </ul>
            </li>

            <li className="nav-item">
              <Link to="/logout" onClick={((e) => toggle(e, '/logout'))} className={"nav-link " + (pathname.match('/logout') ? "active " : " ")}>
                <i className="nav-icon fas fa-alt"></i>
                <p>
                  Logout
                </p>
              </Link>
            </li>

          </ul>
        </nav>
      </div>
    </aside>
  );
}

export default Sidebar;
