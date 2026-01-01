// src/Components/Navbar.js
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
//Navbar links
function Navbar() {
  const { currentUser, logout } = useContext(AuthContext);

  return ( // I used here a bootstrap for responsiveness
    <nav className="navbar navbar-expand-lg navbar-dark bg-secondary px-3">
      <Link to="/" className="navbar-brand">My Restaurant</Link>
      
      <button 
        className="navbar-toggler" 
        type="button" 
        data-bs-toggle="collapse" 
        data-bs-target="#navbarNav" 
        aria-controls="navbarNav" 
        aria-expanded="false" 
        aria-label="Toggle navigation"
      >
        
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item"><Link to="/" className="nav-link">Home</Link></li>
          <li className="nav-item"><Link to="/menu" className="nav-link">Our Menu</Link></li>
          
          {currentUser?.role === "customer" && (
            <>
              <li className="nav-item"><Link to="/cart" className="nav-link">Cart</Link></li>
              <li className="nav-item"><Link to="/order-tracking" className="nav-link">Orders</Link></li>
            </>
          )}

          {currentUser?.role === "admin" && (
            <li className="nav-item"><Link to="/kitchen" className="nav-link">Kitchen</Link></li>
          )}

          <li className="nav-item"><Link to="/about" className="nav-link">About</Link></li>
          <li className="nav-item"><Link to="/contact" className="nav-link">Contact</Link></li>
        </ul>

        <div className="d-flex">
          {currentUser ? (
            <button className="btn btn-outline-light" onClick={logout}>Logout</button>
          ) : (
            <Link to="/login" className="btn btn-outline-light">Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
