// MainNavigation.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FaVrCardboard } from 'react-icons/fa'; // You'll need to install react-icons
import './MainNavigation.css';
const MainNavigation = (props) => {
  return (
    <header className="main-navigation">
      <div className="main-navigation__logo">
        <FaVrCardboard /> {/* VR Logo */}
        <h1>Your VR Hub</h1>
      </div>
      <nav className="main-navigation__items">
        <ul>
          <li>
            <Link to="/auth">Auth</Link>
          </li>
          <li>
            <Link to="/events">Events</Link>
          </li>
          <li>
            <Link to="/bookings">Bookings</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;