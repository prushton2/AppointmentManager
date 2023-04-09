import React from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";

import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import Account from './components/Account';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Header />} />
        <Route path="/account" element={<Account />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
