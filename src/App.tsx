import React from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import { ToastsContainer, ToastsContainerPosition, ToastsStore } from 'react-toasts';
import "./indexDark.css"
// import "./indexLight.css"

import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import Account from './components/Account';

function App() {
  return (
    <BrowserRouter>
    <ToastsContainer position={ToastsContainerPosition.BOTTOM_RIGHT} store={ToastsStore} />
      <Routes>
        <Route path="/" element={<Header />} />
        <Route path="/account" element={<Account />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
