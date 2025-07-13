import logo from './logo.svg';
import './App.css';


import {BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from './components/Auth';
import Bookings from './components/Bookings';
import Events from './components/Events';
import MainNavigation from './Sections/Navigation/MainNavigation';
import Home from './components/Home';

function App() {
  return (
    <BrowserRouter>
    <MainNavigation/>
    <Routes>
      <Route path="/" Component={Home} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/bookings"  Component={Bookings} />
      <Route path="/events" Component={Events} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
