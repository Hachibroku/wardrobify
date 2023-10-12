import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React, { useState, useEffect} from 'react';
import MainPage from './MainPage';
import Nav from './Nav';
import HatsList from './HatsList';
import ShoeList from './ShoeList';
import ShoeForm from './ShoeForm';
import HatCreate from './HatCreate';

function App(props) {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/hats" element={<HatsList hats={props.hats} />}>
            <Route path="new" element={<HatCreate />} />
          </Route>
          <Route path="/shoes" element={<ShoeList shoes={props.shoes} />}>
            <Route path="new" element={<ShoeForm />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
