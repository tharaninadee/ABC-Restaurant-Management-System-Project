import React from 'react';
import { Link } from 'react-router-dom';
import './Admin.css';

const AdminPanel = ({ children }) => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
              <div className="container">
                <Link className="navbar-brand" to="/">
                  <img src="../Images/logo.png" alt="logo" className="logo" />
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                  aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                  <ul className="navbar-nav ms-auto">
                    <li className="nav-item">
                      <Link className="nav-link" to="addfacility">Add Facility</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="category">Add Category</Link>
                    </li>

                  </ul>
                </div>
              </div>
            </nav>
      <main className="container mt-4">
        {children}
      </main>
    </div>
  );
};

export default AdminPanel;
