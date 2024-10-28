import React from 'react';
import { Link } from 'react-router-dom';
import Searchbar from './SearchBar';
import './Navbar.css'; // Novo arquivo CSS para estilos

const Navbarone = () => {
  return (
    <nav className="navbar container-fluid">
      <div className="navbar-container container ">
        <div className="navbar-logo">
          <Link to="/">Leandro´s Weather </Link>
        </div>
    
        <div className="navbar-search">
          <Searchbar />
        </div>
      </div>
    </nav>
  );
};

export default Navbarone;
