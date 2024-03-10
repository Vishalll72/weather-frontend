// App.js
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Components/Home';
import LocationDetails from './Components/LocationDetails/LocationDetails';
import LandingPage from './LandingPage/LandingPage';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route exact path="/"  element={<LandingPage/>} />
      <Route exact path="/home"  element={<Home />} />
      <Route path="/location/:location" element={<LocationDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
